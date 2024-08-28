import axios from "axios";
import storage from "./localStorage.js";
import {getToken, setToken} from './token.js';
import origin from '../../config/origin.json';

const refresh = async (navigate) => {
  try {
    const url = `${origin.default.origin}/refresh?token=${getToken('__R')}`;
    const response = await axios.post(url, {});
    const token = response.data.token;
    setToken('__A', token);
    if (response.status === 200) return response;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 403 || err.response.status === 401)
    ) {
      storage.setValue("logged", false);
      navigate("/", { replace: true });
    }
  }
};

export default refresh;
