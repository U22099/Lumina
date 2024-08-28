import Mic from './Mic';
import React from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Recorder = ({speaking, setListening, setPrompt, stopSpeaking}) => {
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
        <Mic start={SpeechRecognition.startListening} stop={SpeechRecognition.stopListening} reset={resetTranscript} transcript={transcript} listening={listening} setListening={setListening} setPrompt={setPrompt} stopSpeaking={stopSpeaking} speaking={speaking}/>
    </div>
  )
}

export default Recorder