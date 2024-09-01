import axios from 'axios';
import origin from '../../config/origin.json';
import storage from './localStorage.js';
import {getToken} from './token.js';

const logOut = async (setLoad, navigate) => {
  setLoad(true);
    try {
      const url = `${origin.default.origin}/logout?_id=${getToken('_ID')}`;
      const response = await axios.post(url, {});
      if (response.status === 200) {
        setLoad(false);
        storage.setValue("logged", false);
        storage.setValue("user_stored", false);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
};

export default logOut