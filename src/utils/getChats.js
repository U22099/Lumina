import axios from "axios";
import indexedDB from "./indexedDB";
import refresh from "./refresh.js";

const getChats = async (
  setLoading,
  setChat,
  navigate
) => {
  setLoading(true);
  const stored = JSON.parse(localStorage.getItem("chat_stored"));
  if (stored) {
    const data = await indexedDB.getData("ChatData", indexedDB.init);
    setChat(data.history);
    setLoading(false);
  } else {
    try {
      const url = "/server/chat";
      const response = await axios.get(url);
      indexedDB.saveData(response.data, "ChatData", indexedDB.init);
      localStorage.setItem("chat_stored", true);
      setChat(response.data.history);
      if (response.status === 200) setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
          getChats(
            setLoading,
            setChat,
            navigate
          );
        } else {
          navigate("/", { replace: true });
        }
      } else {
        console.log(err);
      }
      if (err.message.includes("Network")) {
        getChats(
            setLoading,
            setChat,
            navigate
          );
      }
    }
  }
};

export default getChats;
