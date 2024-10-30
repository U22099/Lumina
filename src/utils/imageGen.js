import indexedDB from "./indexedDB";
import storage from "./localStorage.js";

const imageGen = async (setLoading, prompt, chat) => {
  setLoading(true);
  try {
    const baseurl = "https://image.pollinations.ai/prompt/";
    const data = encodeURIComponent(prompt);
    
    const seed = Math.floor(Math.random() * 1000000);
    
    const result = `image-url@${baseurl}${data}?width=640&height=640&nologo=true&enhance=true&seed=${seed}`;
    
    chat.push({
      role: "model",
      parts: [{ text: result }],
    });
    
    indexedDB.saveData(chat, "ChatData");
    storage.setValue("chat_stored", true);
    
  } catch (err) {
    console.log(err);
    chat.push({
      role: "model",
      parts: [{ text: "An error occured while generating image" }],
    });
    
    indexedDB.saveData(chat, "ChatData");
    storage.setValue("chat_stored", true);
  } finally {
    setLoading(false)
  }
};

export default imageGen;