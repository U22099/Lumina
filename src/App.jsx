import { useState } from 'react';
import Text from "./components/Text";
import Speech from "./components/Speech";
import Header from "./components/Header";
import Message from "./components/Message";
import InputBox from "./components/InputBox";

const App = () => {
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  return (
    <div className={(voiceInput ? "grid-rows-[2fr_8fr_3fr] " : "grid-rows-[1fr_10fr_1.5fr] ") +"h-screen md:h-dvh w-screen dark:bg-[var(--primary-color)] bg-white mx-auto relative overflow-hidden grid"}>
      <Header userName={userName} userImage={userImage} setUserName={setUserName} setUserImage={setUserImage} setVoiceInput={setVoiceInput} voiceInput={voiceInput}/>
      {voiceInput ? <Text speaking={speaking} listening={listening} processing={processing}/> :<Message userImage={userImage} loading={loading}/>}
      {voiceInput ? <Speech setListening={setListening} setSpeaking={setSpeaking} setProcessing={setProcessing}/> :<InputBox loading={loading} setLoading={setLoading}/>}
    </div>
  );
};

export default App;
