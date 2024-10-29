import axios from "axios";
import refresh from "./refresh.js";
import indexedDB from "./indexedDB";
import { getToken } from "./token.js";
import storage from "./localStorage.js";
import origin from "../../config/origin.json";

const imageGen = async (setLoading, inputText, chat, navigate, setError) => {
  setLoading(true);
  try {
    const url = `${origin.default.origin}/chat/gen-image?token=${getToken("__A")}&_id=${getToken("_ID")}`;
    const response = await axios.post(
      url, { message: inputText },
      {
        withCredentials: true,
      }
    );
    console.log(response.data)
    chat.push({
      role: "model",
      parts: [{ text: "image-url: " + response.data }],
    });
    if (response.status === 200) setLoading(false);
    indexedDB.saveData(chat, "ChatData");
    storage.setValue("chat_stored", true);
  } catch (err) {
    console.log(err);
    if (err.response?.status === 500) setError(true);
    if (err.response && [401, 403].includes(err.response.status)) {
      const res = await refresh(navigate);
      if (res.status === 200) {
        imageGen(setLoading, inputText, chat, navigate);
      }
    }
  }
};

export default imageGen;