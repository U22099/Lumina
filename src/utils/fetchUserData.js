import axios from "axios";
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
      const url = "/server/user";
      const response = await axios.get(url, {
        withCredentials: true,
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
          navigate("/", { replace: true });
        }
      } else {
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
