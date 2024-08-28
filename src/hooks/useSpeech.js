import {useState, useEffect} from 'react';

const useSpeech = ({text}) => {
    const [utterance, setUtterance] = useState(new SpeechSynthesisUtterance());
    const [speechStatus, setSpeechStatus] = useState("");
	if(!('speechSynthesis' in window)){
		return { start: ()=>{}, stop: ()=>{}, speechStatus: 'null', text: 'Web Speech Api not supported by browser'}
	}
	const speech = window.speechSynthesis || speechSynthesis;
    useEffect(() => {
        if(text){
utterance.text = "Testing Api to check if its working";
            utterance.onend = () => {
                setSpeechStatus("ended");
            }
  utterance.onerror = () => {
                setSpeechStatus("error");
        }
				const voices = speech.getVoices();
				
				if(voices.length > 0){
            utterance.voice = getFemaleVoice(voices);
}
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
    return { start, stop, speechStatus, text, utterance}
}

export default useSpeech