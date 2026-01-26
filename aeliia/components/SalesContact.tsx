import React, { useState, useEffect } from 'react';
import { X, CheckCircle, TrendingUp, Shield, Users, ArrowRight, Building2, Calculator, Trophy, Target, FileText, Smartphone, BarChart3, Lock, Zap, Server, MessageSquare, Clock, Globe, AlertTriangle, HeartHandshake, Map, Rocket, Activity, LayoutGrid, Award } from 'lucide-react';

interface SalesContactProps {
  onClose: () => void;
}

const b2bTestimonials = [
    {
        quote: "Nous avons réduit notre taux d'absentéisme de 12% en 6 mois. L'adoption a été immédiate car l'outil est vraiment anonyme, contrairement aux lignes d'écoute classiques.",
        author: "Valérie D.",
        role: "DRH @ NexaTech",
        logo: "N",
        metric: "-12% Absentéisme"
    },
    {
        quote: "Le tableau de bord nous a permis d'identifier une surcharge de travail au sein de l'équipe Marketing avant que cela ne se transforme en burn-out collectif.",
        author: "Marc L.",
        role: "CEO @ Visionary",
        logo: "V",
        metric: "Prévention Active"
    },
    {
        quote: "Un atout incroyable pour notre marque employeur. Les candidats sont impressionnés quand on leur dit qu'on offre un coach IA bien-être illimité.",
        author: "Sophie M.",
        role: "Talent Acquisition @ GreenPulse",
        logo: "G",
        metric: "Attractivité Talents"
    }
];

