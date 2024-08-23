import axios from "axios";
import useChat from "../store";
import refresh from "./refresh.js";
import indexedDB from "./indexedDB";
import { getToken } from "./token.js";
import storage from "./localStorage.js";
import origin from "../../config/origin.json";
import { useNavigate } from './customHooks/useNavigator';

const imagePrompt = async (setLoading, inputText, inputImage) => {
  const chat = useChat((state) => state.chat);
  const navigate = useNavigate();
  setLoading(true);
  try {
    chat.push({
      role: "user",
      parts: [{ image: inputImage }, { text: inputText }],
    });
    const url = `${origin.default.origin}/chat/image?token=${getToken("__A")}`;
    const response = await axios.post(url, {
      history: chat,
      image: inputImage,
      message: inputText,
    });
    const updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ image: inputImage, text: inputText }],
      },
      {
        role: "model",
        parts: [{ text: response.data }],
      },
    ];
    indexedDB.saveData(updatedChat, "ChatData");
    localStorage.setItem("chat_stored", true);
    chat.push({
      role: "model",
      parts: [{ text: response.data }],
    });
    if (response.status === 200) setLoading(false);
  } catch (err) {
    console.log(err);
    if (err.response && [401, 403].includes(err.response.status)) {
      const res = await refresh(navigate);
      if (res.status === 200) {
        imagePrompt(setLoading, inputText, inputImage);
      } else {
        storage.setValue("logged", false);
        navigate("/", { replace: true });
      }
    } else {
      console.log(err);
    }
    if (err.message.includes("Network")) {
      imagePrompt(setLoading, inputText, inputImage);
    }
  }
};

export default imagePrompt;
