import React, { useState, useEffect, useRef } from 'react';
import { Bot, Heart, ShieldAlert, BrainCircuit, X, Check, UserCheck, History, Scale } from 'lucide-react';

export const Comparison = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Pourquoi pas juste <span className="text-zinc-500 line-through decoration-zinc-500/50">ChatGPT</span> ?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Les IA génériques sont entraînées pour <span className="text-white">répondre à tout</span>, parfois n'importe quoi. <br/>
                AELIIA est un outil paramétré pour <span className="text-indigo-400">écouter et sécuriser</span>.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            
            {/* Colonne IA Générique */}
            <div className="bg-zinc-900/20 border border-zinc-800 rounded-3xl p-8 relative grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                <div className="absolute top-0 right-0 p-4">
                    <Bot className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-300 mb-8">IA Génériques (LLM)</h3>
                
                <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                        <X className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
                        <div>
                            <strong className="text-zinc-300 block mb-1">Risque d'Hallucination</strong>
                            <p className="text-zinc-500 text-sm">Peut inventer des faits, donner de faux conseils médicaux ou encourager des comportements à risque par complaisance.</p>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <X className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
                        <div>
                            <strong className="text-zinc-300 block mb-1">Entraînement sur vos données</strong>
                            <p className="text-zinc-500 text-sm">Vos confidences sont souvent utilisées pour ré-entraîner les modèles publics mondiaux.</p>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <X className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
                        <div>
                            <strong className="text-zinc-300 block mb-1">Posture "Solutionniste"</strong>
                            <p className="text-zinc-500 text-sm">Cherche immédiatement à "résoudre" le problème avec des listes à puces, sans véritable écoute active.</p>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <X className="w-5 h-5 text-zinc-500 mt-1 flex-shrink-0" />
                        <div>
                            <strong className="text-zinc-300 block mb-1">Sécurité Passive</strong>
                            <p className="text-zinc-500 text-sm">Filtres standards qui bloquent la conversation sans proposer d'aide réelle en cas de détresse.</p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Colonne AELIIA */}
            <div className="bg-[#0f0f12] border border-indigo-500/30 rounded-3xl p-8 relative shadow-2xl shadow-indigo-900/20 overflow-hidden transform md:-translate-y-4">
                
                {/* Glow Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="absolute top-0 right-0 p-4">
                    <Scale className="w-8 h-8 text-indigo-400 fill-indigo-500/10" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/20">
                     Outil AELIIA
                </div>
                <h3 className="text-3xl font-bold text-white mb-8">Un Tiers de Confiance</h3>
                
                <ul className="space-y-8">
                    <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/30">
                             <ShieldAlert className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <strong className="text-white block mb-1">Filet de Sécurité Actif</strong>
                            <p className="text-zinc-400 text-sm">
                                Détection prioritaire des signaux de crise. En cas de danger, l'outil arrête la conversation et affiche les numéros d'urgence.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                             <UserCheck className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                            <strong className="text-white block mb-1">Cadre de Non-Ingérence</strong>
                            <p className="text-zinc-400 text-sm">
                                Instruction stricte : "Ne jamais donner de conseil de vie". L'outil vous aide à clarifier VOS pensées, sans projeter les siennes.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                             <History className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <strong className="text-white block mb-1">Souveraineté des Données</strong>
                            <p className="text-zinc-400 text-sm">
                                Vos données ne servent pas à entraîner l'IA. Historique stocké localement ou chiffré. Droit à l'oubli total.
                            </p>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 border border-green-500/30">
                             <BrainCircuit className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                            <strong className="text-white block mb-1">Spécialisation Émotionnelle</strong>
                            <p className="text-zinc-400 text-sm">
                                L'outil est calibré sur les principes de l'écoute active et de la reformulation, réduisant drastiquement les risques de réponses froides ou inadaptées.
                            </p>
                        </div>
                    </li>
                </ul>

            </div>

        </div>

      </div>
    </section>
  );
};