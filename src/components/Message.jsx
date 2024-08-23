import {useState, useEffect} from 'react';
import useChat from '../store';
import getChats from '../utils/getChats';
import PropTypes from "prop-types";

const Message = () => {
    const [loading, setLoading] = useState(false);
    const chat = useChat((state) => state.chat);
    useEffect(() => {
        getChats(setLoading);
    }, [])
    return (
        <div className="h-[80vh] overflow-hidden overflow-y-scroll flex flex-cols">
            <div className="flex flex-col mx-auto h-20 justify-center items-center text-center">
                <img src="logo.jpg" alt="Lumina" className="rounded-md mx-auto w-10 h-10"/>
                <p className="comic-neue-bold text-[1.5em] text-black dark:text-white text-center">Hi there! I'm Lumina, your friendly AI chatbot. What's on your mind?</p>
            </div>
            <div>
                {chat.map((x) => {
                    <Chats x={x} />
                })}
            </div>
        </div>
    )
}

const Chats = ({x}) => {
    return (
        <div>
        </div>
    )
}

Chats.propTypes = {
    x: PropTypes.object
}
export default Message