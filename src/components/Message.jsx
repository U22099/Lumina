import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useChat from '../store';
import getChats from '../utils/getChats';
import getAiImage from '../utils/getAiImage';

const Message = () => {
    const [aiImage, setAiImage] = useState("logo.jpg");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setChat = useChat((state) => state.setChat);
    const chat = useChat((state) => state.chat);
    useEffect(() => {
        //getChats(setLoading, setChat, navigate);
        console.log(chat);
        getAiImage(setAiImage);
    }, [])
    return (
        <div className="h-full overflow-hidden overflow-y-scroll flex flex-cols">
            <div className="flex flex-col mx-auto h-fit justify-center items-center text-center mt-12 gap-3 max-w-48 md:max-w-56">
                <img src={aiImage} alt="Lumina" className="rounded-full mx-auto w-40 h-40 md:w-48 md:h-48"/>
                <p className="comic-neue-bold md:text-[1.5em] text-black dark:text-white text-center max-w-48 md:max-w-56 flex">Hi there! I'm Lumina, your friendly AI chatbot. What's on your mind?</p>
            </div>
            <div>
                {chat.map((x) => {
                    x.role === "model" ? <ChatAi x={x} /> : <ChatUser x={x} /> 
                })}
            </div>
        </div>
    )
}

const ChatAi = ({x}) => {
    return (
        <div className="flex items-start">
            <img src={aiImage} alt="Lumina" className="rounded-full mx-auto w-14 md:w-16 md:h-16 h-14"/>
            <div className="bg-gray-100 dark:bg-[var(--accent-color)] p-8 comic-neue-bold text-md align-left max-w-75vw md:max-w-50vw text-left rounded-md">
                <p>{x.parts[0].text}</p>
            </div>
        </div>
    )
}
const ChatUser = ({x}) => {
    return (
        <div className="flex self-end">
            <div className="bg-[var(--secondary-color)] p-8 comic-neue-bold text-md align-right max-w-75vw md:max-w-50vw text-right rounded-md">
                {x.parts.map((part) => {
                    {part.image ? <img src={part.image} alt="Lumina" className="rounded-md w-40 h-40"/> : ''}
                    <p>{part.text}</p>
                })}
            </div>
            <img src={aiImage} alt="Lumina" className="rounded-full mx-auto w-14 h-14"/>
        </div>
    )
}

ChatAi.propTypes = {
    x: PropTypes.object
}
ChatUser.propTypes = {
    x: PropTypes.object
}
export default Message