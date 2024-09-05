import axios from 'axios';
import refresh from "./refresh.js";
import indexedDB from './indexedDB';
import { getToken } from './token.js';
import storage from './localStorage.js';
import origin from '../../config/origin.json';

const clearChats = async (setLoad, setChat, navigate) => {
    setLoad(true);
    try {
        const url = `${origin.default.origin}/chat?token=${getToken('__A')}&_id=${getToken('_ID')}`;
        const response = await axios.delete(url, {withCredentials: true});
        if (response.status === 200) {
            setLoad(false);
            storage.setValue("chat_stored", false);
            setChat([]);
            indexedDB.saveData([], "ChatData");
        }
    } catch (err) {
        if ([401, 403].includes(err.response.status)) {
            const res = await refresh(navigate);
            if (res.status === 200) {
                clearChats(setChat, navigate);
            } else {
                storage.setValue("logged", false);
                navigate("/", { replace: true });
            }
        } else {
            console.log(err);
        }
    }
}
const reset = async () => {
    try {
      localStorage.setItem("resetLumina", "yes");
      storage.setValue("user_stored", false);
      storage.setValue("chat_stored", false);
      const url = `${origin.default.origin}/chat?token=${getToken('__A')}&_id=${getToken('_ID')}`;
        const response = await axios.delete(url, {withCredentials: true});
        if (response.status === 200) {
            indexedDB.saveData([], "ChatData");
        }
    } catch (err) {
      console.log(err);
    }
};


if(!(localStorage.getItem("resetLumina") === "yes")&&storage.getValue("logged")){
    if(localStorage.getItem("reset")) localStorage.removeItem("reset");
  reset()
}

export default clearChats;