import React, { useState, useEffect, useRef } from 'react';
import { Check, PhoneCall, Sparkles } from 'lucide-react';
import { User } from '../types';

interface PricingProps {
    onUpgrade: () => void;
    onAuthRequest: () => void;
    user: User | null;
}

const tiers = [
  {
    name: 'Essentiel',
    price: '0 €',
    period: '/toujours',
    description: 'Accès basique au moteur de conversation.',
    features: [
      'Chat IA illimité (Texte)',
      'Accès 24/7',
      'Anonymat complet',
      'Exercices de respiration'
    ],
    cta: 'Commencer',
    highlighted: false,
    id: 'free'
  },
  {
    name: 'Sérénité',
    price: '4.99 €',
    period: '/mois',
    description: 'L\'expérience complète avec voix et mémoire.',
    features: [
      'Mode Vocal Immersif (Live)',
      'Mémoire de conversation',
      'Personnalisation du profil',
      'Suivi d\'humeur avancé',
      'Support prioritaire'
    ],
    cta: 'Passer Premium',
    highlighted: true,
    id: 'premium'
  }
];

export const Pricing: React.FC<PricingProps> = ({ onUpgrade, onAuthRequest, user }) => {
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

  const handleAction = (tierId: string) => {
      if (tierId === 'premium') {
          if (!user) {
              onAuthRequest();
          } else if (!user.isPremium) {
              onUpgrade();
          }
      } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-black relative" id="pricing">
      <div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Investissez en <span className="text-zinc-500">vous-même.</span>
          </h2>
          <p className="text-zinc-400">Simple. Transparent. Sans engagement.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-[32px] p-8 md:p-10 border flex flex-col transition-transform hover:scale-[1.02] duration-500 ${
                tier.highlighted 
                  ? 'border-indigo-500/30 bg-[#0c0c14] shadow-2xl shadow-indigo-900/20' 
                  : 'border-zinc-800 bg-black'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-500/50 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Recommandé
                    </span>
                </div>
              )}

              <div className="mb-8 text-center">
                <h3 className={`text-lg font-medium mb-2 ${tier.highlighted ? 'text-indigo-300' : 'text-zinc-400'}`}>{tier.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-white tracking-tight">{tier.price}</span>
                  <span className="text-zinc-600 text-sm">{tier.period}</span>
                </div>
                <p className="text-zinc-500 mt-4 text-sm">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-zinc-300 text-sm">
                    {tier.highlighted ? (
                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-indigo-400" />
                        </div>
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-zinc-500" />
                        </div>
                    )}
                    <span className={feature.includes('Vocal') ? 'text-white font-bold' : ''}>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleAction(tier.id)}
                disabled={tier.id === 'premium' && user?.isPremium}
                className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all ${
                tier.highlighted 
                  ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10' 
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800'
              } ${tier.id === 'premium' && user?.isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {tier.id === 'premium' && user?.isPremium ? 'Plan Actif' : tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};