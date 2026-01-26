import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, X, Activity, AlertTriangle, RefreshCcw } from 'lucide-react';
import { createPcmBlob, base64ToUint8Array, decodeAudioData } from '../utils/audioUtils';
import { checkCrisisKeywords, triggerEmergencyProtocol } from '../utils/safety';
import { CrisisModal } from './CrisisModal';
import { UserProfile } from '../types';
import { buildSystemInstruction } from '../services/geminiService';

interface LiveVoiceProps {
  onClose: () => void;
  apiKey: string;
  userProfile?: UserProfile | null;
}

export const LiveVoice: React.FC<LiveVoiceProps> = ({ onClose, apiKey, userProfile }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (!inputContextRef.current) {
      inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    }
  };

  const handleCrisis = () => {
      setIsCrisisMode(true);
      triggerEmergencyProtocol();
      stopSession();
  };

  const startSession = async () => {
    setError(null);
    setIsConnecting(true);
    
    try {
      initAudio();
      const ai = new GoogleGenAI({ apiKey });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Personalized System Prompt
      const basePrompt = buildSystemInstruction(userProfile?.name, userProfile?.age, userProfile?.gender);
      const voicePrompt = `${basePrompt}
      
      INSTRUCTIONS SPÉCIFIQUES VOIX :
      - Tu gardes ta posture de miroir (accueil, reformulation, une question).
      - Tu es très concis pour l'oral. Pas de longs paragraphes.
      - Voix calme, lente, posée.
      - Ne donne JAMAIS de conseils, même à l'oral.
      `;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            if (!inputContextRef.current) return;
            const source = inputContextRef.current.createMediaStreamSource(stream);
            sourceRef.current = source;
            const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolume(Math.sqrt(sum / inputData.length));

              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then((session) => {
                 session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(processor);
            processor.connect(inputContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription?.text) {
                if (checkCrisisKeywords(message.serverContent.inputTranscription.text)) {
                    handleCrisis();
                    return;
                }
            }
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(base64ToUint8Array(base64Audio), ctx);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => { sourcesRef.current.delete(source); });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.interrupted) {
               sourcesRef.current.forEach(s => s.stop());
               sourcesRef.current.clear();
               nextStartTimeRef.current = 0;
            }
          },
          onclose: () => { setIsActive(false); },
          onerror: (err) => {
             if (!isCrisisMode) {
                setError("La connexion a été interrompue. Veuillez rafraîchir ou réessayer.");
                stopSession();
             }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          systemInstruction: voicePrompt,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          }
        }
      });
      sessionRef.current = sessionPromise;

    } catch (e: any) {
      setError("Impossible de démarrer le mode vocal. Vérifiez votre micro et votre connexion.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (sourceRef.current) { sourceRef.current.disconnect(); sourceRef.current = null; }
    if (processorRef.current) { processorRef.current.disconnect(); processorRef.current = null; }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setVolume(0);
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <>
    {isCrisisMode && <CrisisModal onClose={() => setIsCrisisMode(false)} />}
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-500">
      <button onClick={() => { stopSession(); onClose(); }} className="absolute top-8 right-8 p-3 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-all">
        <X className="w-8 h-8" />
      </button>

      <div className="flex flex-col items-center gap-12 max-w-md w-full px-4">
        <div className="relative">
          <div className={`w-64 h-64 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur-3xl opacity-30 transition-all duration-100 ${isActive ? 'animate-pulse-slow' : ''}`} style={{ transform: `scale(${1 + volume * 5})` }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-2xl transition-all duration-300 ${isActive ? 'shadow-indigo-500/20 border-indigo-500/30' : ''} ${error ? 'border-red-500/30 shadow-red-900/20' : ''}`}>
              {isConnecting ? (
                  <Activity className="w-12 h-12 text-indigo-400 animate-spin" />
              ) : error ? (
                  <AlertTriangle className="w-12 h-12 text-red-400" />
              ) : isActive ? (
                  <Mic className="w-12 h-12 text-white animate-float" />
              ) : (
                  <MicOff className="w-12 h-12 text-zinc-600" />
              )}
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-light text-white">Mode Vocal AELIIA</h2>
          {error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-message-pop">
                  <p className="text-red-300 text-sm font-medium">{error}</p>
              </div>
          ) : (
            <p className="text-zinc-400 text-lg">
                {isConnecting ? "Connexion en cours..." : isActive ? `Je vous écoute, ${userProfile?.name || ''}...` : "Prêt à commencer ?"}
            </p>
          )}
        </div>

        {!isActive && !isConnecting && (
          <button onClick={startSession} className={`px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2 ${error ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>
            {error ? <><RefreshCcw className="w-5 h-5"/> Réessayer</> : "Commencer la discussion"}
          </button>
        )}
        
        {isActive && (
             <button onClick={stopSession} className="px-8 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full font-medium hover:bg-red-500/20 transition-colors">Arrêter</button>
        )}
      </div>
    </div>
    </>
  );
};