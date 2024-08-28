import { useEffect, useState } from "react";

const Speaker = ({ setSpeaking, text, setStart }) => {
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
    <div className="flex flex-col items-center justify-center max-w-[80vw] md:max-w-[60vw] mx-auto">
        <div className="flex items-center justify-center overflow-hidden overflow-y-scroll scrollbar bg-gray-100 shadow-md rounded-md w-fit max-w-[80vw] h-fit max-h-[50vh] md:max-w-[60vw] break-words whitespace-wrap p-3 mx-auto">
        <p className="comic-neue-bold text-black dark:text-white">
            {returnedText}
        </p>
        </div>
        <p className="comic-neue-bold text-black dark:text-white w-[80vw] md:w-[60vw] h-fit py-3 bg-[var(--secondary-color)] rounded-md shadow-md flex justify-center items-center" onClick={() => {speech.speak(utterance)}}>Replay</p>
        <p className="comic-neue-bold text-black dark:text-white w-[80vw] md:w-[60vw] h-fit py-3 bg-[var(--secondary-color)] rounded-md shadow-md flex justify-center items-center" onClick={() => {speech.cancel(); setSpeaking(false); setStart(false)}}>Skip</p>
    </div>
  );
};

function getFemaleVoice(voices) {
  const femaleVoices = voices.filter(
    voice => voice.lang === "en-Us" && voice.gender === "female"
  );
  return femaleVoices[0] || voices[0];
}
export default Speaker;
