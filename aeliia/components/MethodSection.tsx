
import React, { useState, useRef } from 'react';
import { ArrowRight, Mic, Sparkles, Command, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MethodSectionProps {
  onStartChat: (initialText?: string, startVoice?: boolean) => void;
}

export const MethodSection: React.FC<MethodSectionProps> = ({ onStartChat }) => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onStartChat(inputValue);
      setInputValue("");
    }
  };

  const handleChipClick = (text: string) => {
      setInputValue(text);
      // Optional: Auto submit or just focus? Let's just focus and populate for user control
      const inputEl = document.getElementById('main-chat-input');
      if (inputEl) inputEl.focus();
  };

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-4 bg-black relative flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-12">
        
        {/* Header Text */}
        <div className="space-y-6 max-w-2xl animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                <MessageCircle className="w-4 h-4" /> 
                <span>Espace de décompression</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight">
                {t.method.title}
            </h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
                {t.method.subtitle}
            </p>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in animate-delay-200">
            {t.method.chips.map((chip, idx) => (
                <button
                    key={idx}
                    onClick={() => handleChipClick(chip)}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/30 hover:text-white text-zinc-400 text-sm transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-95"
                >
                    {chip}
                </button>
            ))}
        </div>

        {/* The "Aurora" Input */}
        <div className={`w-full max-w-2xl relative group transform transition-all duration-500 ${isFocused ? 'scale-105' : 'scale-100'} animate-slide-up animate-delay-300`}>
            
            {/* Animated Aurora Border */}
            <div className={`absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur-md opacity-30 group-hover:opacity-70 transition duration-1000 animate-aurora ${isFocused ? 'opacity-100 blur-lg' : ''}`}></div>
            
            <div className="relative bg-[#0a0a0c] rounded-3xl flex items-center p-3 md:p-4 shadow-2xl overflow-hidden border border-white/10">
                
                <div className="pl-4 pr-4 text-zinc-500">
                    <Sparkles className={`w-6 h-6 ${isFocused ? 'text-indigo-400 animate-pulse' : ''}`} />
                </div>

                <input 
                    id="main-chat-input"
                    type="text"
                    value={inputValue}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.method.placeholder}
                    className="flex-1 bg-transparent text-white text-lg md:text-2xl placeholder:text-zinc-600 outline-none font-medium h-16 w-full"
                />

                <div className="flex items-center gap-2 pr-2">
                    {inputValue.trim() ? (
                        <button 
                            onClick={() => onStartChat(inputValue)}
                            className="h-12 px-6 rounded-xl bg-white text-black font-bold text-base hover:bg-zinc-200 transition-colors flex items-center gap-2 animate-in zoom-in duration-200 shadow-lg shadow-white/20"
                        >
                            <span className="hidden md:inline">{t.method.btn_start}</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-xs text-zinc-600 font-mono">
                            <Command className="w-3 h-3" /> + K
                        </div>
                    )}
                     <button 
                        onClick={() => onStartChat(undefined, true)}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        title={t.hero.cta_voice}
                    >
                        <Mic className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

        <p className="text-zinc-500 text-sm font-medium flex items-center gap-2 animate-fade-in animate-delay-500">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {t.method.privacy}
        </p>

      </div>
    </section>
  );
};
