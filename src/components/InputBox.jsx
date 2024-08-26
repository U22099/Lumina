import { IoMdSend, IoMdAttach } from "react-icons/io";
import {useState} from 'react';
import textPrompt from '../utils/textPrompt';
import imagePrompt from '../utils/imagePrompt';
import {useNavigate} from 'react-router-dom';
import useChat from '../store';
import toBase64 from '../utils/base64'

const InputBox = ({loading, setLoading}) => {
  const navigate = useNavigate();
  const chat = useChat((state) => state.chat);
  const [prompt, setPrompt] = useState();
  const [file, setFile] = useState();
  const handleFileChange = async (e) => {
	 const data = await toBase64(e.target.files[0])
    setFile(data);
  };
  const postPrompt = async () => {
	 document.getElementById("input").value = "";
    if(prompt){
      if(file){
        await imagePrompt(setLoading, prompt, file, chat, navigate);
      } else {
        await textPrompt(setLoading, prompt, chat, navigate);
      }
    }
    setFile('');
  }
  const autoResize = (e) => {
	  e.target.style.height = "20px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  return (
    <div className="bg-gray-100 rounded-full border-0 ring-1 ring-inset ring-transparent  focus:ring-inset focus:ring-indigo-600 focus:ring-3 focus-within:ring-inset focus-within:ring-[var(--secondary-color)] dark:bg-[var(--accent-color)] w-[90%] py-2 px-4 min-h-5 flex m-auto h-fit items-center">
      <textarea
        rows="1"
        type="text"
			id = "input"
        className="resize-none bg-none bg-transparent outline-none w-full placeholder:font-semibold comic-neue-bold text-black dark:text-white mx-7 mr-4 h-5 max-h-20"
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
          className={(file ? "bg-[var(--secondary-color)] ": "bg-[var(--accent-color-2)] ") +"p-3 rounded-full outline-0 cursor-pointer"}
        >
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
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
