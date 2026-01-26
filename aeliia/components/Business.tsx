import React, { useState, useEffect, useRef } from 'react';
import { Building2, GraduationCap, ArrowRight, ShieldCheck, BarChart3, Users, Lock, PieChart, Sparkles, AlertCircle, TrendingUp, Activity } from 'lucide-react';

interface BusinessProps {
  onOpenSales: () => void;
  onOpenSchool: () => void;
}

type TabType = 'corporate' | 'school';

export const Business: React.FC<BusinessProps> = ({ onOpenSales, onOpenSchool }) => {
  const [activeTab, setActiveTab] = useState<TabType>('corporate');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const content = {
    corporate: {
      label: "Entreprises & DRH",
      title: "Anticipez les risques psychosociaux.",
      headline: "Vos équipes ne vous disent pas tout.",
      description: "Le stress, l'épuisement et les conflits sont souvent invisibles jusqu'à l'arrêt maladie. AELIIA agit comme un tiers de confiance anonyme pour absorber la charge mentale immédiate et vous fournir des données agrégées pour piloter votre QVT.",
      features: [
        { icon: BarChart3, text: "Audit du climat social en temps réel" },
        { icon: ShieldCheck, text: "Conformité RGPD & Anonymat total" },
        { icon: Users, text: "Réduction de l'absentéisme" }
      ],
      action: "Demander une démo RH",
      gradient: "from-blue-500 to-indigo-600",
      accent: "text-blue-400",
      bgAccent: "bg-blue-500",
      dashboard: {
        score: "7.2",
        trend: "+0.4",
        alertCount: 3,
        synthesis: "Sentiment de surcharge détecté dans l'équipe Tech. 12 collaborateurs signalent des délais irréalistes.",
        topics: [
            { label: "Charge de travail", val: 78, color: "bg-red-500" },
            { label: "Manque de reconnaissance", val: 45, color: "bg-orange-500" },
            { label: "Conflits Management", val: 22, color: "bg-blue-500" }
        ]
      }
    },
    school: {
      label: "Écoles & Campus",
      title: "Sécurisez le parcours étudiant.",
      headline: "L'antidote à la solitude numérique.",
      description: "Précarité, pression des examens, éloignement familial : vos étudiants craquent souvent la nuit. AELIIA est le filet de sécurité disponible 24/7 pour désamorcer les crises d'angoisse quand le campus est fermé.",
      features: [
        { icon: PieChart, text: "Détection des signaux faibles" },
        { icon: Lock, text: "Espace sûr et sans jugement" },
        { icon: GraduationCap, text: "Lutte contre le décrochage" }
      ],
      action: "Programme Partenaire Campus",
      gradient: "from-purple-500 to-pink-600",
      accent: "text-purple-400",
      bgAccent: "bg-purple-500",
      dashboard: {
        score: "6.4",
        trend: "-0.2",
        alertCount: 8,
        synthesis: "Pic d'anxiété pré-partiels. 65% des échanges nocturnes concernent la peur de l'échec.",
        topics: [
            { label: "Stress Examens", val: 82, color: "bg-purple-500" },
            { label: "Isolement Social", val: 54, color: "bg-pink-500" },
            { label: "Précarité Financière", val: 31, color: "bg-yellow-500" }
        ]
      }
    }
  };

  const current = content[activeTab];
  const isCorp = activeTab === 'corporate';

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 bg-[#050505] relative overflow-hidden">
       
       {/* Fond ambiant subtil */}
       <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 transition-colors duration-1000 ${isCorp ? 'bg-blue-600/10' : 'bg-purple-600/10'}`}></div>

       <div className="max-w-7xl mx-auto relative z-10">
        
        {/* EN-TÊTE : Toggle Switch Pro */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
            <h2 className={`text-4xl md:text-5xl font-bold text-white text-center tracking-tight mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Une solution pour <span className="text-zinc-500">chaque structure.</span>
            </h2>

            <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-full flex relative shadow-xl">
                {/* Background Slider */}
                <div className={`absolute top-1.5 bottom-1.5 rounded-full bg-zinc-800 shadow-sm transition-all duration-500 ease-out w-[160px] ${isCorp ? 'left-1.5' : 'translate-x-[160px] left-1.5'}`}></div>
                
                <button 
                    onClick={() => setActiveTab('corporate')}
                    className={`relative z-10 w-[160px] py-3 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${isCorp ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <Building2 className="w-4 h-4" /> Entreprise
                </button>
                <button 
                    onClick={() => setActiveTab('school')}
                    className={`relative z-10 w-[160px] py-3 rounded-full text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${!isCorp ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <GraduationCap className="w-4 h-4" /> Éducation
                </button>
            </div>
        </div>

        {/* CONTENU PRINCIPAL : Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Colonne Gauche : Argumentaire */}
            <div className={`space-y-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-opacity-10 text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${isCorp ? 'bg-blue-500 border-blue-500/20 text-blue-400' : 'bg-purple-500 border-purple-500/20 text-purple-400'}`}>
                    {current.label}
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                    {current.title}
                    <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${current.gradient} mt-2`}>
                        {current.headline}
                    </span>
                </h3>

                <p className="text-lg text-zinc-400 leading-relaxed border-l-2 border-zinc-800 pl-6">
                    {current.description}
                </p>

                <div className="space-y-4 pt-4">
                    {current.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-zinc-300">
                            <div className={`p-2 rounded-lg bg-zinc-900 border border-zinc-800 ${current.accent}`}>
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{feature.text}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-6">
                    <button 
                        onClick={isCorp ? onOpenSales : onOpenSchool}
                        className={`group px-8 py-4 rounded-xl text-white font-bold flex items-center gap-3 transition-all hover:scale-[1.02] shadow-lg bg-gradient-to-r ${current.gradient}`}
                    >
                        {current.action} 
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-xs text-zinc-500 mt-4 flex items-center gap-2">
                        <Lock className="w-3 h-3" /> Déploiement sécurisé sans intégration technique complexe.
                    </p>
                </div>
            </div>

            {/* Colonne Droite : Dashboard Avancé */}
            <div className={`relative transition-all duration-700 delay-100 perspective-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${current.gradient} opacity-10 blur-3xl rounded-3xl`}></div>
                
                {/* Dashboard Card Container */}
                <div className="relative bg-[#09090b]/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden group">
                    
                    {/* Scan Line Animation */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${current.gradient} opacity-50 blur-sm animate-[scan_3s_ease-in-out_infinite]`}></div>
                    
                    {/* Header Dashboard */}
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500"></div>
                            </div>
                            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest ml-2">AELIIA ANALYTICS • LIVE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs text-green-500 font-bold">En ligne</span>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        
                        {/* 1. Synthèse IA Highlight */}
                        <div className={`p-4 rounded-xl border border-white/5 bg-gradient-to-br ${isCorp ? 'from-blue-500/10' : 'from-purple-500/10'} to-transparent relative overflow-hidden`}>
                            <div className="flex items-start gap-3">
                                <Sparkles className={`w-5 h-5 ${current.accent} flex-shrink-0 mt-0.5 animate-pulse`} />
                                <div>
                                    <h4 className={`text-sm font-bold ${current.accent} mb-1 uppercase tracking-wide`}>Synthèse Hebdomadaire</h4>
                                    <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                                        "{current.dashboard.synthesis}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. KPI Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Score Bien-être */}
                            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 relative group/card hover:border-zinc-700 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs text-zinc-500 font-semibold uppercase">Météo Sociale</span>
                                    <Activity className="w-4 h-4 text-zinc-600" />
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-white">{current.dashboard.score}</span>
                                    <span className="text-sm text-zinc-500 mb-1">/10</span>
                                </div>
                                <div className={`text-xs mt-2 font-medium flex items-center gap-1 ${current.dashboard.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    <TrendingUp className="w-3 h-3" /> {current.dashboard.trend} vs m-1
                                </div>
                            </div>

                            {/* Alertes */}
                            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 relative group/card hover:border-red-900/50 transition-colors">
                                <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs text-zinc-500 font-semibold uppercase">Signaux Faibles</span>
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-white">{current.dashboard.alertCount}</span>
                                    <span className="text-sm text-zinc-500 mb-1">détectés</span>
                                </div>
                                <div className="text-xs text-zinc-500 mt-2">
                                    Nécessite attention
                                </div>
                            </div>
                        </div>

                        {/* 3. Topic Breakdown Bars */}
                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-400 font-bold uppercase">Sujets Dominants</span>
                                <span className="text-[10px] text-zinc-600 bg-zinc-900 px-2 py-1 rounded">Basé sur 142 conversations</span>
                            </div>
                            
                            {current.dashboard.topics.map((topic, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-300 font-medium">{topic.label}</span>
                                        <span className="text-zinc-500">{topic.val}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${topic.color} transition-all duration-1000 ease-out`} 
                                            style={{ width: `${isVisible ? topic.val : 0}%`, transitionDelay: `${i * 200}ms` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Disclaimer */}
                        <div className="pt-4 border-t border-zinc-800 text-center">
                            <p className="text-[10px] text-zinc-600 flex items-center justify-center gap-1.5">
                                <Lock className="w-3 h-3" /> Données 100% anonymisées & agrégées
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};