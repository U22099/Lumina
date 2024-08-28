import {useState, useEffect} from 'react';

const useSpeech = ({text}) => {
    const [utterance, setUtterance] = useState();
    const [speechStatus, setSpeechStatus] = useState("");
	if(!('speechSynthesis' in window)){
		return { start: ()=>{}, stop: ()=>{}, speechStatus: 'null', text: 'Web Speech Api not supported by browser'}
	}
	const speech = window.speechSynthesis || speechSynthesis;
    useEffect(() => {
        if(text){
            const uttr = new SpeechSynthesisUtterance();

            uttr.onend = () => {
                setSpeechStatus("ended");
            }
            uttr.onerror = () => {
                setSpeechStatus("error");
            }
				const voices = speech.getVoices();
				
				if(voices.length > 0){
            uttr.voice = getFemaleVoice(voices);
}
uttr.text = text;
            setUtterance(uttr);
        }
    }, [text])

    const start = () => {
        if(utterance){
            setSpeechStatus("speaking");
            speech.speak(utterance);
        }
    };
    const stop = () => {
        if(utterance){
            setSpeechStatus("stopped");
            speech.cancel();
        }
    };

    function getFemaleVoice(voices){

    const femaleVoices = voices.filter(voice => voice.lang === 'en-Us' && voice.gender === 'female');

    return femaleVoices[0] || voices[0];
}
    return { start, stop, speechStatus, text}
}

export default useSpeech