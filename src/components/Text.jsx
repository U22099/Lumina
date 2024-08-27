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
            <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-[var(--secondary-color)] text-transparent text-3xl md:text-6xl animate-[pulse_1s_ease-in-out_infinite] comic-neue-bold bgRotate">Speaking...</motion.h1>
        )
    } else if(listening){
        return(
            <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-[var(--secondary-color)] text-transparent text-3xl md:text-6xl animate-[pulse_1s_ease-in-out_infinite] comic-neue-bold bgRotate">Listening...</motion.h1>
        )
    } else if(processing){
        return(
            <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-[var(--secondary-color)] text-transparent text-3xl md:text-6xl animate-[pulse_1s_ease-in-out_infinite] comic-neue-bold bgRotate">Processing...</motion.h1>
        )
    }
  return (
    <motion.div variants={container} className="flex flex-col justify-center items-start w-fit mt-3 ml-6">
        <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-[var(--secondary-color)] text-transparent text-3xl md:text-6xl comic-neue-bold bgRotate">Ask</motion.h1>
        <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-[var(--secondary-color)] text-transparent text-3xl md:text-6xl animate-[bounce_2s_ease-in-out_infinite] ml-8 comic-neue-bold bgRotate">Lumina</motion.h1>
        <motion.h1 variants={item} className="bg-clip-text bg-gradient-to-r from-violet-500 to-[var(--secondary-color)] text-transparent text-3xl md:text-6xl comic-neue-bold bgRotate">Anything</motion.h1>
    </motion.div>
  )
}

export default Text