import axios from "axios";
import refresh from "./refresh.js";
import indexedDB from "./indexedDB";
import {getToken} from './token.js';
import storage from "./localStorage.js";
import origin from '../../config/origin.json';


const textPrompt = async (setLoading, inputText, chat, navigate) => {
  setLoading(true);
  try {
    const url = `${origin.default.origin}/chat/text?token=${getToken('__A')}`;
    const response = await axios.post(url, { history: chat, message: inputText }, {
      withCredentials: true,
    });
    const updatedChat = [
      ...chat,
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
	 //if(err.response.status === 500){textPrompt(setLoading, inputText, chat, navigate)}
    if (err.response && [401, 403].includes(err.response.status)) {
      const res = await refresh(navigate);
      if (res.status === 200) {
        textPrompt(setLoading, inputText, chat, navigate);
      } else {
        storage.setValue("logged", false);
        navigate("/", { replace: true });
      }
    } else {
      console.log(err);
    }
  }
};

export default textPrompt;
