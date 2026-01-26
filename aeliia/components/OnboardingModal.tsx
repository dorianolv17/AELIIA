import React, { useState } from 'react';
import { X, User, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingModalProps {
  onClose: () => void;
  onSubmit: (profile: UserProfile) => void;
  initialName?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose, onSubmit, initialName = '' }) => {
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && gender) {
        onSubmit({ name, age, gender });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#09090b] border border-white/10 w-full max-w-md rounded-3xl p-8 relative shadow-2xl shadow-indigo-500/10 overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none"></div>

        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                <Sparkles className="w-7 h-7 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Faisons connaissance</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
                Pour que je puisse t'aider au mieux, j'ai besoin de savoir un peu qui tu es.
                <span className="block text-xs text-zinc-500 mt-2">(Ces infos restent strictement confidentielles)</span>
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Ton Prénom</label>
                <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-zinc-600" />
                    <input 
                        required 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                        placeholder="Comment t'appelles-tu ?"
                        autoFocus
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Âge</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-zinc-600" />
                        <input 
                            required 
                            type="number" 
                            min="10"
                            max="99"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                            placeholder="Ex: 24"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider ml-1">Genre</label>
                    <select 
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 px-3 text-white focus:border-indigo-500 outline-none transition-colors"
                    >
                        <option value="" disabled>Choisir...</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Non-binaire">Non-binaire</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-white/10 mt-6"
            >
                Commencer la discussion <ArrowRight className="w-5 h-5" />
            </button>
        </form>
      </div>
    </div>
  );
};