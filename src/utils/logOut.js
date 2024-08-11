import origin from '../../config/origin.json'
import axios from 'axios'

const logOut = async (showErr, navigate) => {
    try {
      const url = origin.default.origin + "/logout";
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
   
        navigate("/", { replace: true });
      }
    } catch (err) {
      showErr({ occured: true, msg: err.message });
    }
};

export default logOut