import { MdErrof } from 'react-icons/md'
import { motion } from 'framer-motion'

function ErrorDialog({setShow, msg}) {
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
                <h1 className="text-[2.5em] display flex w-[100%] justify-center items-center dark:text-white text-black">Confirm</h1>
                <div className=" w-[80%] text-center items-center text-[1.3em]">
                    <p className="dark:text-white text-black">{msg}</p>
                </div>
                <div className="flex w-[100%] mx-auto gap-[10px]">
                    <button className="w-[80%] bg-[var(--secondary-color)] rounded-md text-[2em] shadow-[2px_2px_5px_3px_rgba(0,0,0,0.5)]" onClick={() => setShow(false)}>Ok</button>
                </div>

            </motion.div>
            </div>
        )
}

export default ErrorDialog
