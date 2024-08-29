import axios from 'axios';
import refresh from './refresh.js';
import {getToken} from './token.js';
import storage from "./localStorage.js";
import origin from '../../config/origin.json';

const deleteUser = async (setLoad, navigate) => {
  setLoad(true);
    try {
      const url = `${origin.default.origin}/user?token=${getToken('__A')}`;
      const response = await axios.delete(url, {withCredentials: true});
      if (response.status === 200) {
        storage.setValue("user_stored", false);
        storage.setValue("chat_stored", false);
        storage.setValue("__R", '');
        storage.setValue("__A", '');
        storage.setValue("logged", false);
        setLoad(false);
        console.log("Deleted User Successfully");
        navigate("/", { replace: true });
      }
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          deleteUser(navigate);
        } else {
          storage.setValue("logged", false);
          navigate("/", { replace: true });
        }
      } else {
        console.log(err);
      }
    }
  };

  export default deleteUser