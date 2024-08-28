import { useSpeech } from 'react-text-to-speech';
import {useEffect} from 'react';

const Speaker = ({setProcessing, setSpeaking, text, setStopSpeaking}) => {
    const {
        speechStatus,
        start,
        stop
    } = useSpeech({text});

    useEffect(()=>{
        if(speechStatus !== "started"){
            setProcessing(false);
            setSpeaking(true);
            start();
            setStopSpeaking(stop);
        }
    },[text]);
    return(
        <div>
            <iframe src="https://gifer.com/embed/Cad" width="100%" height="100%"></iframe>
        </div>
    )
}

export default Speaker