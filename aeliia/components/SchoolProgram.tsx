import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Heart, BookOpen, Users, ArrowRight, School, MessageCircle, Calculator, ShieldCheck, CheckCircle, Smartphone, BarChart3, Globe, Download, FileText, Lock, TrendingUp, AlertTriangle, Zap, Rocket, Map, Calendar, Coffee, Moon } from 'lucide-react';

interface SchoolProgramProps {
  onClose: () => void;
}

// Academic Testimonials
const academicTestimonials = [
    {
        quote: "Les délais d'attente au BAPU étaient de 4 mois. Avec AELIIA, nos étudiants ont une réponse immédiate. Nous avons noté une baisse significative des abandons en première année.",
        author: "Dr. Hélène V.",
        role: "Directrice Vie Étudiante @ Univ. Paris",
        logo: "U"
    },
    {
        quote: "L'anonymat est la clé. Beaucoup d'étudiants n'osaient pas venir à l'infirmerie de peur d'être stigmatisés. AELIIA a libéré la parole sur le campus.",
        author: "Marc D.",
        role: "Président BDE @ Business School Lyon",
        logo: "B"
    },
    {
        quote: "Le tableau de bord nous a permis de voir que la période de novembre était critique. Nous avons pu adapter notre communication préventive grâce aux données.",
        author: "Sophie L.",
        role: "Référente Santé @ École Ingénieur Est",
        logo: "E"
    }
];

