
import React from 'react';
import { ShieldCheck, Building2, User, Heart } from 'lucide-react';

export const WhyUs = () => {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Une mission, deux visages.
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
                AELIIA réconcilie le besoin d'intimité individuelle et la nécessité de prévention collective.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            
            {/* CARD INDIVIDUAL */}
            <div className="bg-[#121214] border border-zinc-800 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
                
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20 text-indigo-400">
                    <User className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Pour Vous (Individu)</h3>
                <p className="text-zinc-400 leading-relaxed mb-8 min-h-[80px]">
                    Un sanctuaire numérique pour déposer vos pensées sans filtre. L'IA vous aide à clarifier votre esprit, à toute heure du jour ou de la nuit.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
                        <Heart className="w-5 h-5 text-indigo-400" />
                        <span className="text-zinc-300 text-sm">Soutien émotionnel immédiat</span>
                    </div>
                    <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
                        <ShieldCheck className="w-5 h-5 text-indigo-400" />
                        <span className="text-zinc-300 text-sm">Confidentialité absolue</span>
                    </div>
                </div>
            </div>

            {/* CARD BUSINESS */}
            <div className="bg-[#121214] border border-zinc-800 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
                
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 text-blue-400">
                    <Building2 className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Pour l'Organisation</h3>
                <p className="text-zinc-400 leading-relaxed mb-8 min-h-[80px]">
                    Un outil de prévention des risques psychosociaux (RPS) qui respecte la vie privée tout en fournissant des indicateurs de santé collectifs.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                        <span className="text-zinc-300 text-sm">Réduction de l'absentéisme</span>
                    </div>
                    <div className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-white/5">
                        <Building2 className="w-5 h-5 text-blue-400" />
                        <span className="text-zinc-300 text-sm">Marque employeur bienveillante</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
