import axios from 'axios'
import logOut from './logOut.js'
import refresh from './refresh.js'
import storage from "./localStorage.js"
import {getToken} from './token.js'

const deleteUser = async (setErr, navigate) => {
    try {
      const url = `${origin.default.origin}/user?${getToken('__R')}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        await logOut(setErr, navigate);
        console.log("Deleted User Successfully");
        navigate("/", { replace: true });
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
        setErr({ occured: true, msg: err.message });
      }
    }
  };

  export default deleteUser