import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useChat from '../store';
import getChats from '../utils/getChats';
import getAiImage from '../utils/getAiImage';
import Markdown from 'react-markdown';

const Message = ({ userImage, loading }) => {
    const [aiImage, setAiImage] = useState("logo.jpg");
    const navigate = useNavigate();
    const setChat = useChat((state) => state.setChat)
    const chat = useChat((state) => state.chat);
	const messageRef = useRef();
    useEffect(() => {
        getChats(setChat, navigate);
    }, [])
	useEffect(() => {
	if(messageRef.current){
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
    }, [loading]);
    return (
        <div 
	ref={messageRef}
	className="h-full overflow-hidden overflow-y-scroll flex flex-col px-4 scrollbar">
            <div className="flex flex-col mx-auto h-fit justify-center items-center text-center mt-12 gap-3 max-w-48 md:max-w-56 mb-8">
                <img src={aiImage} alt="Lumina" className="rounded-full mx-auto w-40 h-40 md:w-48 md:h-48"/>
                <p className="comic-neue-bold md:text-[1.5em] text-black dark:text-white text-center max-w-48 md:max-w-56 flex">Hi there! I'm Lumina, your friendly AI chatbot. What's on your mind?</p>
            </div>
            {chat.map(x => {
                return (x.role === "model") ? <ChatAi x={x} aiImage={aiImage}/> : <ChatUser x={x} userImage={userImage}/> 
            })}
            {loading ? <ChatAiLoad aiImage={aiImage} /> : ''}
        </div>
    )
}

const ChatAi = ({x, aiImage}) => {
    return (
        <div className="flex self-start gap-1 my-3">
            <img src={aiImage} alt="Lumina" className="rounded-full w-12 h-12 md:w-14 md:h-14"/>
            <div className="bg-gray-100 dark:bg-[var(--accent-color)] p-2 align-left w-fit max-w-[70vw] md:max-w-[50vw] text-left rounded-md">
                <Markdown className="comic-neue-bold text-black dark:text-white display" >{x.parts[0].text}</Markdown>
            </div>
        </div>
    )
}
const ChatAiLoad = ({aiImage}) => {
    return (
        <div className="flex self-start gap-1 my-3">
            <img src={aiImage} alt="Lumina" className="rounded-full w-12 h-12 md:w-14 md:h-14"/>
            <div id="load" className="bg-gray-100 dark:bg-[var(--accent-color)] p-2 w-fit h-6 rounded-md text-[1.5em]">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

const ChatUser = ({x, userImage}) => {
    return (
        <div className="flex self-end gap-1 my-3">
            <div className="bg-[var(--secondary-color)] p-2 comic-neue-bold text-md align-right w-fit max-w-[70vw] md:max-w-[50vw] text-right rounded-md">
                {x.parts.map((part) => {
                    return ( 
                        <div>
                            {/*part.inlineData ? <img src={part.inlineData.data} alt="Lumina" className="rounded-md w-40 h-40 mx-auto"/> : ''*/}
                            <Markdown className="comic-neue-bold text-black dark:text-white display">{part.text}</Markdown> 
                        </div>
                    )
                })}
            </div>
            <img src={userImage} alt="Lumina" className="rounded-full w-12 h-12 md:w-14 md:h-14"/>
        </div>
    )
}

ChatAiLoad.propTypes = {
    x: PropTypes.object,
    aiImage: PropTypes.string
}
ChatAi.propTypes = {
    x: PropTypes.object,
    aiImage: PropTypes.string
}
ChatUser.propTypes = {
    x: PropTypes.object,
    userImage: PropTypes.string
}
Message.propTypes = {
    userImage: PropTypes.string,
    loading: PropTypes.bool
}
export default Message