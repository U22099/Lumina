import Recorder from './Recorder';
import { useState } from 'react';

const Speech = ({setListening, setSpeaking, setProcessing}) => {
    const [prompt, setPrompt] = useState();
    useEffect(()=>{
        setProcessing(true);
    },[prompt])
  return (
    <div>
        <Recorder setListening={setListening} setPrompt={setPrompt}/>
    </div>
  )
}

export default Speech