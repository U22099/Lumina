import indexedDB from "./indexedDB";
import storage from "./localStorage.js";

const imageGen = (setLoading, prompt, chat) => {
  setLoading(true);
  try {
    const url = `https://image.pollinations.ai/prompt/${prompt}`;
    const data = encodeURIComponent(url);
    console.log(data);
    chat.push({
      role: "model",
      parts: [{ text: "image-url:" + data }],
    });
    setLoading(false);
    indexedDB.saveData(chat, "ChatData");
    storage.setValue("chat_stored", true);
  } catch (err) {
    console.log(err);
  }
};

export default imageGen;