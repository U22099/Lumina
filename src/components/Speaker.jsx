import { useSpeech } from 'react-text-to-speech';
import {useEffect} from 'react';

const Speaker = ({setProcessing, setSpeaking, text, setStopSpeaking}) => {
    const {
		Text,
        speechStatus,
        start,
        stop
    } = useSpeech({text, preserveUtteranceQueue: false});

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
		}
    }, [speechStatus])
    return(
        <div>
			<Text />
            {/*<iframe src="https://gifer.com/embed/Cad" width="100%" height="100%"></iframe>*/}
        </div>
    )
}

export default Speaker