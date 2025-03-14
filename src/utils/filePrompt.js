import axios from "axios";
import refresh from "./refresh.js";
import indexedDB from "./indexedDB";
import { getToken } from "./token.js";
import storage from "./localStorage.js";
import origin from "../../config/origin.json";

const imagePrompt = async (setLoading, inputText, inputFile, chat, navigate, setError) => {
  setLoading(true);
  try {
    const url = `${origin.default.origin}/chat/file?token=${getToken("__A")}&_id=${getToken("_ID")}`;
    const response = await axios.post(url, {
      file: inputFile,
      message: inputText,
    }, {
      withCredentials: true,
    });
	chat.push({
      role: "model",
      parts: [{ text: response.data }],
    });
    
    indexedDB.saveData(chat, "ChatData");
    storage.setValue("chat_stored", true);

  } catch (err) {
    console.log(err);
    if(err.response?.status === 500) setError(true);
    if (err.response && [401, 403].includes(err.response.status)) {
      const res = await refresh(navigate);
      if (res.status === 200) {
        imagePrompt(setLoading, inputText, inputImage, chat, navigate);
      }
    }
  } finally {
    setLoading(false)
  }
};

export default imagePrompt;
