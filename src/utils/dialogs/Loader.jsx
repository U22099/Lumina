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
            className="flex fixed w-[100vw] h-[100vh] justify-center items-center blur-md">
            <div id="load" className="w-14 h-14 flex mt-4 items-center self-center">
            <div></div>
            <div></div>
            <div></div> 
          </div>
        </motion.div>
    )
}

export default Loader