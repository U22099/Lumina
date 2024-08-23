import axios from 'axios';
import logOut from './logOut.js';
import refresh from './refresh.js';
import {getToken} from './token.js';
import storage from "./localStorage.js";
import { useNavigate } from './customHooks/useNavigator';

const updateImage = async (image) => {
  const navigate = useNavigate();
    try {
      const url = `${origin.default.origin}/user?token=${getToken('__R')}`;
      const response = await axios.patch(url, {image});
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh();
        if (res.status === 200) {
          updateImage();
        } else {
          storage.setValue("logged", false);
          navigate("/", { replace: true });
        }
      } else {
        console.log(err);
      }
    }
  };

  export default updateImage