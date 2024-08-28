import {useState, useEffect} from 'react';

const useSpeech = ({text}) => {
    const [utterance, setUtterance] = useState();
    const [speechStatus, setSpeechStatus] = useState("");
	if(!('speechSynthesis' in window)){
		return { start: ()=>{}, stop: ()=>{}, speechStatus: 'null', text: 'Web Speech Api not supported by browser'}
	}
	const Speech = window.speechSynthesis || speechSynthesis;
    useEffect(() => {
        if(text){
            const speech = new SpeechSynthesisUtterance(text);

            speech.onend = () => {
                setSpeechStatus("ended");
            }
            speech.onerror = () => {
                setSpeechStatus("error");
            }
				const voices = Speech.getVoices();
				
				if(voices.length > 0){
            speech.voice = getFemaleVoice(voices);
}
            setUtterance(speech);
        }
    }, [text])

    const start = () => {
        if(utterance){
            setSpeechStatus("speaking");
            Speech.speak(utterance);
        }
    };
    const stop = () => {
        if(utterance){
            setSpeechStatus("stopped");
            Speech.cancel();
        }
    };

    function getFemaleVoice(voices){

    const femaleVoices = voices.filter(voice => voice.lang === 'en-Us' && voice.gender === 'female');

    return femaleVoices[0] || voices[0];
}
    return { start, stop, speechStatus, text}
}

export default useSpeech