export const SchoolProgram: React.FC<SchoolProgramProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
      school: '',
      role: 'Direction / Administration',
      name: '',
      email: '',
      phone: '',
      students: 2500,
      challenges: ''
  });

  // Simulator State
  const [simStudents, setSimStudents] = useState(2500);
  const [dropoutRate, setDropoutRate] = useState(12); // Taux moyen décrochage supérieur
  const [tuitionCost, setTuitionCost] = useState(6500); // Coût moyen scolarité/subvention par an
  
  const [studentsAtRisk, setStudentsAtRisk] = useState(0);
  const [financialLoss, setFinancialLoss] = useState(0);
  const [potentialSaved, setPotentialSaved] = useState(0);

  // Brochure Modal State
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [brochureEmail, setBrochureEmail] = useState('');
  const [brochureStep, setBrochureStep] = useState(1);

  // Update Simulator
  useEffect(() => {
    // Calculs
    const atRisk = Math.round(simStudents * (dropoutRate / 100)); // Étudiants décrocheurs
    const loss = atRisk * tuitionCost; // Perte financière (frais scolarité ou subventions perdues)
    
    // Impact AELIIA : Estime sauver 25% des décrocheurs potentiels grâce à l'intervention précoce
    const saved = Math.round(loss * 0.25);

    setStudentsAtRisk(atRisk);
    setFinancialLoss(loss);
    setPotentialSaved(saved);
    
    // Sync form data with simulator
    setFormData(prev => ({ ...prev, students: simStudents }));
  }, [simStudents, dropoutRate, tuitionCost]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const subject = `Projet Campus AELIIA : ${formData.school}`;
      
      const body = `Bonjour l'équipe Éducation,\n\nJe souhaite étudier le déploiement d'AELIIA pour mon établissement.\n\n🏫 ÉTABLISSEMENT\nNom : ${formData.school}\nEffectif : ${formData.students} étudiants\nType de profil : ${formData.role}\n\n👤 CONTACT\nNom : ${formData.name}\nEmail : ${formData.email}\nTel : ${formData.phone}\n\n🎯 ENJEUX & SIMULATION\nTaux de décrochage estimé : ${dropoutRate}%\nEnjeu financier estimé : ${financialLoss.toLocaleString()}€ / an\n\n💬 Message spécifique :\n${formData.challenges}\n\nMerci de me recontacter pour une démo.`;

      window.location.href = `mailto:education@aeliia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStep(2);
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const subject = "Demande de Brochure : AELIIA Campus 2024";
      const body = `Bonjour,\n\nJe souhaiterais recevoir la brochure détaillée (PDF) du programme AELIIA Campus pour étudier la solution.\n\nMerci de l'envoyer à : ${brochureEmail}`;
      
      window.location.href = `mailto:education@aeliia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setBrochureStep(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0510] overflow-y-auto animate-in fade-in duration-500 custom-scrollbar">
      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-[#0a0510]/90 backdrop-blur-xl border-b border-purple-500/10">
        <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-500" />
            <span className="text-xl font-bold tracking-tight text-white">AELIIA <span className="text-purple-400">Campus</span></span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <span className="mr-2 text-sm text-zinc-400 group-hover:text-white transition-colors hidden md:inline">Fermer</span>
            <X className="w-6 h-6 text-zinc-400 hover:text-white inline" />
        </button>
      </nav>

      {/* Hero Section */}
      <div className="pt-40 pb-20 px-4 text-center relative overflow-hidden">
         {/* Background Orbs */}
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-slow"></div>
         <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

         <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 font-medium text-sm">
                <Heart className="w-4 h-4 fill-current" /> Pour la santé mentale étudiante
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
                L'application officielle<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient-x">de votre campus.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Stress des examens, précarité, isolement. <br/>
                Offrez un <span className="text-white font-semibold">dispositif de soutien 24/7</span> accessible directement depuis la poche de vos étudiants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button onClick={() => document.getElementById('simulation-campus')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-50 transition-colors text-lg shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]">
                    Simuler l'impact sur mon école
                </button>
                <button 
                    onClick={() => setShowBrochureModal(true)}
                    className="px-8 py-4 bg-white/5 text-white border border-white/10 font-medium rounded-full hover:bg-white/10 transition-colors text-lg flex items-center gap-2 justify-center"
                >
                    <BookOpen className="w-5 h-5" /> Télécharger la brochure
                </button>
            </div>
         </div>
      </div>

       {/* 1. THE PROBLEM SECTION (SCHOOL) */}
       <div className="mb-24 max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">L'urgence invisible sur les campus</h2>
                <p className="text-zinc-400">Vos étudiants vivent une triple peine : académique, financière et sociale.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#1a1025] border border-purple-500/10 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" /> Solitude Numérique
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        Malgré les réseaux sociaux, 65% des étudiants se sentent profondément seuls. L'éloignement familial aggrave ce sentiment d'abandon.
                    </p>
                </div>
                <div className="bg-[#1a1025] border border-purple-500/10 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
                     <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" /> Harcèlement & Cyber
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        Le cyber-harcèlement ne s'arrête pas aux portes de l'amphi. Les victimes n'osent souvent pas en parler à l'administration de peur d'être exposées.
                    </p>
                </div>
                <div className="bg-[#1a1025] border border-purple-500/10 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/30 transition-all">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-orange-400" /> Pression de la Réussite
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                        La peur de l'échec et la précarité financière créent un cocktail explosif. L'anxiété de performance paralyse les talents les plus prometteurs.
                    </p>
                </div>
            </div>
        </div>

      {/* STUDENT JOURNEY VISUALIZATION */}
      <div className="py-20 bg-black/50 border-y border-purple-500/10 mb-24">
          <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-white text-center mb-16">Du stress à l'apaisement : le parcours étudiant</h2>
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                  
                  {/* Connecting Line */}
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-red-500/20 via-purple-500/50 to-green-500/20 -translate-y-1/2 -z-10"></div>

                  <div className="bg-[#1a1025] p-6 rounded-2xl border border-red-500/20 w-full md:w-1/3 text-center relative">
                      <div className="w-3 h-3 bg-red-500 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 md:hidden"></div>
                      <div className="text-3xl mb-4">😰</div>
                      <h3 className="text-white font-bold mb-2">23h00 • Veille de Partiels</h3>
                      <p className="text-zinc-400 text-sm">L'étudiant panique, n'arrive pas à dormir, pense à abandonner.</p>
                  </div>

                  <div className="bg-[#2d1b4e] p-6 rounded-2xl border border-purple-500/50 w-full md:w-1/3 text-center transform scale-110 shadow-2xl shadow-purple-500/20 relative z-10">
                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Intervention AELIIA</div>
                       <div className="text-3xl mb-4">🤖</div>
                      <h3 className="text-white font-bold mb-2">23h05 • Session IA</h3>
                      <p className="text-purple-200 text-sm">Écoute active, validation des émotions, exercice de respiration guidé, reframing cognitif.</p>
                  </div>

                  <div className="bg-[#1a1025] p-6 rounded-2xl border border-green-500/20 w-full md:w-1/3 text-center relative">
                       <div className="w-3 h-3 bg-green-500 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 md:hidden"></div>
                       <div className="text-3xl mb-4">😴</div>
                      <h3 className="text-white font-bold mb-2">23h30 • Retour au calme</h3>
                      <p className="text-zinc-400 text-sm">Niveau d'anxiété réduit. L'étudiant s'endort et se présente à l'examen le lendemain.</p>
                  </div>
              </div>
          </div>
      </div>

       {/* STUDENT USE CASES GRID (NEW) */}
        <div className="mb-24 max-w-6xl mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Un outil pour chaque moment de vie</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                    {icon: Moon, title: "Insomnie du Dimanche", desc: "Calmer les angoisses pré-semaine."},
                    {icon: BookOpen, title: "Blocage Révisions", desc: "Retrouver la motivation et la méthode."},
                    {icon: Heart, title: "Rupture Amoureuse", desc: "Un espace sûr pour pleurer sans jugement."},
                    {icon: Coffee, title: "Solitude Sociale", desc: "Briser l'isolement des premiers mois."}
                 ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
                        <item.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-zinc-400">{item.desc}</p>
                    </div>
                 ))}
            </div>
        </div>

       {/* 2. THE APPROACH (SCOPE) SCHOOL */}
       <div className="mb-24 px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <ShieldCheck className="w-4 h-4" /> Notre Approche Éthique
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Le confident de poche,<br/>disponible quand vous ne l'êtes pas.</h2>
                    <p className="text-zinc-300 leading-relaxed mb-6">
                        Les services de santé universitaires sont saturés (parfois 3 mois d'attente). AELIIA ne remplace pas vos psychologues, elle agit comme un <strong className="text-white">tampon immédiat</strong>.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400">1</div>
                            <p className="text-zinc-400 text-sm"><strong className="text-white">Triage Intelligent :</strong> AELIIA gère le stress quotidien (90% des demandes) et redirige les cas graves vers vos services compétents.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400">2</div>
                            <p className="text-zinc-400 text-sm"><strong className="text-white">Déstigmatisation :</strong> Pour un étudiant timide, parler à une IA est la première étape avant d'oser demander de l'aide à un humain.</p>
                        </li>
                    </ul>
                </div>
                 <div className="relative bg-[#120a1d] p-8 rounded-[40px] border border-purple-500/20 shadow-2xl">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none"></div>
                     <h3 className="text-center text-white font-bold mb-6">AELIIA vs Services Classiques</h3>
                     
                     <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <span className="text-zinc-400 text-sm">Disponibilité</span>
                            <div className="flex gap-4 text-sm font-medium">
                                <span className="text-red-400">9h-17h</span>
                                <ArrowRight className="w-4 h-4 text-zinc-600"/>
                                <span className="text-green-400">24h/24</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <span className="text-zinc-400 text-sm">Coût Étudiant</span>
                            <div className="flex gap-4 text-sm font-medium">
                                <span className="text-zinc-400">Variable</span>
                                <ArrowRight className="w-4 h-4 text-zinc-600"/>
                                <span className="text-green-400">100% Gratuit</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <span className="text-zinc-400 text-sm">Format</span>
                            <div className="flex gap-4 text-sm font-medium">
                                <span className="text-zinc-400">Rendez-vous</span>
                                <ArrowRight className="w-4 h-4 text-zinc-600"/>
                                <span className="text-green-400">Chat / Vocal</span>
                            </div>
                        </div>
                     </div>
                 </div>
            </div>
        </div>

      {/* DATA DASHBOARD PREVIEW */}
      <div className="py-24 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                <BarChart3 className="w-4 h-4" /> Pour l'Administration
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Pilotez le bien-être de votre campus</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  Ne naviguez plus à l'aveugle. AELIIA vous fournit des données agrégées et anonymisées pour comprendre les cycles de stress de votre établissement et agir proactivement.
              </p>
              
              <ul className="space-y-4">
                  <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                          <strong className="text-white block">Tendances en temps réel</strong>
                          <p className="text-zinc-500 text-sm">Identifiez les pics de stress par promotion (ex: "Master 1 - Période de stage").</p>
                      </div>
                  </li>
                  <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                          <strong className="text-white block">Alertes Signaux Faibles</strong>
                          <p className="text-zinc-500 text-sm">Détection précoce des risques de décrochage massif ou de mal-être généralisé.</p>
                      </div>
                  </li>
              </ul>
          </div>

          {/* Fake Dashboard UI */}
          <div className="bg-[#0f0f12] rounded-3xl border border-zinc-800 p-6 relative shadow-2xl">
              <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                  <div className="font-bold text-white">Dashboard Bien-être</div>
                  <div className="text-xs text-zinc-500">Derniers 30 jours</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-zinc-900 rounded-xl p-4">
                      <div className="text-zinc-500 text-xs mb-1">Sessions Totales</div>
                      <div className="text-2xl font-bold text-white">1,240</div>
                      <div className="text-green-500 text-xs">+12% vs m-1</div>
                  </div>
                  <div className="bg-zinc-900 rounded-xl p-4">
                      <div className="text-zinc-500 text-xs mb-1">Niveau Stress Moyen</div>
                      <div className="text-2xl font-bold text-yellow-500">6.4/10</div>
                      <div className="text-red-500 text-xs">+0.2 vs m-1</div>
                  </div>
              </div>
              <div className="space-y-3">
                  <div className="text-xs text-zinc-400 uppercase font-semibold">Sujets Principaux</div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                          <div className="bg-purple-500 h-full w-[75%]"></div>
                      </div>
                      <span>Examens (75%)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-500 h-full w-[45%]"></div>
                      </div>
                      <span>Solitude (45%)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                          <div className="bg-red-500 h-full w-[30%]"></div>
                      </div>
                      <span>Finances (30%)</span>
                  </div>
              </div>
          </div>
      </div>

      {/* DEPLOYMENT KIT (NEW) */}
      <div className="py-20 bg-gradient-to-b from-[#0a0510] to-[#120a1d]">
         <div className="max-w-7xl mx-auto px-4">
             <h2 className="text-3xl font-bold text-white text-center mb-16">Le Kit de Déploiement AELIIA</h2>
             
             <div className="bg-zinc-900/50 border border-purple-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12">
                 <div className="flex-1 space-y-6">
                     <h3 className="text-2xl font-bold text-white">Onboarding Physique & Digital</h3>
                     <p className="text-zinc-400 text-sm leading-relaxed">
                         Nous ne vous donnons pas juste des accès, nous vous aidons à communiquer. Pour que l'outil soit utilisé, il doit être visible.
                     </p>
                     <ul className="space-y-3">
                         <li className="flex items-center gap-3 text-zinc-300 text-sm">
                             <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">1</div>
                             Stickers QR Codes pour les zones de vie (Cafet', BU).
                         </li>
                         <li className="flex items-center gap-3 text-zinc-300 text-sm">
                             <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">2</div>
                             Flyers "Anti-Stress" pour les Welcome Packs.
                         </li>
                         <li className="flex items-center gap-3 text-zinc-300 text-sm">
                             <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">3</div>
                             Webinaires de présentation pour les BDE.
                         </li>
                     </ul>
                 </div>
                 <div className="flex-1 flex justify-center">
                      {/* Abstract representation of a kit */}
                      <div className="relative w-64 h-80 bg-white/5 border border-white/10 rounded-xl rotate-3 shadow-2xl p-4 flex flex-col items-center justify-center">
                          <div className="w-20 h-20 bg-purple-500 rounded-xl mb-4 flex items-center justify-center">
                              <Smartphone className="w-10 h-10 text-white" />
                          </div>
                          <div className="font-bold text-white text-center">Scan & Talk</div>
                          <div className="text-xs text-zinc-500 text-center mt-2">QR Code Unique Campus</div>
                          
                          {/* Floating Elements */}
                          <div className="absolute -top-4 -right-12 w-32 h-20 bg-[#120a1d] border border-purple-500/50 rounded-lg -rotate-12 flex items-center justify-center shadow-lg">
                              <span className="text-xs font-bold text-purple-400">Flyer A5</span>
                          </div>
                          <div className="absolute -bottom-4 -left-8 w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center shadow-xl border-4 border-[#0a0510]">
                              <span className="text-xs font-bold text-white">Sticker</span>
                          </div>
                      </div>
                 </div>
             </div>
         </div>
      </div>

      {/* SIMULATOR & CONTACT SECTION */}
      <div id="simulation-campus" className="py-24 px-4 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left: Simulator */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Combien coûte le décrochage ?</h2>
                    <p className="text-zinc-400">
                        La santé mentale est la 1ère cause d'abandon en études supérieures. <br/>
                        Estimez l'impact financier et humain d'une meilleure prise en charge.
                    </p>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-zinc-300">Nombre d'Étudiants</label>
                                <span className="text-purple-400 font-bold">{simStudents}</span>
                            </div>
                            <input 
                                type="range" min="100" max="20000" step="100" 
                                value={simStudents} 
                                onChange={(e) => setSimStudents(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-zinc-300">Taux de Décrochage (%)</label>
                                <span className="text-purple-400 font-bold">{dropoutRate}%</span>
                            </div>
                            <input 
                                type="range" min="1" max="30" step="1" 
                                value={dropoutRate} 
                                onChange={(e) => setDropoutRate(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-zinc-300">Coût/Subvention par Étudiant (€)</label>
                                <span className="text-purple-400 font-bold">{tuitionCost} €</span>
                            </div>
                            <input 
                                type="range" min="1000" max="20000" step="500" 
                                value={tuitionCost} 
                                onChange={(e) => setTuitionCost(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                        <div className="bg-red-500/10 rounded-2xl p-4 border border-red-500/20">
                             <div className="text-xs text-red-300 uppercase font-bold mb-1">Perte Annuelle Est.</div>
                             <div className="text-2xl font-bold text-red-400">{financialLoss.toLocaleString()} €</div>
                             <div className="text-[10px] text-red-300/70 mt-1">{studentsAtRisk} étudiants concernés</div>
                        </div>
                        <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/20 relative overflow-hidden">
                             <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
                             <div className="text-xs text-green-300 uppercase font-bold mb-1">Gain Potentiel AELIIA</div>
                             <div className="text-2xl font-bold text-green-400">{potentialSaved.toLocaleString()} €</div>
                             <div className="text-[10px] text-green-300/70 mt-1">Budget préservé</div>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Ils ont franchi le pas</h3>
                    <div className="grid gap-3">
                         {academicTestimonials.map((t, idx) => (
                             <div key={idx} className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800 flex gap-3">
                                 <div className="w-8 h-8 bg-purple-900/50 rounded-lg flex items-center justify-center text-purple-300 font-bold text-xs flex-shrink-0">
                                     {t.logo}
                                 </div>
                                 <div>
                                     <p className="text-zinc-400 text-xs italic mb-1">"{t.quote}"</p>
                                     <div className="text-white text-xs font-semibold">{t.author}, {t.role}</div>
                                 </div>
                             </div>
                         ))}
                    </div>
                </div>
            </div>

            {/* Right: Lead Form */}
            <div className="bg-[#120a1d] border border-purple-500/20 rounded-[32px] p-8 lg:p-10 shadow-2xl shadow-purple-900/20 relative">
                {step === 1 ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 mb-2 text-purple-400">
                                <Calculator className="w-5 h-5" />
                                <span className="font-bold text-sm uppercase tracking-wide">Recevoir mon audit</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Valider la simulation</h3>
                            <p className="text-zinc-400 text-sm">Recevez cette analyse par email et discutons des besoins de votre campus.</p>
                        </div>

                        <div className="space-y-4">
                             <div>
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Nom de l'établissement</label>
                                <input required name="school" value={formData.school} onChange={handleChange} type="text" className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="Université de..." />
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Votre Rôle</label>
                                    <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-colors text-sm">
                                        <option>Direction / Admin</option>
                                        <option>Santé (Infirmier/Psy)</option>
                                        <option>Représentant Étudiant</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Vos Coordonnées</label>
                                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="Nom Prénom" />
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="Email pro" />
                                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="Téléphone" />
                             </div>

                             <div>
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Enjeux Prioritaires</label>
                                <textarea name="challenges" value={formData.challenges} onChange={handleChange} className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-colors h-24 resize-none" placeholder="Ex: Délais d'attente trop longs, budget limité, étudiants isolés..."></textarea>
                             </div>
                        </div>

                        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 mt-4">
                            Recevoir l'audit & Contacter l'équipe <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                ) : (
                    <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/20 relative">
                            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
                            <CheckCircle className="w-12 h-12 text-purple-500 relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Simulation Envoyée !</h3>
                        <p className="text-zinc-400 max-w-xs mx-auto text-sm leading-relaxed">
                            Votre client mail s'est ouvert avec le récapitulatif de votre simulation pour l'établissement <strong>{formData.school}</strong>.
                            <br/><br/>
                            Envoyez le mail pour que notre pôle Éducation puisse traiter votre dossier en priorité.
                        </p>
                        <button onClick={onClose} className="px-6 py-2 bg-zinc-800 rounded-full text-white text-sm hover:bg-zinc-700 transition-colors">
                            Retourner au site
                        </button>
                    </div>
                )}
            </div>

         </div>
      </div>

      {/* BROCHURE DOWNLOAD MODAL */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-[#120a1d] border border-purple-500/30 w-full max-w-md rounded-3xl p-8 relative shadow-2xl shadow-purple-900/40">
                <button onClick={() => setShowBrochureModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>

                {brochureStep === 1 ? (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                                <FileText className="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Plaquette Campus 2024</h3>
                            <p className="text-zinc-400 text-sm">
                                Recevez le dossier complet : Spécifications techniques, Intégration SSO, Kit de Communication et Grille Tarifaire.
                            </p>
                        </div>

                        <ul className="space-y-3">
                            {[
                                "Détails de l'intégration SSO (CAS, Shibboleth)",
                                "Certification HDS & Conformité RGPD",
                                "Exemples de rapports statistiques anonymisés",
                                "Kit de déploiement (Affiches, Flyers)"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-zinc-300">
                                    <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <form onSubmit={handleBrochureSubmit} className="space-y-4 pt-2">
                             <div>
                                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Email Professionnel</label>
                                <input 
                                    required 
                                    type="email" 
                                    value={brochureEmail}
                                    onChange={(e) => setBrochureEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-purple-500 outline-none transition-colors" 
                                    placeholder="contact@ecole.fr" 
                                />
                             </div>
                             <button type="submit" className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" /> Recevoir le PDF
                             </button>
                             <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
                                <Lock className="w-3 h-3" /> Envoyé instantanément par email
                             </div>
                        </form>
                    </div>
                ) : (
                    <div className="text-center space-y-6 py-8 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Demande envoyée !</h3>
                            <p className="text-zinc-400 text-sm">
                                Votre client mail s'est ouvert pour valider l'envoi.
                                <br/>
                                Dès réception de votre email, notre système vous renverra automatiquement le PDF.
                            </p>
                        </div>
                        <button onClick={() => setShowBrochureModal(false)} className="px-6 py-2 bg-zinc-800 rounded-full text-white text-sm hover:bg-zinc-700 transition-colors">
                            Fermer
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}

    </div>
  );
};