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
        className="flex flex-col justify-between gap-10 select-none"
    >
        <div onTouchStart={startRecording} onTouchEnd={stopRecording} className="flex flex-col items-center justify-center mx-auto z-10">{!listening ? <FaMicrophoneLines className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-6 md:p-10 text-[1.7em] md:text-[3em] mic shadow-md "/> : <FaMicrophoneLinesSlash className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-4 md:p-8 text-[1.7em] md:text-[3em] mic shadow-md"/>}
        <p className="text-black dark:text-white comic-neue-bold mt-3 select-none">Hold to record</p>
        </div>
        <motion.div 
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{type: 'spring'}}
            key={anim}
            className={(anim ? "block ": "hidden ") +"bg-[var(--secondary-color)] rounded-full w-[70vw] h-[70vw] md:w-[60vw] md:h-[60vw] fixed mx-auto self-center transition-all"}
        >
            <div className="bg-[var(--secondary-color)] rounded-full md:w-[80vw] md:h-[80vw] w-[68vw] h-[68vw] animate-pulsar fixed mx-auto self-center transition-all">
                <div className="bg-[var(--secondary-color)] rounded-full md:w-[90vw] md:h-[90vw] w-[75vw] h-[75vw] animate-pulsar transition-all fixed mx-auto self-center fixed mx-auto self-center transition-all"></div>
            </div>
        </motion.div>
    </motion.div>
  )
}

export default Mic