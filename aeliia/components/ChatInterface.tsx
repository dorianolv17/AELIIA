
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X, Mic, Square, ArrowUp, Sparkles, Link as LinkIcon, Globe, AlertCircle, Trash2, StopCircle, AlertTriangle, ShieldAlert, Keyboard } from 'lucide-react';
import { Message, UserProfile } from '../types';
import { sendMessageToGemini, buildSystemInstruction, resetChat } from '../services/geminiService';
import { arrayBufferToBase64 } from '../utils/audioUtils';
import { checkCrisisKeywords, triggerEmergencyProtocol } from '../utils/safety';
import { CrisisModal } from './CrisisModal';

interface ChatInterfaceProps {
  onClose: () => void;
  apiKey: string;
  initialMessage?: string;
  startRecordingImmediately?: boolean;
  isPremium?: boolean;
  userProfile?: UserProfile | null;
}

const PRIVACY_KEYWORDS = ['privé', 'confidentialité', 'sécurité', 'anonymat', 'anonyme', 'données', 'espion', 'enregistré', 'lu par qui'];
const LOCAL_STORAGE_KEY = 'aelia_chat_history';

// --- ENHANCED MARKDOWN PARSER ---
const FormattedText = ({ text }: { text: string }) => {
    // 1. Split by newlines to handle paragraphs and lists
    const lines = text.split('\n');
    
    return (
        <div className="space-y-2">
            {lines.map((line, i) => {
                if (line.trim() === '') return <div key={i} className="h-2" />;

                // List Items
                if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                    const content = line.trim().substring(2);
                    return (
                        <div key={i} className="flex gap-2 pl-2">
                            <div className="min-w-[4px] h-[4px] bg-current rounded-full mt-2 opacity-60"></div>
                            <p className="text-[15px] leading-relaxed"><InlineStyles text={content} /></p>
                        </div>
                    );
                }

                // Standard Paragraph
                return (
                    <p key={i} className="text-[15px] leading-relaxed break-words">
                        <InlineStyles text={line} />
                    </p>
                );
            })}
        </div>
    );
};

