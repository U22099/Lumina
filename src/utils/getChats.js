import axios from "axios";
import refresh from "./refresh.js";
import {getToken} from './token.js';
import indexedDB from "./indexedDB";
import storage from './localStorage.js';
import origin from '../../config/origin.json';

const getChats = async (
  chat,
  navigate
) => {
  const stored = storage.getValue("chat_stored");
  if (stored) {
    const data = await indexedDB.getData("ChatData");
    chat.push(data);
  } else {
    try {
      const url = `${origin.default.origin}/chat?token=${getToken('__A')}`;
      const response = await axios.get(url,{
        withCredentials: true, 
      });
      indexedDB.saveData(response.data.history, "ChatData");
      storage.setValue("chat_stored", true);
      chat.push(response.data.history);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          getChats(
				chat,
  				navigate
          );
        } else {
          storage.setValue("logged", false);
          navigate("/", { replace: true });
        }
      } else {
        console.log(err);
      }
      if (err.message.includes("Network")) {
        getChats(
				chat,
  				navigate
          );
      }
    }
  }
};

export default getChats;
