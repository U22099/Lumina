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
        if (speechStatus === 'ended'){
            setSpeaking(false);
            stop();
		} else if (speechStatus === 'stopped'){
            setSpeaking(false);
		} else if (speechStatus === 'error'){
            setTimeout(() => setSpeaking(false), 3000);
		}
    }, [speechStatus]);
    return(
        <div>
			<Text />
        </div>
    )
}

export default Speaker