import axios from "axios";
import origin from '../../config/origin.json';
import storage from "./localStorage.js";
import {getToken, setToken} from './token.js'

const refresh = async (showErr, navigate) => {
  try {
    const url = `${origin.default.origin}/refresh?${getToken('__R')}`;
    const response = await axios.post(url, {});
    const token = response.data.token;
    setToken('__A', token);
    if (response.status === 200) return response;
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 403 || err.response.status === 401)
    ) {
      logOut(navigate);
      return err.response;
    }
  }
};

const logOut = async (navigate) => {
    try {
        const url = `${origin.default.origin}/logout?${getToken('__R')}`;
      const response = await axios.post(url,{});
      if (response.status === 200) {
        storage.setValue("logged", false);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
};

export default refresh;
