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
        <div onMouseDown={startRecording} onTouchStart={startRecording} onMouseUp={stopRecording} onTouchEnd={stopRecording} className="flex flex-col items-center justify-center  mx-auto shadow-md z-10">{!listening ? <FaMicrophoneLines className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-6 md:p-10 text-[1.5em] md:text-[2em] mic"/> : <FaMicrophoneLinesSlash className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-4 md:p-8 text-[1.5em] md:text-[2em] mic"/>}
        <p className="text-black dark:text-white comic-neue-bold mt-3">Hold to record</p>
        </div>
        <motion.div 
            initial={{scale: 0}}
            animate={{scale: 1}}
            key={anim}
            className={(anim ? "block ": "hidden ") +"bg-[var(--secondary-color)] rounded-full w-[60vw] h-[60vw] fixed mx-auto self-center"}
        >
            <div className="bg-[var(--secondary-color)] rounded-full w-[68vw] h-[68vw] animate-pulsar">
                <div className="bg-[var(--secondary-color)] rounded-full w-[75vw] h-[75vw] animate-pulsar"></div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Mic