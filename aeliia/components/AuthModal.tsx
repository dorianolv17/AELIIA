import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !acceptedTerms) {
        alert("Veuillez accepter les conditions générales et la politique de confidentialité pour créer un compte.");
        return;
    }

    setIsLoading(true);

    // Simulation d'un délai réseau API
    setTimeout(() => {
      const fakeUser: UserType = {
        name: isLogin ? (formData.email.split('@')[0] || 'Utilisateur') : formData.name,
        email: formData.email,
        isPremium: false // Par défaut
      };
      
      onLogin(fakeUser);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#09090b] border border-white/10 w-full max-w-md rounded-3xl p-8 relative shadow-2xl shadow-indigo-500/10 overflow-hidden">
        
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Bon retour' : 'Rejoindre AELIIA'}
            </h2>
            <p className="text-zinc-400 text-sm">
                {isLogin ? 'Connectez-vous pour retrouver votre espace.' : 'Créez votre espace sécurisé et anonyme.'}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Prénom / Pseudo</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                        <input 
                            required 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                            placeholder="Votre prénom"
                        />
                    </div>
                </div>
            )}

            <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                    <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                        placeholder="exemple@email.com"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Mot de passe</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                    <input 
                        required 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-700"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            {/* Terms and Conditions Checkbox (Mandatory for Signup) */}
            {!isLogin && (
                <div className="flex items-start gap-3 mt-4">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            required
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="w-5 h-5 border-zinc-700 rounded bg-zinc-900/50 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-black transition-all cursor-pointer" 
                        />
                    </div>
                    <label htmlFor="terms" className="text-xs text-zinc-400 cursor-pointer leading-tight">
                        J'accepte les <span className="text-zinc-200 underline">Conditions Générales d'Utilisation</span> et la <span className="text-zinc-200 underline">Politique de Confidentialité</span>. Je confirme avoir plus de 18 ans.
                    </label>
                </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-white/10 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        {isLogin ? 'Se connecter' : "Créer mon compte"} 
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
        </form>

        <div className="mt-6 text-center">
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-zinc-500 hover:text-white text-sm transition-colors"
            >
                {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-zinc-600">
             <Lock className="w-3 h-3" /> Connexion chiffrée & sécurisée
        </div>

      </div>
    </div>
  );
};