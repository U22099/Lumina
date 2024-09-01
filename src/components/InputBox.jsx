import { IoMdSend, IoMdAttach } from "react-icons/io";
import { FaMicrophone } from 'react-icons/fa6';
import {useState, useEffect} from 'react';
import textPrompt from '../utils/textPrompt';
import filePrompt from '../utils/filePrompt';
import {useNavigate} from 'react-router-dom';
import useChat from '../store';
import toBase64 from '../utils/base64';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useError} from '../store.js';

const InputBox = ({loading, setLoading}) => {
  const navigate = useNavigate();
  const chat = useChat((state) => state.chat);
  const [prompt, setPrompt] = useState();
  const [file, setFile] = useState();
  const [mic, setMic] = useState(false);
  const setError = useError((state) => state.setError);
  const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  const startMic = () => {
    if(!browserSupportsSpeechRecognition){
        alert("Speech Recognition Not Supported");
    } else {
        resetTranscript();
        SpeechRecognition.startListening();
    }
  }
  const stopMic = () => {
    if(listening){
      SpeechRecognition.stopListening();
    }
  }
  const handleFileChange = async (e) => {
	 const data = await toBase64(e.target.files[0])
    setFile(data);
  };
  const postPrompt = async () => {
    document.getElementById("input").value = "";
    document.getElementById("input").style.height = "20px";
    document.getElementById("input").style.height = `${document.getElementById("input").scrollHeight}px`;
    if(prompt){
      if(file){
        chat.push({
          role: "user",
          parts: [{ 
            inlineData: {
              data: file.split(",")[1], 
              mimeType: file.split(",")[0].split(";")[0].split(":")[1]
            }
          },
          { text: prompt }],
        });
        const data = { 
          inlineData: {
            data: file.split(",")[1], 
            mimeType: file.split(",")[0].split(";")[0].split(":")[1]
          }
        }
        await filePrompt(setLoading, prompt, data, chat, navigate, setError);
      } else {
        chat.push({
          role: "user",
          parts: [{ text: prompt }],
        });
        await textPrompt(setLoading, prompt, chat, navigate. setError);
      }
    }
    setFile('');
  } 
  const autoResize = (e) => {
    e.target.style.height = "20px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  useEffect(()=>{
    if(mic){
      startMic();
    } else {
      stopMic();
    }
  }, [mic])
  useEffect(()=>{
    if(mic){
      const input = document.getElementById("input");
      input.value = transcript;
      setPrompt(transcript);
      input.style.height = '60px';
      input.scrollTop = input.scrollHeight;
    }
  }, [transcript])
  useEffect(()=>{
    if(mic&&!listening){
      setMic(false);
    }
  }, [listening])
  return (
    <div className="bg-gray-100 focus:bg-gray-200 dark:focus:bg-[var(--accent-color)] rounded-full border-0 ring-1 ring-inset ring-transparent  focus:ring-inset focus:ring-indigo-600 focus:ring-3 focus-within:ring-inset focus-within:ring-[var(--secondary-color)] dark:bg-[var(--accent-color)] w-[90%] py-2 px-4 min-h-5 flex m-auto h-fit items-center">
       <div className={(mic ? "bg-[var(--secondary-color)] ": "bg-gray-300 dark:bg-[var(--accent-color)] ") +"p-3 rounded-full cursor-pointer flex items-center justify-center"} onClick={() =>  setMic(!mic)}>
           <FaMicrophone  className="w-4 h-4" />
       </div>
      <textarea
        rows="1"
        type="text"
        id = "input"
        className="resize-none bg-none bg-transparent outline-none w-full placeholder:font-semibold comic-neue-bold text-black dark:text-white ml-5 mr-4 h-5 max-h-20"
        onKeyPress={autoResize}
        onKeyUp={autoResize}
        onChange={(e) => setPrompt(e.target.value)}
        autoComplete="off"
        placeholder="Message Lumina"
        tabIndex={0}
      />

      <div className="flex items-center gap-4">
        <label
          htmlFor="custom-input"
          className={(file ? "bg-[var(--secondary-color)] ": "bg-gray-300 dark:bg-[var(--accent-color)] ") +"p-3 rounded-full outline-0 cursor-pointer"}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,audio/mp3,audio/mpeg,video/mp4,video/ogg,application/pdf"
            id="custom-input"
            onChange={async (e) => await handleFileChange(e)}
            hidden
          />
          <IoMdAttach className="scale-x-[-1] w-4 h-4" />
        </label>

        <button
          tabIndex={0}
          className="bg-[var(--secondary-color)] px-6 md:px-8 py-2 rounded-[2rem] outline-0"
          onClick={async () => await postPrompt()}
        >
          <IoMdSend className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
