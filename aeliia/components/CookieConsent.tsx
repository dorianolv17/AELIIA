import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aelia_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aelia_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-[#0f0f12] border border-zinc-800 p-6 rounded-2xl shadow-2xl z-[90] animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="flex items-start gap-4">
        <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
            <Cookie className="w-6 h-6" />
        </div>
        <div className="flex-1">
            <h4 className="text-white font-bold mb-1">Confidentialité</h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Nous utilisons des cookies essentiels pour le fonctionnement de l'IA et la sauvegarde de vos préférences locales. Aucune donnée publicitaire n'est collectée.
            </p>
            <div className="flex gap-3">
                <button 
                    onClick={handleAccept}
                    className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                    Accepter
                </button>
                <button 
                    onClick={handleAccept}
                    className="text-zinc-500 text-xs font-medium px-2 py-2 hover:text-white transition-colors"
                >
                    Continuer sans accepter
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};