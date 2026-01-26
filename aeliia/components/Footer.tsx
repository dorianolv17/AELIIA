import React from 'react';
import { Heart, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (tab: 'mentions' | 'privacy' | 'cgu') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="py-12 bg-black border-t border-zinc-900 text-center text-zinc-500 text-sm">
      
      {/* Emergency / Crisis Prevention Banner */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 text-center backdrop-blur-sm">
            <h4 className="text-red-400 font-semibold mb-3 flex items-center justify-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5" /> Avertissement Important & Urgences
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">
                AELIIA est une intelligence artificielle de soutien émotionnel et de développement personnel. 
                <span className="text-zinc-300 font-medium"> Elle ne remplace en aucun cas un avis médical, un diagnostic ou une intervention psychiatrique.</span>
                <br /><br />
                Si vous avez des pensées suicidaires, si vous êtes en danger immédiat ou si vous avez besoin d'une aide médicale urgente, veuillez contacter immédiatement les services compétents :
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                <span className="px-4 py-2 bg-red-500/10 text-red-300 rounded-lg border border-red-500/20 font-bold">
                    🇫🇷 15 (SAMU)
                </span>
                <span className="px-4 py-2 bg-red-500/10 text-red-300 rounded-lg border border-red-500/20 font-bold">
                    🇪🇺 112 (Urgences Europe)
                </span>
                <span className="px-4 py-2 bg-red-500/10 text-red-300 rounded-lg border border-red-500/20 font-bold">
                    📞 3114 (Prévention Suicide)
                </span>
            </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mb-8">
         <div className="font-bold text-2xl text-white tracking-tight">AELIIA</div>
         <p>Conçu avec <Heart className="w-4 h-4 inline text-red-500 mx-1" /> pour votre bien-être.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 px-4">
        <button onClick={() => onOpenLegal('mentions')} className="hover:text-white transition-colors">Mentions Légales</button>
        <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors">Politique de Confidentialité</button>
        <button onClick={() => onOpenLegal('cgu')} className="hover:text-white transition-colors">CGU & CGV</button>
      </div>
      <p className="px-4">© {new Date().getFullYear()} AELIIA Inc. Tous droits réservés.</p>
    </footer>
  );
};