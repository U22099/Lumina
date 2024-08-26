import { motion } from 'framer-motion'

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
            className="fixed flex flex-col w-[100vw] h-[100vh] justify-center items-center align-center backdrop-blur-sm self-center dialog">
            <div id="load" className="w-14 h-14 flex items-center">
            <div></div>
            <div></div>
            <div></div> 
          </div>
        </motion.div>
    )
}

export default Loader