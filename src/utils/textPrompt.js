import axios from "axios";
import refresh from "./refresh.js";
import indexedDB from "./indexedDB";
import { getToken } from "./token.js";
import storage from "./localStorage.js";
import origin from "../../config/origin.json";

const textPrompt = async (setLoading, inputText, chat, navigate, setError) => {
  setLoading(true);
  try {
    const url = `${origin.default.origin}/chat/text?token=${getToken("__A")}&_id=${getToken("_ID")}`;
    const response = await axios.post(
      url,
      { message: inputText },
      {
        withCredentials: true,
      }
    );
    const updatedChat = [
      ...chat,
      {
        role: "model",
        parts: [{ text: response.data }],
      },
    ];
    indexedDB.saveData(updatedChat, "ChatData");
    storage.setValue("chat_stored", true);
    chat.push({
      role: "model",
      parts: [{ text: response.data }],
    });
    if (response.status === 200) setLoading(false);
  } catch (err) {
    console.log(err);
          if(err.response?.status === 500) setError(true);
    if (err.response && [401, 403].includes(err.response.status)) {
      const res = await refresh(navigate);
      if (res.status === 200) {
        textPrompt(setLoading, inputText, chat, navigate);
      }
    }
  }
};

export default textPrompt;
