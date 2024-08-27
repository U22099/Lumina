import Mic from './Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Recorder = ({setListening, setPrompt}) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    if(!browserSupportsSpeechRecognition){
        return(
            <div className="bg-clip-text bg-gradient-to-r from-violet-500 to-[var(--secondary-color)] text-transparent comic-neue-bold"> Speech Recognition Not Supported </div>
        )
    }
  return (
    <div>
        <Mic start={SpeechRecognition.startListening} stop={SpeechRecognition.stopListening} reset={resetTranscript} listening={listening} setListening={setListening} setPrompt={setPrompt}/>
    </div>
  )
}

export default Recorder