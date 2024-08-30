import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophoneLines, FaMicrophoneLinesSlash } from 'react-icons/fa6';

const Mic = ({start, stop, reset, listening, transcript, setListening, setPrompt, listen}) => {
    const [anim, setAnim] = useState(false);
    const startRecording = async () => {
        setAnim(true);
        await reset();
        await start();
        setListening(true);
    }
    const stopRecording = async () => {
        setAnim(false);
        setPrompt(transcript);
        setListening(false);
        await stop();
    }
    useEffect(()=> {
        if(!listening&&anim){
            stopRecording();
        }
    }, [listening])
    useEffect(()=> {
        if(listen&&!listening){
            startRecording();
        }
    }, [listen])
    navigator.mediaSession.addEventListener('mediacontrols', (event) => {
  if (event.type === 'play') {
    startRecording()
  } else if (event.type === 'pause') {
    stopRecording()
  }
});
  return (
    <motion.div
        initial={{opacity: 0.5}}
        animate={{opacity: 1}}
        className="flex flex-col justify-between gap-10 select-none"
    >
        <div className="flex flex-col items-center justify-center mx-auto z-10">{!listening ? <FaMicrophoneLines className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-6 md:p-10 text-[1.7em] md:text-[3em] mic shadow-md " onClick={startRecording}/> : <FaMicrophoneLinesSlash className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-4 md:p-8 text-[1.7em] md:text-[3em] mic shadow-md" onClick={stopRecording}/>}
        <p className="text-black dark:text-white comic-neue-bold mt-3 select-none">{!listening ? "Tap to record" : "Tap to stop record"}</p>
        </div>
        <motion.div 
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{type: 'spring'}}
            key={anim}
            className={(anim ? "flex ": "hidden ") +"bg-[var(--secondary-color)] rounded-full w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] fixed mx-auto self-center transition-all animate-pulsar"}
        >
        </motion.div>
    </motion.div>
  )
}

export default Mic