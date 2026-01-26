
import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle, Phone, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onStartChat: () => void;
  onStartLive: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartChat, onStartLive }) => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    // --- CANVAS ANIMATION SETUP ---
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.3 + 0.1;
        this.targetAlpha = this.alpha;
      }

      update() {
        if (canvas) {
             const dx = mouseRef.current.x - this.x;
             const dy = mouseRef.current.y - this.y;
             const distance = Math.sqrt(dx * dx + dy * dy);
             const forceDirectionX = dx / distance;
             const forceDirectionY = dy / distance;
             const maxDistance = 300; 
             const force = (maxDistance - distance) / maxDistance;
             
             if (distance < maxDistance) {
                 this.vx -= forceDirectionX * force * 0.6;
                 this.vy -= forceDirectionY * force * 0.6;
             }
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.96;
        this.vy *= 0.96;

        if (canvas) {
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        if (Math.random() < 0.005) {
            this.targetAlpha = Math.random() * 0.4 + 0.1;
        }
        this.alpha += (this.targetAlpha - this.alpha) * 0.01;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
        particles = [];
        const count = window.innerWidth < 768 ? 40 : 80;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden pt-20 lg:pt-0">
      
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.15),transparent_40%)] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="space-y-8 text-center lg:text-left">
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium backdrop-blur-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Espace sécurisé & anonyme</span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.hero.title_start} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-indigo-300 animate-text-flow">
                {t.hero.title_end}
              </span>
            </h1>
            
            <p className={`text-xl text-zinc-400 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {t.hero.subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <button 
                  onClick={onStartChat}
                  className="h-14 px-8 bg-white hover:bg-indigo-50 text-black rounded-full font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
               >
                   <MessageCircle className="w-5 h-5" />
                   <span>{t.hero.cta_chat}</span>
               </button>
               
               <button 
                  onClick={onStartLive}
                  className="h-14 px-8 rounded-full font-bold text-zinc-300 hover:text-white border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2 backdrop-blur-sm group"
               >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>{t.hero.cta_voice}</span>
               </button>
            </div>
            
            <div className={`flex items-center gap-4 justify-center lg:justify-start pt-2 text-sm text-zinc-500 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> +4500 échanges</span>
                <span>•</span>
                <span>4.9/5 satisfaction</span>
            </div>
        </div>

        {/* RIGHT: MOCKUP UI */}
        <div className={`relative hidden lg:block transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
             
            <div className="relative w-full max-w-md mx-auto perspective-1000">
                {/* Decoration Circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[40px] animate-pulse-slow"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[40px] animate-pulse-slow delay-1000"></div>

                {/* Main Card */}
                <div className="relative bg-[#121214] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden backdrop-blur-xl transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-500">
                    
                    {/* Header UI */}
                    <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">A</div>
                            <div>
                                <div className="text-white font-bold text-sm">AELIIA</div>
                                <div className="text-green-400 text-[10px] flex items-center gap-1">● En ligne</div>
                            </div>
                        </div>
                        <ShieldCheck className="w-5 h-5 text-zinc-500" />
                    </div>

                    {/* Chat Content */}
                    <div className="p-6 space-y-4 h-[400px] flex flex-col justify-end relative">
                        {/* Overlay Gradient */}
                        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#121214] to-transparent z-10"></div>

                        <div className="flex justify-end">
                            <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] shadow-lg">
                                Je me sens un peu dépassé ce soir...
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <div className="bg-zinc-800 text-zinc-200 px-5 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%] border border-white/5 shadow-lg">
                                C'est tout à fait normal de ressentir cela. Est-ce qu'il y a un événement particulier qui a déclenché ce sentiment ?
                            </div>
                        </div>
                        
                         <div className="flex justify-end">
                            <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] shadow-lg">
                                Juste trop de pression au travail et à la maison.
                            </div>
                        </div>

                        {/* Typing Indicator */}
                        <div className="flex justify-start">
                            <div className="bg-zinc-800/50 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 w-16 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-8 top-1/3 bg-[#1a1a1c] border border-white/10 p-4 rounded-2xl shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <div>
                            <div className="text-xs text-zinc-400 font-bold uppercase">Analyse</div>
                            <div className="text-white text-sm font-bold">Charge mentale</div>
                        </div>
                    </div>
                </div>

                <div className="absolute -left-8 bottom-20 bg-[#1a1a1c] border border-white/10 p-4 rounded-2xl shadow-xl animate-float delay-500">
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                             <ShieldCheck className="w-4 h-4" />
                         </div>
                         <div className="text-xs text-zinc-300 font-medium">Anonymat<br/>Total</div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};
