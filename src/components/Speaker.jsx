import useSpeech  from '../hooks/useSpeech';
import {useEffect} from 'react';

const Speaker = ({setProcessing, setSpeaking, text, setStopSpeaking, setStart}) => {
    const {
		  text: returnedText,
        speechStatus,
        start,
        stop,
		  utterance
    } = useSpeech({text});

    useEffect(()=>{
        if(speechStatus !== "started"&&utterance.text !== ''){
            console.log(text);
            setProcessing(false);
            setSpeaking(true);
            start();
            setStopSpeaking(stop);
        }
    },[utterance.text]);
    useEffect(() => {
        if ((speechStatus === 'ended') || (speechStatus === 'stopped')){
            setSpeaking(false);
            setStart(false);
		} else if (speechStatus === 'error'){
            setTimeout(() => {
setSpeaking(false);
setStart(false)
}, 3000);
		}
    }, [speechStatus]);
    return(
        <div className="flex items-center justify-center overflow-hidden overflow-y-auto scrollbar bg-gray-100 shadow-md rounded-md w-fit max-w-[80vw] h-fit max-h-[50vh] md:max-w-[60vw] break-words whitespace-wrap p-3">
			<p className="comic-neue-bold text-black dark:text-white break-words whitespace-wrap">
                {returnedText}
            </p>
        </div>
    )
}

export default Speaker