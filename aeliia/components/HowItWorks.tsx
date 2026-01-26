
import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, Lightbulb, HeartHandshake, ArrowRight } from 'lucide-react';

export const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
      {
          icon: MessageSquare,
          step: "01",
          title: "Déposer",
          desc: "Ecrivez ce qui vous pèse. L'IA écoute sans juger, disponible 24/7.",
          color: "text-blue-400",
          border: "border-blue-500/20"
      },
      {
          icon: Lightbulb,
          step: "02",
          title: "Comprendre",
          desc: "L'IA reformule et pose des questions pour vous aider à y voir clair.",
          color: "text-purple-400",
          border: "border-purple-500/20"
      },
      {
          icon: HeartHandshake,
          step: "03",
          title: "Avancer",
          desc: "Sentez-vous plus léger et trouvez vos propres solutions, à votre rythme.",
          color: "text-pink-400",
          border: "border-pink-500/20"
      }
  ];

  return (
    <section ref={sectionRef} className="py-32 px-4 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className={`text-center mb-24 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple comme un message.</h2>
            <p className="text-zinc-400 text-lg">Pas de rendez-vous, pas d'attente. Juste vous et un espace sûr.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line Desktop */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 -z-10 opacity-50"></div>

            {steps.map((s, i) => (
                <div 
                    key={i}
                    className={`bg-[#0f0f11] rounded-[32px] p-8 border border-white/5 relative group hover:-translate-y-2 transition-transform duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${i * 200}ms` }}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border ${s.border} ${s.color}`}>
                            <s.icon className="w-8 h-8" />
                        </div>
                        <span className="text-4xl font-black text-zinc-800 select-none group-hover:text-zinc-700 transition-colors">{s.step}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        {s.desc}
                    </p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};
