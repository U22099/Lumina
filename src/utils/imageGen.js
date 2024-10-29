import indexedDB from "./indexedDB";
import { getToken } from "./token.js";
import storage from "./localStorage.js";

const imageGen = (setLoading, prompt, chat, navigate, setError) => {
  setLoading(true);
  try {
    const url = `https://image.pollinations.ai/prompt/${prompt}`;
    const data = encodeURIComponent(url);
    chat.push({
      role: "model",
      parts: [{ text: "image-url: " + data }],
    });
    setLoading(false);
    indexedDB.saveData(chat, "ChatData");
    storage.setValue("chat_stored", true);
  } catch (err) {
    console.log(err);
  }
};

export default imageGen;