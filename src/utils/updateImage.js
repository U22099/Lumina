import axios from 'axios';
import refresh from './refresh.js';
import {getToken} from './token.js';
import storage from "./localStorage.js";


const updateImage = async (image, navigate) => {
    try {
      const url = `${origin.default.origin}/user?token=${getToken('__R')}`;
      const response = await axios.patch(url, {image});
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          updateImage(image, navigate);
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