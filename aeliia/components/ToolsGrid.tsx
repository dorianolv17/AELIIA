
import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, Activity, Server, FileCheck, EyeOff, Fingerprint, Globe, Smartphone, Zap } from 'lucide-react';

export const ToolsGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-black relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
             <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                Un écosystème <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">protecteur.</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Chaque brique de notre technologie est pensée pour votre sécurité mentale et numérique.
            </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">
            
            {/* CARD 1: LARGE FEATURE (Ethique) */}
            <div className={`md:col-span-2 md:row-span-2 bg-[#0f0f11]/80 backdrop-blur-xl rounded-[32px] p-8 border border-white/5 relative overflow-hidden group hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                {/* Animated Gradient Blob */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-all duration-1000 animate-pulse-slow"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Protocole Éthique Strict</h3>
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                            Notre IA est bridée par des instructions systémiques inviolables. Elle refuse l'influence, ne juge jamais et s'interdit tout diagnostic médical. C'est une intelligence "froide" techniquement, mais chaleureuse humainement.
                        </p>
                    </div>
                    <div className="mt-8 bg-black/40 rounded-xl p-4 border border-white/5 backdrop-blur-md group-hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-3 text-sm text-green-400 mb-3">
                             <CheckCircleIcon /> 
                             <span className="text-zinc-300">Directive "Non-Ingérence"</span>
                             <span className="ml-auto text-xs bg-green-500/10 px-2 py-0.5 rounded text-green-400 font-mono">ACTIVE</span>
                        </div>
                        <div className="w-full h-px bg-white/5 mb-3"></div>
                        <div className="flex items-center gap-3 text-sm text-green-400">
                             <CheckCircleIcon /> 
                             <span className="text-zinc-300">Neutralité Bienveillante</span>
                             <span className="ml-auto text-xs bg-green-500/10 px-2 py-0.5 rounded text-green-400 font-mono">ACTIVE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CARD 2: ANONYMITY (Vertical) with SCANNER EFFECT */}
            <div className={`md:col-span-1 md:row-span-2 bg-[#0f0f11]/80 backdrop-blur-xl rounded-[32px] p-8 border border-white/5 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500 delay-100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                {/* Scanner Light Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full items-center text-center">
                    <div className="relative mb-8 mt-4">
                        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 border border-purple-500/20 z-10 relative">
                            <Fingerprint className="w-10 h-10" />
                        </div>
                        {/* Scanning Line */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-[scan_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 z-20 rounded-full"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">0% Traceur</h3>
                    <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                        Pas de compte obligatoire. Pas de cookies publicitaires. Vous êtes un fantôme numérique.
                    </p>
                    
                    <div className="mt-auto w-full aspect-[3/4] bg-zinc-900/50 rounded-xl border border-white/5 p-4 flex flex-col gap-3 relative overflow-hidden">
                         <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                         <div className="h-2 w-3/4 bg-zinc-700 rounded-full animate-pulse"></div>
                         <div className="h-2 w-1/2 bg-zinc-700 rounded-full animate-pulse delay-75"></div>
                         <div className="h-2 w-full bg-zinc-800 rounded-full mt-2 opacity-20"></div>
                         <div className="h-2 w-5/6 bg-zinc-800 rounded-full opacity-20"></div>
                         
                         {/* Privacy Shield Icon at bottom */}
                         <div className="mt-auto flex justify-center">
                             <EyeOff className="w-8 h-8 text-zinc-700 group-hover:text-purple-500 transition-colors" />
                         </div>
                    </div>
                </div>
            </div>

            {/* CARD 3: SECURITY (Small) */}
            <div className={`bg-[#0f0f11]/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/5 flex flex-col justify-center gap-4 hover:bg-zinc-900 hover:border-white/20 transition-all delay-200 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                    <Lock className="w-6 h-6 text-zinc-300 group-hover:text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">TLS 1.3</h3>
                    <p className="text-xs text-zinc-500 mt-1">Chiffrement militaire de bout en bout.</p>
                </div>
            </div>

            {/* CARD 4: RGPD (Small) */}
            <div className={`bg-[#0f0f11]/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/5 flex flex-col justify-center gap-4 hover:bg-zinc-900 hover:border-white/20 transition-all delay-300 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                    <FileCheck className="w-6 h-6 text-zinc-300 group-hover:text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">RGPD Compliant</h3>
                    <p className="text-xs text-zinc-500 mt-1">Droit à l'oubli natif et suppression instantanée.</p>
                </div>
            </div>

            {/* CARD 5: SAFETY NET (Wide Bottom) with ECG Animation */}
            <div className={`md:col-span-2 bg-gradient-to-r from-red-950/20 to-[#0f0f11] rounded-[32px] p-8 border border-red-500/10 relative overflow-hidden flex items-center gap-8 group hover:border-red-500/40 transition-all delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                
                {/* Background ECG Line Animation */}
                <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none text-red-500" viewBox="0 0 300 50" preserveAspectRatio="none">
                    <path d="M0,25 L50,25 L60,10 L70,40 L80,25 L300,25" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" className="animate-[dash_3s_linear_infinite]" strokeDasharray="300" strokeDashoffset="300"></path>
                </svg>

                <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse"></div>
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-500/20 relative z-10 group-hover:scale-105 transition-transform">
                        <Activity className="w-8 h-8 animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                </div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">Filet de Sécurité 24/7</h3>
                    <p className="text-zinc-400 text-sm">
                        Détection sémantique des signaux de crise. Redirection immédiate vers le 15 ou le 3114 en cas de danger vital détecté.
                    </p>
                </div>
            </div>

            {/* CARD 6: PLATFORM (Medium) with 3D Float */}
            <div className={`md:col-span-2 bg-[#0f0f11]/80 backdrop-blur-xl rounded-[32px] p-8 border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all delay-500 overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">Web & Mobile</h3>
                    <p className="text-zinc-400 text-sm mb-4 max-w-xs">
                        Accessible depuis n'importe quel navigateur, sans installation.
                    </p>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                             <Globe className="w-4 h-4 text-blue-400" /> <span className="text-xs text-zinc-300">PWA</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
                             <Smartphone className="w-4 h-4 text-blue-400" /> <span className="text-xs text-zinc-300">Responsive</span>
                        </div>
                    </div>
                </div>
                
                {/* 3D Floating Badge */}
                <div className="w-32 h-24 bg-gradient-to-br from-zinc-800 to-black rounded-xl border border-zinc-700/50 rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 shadow-2xl flex flex-col items-center justify-center relative">
                    <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="absolute top-2 left-5 w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="absolute top-2 left-8 w-2 h-2 rounded-full bg-green-500"></div>
                    
                    <Zap className="w-8 h-8 text-white mb-1" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">AELIIA OS</span>
                </div>
            </div>

        </div>
      </div>
      
      {/* Global CSS for custom scan animation if needed */}
      <style>{`
        @keyframes scan {
            0%, 100% { top: 10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            50% { top: 90%; }
        }
        @keyframes dash {
            to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};

const CheckCircleIcon = () => (
    <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
);
