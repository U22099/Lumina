import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from './utils/localStorage.js';
import Text from "./components/Text";
import Speech from "./components/Speech";
import Header from "./components/Header";
import Message from "./components/Message";
import InputBox from "./components/InputBox";
import ErrorDialog from './utils/dialogs/ErrorDialog';
import {useError} from './store.js';

const App = () => {
  const navigate = useNavigate();
  const {error, setError} = useError();
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [initSpeech, setInitSpeech] = useState(false);
  useEffect(() => {
    if(!storage.getValue("logged")){
      navigate("/", { replace: true });
    }
  }, [])
  return (
    <div className={(voiceInput ? "grid-rows-[2fr_8fr_3fr] " : "grid-rows-[1fr_10fr_1.5fr] ") +"h-screen md:h-dvh w-screen dark:bg-[var(--primary-color)] bg-white mx-auto relative overflow-hidden grid"}>
      <Header userName={userName} userImage={userImage} setUserName={setUserName} setUserImage={setUserImage} setVoiceInput={setVoiceInput} voiceInput={voiceInput}/>
      {voiceInput ? <Text speaking={speaking} listening={listening} processing={processing}/> :<Message userImage={userImage} loading={loading}/>}
      {voiceInput ? <Speech listen={listening} setListening={setListening} setSpeaking={setSpeaking} setProcessing={setProcessing} speaking={speaking} initSpeech={initSpeech} setInitSpeech={setInitSpeech}/> :<InputBox loading={loading} setLoading={setLoading}/>}
      
      {error ? <ErrorDialog setError={setError} msg="Please refresh the page and try again, if problem persists contact the developer at: "/> : ""}
    </div>
  );
};

export default App;
