import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophoneLines, FaMicrophoneLinesSlash } from 'react-icons/fa6';

const Mic = ({start, stop, reset, listening, transcript, setListening, setPrompt}) => {
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
        await stop();
        setListening(false);
    }
  return (
    <motion.div
        initial={{opacity: 0.5}}
        animate={{opacity: 1}}
        className="flex flex-col justify-between gap-10"
    >
        <div onMouseDown={startRecording} onTouchStart={startRecording} onMouseUp={stopRecording} onTouchEnd={stopRecording} className="flex flex-col">{!listening ? <FaMicrophoneLines className="w-12 h-12 md:w-16 md:h-16 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-4 md:p-8 mic"/> : <FaMicrophoneLinesSlash className="w-12 h-12 md:w-16 md:h-16 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-4 md:p-8 mic"/>}
        <p className="text-black dark:text-white comic-neue-bold">Hold to record</p>
        </div>
        <motion.div 
            initial={{scale: 0}}
            animate={{scale: 1}}
            key={anim}
            className={(anim ? "block ": "hidden ") +"bg-[var(--secondary-color)] rounded-full w-60 h-60"}
        >
            <div className="bg-[var(--secondary-color)] rounded-full w-64 h-64 animate-pulsar">
                <div className="bg-[var(--secondary-color)] rounded-full w-72 h-72 animate-[pulsar_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Mic