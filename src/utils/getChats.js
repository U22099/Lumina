import axios from "axios";
import refresh from "./refresh.js";
import {getToken} from './token.js';
import indexedDB from "./indexedDB";
import storage from './localStorage.js';
import origin from '../../config/origin.json';

const getChats = async (
  setLoading,
  setChat,
  navigate
) => {
  setLoading(true);
  const stored = storage.getValue("chat_stored");
  if (stored) {
    const data = await indexedDB.getData("ChatData");
    setChat(data);
    setLoading(false);
  } else {
    try {
      const url = `${origin.default.origin}/chat?token=${getToken('__A')}`;
      const response = await axios.get(url,{
        withCredentials: true, 
      });
      indexedDB.saveData(response.data.history, "ChatData");
      storage.setValue("chat_stored", true);
      setChat(response.data.history);
      if (response.status === 200) setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          getChats(
            setLoading,
				setChat,
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
            setLoading,
				setChat,
  				navigate
          );
      }
    }
  }
};

export default getChats;
