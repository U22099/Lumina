import {useState, useEffect} from 'react';

const useSpeech = ({text}) => {
    const [utterance, setUtterance] = useState();
    const [speechStatus, setSpeechStatus] = useState("");
	if(!('speechSynthesis' in window)){
		return { start: ()=>{}, stop: ()=>{}, speechStatus: 'null', text: 'Web Speech Api not supported by browser'}
	}
    useEffect(() => {
        if(text){
            const speech = new SpeechSynthesisUtterance(text);

            speech.onend = () => {
                setSpeechStatus("ended");
            }
            speech.onerror = () => {
                setSpeechStatus("error");
            }
            speech.voice = getFemaleVoice();
            setUtterance(speech);
        }
    }, [text])

    const speech = window.speechSynthesis;
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

    function getFemaleVoice(){
    const voices = window.speechSynthesis.getVoices();

    const femaleVoices = voices.filter(voice => voice.lang === 'en-Us' && voice.gender === 'female');

    return femaleVoices[0] || voices[0];
}
    return { start, stop, speechStatus, text}
}

export default useSpeech