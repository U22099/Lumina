import axios from "axios";
import indexedDB from "./indexedDB";
import refresh from "./refresh.js";
import storage from './localStorage.js'

const fetchUserData = async (
  setLoading,
  setUserImage,
  setUsername,
  navigate
) => {
  setLoading(true);
  const stored = storage.getValue("user_stored");
  if (stored && refresh.first) {
    const data = await indexedDB.getData("UserData", indexedDB.init);
    setUserImage(data.image);
    setUsername(data.username);
    setLoading(false);
  } else {
    try {
      const url = "/server/user";
      const response = await axios.get(url);
      indexedDB.saveData(response.data, "UserData", indexedDB.init);
      storage.setValue("user_stored", true)
      setUserImage(response.data.image);
      setUsername(response.data.username);
      if (response.status === 200) setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          fetchUserData(
            setLoading,
  setUserImage,
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
          setLoading,
  setUserImage,
  setUsername,
  navigate
        );
      }
    }
  }
};

export default fetchUserData;
