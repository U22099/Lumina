import { motion } from 'framer-motion'

const Text = ({ speaking, listening, processing }) => {
    const container = {
        hidden: {opacity: 0.2},
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }
    const item = {
        hidden: {opacity: 0.2},
        visible: {opacity: 1}
    }
    if(speaking){
        return(
            <motion.div variants={container} className="flex flex-col justify-center items-start w-screen h-full mt-8 p-8">
                <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent text-4xl md:text-7xl animate-[pulse_1s_ease-in-out_infinite] comic-neue-bold bgRotate">Speaking...</motion.h1>
            </motion.div>
        )
    } else if(listening){
        return(
            <motion.div variants={container} className="flex flex-col justify-center items-start w-screen h-full mt-8 p-8">
                <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent text-4xl md:text-7xl animate-[pulse_1s_ease-in-out_infinite] comic-neue-bold bgRotate">Listening...</motion.h1>
            </motion.div>
        )
    } else if(processing){
        return(
            <motion.div variants={container} className="flex flex-col justify-center items-start w-screen h-full mt-8 p-8">
                <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent text-4xl md:text-7xl animate-[pulse_1s_ease-in-out_infinite] comic-neue-bold bgRotate">Processing...</motion.h1>
            </motion.div>
        )
    }
  return (
    <motion.div variants={container} className="flex flex-col justify-center items-start w-screen h-full mt-8 p-8">
        <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent text-4xl md:text-7xl comic-neue-bold bgRotate">Ask</motion.h1>
        <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent text-6xl md:text-8xl animate-[bounce_2s_ease-in-out_infinite] ml-8 comic-neue-bold bgRotate">Lumina</motion.h1>
        <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent text-4xl md:text-7xl comic-neue-bold bgRotate">Anything</motion.h1>
    </motion.div>
  )
}

export default Text