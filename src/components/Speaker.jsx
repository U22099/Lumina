import { useSpeech } from '../hooks/useSpeech';
import {useEffect} from 'react';

const Speaker = ({setProcessing, setSpeaking, text, setStopSpeaking}) => {
    const {
		Text,
        speechStatus,
        start,
        stop
    } = useSpeech({text});

    useEffect(()=>{
        if(speechStatus !== "started"){
            console.log(text);
            setProcessing(false);
            setSpeaking(true);
            start();
            setStopSpeaking(stop);
        }
    },[text]);
    useEffect(() => {
        if ((speechStatus === 'ended') || (speechStatus === 'stopped')){
            setSpeaking(false);
		} else if (speechStatus === 'error'){
            setTimeout(() => setSpeaking(false), 3000);
		}
    }, [speechStatus]);
    return(
        <div className="flex items-center justify-center overflow-hidden overflow-y-auto scrollbar bg-gray-100 shadow-md rounded-md w-fit max-w-[80vw] h-fit max-h-[50vh] md:max-w-[60vw] break-words whitespace-wrap">
			<Text />
        </div>
    )
}

export default Speaker