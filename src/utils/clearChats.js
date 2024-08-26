import axios from 'axios';
import refresh from "./refresh.js";
import indexedDB from './indexedDB';
import { getToken } from './token.js';
import storage from './localStorage.js';
import origin from '../../config/origin.json';

const clearChats = async (setChat, navigate) => {
    try {
        const url = `${origin.default.origin}/chat?token=${getToken('__R')}`;
        const response = await axios.delete(url);
        if (response.status === 200) {
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

export default clearChats;