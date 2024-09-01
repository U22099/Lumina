import axios from "axios";
import refresh from "./refresh.js";
import { getToken } from "./token.js";
import origin from "../../config/origin.json";

const voicePrompt = async (setLoading, message, navigate, setResult) => {
  setLoading(true);
  try {
    const url = `${origin.default.origin}/chat/voice?token=${getToken("__A")}&_id=${getToken("_ID")}`;
    const response = await axios.post(
      url,
      { message },
      {
        withCredentials: true,
      }
    );
    setResult(response.data);
    if (response.status === 200) setLoading(false);
  } catch (err) {
    console.log(err);
    if (err.response && [401, 403].includes(err.response.status)) {
      const res = await refresh(navigate);
      if (res.status === 200) {
        voicePrompt(setLoading, message, navigate, setResult);
      }
    }
  }
};

export default voicePrompt;
