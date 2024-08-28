import Recorder from './Recorder';
import Speaker from './Speaker';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import voicePrompt from '../utils/voicePrompt';

const Speech = ({speaking, setListening, setSpeaking, setProcessing}) => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState();
    const [result, setResult] = useState();
    const [loading, setLoading] = useState();
    const [stopSpeaking, setStopSpeaking] = useState();
    useEffect(()=>{
        if(prompt){
            setProcessing(true);
            const text = await voicePrompt(setLoading, prompt, navigate);
            setResult(text);
        }
    },[prompt])
  return (
    <div className="flex justify-center items-center w-screen h-full mx-auto">
        {!speaking ? <Recorder setListening={setListening} setPrompt={setPrompt} stopSpeaking={stopSpeaking}/> : ''}
        {loading ? <Loader /> : <Speaker text={result} setSpeaking={setSpeaking} setProcessing={setProcessing} setStopSpeaking={setStopSpeaking}/>}
    </div>
  )
}

export default Speech