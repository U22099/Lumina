import axios from 'axios';
import origin from '../../config/origin.json';


const logOut = async (showErr, navigate) => {
    try {
      const url = `${origin.default.origin}/logout`;
      const response = await axios.post(url, {});
      if (response.status === 200) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      showErr({ occured: true, msg: err.message });
    }
};

export default logOut