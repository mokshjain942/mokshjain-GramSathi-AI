import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const useVoice = () => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      // Select speech recognition language
      rec.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      rec.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [lang]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        // Cancel any speaking speech synthesis
        if (synthRef.current) {
          synthRef.current.cancel();
        }
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text) => {
    if (!synthRef.current) return;
    
    // Cancel prior speech first
    synthRef.current.cancel();
    
    if (!text) return;

    // Clean markdown before speaking
    const cleanText = text
      .replace(/[\*\#\_]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Set speech language
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    
    // Optional: try to find an appropriate voice
    const voices = synthRef.current.getVoices();
    const targetVoice = voices.find(voice => 
      voice.lang.includes(lang === 'hi' ? 'hi' : 'en')
    );
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  return {
    supported,
    isListening,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
};
