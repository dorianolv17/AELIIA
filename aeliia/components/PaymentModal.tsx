import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, CheckCircle, ShieldCheck, Loader2, Mail } from 'lucide-react';
import { User } from '../types';

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  user: User;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onSuccess, user }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  // Format Card Number
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(val);
  };

  // Format Expiry
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiry(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    // Simulate Network/Stripe Latency
    setTimeout(() => {
        setStep('success');
    }, 2500);
  };

  const handleFinish = () => {
      onSuccess();
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#0f0f12] border border-white/10 w-full max-w-lg rounded-3xl relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-zinc-900/50 p-6 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">A</div>
                <span className="font-semibold text-white">Abonnement Sérénité</span>
            </div>
            <div className="text-right">
                <div className="text-xl font-bold text-white">4.99 €</div>
                <div className="text-xs text-zinc-500">par mois</div>
            </div>
        </div>

        {/* Content */}
        <div className="p-8">
            {step === 'form' && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email</label>
                            <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-zinc-400 cursor-not-allowed flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {user.email}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Informations de carte</label>
                            <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30 focus-within:border-indigo-500 transition-colors">
                                <div className="flex items-center border-b border-zinc-800 px-3">
                                    <CreditCard className="w-5 h-5 text-zinc-500" />
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Numéro de carte" 
                                        value={cardNumber}
                                        onChange={handleCardChange}
                                        className="w-full bg-transparent p-3 outline-none text-white placeholder:text-zinc-600 font-mono"
                                        maxLength={19}
                                    />
                                </div>
                                <div className="flex">
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="MM / AA" 
                                        value={expiry}
                                        onChange={handleExpiryChange}
                                        className="w-1/2 bg-transparent p-3 outline-none text-white placeholder:text-zinc-600 border-r border-zinc-800 text-center"
                                        maxLength={5}
                                    />
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="CVC" 
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0,3))}
                                        className="w-1/2 bg-transparent p-3 outline-none text-white placeholder:text-zinc-600 text-center"
                                        maxLength={3}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Titulaire de la carte</label>
                            <input 
                                required
                                type="text" 
                                placeholder="Nom sur la carte" 
                                className="w-full bg-zinc-900/30 border border-zinc-800 rounded-xl p-3 text-white focus:border-indigo-500 outline-none transition-colors placeholder:text-zinc-600"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                        <Lock className="w-4 h-4" /> Payer 4.99 €
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600">
                        <ShieldCheck className="w-3 h-3 text-green-500" /> Paiement sécurisé via Stripe (Simulation)
                    </div>
                </form>
            )}

            {step === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-1">Confirmation auprès de la banque...</h3>
                        <p className="text-zinc-500 text-sm">Veuillez ne pas fermer cette fenêtre.</p>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 relative">
                         <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse"></div>
                         <CheckCircle className="w-10 h-10 text-green-500 relative z-10" />
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Paiement Réussi !</h3>
                        <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                            Bienvenue dans l'offre Sérénité. Votre compte a été mis à jour instantanément.
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 rounded-xl p-4 flex items-center gap-3 w-full text-left border border-zinc-800">
                        <div className="bg-zinc-800 p-2 rounded-lg">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-white text-sm font-medium">Email de confirmation envoyé</div>
                            <div className="text-zinc-500 text-xs">à {user.email}</div>
                        </div>
                    </div>

                    <button 
                        onClick={handleFinish}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Accéder à mes outils Premium
                    </button>
                </div>
            )}
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};