// Sub-component to handle Bold (**), Italic (*), and Links ([text](url))
const InlineStyles = ({ text }: { text: string }) => {
    const parts = text.split(/(\*\*.*?\*\*)|(\*.*?\*)|(\[.*?\]\(.*?\))|(https?:\/\/[^\s]+)/g).filter(Boolean);

    return (
        <>
            {parts.map((part, index) => {
                // Bold
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-bold text-white/90">{part.slice(2, -2)}</strong>;
                }
                // Italic
                if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={index} className="italic opacity-80">{part.slice(1, -1)}</em>;
                }
                // Markdown Link
                if (part.match(/^\[(.*?)\]\((.*?)\)$/)) {
                    const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
                    if (match) {
                        return (
                            <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/30 underline-offset-2 font-medium inline-flex items-center gap-0.5">
                                {match[1]} <LinkIcon className="w-3 h-3" />
                            </a>
                        );
                    }
                }
                // Raw URL
                if (part.match(/^https?:\/\/[^\s]+$/)) {
                    let hostname = "";
                    try { hostname = new URL(part).hostname; } catch(e){}
                    return (
                        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/30 underline-offset-2 font-medium inline-flex items-center gap-0.5">
                             <Globe className="w-3 h-3" /> {hostname || "Lien"}
                        </a>
                    );
                }
                return <span key={index}>{part}</span>;
            })}
        </>
    );
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose, apiKey, initialMessage, startRecordingImmediately, isPremium = false, userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false); // New state for streaming indicator
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [systemError, setSystemError] = useState<string | null>(null);
  
  // Safety Modes
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const hasLoadedHistoryRef = useRef(false);
  const hasInitializedChatRef = useRef(false);

  const AVATAR_URL = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";

  // Init Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
        synthRef.current = window.speechSynthesis;
    }
    return () => {
        if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  // Initialize Chat Session with User Profile Context ONCE
  useEffect(() => {
      if (!hasInitializedChatRef.current && userProfile) {
          resetChat();
          hasInitializedChatRef.current = true;
      }
  }, [userProfile]);

  // LOAD HISTORY (Premium Only)
  useEffect(() => {
      if (isPremium && !hasLoadedHistoryRef.current) {
          const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (savedHistory) {
              try {
                  const parsed = JSON.parse(savedHistory);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                      setMessages(parsed);
                  }
              } catch (e) {
                  console.error("Failed to parse history", e);
              }
          }
          hasLoadedHistoryRef.current = true;
      }
  }, [isPremium]);

  // SAVE HISTORY (Premium Only)
  useEffect(() => {
      if (isPremium && messages.length > 0) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
      }
  }, [messages, isPremium]);

  const clearHistory = () => {
      if (window.confirm("Voulez-vous vraiment effacer tout votre historique de conversation ?")) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          setMessages([]);
          resetChat();
      }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isStreaming]);

  // Handle Initial Message or Auto-Record
  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
        if (initialMessage) {
            handleSendText(initialMessage);
        } else if (startRecordingImmediately) {
            setInputMode('voice');
            startRecording();
        }
    }
  }, [initialMessage, startRecordingImmediately]);

  const showSystemError = (msg: string) => {
      setSystemError(msg);
      setTimeout(() => setSystemError(null), 5000);
  };

  const handleCrisis = (text: string) => {
      setFocusMode(true);
      setIsCrisisMode(true);
      triggerEmergencyProtocol();
      setIsLoading(false);
      setIsStreaming(false);

      // Inject Focus Mode Message immediately
      setMessages(prev => [
          ...prev, 
          { role: 'user', text: text },
          { 
            role: 'model', 
            text: "🚨 **MODE FOCUS ACTIVÉ**\n\nJe détecte une situation de détresse importante. Je suspends la conversation pour prioriser votre sécurité.\n\nVous n'êtes pas seul(e).",
            isError: true 
          }
      ]);
  };

  const startRecording = async () => {
    setSystemError(null);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/webm' }); 
            const buffer = await blob.arrayBuffer();
            const base64Audio = arrayBufferToBase64(buffer);
            
            setMessages(prev => [...prev, { role: 'user', text: "🎤 Message vocal envoyé..." }]);
            setIsLoading(true);

            const systemPrompt = buildSystemInstruction(userProfile?.name, userProfile?.age, userProfile?.gender);

            try {
                const stream = await sendMessageToGemini([
                    { inlineData: { mimeType: 'audio/webm', data: base64Audio } },
                    { text: "L'utilisateur a envoyé un message vocal." }
                ], apiKey, systemPrompt);
                
                processStreamResponse(stream);
            } catch (error: any) {
                let friendlyError = "Désolé, je n'ai pas pu traiter votre message audio.";
                setMessages(prev => [...prev, { role: 'model', text: friendlyError, isError: true }]);
                setIsLoading(false);
            }
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
    } catch (e: any) {
        showSystemError("Impossible d'activer le microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }
  };

  const handleSendText = async (text: string) => {
    if (!text.trim() || isLoading || isStreaming || focusMode) return;
    
    // Safety Check: Priority over AI Mode 4
    if (checkCrisisKeywords(text)) {
        handleCrisis(text);
        return; 
    }

    setSystemError(null);

    if (messages.length >= 5 && PRIVACY_KEYWORDS.some(k => text.toLowerCase().includes(k))) {
         setMessages(prev => [
             ...prev, 
             { role: 'user', text: text },
             { role: 'model', text: "🔒 **Sécurité et Confidentialité**\n\nSoyez rassuré(e) : nos échanges sont entièrement chiffrés et anonymes.", isError: false }
         ]);
         return;
    }

    const userMsg: Message = { role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const systemPrompt = buildSystemInstruction(userProfile?.name, userProfile?.age, userProfile?.gender);

    try {
        const stream = await sendMessageToGemini(userMsg.text, apiKey, systemPrompt);
        processStreamResponse(stream);
    } catch (error: any) {
        let friendlyError = "Désolé, une erreur est survenue lors de la connexion.";
        setMessages(prev => [...prev, { role: 'model', text: friendlyError, isError: true }]);
        setIsLoading(false);
    }
  };

  const processStreamResponse = async (stream: AsyncGenerator<string, void, unknown>) => {
      setIsLoading(false);
      setIsStreaming(true); // Start visual indicator
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      let fullText = '';
      try {
          for await (const chunk of stream) {
              fullText += chunk;
              setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMsg = newMessages[newMessages.length - 1];
                  if (lastMsg.role === 'model') lastMsg.text = fullText;
                  return newMessages;
              });
          }
      } catch (err) {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            lastMsg.text += "\n[Connexion interrompue]";
            lastMsg.isError = true;
            return newMessages;
          });
      } finally {
          setIsStreaming(false); // Stop visual indicator
      }
  };

  return (
    <>
    {isCrisisMode && <CrisisModal onClose={() => setIsCrisisMode(false)} />}
    
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center md:justify-end animate-in fade-in duration-300">
      <div className={`w-full md:w-[600px] h-full ${focusMode ? 'bg-red-950/20' : 'bg-[#050505]'} md:border-l border-white/10 flex flex-col shadow-2xl relative overflow-hidden transition-colors duration-500`}>
        
        {/* Header */}
        <div className={`px-6 py-4 backdrop-blur-xl border-b sticky top-0 z-20 flex flex-col items-center shadow-lg relative transition-colors duration-500 ${focusMode ? 'bg-red-900/40 border-red-500/30' : 'bg-black/80 border-white/5'}`}>
            <div className="w-12 h-1 bg-zinc-800 rounded-full mb-4 md:hidden"></div>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="relative group cursor-pointer">
                        <div className={`w-10 h-10 rounded-full overflow-hidden ring-1 shadow-lg transition-all duration-700 ${focusMode ? 'ring-red-500 shadow-red-500/20' : 'ring-white/10 group-hover:ring-indigo-500/50'}`}>
                            <img src={AVATAR_URL} alt="AELIIA" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                        </div>
                        {focusMode ? (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#050505] shadow-sm animate-ping"></div>
                        ) : (
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#050505] shadow-sm animate-pulse"></div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-white text-base tracking-tight font-sans">AELIIA</h3>
                        {focusMode ? (
                            <p className="text-[11px] text-red-300 font-bold tracking-widest uppercase flex items-center gap-1">
                                <ShieldAlert className="w-3 h-3" /> Mode Focus
                            </p>
                        ) : (
                             <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 font-medium">
                                <Sparkles className="w-3 h-3 text-indigo-400" /> Miroir Verbal Intelligent
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isPremium && messages.length > 0 && !focusMode && (
                        <button onClick={clearHistory} className="p-2 rounded-full text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Effacer l'historique">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
            {systemError && (
                <div className="absolute -bottom-10 left-0 right-0 px-6 flex justify-center animate-fade-in-up">
                    <div className="bg-red-500/90 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-md">
                        <AlertTriangle className="w-3 h-3" /> {systemError}
                    </div>
                </div>
            )}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10 scroll-smooth custom-scrollbar bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
            
            {/* Empty State */}
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                 <div className="relative mb-8">
                    <div className="absolute inset-0 bg-indigo-500/30 blur-[60px] rounded-full"></div>
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-zinc-800 to-black p-[1px] shadow-2xl">
                         <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden">
                             <img src={AVATAR_URL} className="w-full h-full object-cover opacity-80" />
                         </div>
                    </div>
                 </div>
                 <h3 className="text-xl font-semibold text-white mb-2">Bonjour {userProfile?.name || ''}</h3>
                 <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                     Je suis là pour accueillir tes mots, sans jugement et sans chercher à résoudre à tout prix. Qu'est-ce qui t'amène ici ?
                 </p>
                 <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-sm">
                     {[
                        "Je me sens perdu...", 
                        "C'est difficile en ce moment", 
                        "Besoin de clarifier mes pensées", 
                        "Juste déposer ce que je ressens"
                     ].map(txt => (
                         <button key={txt} onClick={() => handleSendText(txt)} className="text-xs bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-zinc-300 py-3 rounded-xl transition-all">
                             {txt}
                         </button>
                     ))}
                 </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg, idx) => {
                const isSecurityMsg = msg.text.includes("🔒");
                const isLatestModel = msg.role === 'model' && idx === messages.length - 1;

                return (
                <div key={idx} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up`}>
                    <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        {msg.role === 'model' && (
                            <div className={`w-8 h-8 rounded-full overflow-hidden border shadow-lg flex-shrink-0 mt-1 ${isSecurityMsg ? 'border-green-500/50' : focusMode && idx === messages.length - 1 ? 'border-red-500/50' : 'border-white/10'}`}>
                                <img src={AVATAR_URL} alt="AI" className={`w-full h-full object-cover ${focusMode && idx === messages.length - 1 ? 'grayscale' : ''}`} />
                            </div>
                        )}
                        
                        <div className={`px-5 py-3.5 relative shadow-sm backdrop-blur-sm transition-all duration-300 ${
                            msg.role === 'user' 
                            ? 'bg-[#3b82f6] text-white rounded-[20px] rounded-tr-sm shadow-blue-900/20' 
                            : 'bg-[#1a1a1c] text-zinc-100 rounded-[20px] rounded-tl-sm border border-white/5'
                        } ${msg.isError ? 'border-red-500/30 bg-red-950/30 shadow-red-900/20' : ''}`}>
                            <FormattedText text={msg.text} />
                            
                            {/* Animated Typing Indicator during streaming */}
                            {isLatestModel && isStreaming && (
                                <span className="inline-flex items-center gap-1 ml-2 align-bottom h-4">
                                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )})}
            
            {/* Thinking Indicator (Initial Wait) */}
            {isLoading && !isRecording && (
               <div className="flex gap-3 items-start animate-fade-in px-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 mt-1">
                        <img src={AVATAR_URL} alt="AI" className="w-full h-full object-cover grayscale opacity-70" />
                  </div>
                  <div className="bg-[#1a1a1c] border border-white/5 px-4 py-3 rounded-[20px] rounded-tl-sm flex items-center gap-1 h-[46px] shadow-lg relative overflow-hidden">
                    {/* Shimmer effect inside bubble */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-[bounce_1.4s_infinite_0ms]"></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-[bounce_1.4s_infinite_200ms]"></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-[bounce_1.4s_infinite_400ms]"></div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className={`p-4 backdrop-blur-xl border-t z-20 transition-colors duration-500 ${focusMode ? 'bg-red-950/20 border-red-500/20' : 'bg-[#050505]/90 border-white/5'}`}>
            {isRecording ? (
                 <div className="flex items-center justify-between bg-zinc-900 rounded-full px-6 py-4 border border-red-500/20 animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        <span className="text-red-400 font-medium tracking-wide text-sm">Je vous écoute...</span>
                    </div>
                    <button onClick={stopRecording} className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors">
                        <StopCircle className="w-5 h-5 text-white fill-current" />
                    </button>
                 </div>
            ) : (
                <div className="relative flex items-end gap-3 max-w-4xl mx-auto">
                    
                    {/* Toggle Button */}
                    <button 
                        onClick={() => setInputMode(prev => prev === 'text' ? 'voice' : 'text')}
                        disabled={focusMode}
                        className={`p-3 rounded-full transition-all duration-300 flex-shrink-0 border border-transparent ${
                            inputMode === 'voice' 
                            ? 'bg-white text-black shadow-lg shadow-white/10' 
                            : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                        title={inputMode === 'text' ? "Passer en mode vocal" : "Passer en mode texte"}
                    >
                        {inputMode === 'text' ? <Mic className="w-5 h-5" /> : <Keyboard className="w-5 h-5" />}
                    </button>

                    <div className={`flex-1 relative ${inputMode === 'text' ? '' : 'flex justify-center items-center h-[56px]'}`}>
                        
                        {inputMode === 'text' ? (
                            <div className={`relative border rounded-[28px] transition-all duration-300 focus-within:ring-1 w-full ${focusMode ? 'bg-red-950/30 border-red-500/20 focus-within:border-red-500/50 focus-within:ring-red-500/20' : 'bg-[#1a1a1c] border-white/10 focus-within:border-indigo-500/50 focus-within:ring-indigo-500/20'}`}>
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendText(input); }}}
                                    disabled={focusMode}
                                    placeholder={focusMode ? "Conversation suspendue par sécurité." : "Écrivez votre message..."}
                                    className={`w-full bg-transparent text-white pl-5 pr-14 py-4 outline-none resize-none min-h-[56px] max-h-[120px] scrollbar-hide text-[15px] leading-relaxed rounded-[28px] ${focusMode ? 'placeholder:text-red-300/50 cursor-not-allowed' : 'placeholder:text-zinc-600'}`}
                                    rows={1}
                                />
                                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                                    {input.trim() && !focusMode && (
                                        <button onClick={() => handleSendText(input)} disabled={isLoading || isStreaming} className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                            <ArrowUp className="w-5 h-5 font-bold stroke-[3px]" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={startRecording}
                                disabled={isLoading || isStreaming || focusMode}
                                className="w-full h-full bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 rounded-[28px] flex items-center justify-center gap-3 text-zinc-300 hover:text-white transition-all group backdrop-blur-sm shadow-sm"
                            >
                                <div className="p-2 bg-red-500/10 rounded-full group-hover:bg-red-500/20 transition-colors">
                                    <Mic className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="font-medium">Appuyer pour parler</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
    </>
  );
};
