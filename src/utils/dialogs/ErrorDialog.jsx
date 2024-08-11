import { MdError } from 'react-icons/md'
import { motion } from 'framer-motion'

function ErrorDialog({setErr, msg}) {
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
            className="flex flex-col bg-[var(--primary-color)] rounded-xl p-[20px] dialog md:w-[40vw] w-[80vw] justify-center items-center gap-[10px]">
            <div className="w-[100%] flex justify-center items-center">
                <MdError className="text-red-600 text-bold text-[5em]" />
            </div>
            <h1 className="text-[2.5em] display flex w-[100%] justify-center items-center">Error</h1>
            <div className=" w-[80%] text-center items-center text-[1.3em]">
                <p>{msg}</p>
            </div>
            <button className="w-[80%] bg-red-600 rounded-md text-[2em] shadow-[2px_2px_5px_3px_rgba(0,0,0,0.5)]" onClick={() => {
                setErr({ occured: false, msg: "" })
            }}>OK</button>
        </motion.div>
    )
}

export default ErrorDialog