export const SalesContact: React.FC<SalesContactProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    size: '50 - 200 employés',
    message: ''
  });

  const [simEmployees, setSimEmployees] = useState(150);
  const [simSalary, setSimSalary] = useState(45000); 
  const [absenteeismRate, setAbsenteeismRate] = useState(5); 
  
  const [costCurrent, setCostCurrent] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const payroll = simEmployees * simSalary;
    const currentLoss = payroll * (absenteeismRate / 100);
    const estimatedSavings = currentLoss * 0.30;
    
    setCostCurrent(Math.round(currentLoss));
    setSavings(Math.round(estimatedSavings));
  }, [simEmployees, simSalary, absenteeismRate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Demande Partenariat AELIIA: ${formData.company}`;
    const body = `Bonjour Dorian,\n\nJe suis intéressé par le déploiement d'AELIIA au sein de mon entreprise.\n\nVoici mes informations :\n\n👤 Contact : ${formData.firstName} ${formData.lastName}\n📧 Email : ${formData.email}\n🏢 Entreprise : ${formData.company}\n👥 Effectif : ${formData.size}\n\n📝 Contexte & Besoins :\n${formData.message}\n\nCordialement,`;
    window.location.href = `mailto:dorian.olive@aeliia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] overflow-y-auto animate-in fade-in duration-500 custom-scrollbar">
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold tracking-tight text-white">AELIIA <span className="text-blue-500">Business</span></span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <span className="mr-2 text-sm text-zinc-500 group-hover:text-white transition-colors hidden md:inline">Fermer</span>
            <X className="w-6 h-6 text-zinc-400 group-hover:text-white inline" />
        </button>
      </nav>

      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        
        {/* HERO HEADER - Rebranded as Platform/Tool */}
        <div className="text-center mb-20 max-w-5xl mx-auto animate-in slide-in-from-bottom-10 fade-in duration-700">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 font-medium text-sm mb-8 animate-pulse-slow">
                <Trophy className="w-4 h-4" /> Solution QVT de l'année 2024 (Silver)
             </div>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
                La plateforme de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient-x">prévention active.</span>
             </h1>
             <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                Déployez une infrastructure d'écoute disponible 24/7. <br/>
                <span className="text-white font-medium">Réduisez l'absentéisme grâce à la détection précoce.</span>
             </p>
        </div>

        {/* 1. THE PROBLEM SECTION */}
        <div className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Le coût caché du silence</h2>
                <p className="text-zinc-400">Pourquoi vos collaborateurs ne parlent pas (jusqu'à ce qu'il soit trop tard).</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-red-950/10 border border-red-900/20 p-8 rounded-3xl relative overflow-hidden group hover:border-red-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <AlertTriangle className="w-24 h-24 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Burn-out Silencieux</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        La surcharge mentale s'accumule sans bruit. Quand le salarié craque, l'arrêt maladie est souvent de longue durée (6 mois+).
                    </p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-700 transition-all">
                    <h3 className="text-xl font-bold text-white mb-3">Isolement & Télétravail</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        Loin de la machine à café, la solitude s'installe. 42% des salariés en télétravail se disent isolés émotionnellement.
                    </p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group hover:border-zinc-700 transition-all">
                    <h3 className="text-xl font-bold text-white mb-3">Harcèlement & Non-dits</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        La peur des représailles empêche de parler aux RH. Le problème s'enkyste et détruit la cohésion d'équipe de l'intérieur.
                    </p>
                </div>
            </div>
        </div>

        {/* 2. THE ECOSYSTEM/TOOL SECTION (Enhanced) */}
        <div className="mb-24 bg-gradient-to-r from-blue-900/10 to-transparent border-y border-blue-500/10 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <LayoutGrid className="w-4 h-4" /> L'Écosystème AELIIA
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Un dispositif en 3 couches</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto text-blue-400 border border-blue-500/30">
                            <Activity className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">1. Détection (Outil)</h3>
                        <p className="text-zinc-400 text-sm">
                            Le collaborateur utilise l'app pour vider son sac. L'outil détecte le niveau de stress et les signaux faibles (insomnie, anxiété).
                        </p>
                    </div>
                     <div className="space-y-4">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto text-purple-400 border border-purple-500/30">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">2. Régulation (IA)</h3>
                        <p className="text-zinc-400 text-sm">
                            Exercices TCC immédiats, respiration guidée et recadrage cognitif pour faire baisser la pression à l'instant T.
                        </p>
                    </div>
                     <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto text-green-400 border border-green-500/30">
                            <HeartHandshake className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">3. Orientation (Humain)</h3>
                        <p className="text-zinc-400 text-sm">
                            Si le problème persiste ou est grave, l'outil oriente vers vos RH, la médecine du travail ou le 15/3114.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* 2b. MANAGER DASHBOARD PREVIEW (NEW) */}
        <div className="mb-32 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-[#0f0f12] rounded-2xl border border-zinc-800 p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Mock Dashboard UI */}
                <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="font-bold text-zinc-300">Portail RH • Vue d'ensemble</span>
                    </div>
                    <div className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">Octobre 2024</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-zinc-900/80 p-4 rounded-xl">
                        <div className="text-xs text-zinc-500 mb-1">Météo Sociale</div>
                        <div className="text-2xl font-bold text-white">7.2/10</div>
                        <div className="text-[10px] text-green-400 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1"/> +0.4 pts</div>
                    </div>
                     <div className="bg-zinc-900/80 p-4 rounded-xl">
                        <div className="text-xs text-zinc-500 mb-1">Risque Burn-out</div>
                        <div className="text-2xl font-bold text-orange-400">Faible</div>
                        <div className="text-[10px] text-zinc-500 mt-1">2 équipes sous surveillance</div>
                    </div>
                </div>

                <div className="space-y-3">
                     <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <span>Stress Tech Team</span>
                        <span>45%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[45%]"></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1 mt-3">
                        <span>Conflits Management</span>
                        <span>12%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[12%]"></div>
                    </div>
                </div>
            </div>

            <div className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                    <BarChart3 className="w-4 h-4" /> Pilotage par la donnée
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Ne pilotez plus à l'aveugle.</h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                    AELIIA agrège les données anonymisées de milliers de conversations pour vous donner une <strong className="text-white">météo sociale en temps réel</strong>.
                </p>
                <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        Identifiez les départements en souffrance.
                    </li>
                    <li className="flex gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        Mesurez l'impact de vos politiques QVT.
                    </li>
                    <li className="flex gap-3 text-sm text-zinc-300">
                        <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        Recevez des alertes préventives (pas de noms, juste des tendances).
                    </li>
                </ul>
            </div>
        </div>

        {/* 3. THE TRAJECTORY (ROADMAP V1 -> V2) */}
        <div className="mb-24 max-w-5xl mx-auto">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Une vision long terme pour vos équipes</h2>
                <p className="text-zinc-400">Nous ne faisons pas que régler les problèmes, nous construisons la résilience.</p>
            </div>
            
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 hidden md:block"></div>
                <div className="grid md:grid-cols-2 gap-12 relative z-10">
                    <div className="bg-[#09090b] border border-blue-500/30 p-8 rounded-3xl shadow-lg shadow-blue-900/10">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/30">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">V1 : AELIIA Care (Actuel)</h3>
                        <p className="text-zinc-400 text-sm mb-4 min-h-[40px]">L'IA comme filet de sécurité. Réactive et apaisante.</p>
                        <ul className="space-y-2 text-sm text-zinc-300">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-blue-500"/> Gestion du stress immédiat</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-blue-500"/> Écoute active 24/7</li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900/20 to-[#09090b] border border-indigo-500/30 p-8 rounded-3xl shadow-lg shadow-indigo-900/10 opacity-90">
                         <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/30">
                            <Rocket className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">V2 : AELIIA Coach (Q4 2024)</h3>
                        <p className="text-zinc-400 text-sm mb-4 min-h-[40px]">L'IA proactive pour le développement des Soft Skills.</p>
                        <ul className="space-y-2 text-sm text-zinc-300">
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-indigo-500"/> Coaching leadership & confiance</li>
                            <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-indigo-500"/> Préparation aux entretiens</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* INTEGRATION TECH STACK */}
        <div className="mb-24">
            <p className="text-center text-zinc-500 text-sm mb-6 uppercase tracking-widest font-semibold">Intégration transparente avec vos outils</p>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" className="w-6 h-6" alt="Slack" />
                    <span className="text-white font-medium">Slack</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" className="w-6 h-6" alt="Teams" />
                    <span className="text-white font-medium">Microsoft Teams</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <Shield className="w-6 h-6 text-green-500" />
                    <span className="text-white font-medium">SSO & SAML</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <Globe className="w-6 h-6 text-blue-500" />
                    <span className="text-white font-medium">Intranet Link</span>
                </div>
            </div>
        </div>

        {/* ETHICS BADGE (New) */}
        <div className="mb-24 flex justify-center">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 max-w-2xl text-center flex flex-col items-center gap-4">
                 <div className="flex gap-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                    <Lock className="w-6 h-6 text-green-500" />
                 </div>
                 <p className="text-sm text-zinc-400">
                     <strong>Garantie Éthique :</strong> AELIIA s'engage contractuellement à ne jamais utiliser les conversations à des fins publicitaires ou de profilage individuel. Conformité RGPD et Directive Européenne IA Act.
                 </p>
            </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="mb-32 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">ROI & Performance</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800">
                            <th className="py-4 text-left text-zinc-500 font-medium pl-4">Critère</th>
                            <th className="py-4 text-center text-zinc-400 font-medium">Ligne d'écoute Classique</th>
                            <th className="py-4 text-center text-blue-400 font-bold bg-blue-500/5 rounded-t-xl border-t border-x border-blue-500/20">AELIIA Business</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-zinc-800">
                            <td className="py-4 text-zinc-300 pl-4 font-semibold">Disponibilité</td>
                            <td className="py-4 text-center text-zinc-500">Souvent 9h-18h (jours ouvrés)</td>
                            <td className="py-4 text-center text-white bg-blue-500/5 border-x border-blue-500/20 font-bold">24h/24 et 7j/7 (Même à 3h du matin)</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                            <td className="py-4 text-zinc-300 pl-4 font-semibold">Taux d'utilisation moyen</td>
                            <td className="py-4 text-center text-zinc-500">Faible (~2-3%) - Peur du jugement</td>
                            <td className="py-4 text-center text-white bg-blue-500/5 border-x border-blue-500/20 font-bold">Élevé (~45%) - Anonymat total IA</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                            <td className="py-4 text-zinc-300 pl-4 font-semibold">Temps d'attente</td>
                            <td className="py-4 text-center text-zinc-500">Plusieurs minutes / Rendez-vous</td>
                            <td className="py-4 text-center text-white bg-blue-500/5 border-x border-blue-500/20 font-bold">Instantané (&lt; 1 seconde)</td>
                        </tr>
                        <tr className="border-b border-zinc-800">
                            <td className="py-4 text-zinc-300 pl-4 font-semibold">Reporting RH</td>
                            <td className="py-4 text-center text-zinc-500">Statistiques basiques trimestrielles</td>
                            <td className="py-4 text-center text-white bg-blue-500/5 border-x border-blue-500/20 font-bold">Dashboard temps réel (Tendances anonymisées)</td>
                        </tr>
                         <tr>
                            <td className="py-4 text-zinc-300 pl-4 font-semibold">Coût par employé</td>
                            <td className="py-4 text-center text-zinc-500">Élevé (Facturation à l'acte souvent)</td>
                            <td className="py-4 text-center text-white bg-blue-500/5 border-x border-b border-blue-500/20 rounded-b-xl font-bold">Forfait fixe & Illimité</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* ROI SIMULATOR SECTION */}
        <div className="mb-32 bg-gradient-to-br from-zinc-900 to-black rounded-[40px] border border-zinc-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                <Calculator className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Calculez votre ROI</h3>
                        </div>
                        <p className="text-zinc-400 text-lg">
                            Le mal-être au travail a un coût direct. <br/>
                            Voyez combien vous pourriez économiser en agissant maintenant.
                        </p>
                    </div>
                    
                    <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-zinc-300">Effectif (Salariés)</label>
                                <span className="text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded-md">{simEmployees}</span>
                            </div>
                            <input 
                                type="range" min="10" max="2000" step="10" 
                                value={simEmployees} 
                                onChange={(e) => setSimEmployees(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-zinc-300">Salaire Moyen Chargé (Annuel)</label>
                                <span className="text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded-md">{simSalary.toLocaleString()} €</span>
                            </div>
                            <input 
                                type="range" min="30000" max="100000" step="1000" 
                                value={simSalary} 
                                onChange={(e) => setSimSalary(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-zinc-300">Taux Absentéisme Actuel (%)</label>
                                <span className="text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded-md">{absenteeismRate}%</span>
                            </div>
                            <input 
                                type="range" min="1" max="15" step="0.5" 
                                value={absenteeismRate} 
                                onChange={(e) => setAbsenteeismRate(parseFloat(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                     <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center backdrop-blur-sm">
                         <h4 className="text-red-300 text-xs font-bold uppercase tracking-widest mb-2">Coût Annuel de l'Absentéisme (Est.)</h4>
                         <div className="text-4xl md:text-5xl font-bold text-red-400">
                            {costCurrent.toLocaleString()} €
                         </div>
                         <p className="text-red-300/60 text-xs mt-2">Perte sèche estimée pour l'entreprise</p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 text-center backdrop-blur-sm relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                         <h4 className="text-green-300 text-xs font-bold uppercase tracking-widest mb-2">Économies Potentielles avec AELIIA</h4>
                         <div className="text-5xl md:text-6xl font-bold text-green-400 mb-2">
                            {savings.toLocaleString()} €
                         </div>
                         <p className="text-green-300/60 text-xs mt-2">En réduisant les risques psychosociaux de 30%</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Deep Features & Trust */}
            <div className="space-y-12">
                
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Pourquoi les DRH nous choisissent</h2>
                    <div className="space-y-6">
                        <div className="flex gap-5 group">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Prévention Primaire (DUERP)</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    Agissez à la source. AELIIA aide à identifier les causes du stress (organisation, management, charge) grâce aux données agrégées, vous permettant de mettre à jour votre Document Unique.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 group">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-1 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                                <Server className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Conformité RGPD & Hébergement HDS</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    Vos données sont sacrées. Hébergement souverain, chiffrement de bout en bout et conformité totale avec le RGPD. Nous agissons en tant que tiers de confiance neutre.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-5 group">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0 mt-1 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Marque Employeur Innovante</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    Montrez concrètement que vous prenez soin de vos équipes. Un atout majeur pour attirer et fidéliser la Gen Z et les profils Tech.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* B2B Testimonials Section */}
                <div className="pt-8 border-t border-zinc-800">
                    <h3 className="text-2xl font-bold text-white mb-8">La parole aux décideurs</h3>
                    <div className="grid gap-4">
                        {b2bTestimonials.map((t, idx) => (
                            <div key={idx} className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800 hover:bg-zinc-900/80 transition-all hover:border-zinc-600">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 shadow-inner">
                                        {t.logo}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-white font-semibold text-sm">{t.author} <span className="text-zinc-500 font-normal"> - {t.role}</span></div>
                                            <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 font-medium whitespace-nowrap">{t.metric}</span>
                                        </div>
                                        <p className="text-zinc-400 italic text-sm leading-relaxed">"{t.quote}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-[#09090b] border border-zinc-800 rounded-[32px] p-8 lg:p-10 sticky top-32 shadow-2xl shadow-black/80 ring-1 ring-white/5">
                {step === 1 ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Obtenir une démonstration</h3>
                            <p className="text-zinc-400 text-sm">Échangez avec Dorian, notre responsable partenariats.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Prénom</label>
                                <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-zinc-700" placeholder="Jean" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Nom</label>
                                <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-zinc-700" placeholder="Dupont" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Email Professionnel</label>
                            <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-zinc-700" placeholder="jean@entreprise.com" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Entreprise</label>
                            <input required name="company" value={formData.company} onChange={handleChange} type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors placeholder:text-zinc-700" placeholder="Nom de votre société" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Effectif</label>
                            <select name="size" value={formData.size} onChange={handleChange} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors">
                                <option>10 - 50 employés</option>
                                <option>50 - 200 employés</option>
                                <option>200 - 1000 employés</option>
                                <option>+1000 employés</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Contexte (Optionnel)</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 text-white focus:border-blue-500 outline-none transition-colors h-20 resize-none placeholder:text-zinc-700" placeholder="Ex: Hausse de l'absentéisme, volonté d'améliorer la QVT..."></textarea>
                        </div>

                        <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-white/10 mt-2">
                            Contacter l'équipe Sales <ArrowRight className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 mt-4">
                            <Lock className="w-3 h-3" /> Données sécurisées & Confidentielles
                        </div>
                    </form>
                ) : (
                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 relative">
                            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse"></div>
                            <CheckCircle className="w-12 h-12 text-green-500 relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Prêt à l'envoi !</h3>
                        <p className="text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed">
                            Votre client mail a été ouvert avec les détails de votre demande pour <strong>Dorian Olive</strong>.
                            <br/><br/>
                            Cliquez sur "Envoyer" dans votre messagerie pour finaliser la demande.
                        </p>
                        <button onClick={onClose} className="px-6 py-2 bg-zinc-800 rounded-full text-white text-sm hover:bg-zinc-700 transition-colors">
                            Retourner au site
                        </button>
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};