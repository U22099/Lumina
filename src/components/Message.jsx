import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import useChat from '../store';
import getChats from '../utils/getChats';
import getAiImage from '../utils/getAiImage';
import { Remarkable } from 'remarkable';
import hljs from "highlight.js";
import 'highlight.js/styles/github.css';
import markdownToTxt from 'markdown-to-txt';

const Message = ({ userImage, loading }) => {
  const [aiImage, setAiImage] = useState("logo.jpg");
  const navigate = useNavigate();
  const setChat = useChat((state) => state.setChat)
  const chat = useChat((state) => state.chat);
  useEffect(() => {
    getChats(setChat, navigate);
  }, [])
  useLayoutEffect(() => {
    if ((loading === null || loading === undefined) || (chat[(chat.length - 1)]?.role === "user")) {
      const body = document.getElementById("body");
      body.scrollTop = body.scrollHeight;
    }
  }, [loading, chat]);
  return (
    <div 
        id="body"
	    className="h-full overflow-hidden overflow-y-scroll flex flex-col px-4 scrollbar">
            <div className="flex flex-col mx-auto h-fit justify-center items-center text-center mt-12 gap-3 max-w-48 md:max-w-56 mb-8">
                <img src={aiImage} alt="Lumina" className="rounded-full mx-auto w-40 h-40 md:w-48 md:h-48 object-cover"/>
                <p className="comic-neue-bold md:text-[1.5em] text-black dark:text-white text-center max-w-48 md:max-w-56 flex">Hi there! I'm Lumina, your friendly AI chatbot</p>
            </div>
            {chat.map(x => {
                return (x.role === "model") ? <ChatAi x={x} aiImage={aiImage}/> :  <ChatUser x={x} userImage={userImage}/> 
            })}
            {loading ? <ChatAiLoad aiImage={aiImage} /> : ''}
        </div>
  )

}

const copy = (data) => {
  const text = markdownToTxt(data);
  navigator.clipboard.writeText(text);
}

const ChatAi = ({ x, aiImage }) => {
  const md = new Remarkable({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (e) { console.log(e) }
      }
      try {
        return hljs.highlightAuto(str).value;
      } catch (e) { console.log(e) }
      return '';
    }
  });
  return (
    <div className="flex self-start gap-1 my-3" onDoubleClick={() => copy(x.parts[0].text)}>
            <img src={aiImage} alt="Lumina" className="rounded-full object-cover w-12 h-12 md:w-14 md:h-14"/>
            {x.parts[0].text.split(":")[0] === "image-url" ? <img
            src={x.parts[0].text.split(":")[1].trim()}
            alt="AI Generated Image"
            className="bg-gray-100 dark:bg-[var(--accent-color)] p-2 align-center h-fit w-fit max-w-[70vw] md:max-w-[50vw] rounded-md object-cover"/> :
            <div className="bg-gray-100 dark:bg-[var(--accent-color)] p-2 align-left w-fit max-w-[70vw] md:max-w-[50vw] text-left rounded-md comic-neue-bold text-black dark:text-white display text-wrap w-fit break-words whitespace-normal overflow-hidden" dangerouslySetInnerHTML={{__html: md.render(x.parts[0].text)}}></div>}
		</div>
  )
}
const ChatAiLoad = ({ aiImage }) => {
  return (
    <div className="flex self-start gap-1 my-3">
            <img src={aiImage} alt="User" className="rounded-full w-12 h-12 md:w-14 md:h-14"/>
            <div id="load" className="bg-gray-100 dark:bg-[var(--accent-color)] p-2 w-fit h-6 rounded-md text-[1.5em]">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
  )
}

const ChatUser = ({ x, userImage }) => {
  const md = new Remarkable({
    html: true,
    xhtmlOut: true,
    breaks: true,
    typographer: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (e) { console.log(e) }
      }
      try {
        return hljs.highlightAuto(str).value;
      } catch (e) { console.log(e) }
      return '';
    }
  });
  return (
    <div className="flex self-end gap-1 my-3">
            <div className="bg-[var(--secondary-color)] p-2 comic-neue-bold align-left w-fit max-w-[70vw] md:max-w-[50vw] text-left rounded-md">
                {x.parts.map((part) => {
                    return ( 
                        <div>
                            {part.inlineData?.mimeType.includes("image")&&<img src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} alt="Image" className="rounded-md object-cover w-40 h-40 mx-auto object-cover"/>}
                            {part.inlineData?.mimeType.includes("audio")&&<audio src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} alt="Audio" className="rounded-md w-fit h-14 mx-auto " controls/>}
                            {part.inlineData?.mimeType.includes("video")&&<video src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} alt="Video" className="rounded-md w-40 h-40 mx-auto object-cover" controls/>}
                            {part.inlineData?.mimeType.includes("application")&&<embed src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} alt="PDF" className="rounded-md w-40 h-40 mx-auto object-cover"/>}
                            <div className="comic-neue-bold text-black dark:text-white display text-wrap max-w-[70vw] md:max-w-[50vw] w-fit break-words whitespace-pre-wrap overflow-hidden display" dangerouslySetInnerHTML={{__html: md.render(part.text)}}></div>
                        </div>
                    )
                })}
            </div>
            <img src={userImage || "user.jpg"} alt="Lumina" className="rounded-full object-cover w-12 h-12 md:w-14 md:h-14"/>
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