import { motion } from 'framer-motion';
import { FaMicrophoneLines } from 'react-icons/fa6';

const Mic = ({}) => {
  return (
    <motion.div
        initial={{opacity: 0.5}}
        animate={{opacity: 1}}
        className=""
    >
        <FaMicrophoneLines className="w-12 h-12 md:w-16 md:h-16 fill-black dark:fill-white cursor-pointer bg-[var(--secondary-color)] rounded-full p-4 md:p-8 mic"/>
        <div className="">

        </div>
    </motion.div>
  )
}

export default Mic