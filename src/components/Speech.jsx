import Recorder from './Recorder';
import Speaker from './Speaker';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import voicePrompt from '../utils/voicePrompt';
import {motion} from 'framer-motion';

const Speech = ({speaking, setListening, setSpeaking, setProcessing}) => {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState();
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);
    useEffect(()=>{
        if(prompt){
            setProcessing(true);
            console.log(prompt);
            voicePrompt(setLoading, prompt, navigate, setResult);
        }
    },[prompt])
	useEffect(() => {
		if(result){
            setProcessing(false);
            setSpeaking(true);
		    setStart(true);
		}
	}, [result])
  return (
    <div className="flex justify-center items-center w-screen h-full mx-auto">
        {!speaking&&!loading ?  <Recorder setListening={setListening} setPrompt={setPrompt}/> : ''}
        {loading ? <Loader /> : ''}
        {start ? <Speaker text={result} setStart={setStart} setSpeaking={setSpeaking}/> : ''}
    </div>
  )
}
function Loader() {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.5,
                }
            }}
            className="flex flex-col justify-center items-center align-center self-center mx-auto">
            <div id="load" className="w-14 h-14 flex items-center">
            <div></div>
            <div></div>
            <div></div> 
          </div>
        </motion.div>
    )
}
export default Speech