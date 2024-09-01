import { MdError } from 'react-icons/md'
import { motion } from 'framer-motion'

function ErrorDialog({setError, msg}) {
        return (
            <div className="fixed flex flex-col w-[100vw] h-[100vh] justify-center items-center align-center backdrop-blur-sm self-center dialog z-20">
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
                className="flex flex-col bg-gray-100 dark:bg-[var(--accent-color)] rounded-md shadow-md p-8  md:w-[40vw] w-[80vw] justify-center items-center gap-2">
                <div className="w-[100%] flex justify-center items-center">
                    <MdError className="fill-[var(--secondary-color)] text-bold text-[5em]" />
                </div>
                <h1 className="comic-neue-bold text-[2em] md:text-[2.5em] display flex w-[100%] justify-center items-center dark:text-white text-black">Gemini Server Error</h1>
                <div className=" w-[80%] text-center items-center text-[1.3em]">
                    <div className="comic-neue-regular dark:text-white text-black">{msg}<a href="mailto:nifemiolaniyi4@gmail.com" className="comic-neue-bold text-[var(--secondary-color)]"> Daniel </a></div>
                </div>
                <div className="flex w-[100%] mx-auto gap-[10px]">
                    <button className="w-[80%] bg-[var(--secondary-color)] rounded-md text-[2em] shadow-[2px_2px_5px_3px_rgba(0,0,0,0.5)]" onClick={() => setError(false)}>Ok</button>
                </div>

            </motion.div>
            </div>
        )
}

export default ErrorDialog
