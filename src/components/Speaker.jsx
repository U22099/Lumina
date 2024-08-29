import { useEffect, useState } from "react";

const Speaker = ({ initSpeech, setInitSpeech, setSpeaking, text, setStart , setListening}) => {
  const [returnedText, setReturnedText] = useState(text);
  if (!("speechSynthesis" in window)) {
    setReturnedText("Web Speech Api not supported by browser");
    setTimeout(() => {
      setSpeaking(false);
      setStart(false);
    }, 3000);
  }
  const speech = window.speechSynthesis || speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  useEffect(() => {
    console.log(text);
    utterance.text = text;
    const voices = speech.getVoices();
    if (voices.length > 0) {
      const voice = getFemaleVoice(voices);
      if(voice){
        utterance.voice = voice;
      }
    }
    utterance.onend = () => {
      setSpeaking(false);
      setStart(false);
      setListening(true);
    };
    utterance.onerror = (error) => {
        console.log(error)
        setReturnedText("An error occured");
        setTimeout(() => {
          setSpeaking(false);
          setStart(false);
        }, 2000);
    };
    speech.speak(utterance);
  }, [text]);
  return (
    <div className="flex flex-col items-start justify-start max-w-[80vw] md:max-w-[60vw] mx-auto gap-2 overflow-hidden overflow-y-scroll scrollbar">
        <div className="flex items-start justify-start overflow-hidden overflow-y-scroll scrollbar bg-gray-100 dark:bg-[var(--accent-color)] shadow-md rounded-md w-fit max-w-[80vw] h-fit max-h-[50vh] md:max-w-[60vw] break-words whitespace-wrap p-3 mx-auto mt-8">
        <p className="comic-neue-bold text-black dark:text-white">
            {returnedText}
        </p>
        </div>
        {!initSpeech ? <p className="comic-neue-bold text-black dark:text-white w-[80vw] md:w-[60vw] h-fit py-3 bg-[var(--secondary-color)] rounded-md shadow-md flex justify-center items-center mb-4 transition-all duration-500" onClick={() => {speech.speak(utterance); setInitSpeech(true)}}>Init Speech</p> : ''}
        <p className="comic-neue-bold text-black dark:text-white w-[80vw] md:w-[60vw] h-fit py-3 bg-[var(--secondary-color)] rounded-md shadow-md flex justify-center items-center" onClick={() => {speech.cancel(); setSpeaking(false); setStart(false); setListening(true);}}>Skip</p>
    </div>
  );
};

function getFemaleVoice(voices) {
  const preferedVoice = voices.filter(
    voice => (voice.gender === "female"&&voice.lang === "en-GB") || voice.lang === "en-GB"
  );
  return preferedVoice[0];
}
export default Speaker;
