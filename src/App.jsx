import { useState } from 'react';
import Header from "./components/Header";
import Message from "./components/Message";
import InputBox from "./components/InputBox";

const App = () => {
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="h-screen md:h-dvh w-full dark:bg-[var(--primary-color)] bg-white mx-auto relative overflow-hidden grid grid-cols-[1fr_5fr_1.5fr]">
      <Header loading={loading} username={userName} userImage={userImage} setLoading={setLoading} setUserName={setUserName} setUserImage={setUserImage} />
      <Message userImage={userImage}/>
      <InputBox />
    </div>
  );
};

export default App;
