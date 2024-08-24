import axios from 'axios';
import logOut from './logOut.js';
import refresh from './refresh.js';
import {getToken} from './token.js';
import storage from "./localStorage.js";

const deleteUser = async (navigate) => {
    try {
      const url = `${origin.default.origin}/user?token=${getToken('__R')}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        await logOut();
        console.log("Deleted User Successfully");
        navigate("/", { replace: true });
      }
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        const res = await refresh();
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