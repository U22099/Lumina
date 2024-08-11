import axios from "axios";
import origin from "../../config/origin.json";

const refresh = async (showErr, navigate) => {
  try {
    const url = origin.default.origin + "/refresh";
    const response = await axios.post(
      url,
      {},
      {
        withCredentials: true,
      }
    );
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
      console.log(err);
    }
};

export default refresh;
