import { GiConfirmed } from 'react-icons/gi'
import { motion } from 'framer-motion'
import { useState } from 'react'

function ConfirmDialog(props) {
    const [show, setShow] = useState(true)
    function ans(x) {
        setShow(false);
        props.var2(false);
        x ? props.callback({ask: true, result: true}) : "";
    }
    if (show) {
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
                className="flex flex-col bg-black rounded-xl p-[20px] dialog md:w-[40vw] w-[80vw] justify-center items-center gap-[10px]">
                <div className="w-[100%] flex justify-center items-center">
                    <GiConfirmed className="text-red-600 text-bold text-[5em]" />
                </div>
                <h1 className="text-[2.5em] display flex w-[100%] justify-center items-center">Confirm</h1>
                <div className=" w-[80%] text-center items-center text-[1.3em]">
                    <p>{props.msg}</p>
                </div>
                <div className="flex w-[100%] mx-auto gap-[10px]">
                    <button className="w-[50%] bg-red-600 rounded-md text-[2em] shadow-[2px_2px_5px_3px_rgba(0,0,0,0.5)]" onClick={() => ans(true)}>Delete</button>
                    <button className="w-[50%] bg-green-600 rounded-md text-[2em] shadow-[2px_2px_5px_3px_rgba(0,0,0,0.5)]" onClick={() => ans(false)}>Cancel</button>
                </div>

            </motion.div>
        )
    } else { return '' }
}

export default ConfirmDialog
