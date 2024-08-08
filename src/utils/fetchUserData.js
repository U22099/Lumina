import axios from "axios";
import origin from "../../config/origin.json";
import indexedDB from "./indexedDB";
import refresh from "./refresh.js";

const fetchUserData = async (
  refresh,
  setRefresh,
  setLoading,
  setImage,
  setEmail,
  setUsername,
  navigate
) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem("user_stored"));
  if (stored && refresh.first) {
    //&& !forceRefresh) {
    const data = await indexedDB.getData("UserData", indexedDB.init);
    setImage(data.image);
    setEmail(data.email);
    setUsername(data.username);
    // if (data.isAdmin) {
    //   props.setIsAdmin(true);
    // }
    // setForceRefresh(true);
    setRefresh({ refresh: true, first: false });
    setLoading(false);
  } else {
    try {
      const url = origin.default.origin + "/user";
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      indexedDB.saveData(response.data, "UserData", indexedDB.init);
      localStorage.setItem("user_stored", true);
      setImage(response.data.image);
      setEmail(response.data.email);
      setUsername(response.data.username);
      // if (response.data.isAdmin) {
      //   props.setIsAdmin(true);
      // }
      if (response.status === 200) setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          console.log(res.data.accessToken);
          fetchUserData(
            refresh,
            setRefresh,
            setLoading,
            setImage,
            setEmail,
            setUsername,
            navigate
          );
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/", { replace: true });
        }
      } else {
        // props.setErr({ occured: true, msg: err.message });
        console.log(err);
      }
      if (err.message.includes("Network")) {
        fetchUserData(
          refresh,
          setRefresh,
          setLoading,
          setImage,
          setEmail,
          setUsername,
          navigate
        );
      }
    }
  }
};

export default fetchUserData;
