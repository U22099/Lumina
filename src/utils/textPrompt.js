import axios from "axios";
import indexedDB from "./indexedDB";
import refresh from "./refresh.js";
import origin from '../../config/origin.json';
import storage from "./localStorage.js";
import {getToken} from './token.js';
import useChat from '../store';
import {useNavigate} from 'react-router-dom';

const textPrompt = async (setLoading, inputText) => {
  const chat = useChat((state) => state.chat);
  const navigate = useNavigate();
  setLoading(true);
  try {
    chat.push({
      role: "user",
      parts: [{ text: inputText }],
    });
    const url = `${origin.default.origin}/chat/text?token=${getToken('__A')}`;
    const response = await axios.post(url, { history: chat, message: inputText });
    const updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: inputText }],
      },
      {
        role: "model",
        parts: [{ text: response.data }],
      },
    ];
    indexedDB.saveData(updatedChat, "ChatData", indexedDB.init);
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
        textPrompt(setLoading, inputText);
      } else {
        storage.setValue("logged", false);
        navigate("/", { replace: true });
      }
    } else {
      console.log(err);
    }
    if (err.message.includes("Network")) {
      textPrompt(setLoading, inputText);
    }
  }
};

export default textPrompt;
