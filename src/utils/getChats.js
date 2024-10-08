import axios from "axios";
import refresh from "./refresh.js";
import { getToken } from "./token.js";
import indexedDB from "./indexedDB";
import storage from "./localStorage.js";
import origin from "../../config/origin.json";

const getChats = async (setChat, navigate) => {
  const stored = storage.getValue("chat_stored");
  if (stored) {
    const data = await indexedDB.getData("ChatData");
    if(data){
      setChat(data);
    } else {
      storage.setValue("user_stored", false);
      getChats(setChat, navigate);
    }
  } else {
    try {
      const url = `${origin.default.origin}/chat?token=${getToken("__A")}&_id=${getToken("_ID")}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
            setChat(response.data.history);
      indexedDB.saveData(response.data.history, "ChatData");
      storage.setValue("chat_stored", true);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          getChats(setChat, navigate);
        }
      }
    }
  }
};

export default getChats;
