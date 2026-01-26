
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Business } from './components/Business';
import { Footer } from './components/Footer';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { MethodSection } from './components/MethodSection';
import { Comparison } from './components/Comparison'; 
import { ToolsGrid } from './components/ToolsGrid';
import { WhyUs } from './components/WhyUs';
import { SalesContact } from './components/SalesContact';
import { SchoolProgram } from './components/SchoolProgram';
import { AuthModal } from './components/AuthModal';
import { LegalModal } from './components/LegalModal';
import { CookieConsent } from './components/CookieConsent';
import { PaymentModal } from './components/PaymentModal';
import { OnboardingModal } from './components/OnboardingModal'; 
import { User, UserProfile } from './types';
import { LogOut, User as UserIcon, Loader2, AlertTriangle, Menu, X, Globe } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Language } from './utils/translations';

const LiveVoice = lazy(() => import('./components/LiveVoice').then(module => ({ default: module.LiveVoice })));
const ChatInterface = lazy(() => import('./components/ChatInterface').then(module => ({ default: module.ChatInterface })));

// Component wrapper to access context
const AppContent: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showLiveVoice, setShowLiveVoice] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>(undefined);
  const [chatStartVoice, setChatStartVoice] = useState(false);
  
  // Modals State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [legalTab, setLegalTab] = useState<'mentions' | 'privacy' | 'cgu'>('mentions');
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // Business Pages
  const [showSales, setShowSales] = useState(false);
  const [showSchool, setShowSchool] = useState(false);
  
  // User Data
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Temporary holding state for actions while we wait for onboarding
  const [pendingAction, setPendingAction] = useState<'chat' | 'live' | null>(null);

  const apiKey = process.env.API_KEY || '';

  useEffect(() => {
      if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('aelia_user');
          if (storedUser) {
              try { setUser(JSON.parse(storedUser)); } catch (e) {}
          }
          // Load User Profile from Session
          const storedProfile = sessionStorage.getItem('aelia_user_profile');
          if (storedProfile) {
              try { setUserProfile(JSON.parse(storedProfile)); } catch (e) {}
          }
      }
  }, []);

  const handleLogin = (newUser: User) => {
      setUser(newUser);
      localStorage.setItem('aelia_user', JSON.stringify(newUser));
      setShowAuthModal(false);
      // Pre-fill profile name if not set
      if (!userProfile) {
          setUserProfile({ name: newUser.name, age: '', gender: '' });
      }
  };

  const handleLogout = () => {
      setUser(null);
      localStorage.removeItem('aelia_user');
      localStorage.removeItem('aelia_chat_history');
      sessionStorage.removeItem('aelia_user_profile');
      setUserProfile(null);
      setIsMobileMenuOpen(false);
  };

  const handleUpgradeClick = () => {
      if (!user) {
          setShowAuthModal(true);
          return;
      }
      setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
      if (user) {
          const updatedUser = { ...user, isPremium: true };
          setUser(updatedUser);
          localStorage.setItem('aelia_user', JSON.stringify(updatedUser));
      }
      setShowPaymentModal(false);
  };

  // 1. Profile Completion Logic
  const handleOnboardingSubmit = (profile: UserProfile) => {
      setUserProfile(profile);
      sessionStorage.setItem('aelia_user_profile', JSON.stringify(profile));
      setShowOnboarding(false);

      // Execute pending action
      if (pendingAction === 'chat') {
          setShowChat(true);
      } else if (pendingAction === 'live') {
          setShowLiveVoice(true);
      }
      setPendingAction(null);
  };

  const checkProfileAndStart = (action: 'chat' | 'live', initialText?: string, startVoice?: boolean) => {
      if (!apiKey) {
          alert("Configuration requise : La clé API n'est pas configurée.");
          return;
      }

      // Check for Premium requirement on Live
      if (action === 'live') {
          if (!user) { setShowAuthModal(true); return; }
          if (!user.isPremium) { setShowPaymentModal(true); return; }
      }

      // Save temp params for chat
      if (action === 'chat') {
          setChatInitialMessage(initialText);
          setChatStartVoice(!!startVoice);
      }

      // If Profile is incomplete -> Show Onboarding
      if (!userProfile || !userProfile.age || !userProfile.gender) {
          setPendingAction(action);
          setShowOnboarding(true);
      } else {
          // Profile OK -> Start immediately
          if (action === 'chat') setShowChat(true);
          if (action === 'live') setShowLiveVoice(true);
      }
  };

  const handleStartChat = (initialText?: string, startVoice?: boolean) => {
      checkProfileAndStart('chat', initialText, startVoice);
  };

  const handleStartLive = () => {
      checkProfileAndStart('live');
  };

  const closeChat = () => {
      setShowChat(false);
      setChatInitialMessage(undefined);
      setChatStartVoice(false);
  };

  const openLegal = (tab: 'mentions' | 'privacy' | 'cgu') => {
      setLegalTab(tab);
      setShowLegalModal(true);
  };

  const scrollToSection = (id: string) => {
      setIsMobileMenuOpen(false);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30 relative">
      
      {/* GLOBAL NOISE OVERLAY */}
      <div className="fixed inset-0 z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <CookieConsent />

      {!apiKey && (
        <div className="fixed top-0 left-0 w-full bg-red-600/90 text-white z-[100] text-center py-3 px-4 font-bold backdrop-blur-md border-b border-red-500 flex flex-col md:flex-row items-center justify-center gap-2 animate-in slide-in-from-top-full duration-500">
            <AlertTriangle className="w-5 h-5" />
            <span>⚠️ Configuration manquante : La clé API Google n'est pas détectée.</span>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5 supports-[backdrop-filter]:bg-black/20 ${!apiKey ? 'mt-12' : ''}`}>
        <div className="flex items-center gap-6 z-50">
            <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              AELIIA
            </div>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-300 items-center">
          <button onClick={() => scrollToSection('tools')} className="hover:text-white transition-colors">{t.nav.tools}</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">{t.nav.pricing}</button>
          <button onClick={() => setShowSales(true)} className="hover:text-white transition-colors">{t.nav.business}</button>
          
          {/* Language Selector */}
          <div className="relative">
             <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
             >
                 <Globe className="w-4 h-4" />
                 <span className="uppercase">{language}</span>
             </button>
             {showLangMenu && (
                 <div className="absolute top-full right-0 mt-2 bg-[#09090b] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[140px] flex flex-col">
                     {[
                         { code: 'fr', label: 'Français' },
                         { code: 'en', label: 'English' },
                         { code: 'es', label: 'Español' },
                         { code: 'pt', label: 'Português' },
                         { code: 'zh', label: '中文' },
                     ].map((l) => (
                         <button 
                            key={l.code}
                            onClick={() => { setLanguage(l.code as Language); setShowLangMenu(false); }}
                            className={`px-4 py-3 text-left text-sm hover:bg-white/10 transition-colors ${language === l.code ? 'text-indigo-400 font-bold' : 'text-zinc-400'}`}
                         >
                             {l.label}
                         </button>
                     ))}
                 </div>
             )}
          </div>

          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                {user.isPremium && (
                    <span className="text-indigo-400 text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        Sérénité
                    </span>
                )}
                <div className="flex items-center gap-2 text-white font-semibold">
                    <UserIcon className="w-4 h-4" />
                    {user.name}
                </div>
                <button 
                    onClick={handleLogout}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                    title={t.nav.logout}
                >
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
          ) : (
             <button 
                onClick={() => setShowAuthModal(true)}
                className="text-black bg-white px-5 py-2 rounded-full hover:bg-zinc-200 transition-colors font-semibold text-xs uppercase tracking-wide"
             >
                {t.nav.login}
             </button>
          )}
        </div>

        <button 
            className="md:hidden z-50 p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-top-10 duration-200 md:hidden">
                 <button onClick={() => scrollToSection('tools')} className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">{t.nav.tools}</button>
                 <button onClick={() => scrollToSection('pricing')} className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">{t.nav.pricing}</button>
                 <button onClick={() => { setIsMobileMenuOpen(false); setShowSales(true); }} className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">{t.nav.business}</button>
                 
                 {/* Mobile Lang Selector */}
                 <div className="flex gap-4">
                     {['fr', 'en', 'es'].map(l => (
                         <button 
                            key={l} 
                            onClick={() => setLanguage(l as Language)}
                            className={`uppercase font-bold ${language === l ? 'text-indigo-400' : 'text-zinc-600'}`}
                         >
                             {l}
                         </button>
                     ))}
                 </div>

                 <div className="w-20 h-px bg-white/10 my-4"></div>

                 {user ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-xl font-medium text-white flex items-center gap-2">
                             <UserIcon className="w-6 h-6" /> {user.name}
                        </div>
                         {user.isPremium && (
                            <span className="text-indigo-400 text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                Membre Sérénité
                            </span>
                        )}
                        <button onClick={handleLogout} className="text-zinc-500 hover:text-white flex items-center gap-2 mt-4">
                            <LogOut className="w-5 h-5" /> {t.nav.logout}
                        </button>
                    </div>
                 ) : (
                    <button 
                        onClick={() => { setIsMobileMenuOpen(false); setShowAuthModal(true); }}
                        className="text-black bg-white px-8 py-3 rounded-full text-lg font-bold uppercase tracking-wide"
                    >
                        {t.nav.login}
                    </button>
                 )}
            </div>
        )}
      </nav>

      <main className={`relative z-10 ${!apiKey ? 'pt-12' : ''}`}>
        <Hero 
          onStartLive={handleStartLive} 
          onStartChat={() => handleStartChat()}
        />
        {/* OPTIMIZED FLOW */}
        <MethodSection onStartChat={handleStartChat} />
        <Business onOpenSales={() => setShowSales(true)} onOpenSchool={() => setShowSchool(true)} />
        <div id="tools"><ToolsGrid /></div>
        <Comparison />
        <WhyUs />
        <HowItWorks />
        <Testimonials />
        <Pricing onUpgrade={handleUpgradeClick} onAuthRequest={() => setShowAuthModal(true)} user={user} />
        <FAQ />
      </main>

      <Footer onOpenLegal={openLegal} />

      {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />
      )}

      {showPaymentModal && user && (
          <PaymentModal onClose={() => setShowPaymentModal(false)} onSuccess={handlePaymentSuccess} user={user} />
      )}

      {showOnboarding && (
          <OnboardingModal 
            onClose={() => setShowOnboarding(false)} 
            onSubmit={handleOnboardingSubmit} 
            initialName={user?.name}
          />
      )}

      <Suspense fallback={<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"><Loader2 className="w-10 h-10 text-indigo-500 animate-spin" /></div>}>
        {showLiveVoice && (
            <LiveVoice apiKey={apiKey} onClose={() => setShowLiveVoice(false)} userProfile={userProfile} />
        )}
        {showChat && (
            <ChatInterface 
                apiKey={apiKey} 
                onClose={closeChat} 
                initialMessage={chatInitialMessage} 
                startRecordingImmediately={chatStartVoice} 
                isPremium={user?.isPremium}
                userProfile={userProfile}
            />
        )}
      </Suspense>

      {showSales && <SalesContact onClose={() => setShowSales(false)} />}
      {showSchool && <SchoolProgram onClose={() => setShowSchool(false)} />}
      {showLegalModal && <LegalModal onClose={() => setShowLegalModal(false)} initialTab={legalTab} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
