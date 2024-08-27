import Recorder from './Recorder';
import { useState, useEffect } from 'react';

const Speech = ({setListening, setSpeaking, setProcessing}) => {
    const [prompt, setPrompt] = useState();
    useEffect(()=>{
        if(prompt){
            setProcessing(true);
            console.log(prompt);
        }
    },[prompt])
  return (
    <div className="flex justify-center items-center w-screen h-full mx-auto">
        <Recorder setListening={setListening} setPrompt={setPrompt}/>
    </div>
  )
}

export default Speech