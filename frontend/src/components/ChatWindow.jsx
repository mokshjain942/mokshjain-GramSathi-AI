import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, CornerDownLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import VoiceButton from './VoiceButton';
import { API_BASE_URL } from '../services/api';

export default function ChatWindow() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingText, setSpeakingText] = useState('');
  
  const chatEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: lang === 'hi' 
            ? 'नमस्ते! मैं आपका ग्रामसाथी एआई सहायक हूँ। मैं आपकी सहायता योजनाओं, स्वास्थ्य, शिक्षा और कृषि के बारे में कर सकता हूँ। मुझसे कुछ भी पूछें!' 
            : 'Namaste! I am your GramSathi AI assistant. I can guide you through government schemes, medical tips, school locations, or village trades. Ask me anything!'
        }
      ]);
    }
  }, [lang]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);
    setSpeakingText('');

    try {
      // Connect to FastAPI Backend chat endpoint
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language: lang })
      });

      if (!response.ok) throw new Error("API failed");
      const data = await response.json();
      
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply
      };
      setMessages((prev) => [...prev, botMsg]);
      
      // Feed response text to speech synthesis in VoiceButton
      setSpeakingText(data.reply);
    } catch (e) {
      console.error(e);
      const botErrorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: lang === 'hi' 
          ? 'माफ़ कीजिये, सर्वर से जुड़ने में समस्या आ रही है। कृपया पुनः प्रयास करें।' 
          : 'Sorry, I am facing network trouble connecting to my brain. Please try again.'
      };
      setMessages((prev) => [...prev, botErrorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = (speechText) => {
    if (speechText) {
      handleSend(speechText);
    }
  };

  const quickSuggestions = [
    t('suggestedQ1'),
    t('suggestedQ2'),
    t('suggestedQ3')
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-village-600 to-emerald-500 hover:from-village-700 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 relative group focus:outline-none focus:ring-4 focus:ring-village-500/50"
          aria-label="Open AI Assistant Chat"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-village-400 opacity-20 animate-ping" />
          <MessageSquare className="w-6 h-6 animate-float" />
          <span className="absolute -top-10 right-0 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-md">
            {t('aiChat')}
          </span>
        </button>
      )}

      {/* Chat Overlay Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] rounded-3xl border border-white/20 dark:border-white/5 glass-panel shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-village-600/10 to-emerald-500/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-village-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">
                  {t('appName')} {lang === 'hi' ? 'सहायक' : 'Bot'}
                </h3>
                <span className="text-[10px] font-bold text-village-600 dark:text-village-400 uppercase tracking-wider">
                  {lang === 'hi' ? 'लाइव सहायता' : 'Online Assistant'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setSpeakingText(''); // stop speaking
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm
                  ${msg.sender === 'user' ? 'bg-village-600' : 'bg-slate-700'}
                `}>
                  {msg.sender === 'user' ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
                </div>
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[13px] font-medium leading-relaxed shadow-sm
                  ${msg.sender === 'user'
                    ? 'bg-village-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                  }
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-white shrink-0 animate-pulse">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div className="bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700 px-3.5 py-2.5 rounded-2xl rounded-tl-none text-[13px] flex items-center space-x-1.5 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-village-600" />
                  <span>{t('processing')}</span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions Bubbles */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/50 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {lang === 'hi' ? 'सुझाए गए प्रश्न' : 'Try asking:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(suggestion)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-village-500/20 bg-village-500/5 dark:bg-village-500/10 text-village-700 dark:text-village-300 hover:bg-village-500/10 dark:hover:bg-village-500/20 text-left transition duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-village-950/20 flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-3.5 pr-10 py-2.5 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-village-500 dark:focus:ring-village-400 resize-none max-h-24"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || loading}
                className="absolute right-2 bottom-2 p-1.5 rounded-xl bg-village-600 hover:bg-village-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white transition focus:outline-none"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Embedded voice mic controller */}
            <VoiceButton 
              onTranscript={handleVoiceInput} 
              textToSpeak={speakingText}
            />
          </div>
        </div>
      )}
    </div>
  );
}
