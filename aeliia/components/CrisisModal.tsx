
import React from 'react';
import { Phone, AlertTriangle, X } from 'lucide-react';

interface CrisisModalProps {
  onClose: () => void; // Allow closing in case of false positive
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-red-950/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-black border-2 border-red-500 rounded-3xl max-w-lg w-full p-8 shadow-2xl shadow-red-500/50 relative overflow-hidden">
        
        {/* Background Animation */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500 animate-pulse"></div>
        
        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <AlertTriangle className="w-10 h-10 text-white fill-current" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Alerte Sécurité</h2>
            <p className="text-red-200 text-lg">
              Nous avons détecté une détresse importante dans vos propos. <br/>
              Vous n'êtes pas seul(e).
            </p>
          </div>

          <div className="w-full space-y-4">
            <a 
              href="tel:3114" 
              className="w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/50"
            >
              <Phone className="w-6 h-6" />
              Appeler Urgence Suicide (3114)
            </a>
            
            <a 
              href="tel:15" 
              className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors"
            >
              Appeler le SAMU (15)
            </a>
          </div>

          <p className="text-zinc-500 text-sm mt-4">
            L'intelligence artificielle s'est mise en pause par sécurité.
          </p>

          <button 
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-400 text-xs underline mt-2"
          >
            C'est une erreur, je vais bien (Fermer)
          </button>
        </div>
      </div>
    </div>
  );
};
