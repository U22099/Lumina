import axios from "axios";

const refresh = async (showErr, navigate) => {
  try {
    const url = "/server/refresh";
    const response = await axios.post(url, {});
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
        const url = "/server/logout";
      const response = await axios.post(url,{});
      if (response.status === 200) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
};

export default refresh;
