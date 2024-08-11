import axios from "axios";
import indexedDB from "./indexedDB";
import refresh from "./refresh.js";

const imagePrompt = async (
  setLoading,
  inputText,
  inputImage,
  chat,
  navigate
) => {
  setLoading(true);
    try {
        chat.push({
            role: "user",
            parts: [{image: inputImage}, {text: inputText}]
        });
        const url = "/server/chat/text";
        const response = await axios.post(url, {history: chat, image: inputImage, message: inputText});
        const updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{image: inputImage, text: inputText}]
            },
            {
                role: "model",
                parts: [{text: response.data}]
            }
        ]
        indexedDB.saveData(updatedChat, "ChatData", indexedDB.init);
        localStorage.setItem("chat_stored", true);
        chat.push(
        {
            role: "model",
            parts: [{text: response.data}]
        })
        if (response.status === 200) setLoading(false);
    } catch (err) {
        console.log(err);
        if (err.response && [401, 403].includes(err.response.status)) {
        const res = await refresh(navigate);
        if (res.status === 200) {
            imagePrompt(
                setLoading,
                inputText,
                inputImage,
                chat,
                navigate
            );
        } else {
            navigate("/", { replace: true });
        }
        } else {
        console.log(err);
        }
        if (err.message.includes("Network")) {
            imagePrompt(
                setLoading,
  inputText,
  inputImage,
  chat,
  navigate
                );
        }
    }
};

export default imagePrompt;
