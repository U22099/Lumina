import axios from 'axios';
import useChat from '../store';
import refresh from "./refresh.js";
import indexedDB from './indexedDB';
import { getToken } from './token.js';
import storage from './localStorage.js';
import origin from '../../config/origin.json';
import { useNavigate } from './customHooks/useNavigator';

const clearChats = async () => {
    const setChat = useChat((state) => state.setChat);
    const navigate = useNavigate();
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
            const res = await refresh();
            if (res.status === 200) {
                deleteUser();
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