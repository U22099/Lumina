import PropTypes from "prop-types";
import {useState, useEffect} from 'react';
import useChat from '../store';
import getChats from '../utils/getChats';
import getAiImage from '../utils/getAiImage';

const Message = () => {
    const [loading, setLoading] = useState(false);
    const chat = useChat((state) => state.chat);
    useEffect(() => {
        getChats(setLoading);
    }, [])
    return (
        <div className="h-full overflow-hidden overflow-y-scroll flex flex-cols">
            <div className="flex flex-col mx-auto h-fit justify-center items-center text-center mt-16 gap-3">
                <img src={getAiImage} alt="Lumina" className="rounded-full mx-auto w-40 h-40"/>
                <p className="comic-neue-bold md:text-[1.5em] text-black dark:text-white text-center w-44">Hi there! I'm Lumina, your friendly AI chatbot. What's on your mind?</p>
            </div>
            <div>
                {chat.map((x) => {
                    {x.role === "model" ? <ChatAi x={x} /> : <ChatUser x={x} /> }
                })}
            </div>
        </div>
    )
}

const ChatAi = ({x}) => {
    return (
        <div>
            <img src={getAiImage} alt="Lumina" className="rounded-full mx-auto w-14 h-14"/>
            <div>
                <p>{x.parts[0].text}</p>
            </div>
        </div>
    )
}
const ChatUser = ({x}) => {
    return (
        <div>
            <img src={getAiImage} alt="Lumina" className="rounded-full mx-auto w-14 h-14"/>
            <div>
                {x.parts.map((part) => {
                    {part.image ? <img src={part.image} alt="Lumina" className="rounded-full mx-auto w-40 h-40"/> : ''}
                    <p>{part.text}</p>
                })}
            </div>
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