import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: "AELIIA remplace-t-elle un psychologue ?",
    answer: "Non, AELIIA est un outil d'accompagnement et de soutien émotionnel, pas un dispositif médical. Elle est idéale pour le développement personnel, la gestion du stress quotidien et l'écoute active. Pour des troubles psychiatriques sévères, nous recommandons toujours de consulter un spécialiste de santé."
  },
  {
    question: "Mes conversations sont-elles vraiment privées ?",
    answer: "Absolument. La confidentialité est notre priorité absolue. Vos échanges sont chiffrés et anonymisés. Nous ne vendons jamais vos données personnelles et l'IA est conçue pour respecter votre vie privée."
  },
  {
    question: "Comment fonctionne le mode 'Live' ?",
    answer: "Le mode Live utilise une technologie vocale avancée en temps réel. Vous parlez à AELIIA comme à une personne au téléphone, et elle vous répond instantanément avec une voix naturelle et empathique. C'est une expérience très immersive."
  },
  {
    question: "Puis-je annuler mon abonnement ?",
    answer: "Oui, vous pouvez annuler votre abonnement 'Sérénité' à tout moment depuis votre espace compte. L'annulation prend effet à la fin de la période de facturation en cours. L'offre gratuite reste toujours accessible."
  },
  {
    question: "L'IA peut-elle gérer des situations de crise ?",
    answer: "AELIIA est entraînée pour détecter la détresse et offrir un soutien apaisant. Cependant, en cas d'urgence vitale ou de danger immédiat (suicide, violence), l'IA vous orientera vers les numéros d'urgence nationaux compétents."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-16 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className={`max-w-3xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 text-indigo-400 mb-6">
             <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4"><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-300 to-white animate-gradient-x">Questions Fréquentes</span></h2>
          <p className="text-zinc-400">Tout ce que vous devez savoir pour commencer sereinement.</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`bg-black border ${openIndex === index ? 'border-indigo-500/50 ring-1 ring-indigo-500/20' : 'border-zinc-800'} rounded-2xl overflow-hidden transition-all duration-300`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors"
              >
                <span className="font-medium text-white text-lg">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-zinc-500" />
                )}
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <p className="text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};