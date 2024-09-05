import axios from "axios";
import refresh from "./refresh.js";
import { getToken } from "./token.js";
import indexedDB from "./indexedDB";
import storage from "./localStorage.js";
import origin from "../../config/origin.json";

const fetchUserData = async (
  setLoading,
  setUserImage,
  setUserName,
  navigate
) => {
  setLoading(true);
  const stored = storage.getValue("user_stored");
  if (stored) {
    const data = await indexedDB.getData("UserData");
    if(data&&data.image&&data.username){
      setUserImage(data.image);
      setUserName(data.username);
      setLoading(false);
    } else {
      storage.setValue("user_stored", false);
      fetchUserData(setLoading, setUserImage, setUserName, navigate);
    }
  } else {
    try {
      const url = `${origin.default.origin}/user?token=${getToken("__A")}&_id=${getToken("_ID")}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      setUserImage(response.data.image);
      setUserName(response.data.username);
      if (response.status === 200) setLoading(false);
      indexedDB.saveData(response.data, "UserData");
      storage.setValue("user_stored", true);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          fetchUserData(setLoading, setUserImage, setUserName, navigate);
        }
      }
    }
  }
};

export default fetchUserData;
