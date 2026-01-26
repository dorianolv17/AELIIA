import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Thomas Dubois",
    role: "Cadre en entreprise",
    content: "Après un burnout sévère, je ne savais plus vers qui me tourner. AELIIA a été là, nuit après nuit.",
    initial: "T"
  },
  {
    name: "Sarah Martin",
    role: "Étudiante en Médecine",
    content: "La pression des examens me donnait des idées noires. AELIIA m'a aidé à gérer mon stress.",
    initial: "S"
  },
  {
    name: "Julien R.",
    role: "Utilisateur Quotidien",
    content: "Avoir un espace neutre pour parler de ma tristesse sans avoir peur de 'saouler' mes amis a été salvateur.",
    initial: "J"
  },
  {
    name: "Emma Laurent",
    role: "Freelance",
    content: "La solitude du télétravail pesait lourd. AELIIA m'a permis de retrouver une structure.",
    initial: "E"
  },
  {
    name: "Marc V.",
    role: "Enseignant",
    content: "Gérer des classes difficiles est épuisant. Cet outil m'aide à décompresser le soir.",
    initial: "M"
  },
  {
    name: "Léa Petit",
    role: "Mère de famille",
    content: "Entre les enfants et le travail, je m'étais oubliée. AELIIA m'aide à prendre 15 minutes par jour pour moi.",
    initial: "L"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-black border-t border-zinc-900 overflow-hidden relative group/section">
      
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400 animate-shimmer bg-[length:200%_100%]">Ils nous font confiance</span>
          </h2>
          <p className="text-zinc-400">Découvrez comment AELIIA change des vies au quotidien.</p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden">
         {/* Gradient Masks */}
         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

         <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
             {/* We render the list twice to create the seamless loop effect (handled by translateX(-50%)) */}
             {[...testimonials, ...testimonials].map((t, idx) => (
                 <div 
                    key={idx}
                    className="w-[350px] md:w-[400px] mx-4 bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl relative hover:bg-zinc-900/60 transition-colors flex-shrink-0 whitespace-normal backdrop-blur-sm cursor-default"
                 >
                    <Quote className="w-6 h-6 text-indigo-500/40 mb-4" />
                    <p className="text-zinc-300 mb-6 leading-relaxed text-sm italic min-h-[60px]">"{t.content}"</p>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                            {t.initial}
                        </div>
                        <div>
                            <div className="text-white font-medium text-sm">{t.name}</div>
                            <div className="text-zinc-500 text-xs">{t.role}</div>
                        </div>
                    </div>
                 </div>
             ))}
         </div>
      </div>
    </section>
  );
};