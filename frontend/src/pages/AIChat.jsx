import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Bot, User, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import VoiceButton from '../components/VoiceButton';
import { API_BASE_URL } from '../services/api';

export default function AIChat() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingText, setSpeakingText] = useState('');
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Initial welcome details
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: lang === 'hi' 
          ? 'नमस्ते! मैं ग्रामसाथी एआई हूँ। आप अपनी कृषि पद्धतियों, स्वास्थ्य सुझावों, बच्चों की शिक्षा या सरकारी योजनाओं के बारे में मुझसे प्रश्न पूछ सकते हैं। आप हिंदी और अंग्रेजी दोनों में प्रश्न पूछ सकते हैं!' 
          : 'Namaste! I am GramSathi AI. You can consult me regarding crop issues, nearby doctors, school admission guidelines, or central/state government scheme eligibility.'
      }
    ]);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    const query = text || inputValue;
    if (!query.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);
    setSpeakingText('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language: lang })
      });

      if (!response.ok) throw new Error("API Connection Failed");
      const data = await response.json();
      
      const botMsg = { id: (Date.now() + 1).toString(), sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
      setSpeakingText(data.reply);
    } catch (e) {
      console.error(e);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: lang === 'hi'
          ? 'माफ़ कीजिये, अभी संपर्क स्थापित नहीं हो पा रहा है। कृपया पुनः प्रयास करें।'
          : 'Failed to access AI server. Please verify you have run the backend server.'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: lang === 'hi' 
          ? 'वार्तालाप साफ़ कर दिया गया है। नया प्रश्न पूछें!' 
          : 'Conversation cleared. Ask a new question!'
      }
    ]);
    setSpeakingText('');
  };

  const suggestions = [
    t('suggestedQ1'),
    t('suggestedQ2'),
    t('suggestedQ3')
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col rounded-3xl border border-white/20 dark:border-white/5 glass shadow-xl overflow-hidden">
      
      {/* Immersive Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-village-600/10 to-emerald-500/10 flex justify-between items-center select-none">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-village-600 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white leading-tight">
              {t('aiChatHeader')}
            </h2>
            <span className="text-[10px] font-bold text-village-600 dark:text-village-400 uppercase tracking-widest block mt-0.5">
              Powered by Llama 3.3 70B (Groq)
            </span>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Canvas */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md
              ${msg.sender === 'user' ? 'bg-village-600' : 'bg-slate-700'}
            `}>
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm
              ${msg.sender === 'user'
                ? 'bg-village-600 text-white rounded-tr-none'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-800/80 rounded-tl-none'
              }
            `}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-white animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800/80 p-4 rounded-2xl rounded-tl-none text-xs flex items-center space-x-2 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-village-600" />
              <span>{t('processing')}</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-village-950/10 space-y-2 select-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            {lang === 'hi' ? 'सुझाए गए प्रश्न' : 'Suggested Questions:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion)}
                className="text-[11px] font-bold px-3.5 py-1.5 rounded-xl border border-village-500/25 bg-white dark:bg-slate-900 text-village-700 dark:text-village-300 hover:bg-village-500/10 dark:hover:bg-village-500/20 text-left transition duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input controls footer */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-village-950/20 flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-4 pr-12 py-3.5 text-xs font-semibold tracking-wide border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-village-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || loading}
            className="absolute right-2 top-2 p-2 rounded-xl bg-village-600 hover:bg-village-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white transition focus:outline-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Floating Voice Microphone input */}
        <VoiceButton 
          onTranscript={handleSend} 
          textToSpeak={speakingText}
        />
      </div>

    </div>
  );
}
