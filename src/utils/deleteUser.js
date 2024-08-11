import axios from 'axios'
import indexedDB from './indexedDB.js'
import logOut from './logOut.js'
import refresh from './refresh.js'

const deleteUser = async (setErr, navigate) => {
    try {
      const url = "/server/user";
      const response = await axios.delete(url, {
        withCredentials: true,
      });
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
          navigate("/", { replace: true });
        }
      } else {
        setErr({ occured: true, msg: err.message });
      }
    }
  };

  export default deleteUser