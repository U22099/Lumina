import {useState, useEffect} from 'react';
const useSpeech = ({text}) => {
    const [utterance, setUtterance] = useState();
    const [speechStatus, setSpeechStatus] = useState("stopped");
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
            setUtterance("speaking");
            speech.speak(utterance);
        }
    };
    const stop = () => {
        if(utterance){
            setUtterance("stopped");
            speech.cancel();
        }
    };
    function Text(){
        return(
            <div>
                {text}
            </div>
        )
    }
    return { start, stop, speechStatus, Text}
}

function getFemaleVoice(){
    const voices = window.speechSynthesis.getVoices();

    const femaleVoices = voices.filter(voice => voice.lang === 'en-Us' && voice.gender === 'female');

    return femaleVoices[0] || voices[0];
}

export default useSpeech