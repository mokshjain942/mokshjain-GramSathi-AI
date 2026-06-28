import React, { useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';
import { useLanguage } from '../contexts/LanguageContext';

export default function VoiceButton({ onTranscript, textToSpeak }) {
  const { t } = useLanguage();
  const { 
    supported, 
    isListening, 
    transcript, 
    startListening, 
    stopListening,
    speak,
    stopSpeaking 
  } = useVoice();

  // Send the transcript up to parent if updated
  useEffect(() => {
    if (transcript && onTranscript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

  // Read response when parent updates textToSpeak
  useEffect(() => {
    if (textToSpeak) {
      speak(textToSpeak);
    }
    return () => {
      stopSpeaking();
    };
  }, [textToSpeak]);

  if (!supported) return null;

  return (
    <div className="flex flex-col items-center space-y-2 select-none">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`
          relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-village-500/50
          ${isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-gradient-to-r from-village-600 to-emerald-500 text-white hover:scale-105 hover:shadow-xl'
          }
        `}
        title={isListening ? t('listening') : t('voiceBtnPrompt')}
        aria-label={isListening ? t('listening') : t('voiceBtnPrompt')}
      >
        {isListening ? (
          <>
            {/* Visual audio wave ripples */}
            <span className="absolute inline-flex h-full w-full rounded-full rounded-full bg-red-400 opacity-75 animate-ping -z-10" />
            <MicOff className="w-6 h-6 animate-bounce" />
          </>
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>
      <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
        {isListening ? t('listening') : t('voiceBtnPrompt')}
      </span>
    </div>
  );
}
