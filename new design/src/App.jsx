import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe2, 
  Lock, 
  Radio, 
  Server, 
  Shield, 
  Terminal, 
  Zap, 
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Target,
  Users,
  Eye,
  BarChart3,
  Briefcase,
  DollarSign,
  TrendingUp,
  Video,
  AlertTriangle,
  Phone,
  User
} from 'lucide-react';
import MorphingGlobe from './MorphingGlobe';
import { Text_03 } from '@/components/ui/wave-text';
import { TextSlider } from '@/components/ui/dynamic-text-slider';
import { BentoDemo } from '@/components/ui/bento-demo';
import { Testimonials } from '@/components/ui/testimonials';
import { ServicePage } from '@/components/ui/service-page';

const ScrollReveal = ({ children, className = "", delay = 0, yOffset = 30, xOffset = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : `translate(${xOffset}px, ${yOffset}px)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const partners = [
  {
    name: "Air Samarkand",
    logo: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 text-sky-400 fill-sky-400/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
        </svg>
        <span className="font-display font-bold text-sm tracking-wide text-white">Air Samarkand</span>
      </div>
    )
  },
  {
    name: "albem",
    logo: (
      <div className="flex items-center gap-1">
        <span className="font-sans font-extrabold text-2xl tracking-tighter text-white">al<span className="text-orange-500">bem</span></span>
      </div>
    )
  },
  {
    name: "Blizz Art",
    logo: (
      <div className="flex flex-col items-center">
        <svg className="w-5 h-5 text-amber-400 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path d="M2 17L12 22L22 17" />
          <path d="M2 12L12 17L22 12" />
        </svg>
        <span className="font-serif font-semibold text-xs tracking-widest text-amber-300 uppercase">Blizz Art</span>
      </div>
    )
  },
  {
    name: "MEDION",
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-red-500 fill-red-500/10" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="font-display font-extrabold text-sm tracking-widest text-white">MEDION</span>
      </div>
    )
  },
  {
    name: "BOLAJON",
    logo: (
      <div className="flex gap-0.5 font-display font-black text-lg">
        <span className="text-red-500">B</span>
        <span className="text-yellow-500">O</span>
        <span className="text-green-500">L</span>
        <span className="text-blue-500">A</span>
        <span className="text-purple-500">J</span>
        <span className="text-orange-500">O</span>
        <span className="text-pink-500">N</span>
      </div>
    )
  },
  {
    name: "PROMAX EDUCATION",
    logo: (
      <div className="flex flex-col items-center gap-0.5">
        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
        </svg>
        <span className="font-sans font-black text-[10px] tracking-widest text-white uppercase text-center">PROMAX <span className="text-blue-400 font-normal">EDUCATION</span></span>
      </div>
    )
  },
  {
    name: "Sevimli",
    logo: (
      <div className="flex items-center gap-2">
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-dashed border-red-500 rounded-full animate-spin [animation-duration:10s]" />
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
        </div>
        <span className="font-sans font-bold text-sm tracking-tight text-white">Sevimli</span>
      </div>
    )
  },
  {
    name: "VEN'S ACADEMY",
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 3L12 19L19 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-display font-extrabold text-xs tracking-widest text-white">VEN'S <span className="text-orange-400 font-normal">ACADEMY</span></span>
      </div>
    )
  },
  {
    name: "UZBEKISTAN AIRWAYS",
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 22L12 2l10 20H2z" strokeLinejoin="round" />
          <path d="M12 2v20" />
        </svg>
        <span className="font-sans font-bold text-[10px] tracking-wider text-cyan-200 uppercase">UZBEKISTAN <span className="text-neutral-400 font-normal">AIRWAYS</span></span>
      </div>
    )
  },
  {
    name: "COLIZEUM",
    logo: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
        </div>
        <span className="font-mono font-black text-xs tracking-widest text-yellow-400 uppercase">COLIZEUM</span>
      </div>
    )
  },
  {
    name: "MY SCHOOL",
    logo: (
      <div className="flex items-center gap-1.5">
        <span className="font-sans font-black text-sm text-red-500">MY <span className="text-blue-500 font-light">SCHOOL</span></span>
      </div>
    )
  },
  {
    name: "REMONT.UZ",
    logo: (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
        <span className="font-display font-black text-xs tracking-widest text-white">REMONT<span className="text-orange-500">.UZ</span></span>
      </div>
    )
  },
  {
    name: "TDIU",
    logo: (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 6v10" />
          <path d="M8 10h8" />
        </svg>
        <span className="font-serif font-bold text-[9px] leading-tight text-neutral-300 text-center max-w-[90px] uppercase">TDIU</span>
      </div>
    )
  },
  {
    name: "TVR",
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
          <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </div>
        <span className="font-display font-extrabold text-sm tracking-wider text-white">TVR</span>
      </div>
    )
  },
  {
    name: "Sevimli Play",
    logo: (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 text-orange-500 fill-orange-500/20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span className="font-sans font-black text-xs text-white">Sevimli<span className="text-orange-500 italic font-medium ml-0.5">PLAY</span></span>
      </div>
    )
  }
];

const whyChooseUs = [
  {
    title: "Kafolatlangan natija",
    highlight: "Kelishilgan natijaga belgilangan muddatda erisha olmasak, natijaga chiqquncha bepul xizmat ko'rsatamiz.",
    description: "Biz o'z ishimizga 100% ishonamiz. Agar shartnomada ko'rsatilgan ko'rsatkichlarga (obunachilar soni, faollik, murojaatlar) muddatida erisha olmasak, siz bir tiyin to'lamasdan hamkorlikni davom ettiramiz. Risk bizda, natija esa sizda.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Maxsus strategiya",
    highlight: "Biz umumiy shablonlar bilan emas, sizning bozoringizga moslashgan strategiya bilan ishlaymiz.",
    description: "Stomatologiya uchun bir yondashuv, turizm va mahsulot biznesi uchun boshqa. Biz raqobatchilaringizni, auditoriyangizni va bozor o'ziga xosliklarini chuqur tahlil qilib, faqat sizga mos strategiya tuzamiz. Umumiy andozalar yo'q.",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "Professional jamoa",
    highlight: "Bitta 'Marketolog' emas, balki har bir yo'nalish bo'yicha ekspertlardan iborat to'liq komanda.",
    description: "Sizning loyihangiz ustida kontent-meyker, kopirayter, SMM menejer, dizayner, videograf va montajchi ishlaydi. Har bir jamoa a'zosi o'z sohasining haqiqiy professionalidir.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "To'liq shaffoflik",
    highlight: "Notion + Telegram tizimlari orqali real-time jarayonni to'liq kuzating.",
    description: "Har kuni nima qilinyapti, qaysi bosqichdamiz, qanday natijalar kelayapti - hammasini jonli kuzatasiz. Haftalik hisobotlar, oylik tahlillar va video qo'ng'iroqlar orqali biz bilan doimiy aloqada bo'lasiz.",
    icon: <Eye className="w-6 h-6" />
  },
  {
    title: "Natijaga yo'naltirilgan metrika",
    highlight: "Oddiy layklar emas, balki ROI. Quruq shovqin emas, balki haqiqiy biznes natijasi.",
    description: "Bizning maqsadimiz 'chiroyli' raqamlar emas, real biznes natijasidir: Reqamlar bilan o'ynashmaymiz, biz uchun sotuvlar va brend qiymatining o'sishi muhim. Har bir harakatimiz faqat savdoni ko'paytirishga xizmat qiladi.",
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    title: "Tajribaga asoslangan yondashuv",
    highlight: "2022-yildan beri 30+ brend va 50+ shaxsiy brend egalariga yordam berdik.",
    description: "Biz nazariya emas, amaliyot tarafdorimiz. Stomatologiya, kosmetologiya, turizm, ta'lim, sport, restoran va boshqa ko'plab sohalarda real natijalarga erishdik va yechimlarni mukammal bilamiz.",
    icon: <Briefcase className="w-6 h-6" />
  }
];

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 text-center space-y-6 backdrop-blur-md">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
          <Zap className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">System Connected</span>
          <h3 className="text-xl font-bold text-white">Hamkorlik muvaffaqiyatli boshlandi!</h3>
          <p className="text-sm text-neutral-400 font-light max-w-xs mx-auto">
            Tez orada mutaxassislarimiz siz bilan bog'lanib, loyihangizni tahlil qilishni boshlaydilar.
          </p>
        </div>
        <div className="bg-neutral-950/80 p-3.5 rounded-lg border border-white/5 text-[11px] leading-relaxed text-emerald-300 font-mono text-left">
          &gt; init-pipeline --user={name.toLowerCase().replace(/ /g, '-')} <br />
          <span className="text-neutral-500">Connecting node...</span> <br />
          <span className="text-emerald-400">Connection established. Queue initialized.</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 space-y-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">So'rov yuborish</h3>
        <p className="text-xs text-neutral-400 font-light">Ma'lumotlaringizni qoldiring, biz sizga aloqaga chiqamiz.</p>
      </div>

      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            required
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#05020a]/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all duration-300"
          />
        </div>

        {/* Phone Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="tel"
            required
            placeholder="Telefon raqamingiz"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#05020a]/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all duration-300"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98 cursor-pointer"
      >
        <span>Hamkorlikni boshlash</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
};

const MissionCard = () => {
  const cardRef = useRef(null);
  const dims = useRef({ w: 800, h: 250 });
  
  const topPathRef = useRef(null);
  const rightPathRef = useRef(null);
  const bottomPathRef = useRef(null);
  const leftPathRef = useRef(null);

  // Animation states for 4 edges
  const topRef = useRef({ progress: 0, x: 0.5, time: Math.PI / 2, reqId: null });
  const rightRef = useRef({ progress: 0, y: 0.5, time: Math.PI / 2, reqId: null });
  const bottomRef = useRef({ progress: 0, x: 0.5, time: Math.PI / 2, reqId: null });
  const leftRef = useRef({ progress: 0, y: 0.5, time: Math.PI / 2, reqId: null });

  const R = 24; // Corner radius

  const setTopPath = (prog, ratio) => {
    if (topPathRef.current) {
      topPathRef.current.setAttribute('d', `M ${R} 0 Q ${dims.current.w * ratio} ${prog} ${dims.current.w - R} 0`);
    }
  };
  const setRightPath = (prog, ratio) => {
    if (rightPathRef.current) {
      rightPathRef.current.setAttribute('d', `M ${dims.current.w} ${R} Q ${dims.current.w + prog} ${dims.current.h * ratio} ${dims.current.w} ${dims.current.h - R}`);
    }
  };
  const setBottomPath = (prog, ratio) => {
    if (bottomPathRef.current) {
      bottomPathRef.current.setAttribute('d', `M ${dims.current.w - R} ${dims.current.h} Q ${dims.current.w * ratio} ${dims.current.h + prog} ${R} ${dims.current.h}`);
    }
  };
  const setLeftPath = (prog, ratio) => {
    if (leftPathRef.current) {
      leftPathRef.current.setAttribute('d', `M 0 ${dims.current.h - R} Q ${prog} ${dims.current.h * ratio} 0 ${R}`);
    }
  };

  useEffect(() => {
    const updateDims = () => {
      if (cardRef.current) {
        dims.current = {
          w: cardRef.current.offsetWidth,
          h: cardRef.current.offsetHeight,
        };
        // Reset path states
        setTopPath(0, 0.5);
        setRightPath(0, 0.5);
        setBottomPath(0, 0.5);
        setLeftPath(0, 0.5);
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  // 1. TOP EDGE PLUCK
  const manageTopMouseEnter = () => {
    if (topRef.current.reqId) cancelAnimationFrame(topRef.current.reqId);
    topRef.current.time = Math.PI / 2;
    topRef.current.progress = 0;
    if (topPathRef.current) topPathRef.current.setAttribute('stroke', 'rgba(249,115,22,0.8)');
  };
  const manageTopMouseMove = (e) => {
    if (!topPathRef.current) return;
    const pathBound = topPathRef.current.getBoundingClientRect();
    topRef.current.x = (e.clientX - pathBound.left) / pathBound.width;
    const relY = e.clientY - (pathBound.top + pathBound.height / 2);
    topRef.current.progress = Math.max(-80, Math.min(80, relY * 1.8));
    setTopPath(topRef.current.progress, topRef.current.x);
  };
  const manageTopMouseLeave = () => animateTopOut();
  const animateTopOut = () => {
    const t = topRef.current;
    const newProgress = t.progress * Math.sin(t.time);
    t.progress = lerp(t.progress, 0, 0.03);
    t.time += 0.25;
    setTopPath(newProgress, t.x);
    if (Math.abs(t.progress) > 0.5) {
      t.reqId = requestAnimationFrame(animateTopOut);
    } else {
      t.time = Math.PI / 2;
      t.progress = 0;
      setTopPath(0, 0.5);
      if (topPathRef.current) topPathRef.current.setAttribute('stroke', 'rgba(255,255,255,0.1)');
    }
  };

  // 2. RIGHT EDGE PLUCK
  const manageRightMouseEnter = () => {
    if (rightRef.current.reqId) cancelAnimationFrame(rightRef.current.reqId);
    rightRef.current.time = Math.PI / 2;
    rightRef.current.progress = 0;
    if (rightPathRef.current) rightPathRef.current.setAttribute('stroke', 'rgba(249,115,22,0.8)');
  };
  const manageRightMouseMove = (e) => {
    if (!rightPathRef.current) return;
    const pathBound = rightPathRef.current.getBoundingClientRect();
    rightRef.current.y = (e.clientY - pathBound.top) / pathBound.height;
    const relX = e.clientX - (pathBound.left + pathBound.width / 2);
    rightRef.current.progress = Math.max(-80, Math.min(80, relX * 1.8));
    setRightPath(rightRef.current.progress, rightRef.current.y);
  };
  const manageRightMouseLeave = () => animateRightOut();
  const animateRightOut = () => {
    const r = rightRef.current;
    const newProgress = r.progress * Math.sin(r.time);
    r.progress = lerp(r.progress, 0, 0.03);
    r.time += 0.25;
    setRightPath(newProgress, r.y);
    if (Math.abs(r.progress) > 0.5) {
      r.reqId = requestAnimationFrame(animateRightOut);
    } else {
      r.time = Math.PI / 2;
      r.progress = 0;
      setRightPath(0, 0.5);
      if (rightPathRef.current) rightPathRef.current.setAttribute('stroke', 'rgba(255,255,255,0.1)');
    }
  };

  // 3. BOTTOM EDGE PLUCK
  const manageBottomMouseEnter = () => {
    if (bottomRef.current.reqId) cancelAnimationFrame(bottomRef.current.reqId);
    bottomRef.current.time = Math.PI / 2;
    bottomRef.current.progress = 0;
    if (bottomPathRef.current) bottomPathRef.current.setAttribute('stroke', 'rgba(249,115,22,0.8)');
  };
  const manageBottomMouseMove = (e) => {
    if (!bottomPathRef.current) return;
    const pathBound = bottomPathRef.current.getBoundingClientRect();
    bottomRef.current.x = (e.clientX - pathBound.left) / pathBound.width;
    const relY = e.clientY - (pathBound.top + pathBound.height / 2);
    bottomRef.current.progress = Math.max(-80, Math.min(80, relY * 1.8));
    setBottomPath(bottomRef.current.progress, bottomRef.current.x);
  };
  const manageBottomMouseLeave = () => animateBottomOut();
  const animateBottomOut = () => {
    const b = bottomRef.current;
    const newProgress = b.progress * Math.sin(b.time);
    b.progress = lerp(b.progress, 0, 0.03);
    b.time += 0.25;
    setBottomPath(newProgress, b.x);
    if (Math.abs(b.progress) > 0.5) {
      b.reqId = requestAnimationFrame(animateBottomOut);
    } else {
      b.time = Math.PI / 2;
      b.progress = 0;
      setBottomPath(0, 0.5);
      if (bottomPathRef.current) bottomPathRef.current.setAttribute('stroke', 'rgba(255,255,255,0.1)');
    }
  };

  // 4. LEFT EDGE PLUCK
  const manageLeftMouseEnter = () => {
    if (leftRef.current.reqId) cancelAnimationFrame(leftRef.current.reqId);
    leftRef.current.time = Math.PI / 2;
    leftRef.current.progress = 0;
    if (leftPathRef.current) leftPathRef.current.setAttribute('stroke', 'rgba(249,115,22,0.8)');
  };
  const manageLeftMouseMove = (e) => {
    if (!leftPathRef.current) return;
    const pathBound = leftPathRef.current.getBoundingClientRect();
    leftRef.current.y = (e.clientY - pathBound.top) / pathBound.height;
    const relX = e.clientX - (pathBound.left + pathBound.width / 2);
    leftRef.current.progress = Math.max(-80, Math.min(80, relX * 1.8));
    setLeftPath(leftRef.current.progress, leftRef.current.y);
  };
  const manageLeftMouseLeave = () => animateLeftOut();
  const animateLeftOut = () => {
    const l = leftRef.current;
    const newProgress = l.progress * Math.sin(l.time);
    l.progress = lerp(l.progress, 0, 0.03);
    l.time += 0.25;
    setLeftPath(newProgress, l.y);
    if (Math.abs(l.progress) > 0.5) {
      l.reqId = requestAnimationFrame(animateLeftOut);
    } else {
      l.time = Math.PI / 2;
      l.progress = 0;
      setLeftPath(0, 0.5);
      if (leftPathRef.current) leftPathRef.current.setAttribute('stroke', 'rgba(255,255,255,0.1)');
    }
  };

  return (
    <div
      ref={cardRef}
      className="rounded-3xl p-8 md:p-12 bg-[#0b0813]/40 backdrop-blur-md relative transition-all duration-300 shadow-2xl"
    >
      {/* Interaction Zones for Plucking Bending Border (Expanded on Hover) */}
      <div 
        onMouseEnter={manageTopMouseEnter} 
        onMouseMove={manageTopMouseMove} 
        onMouseLeave={manageTopMouseLeave}
        className="absolute -top-3 left-6 right-6 h-6 z-30 cursor-ns-resize hover:-top-16 hover:h-32 transition-all duration-100"
      />
      <div 
        onMouseEnter={manageRightMouseEnter} 
        onMouseMove={manageRightMouseMove} 
        onMouseLeave={manageRightMouseLeave}
        className="absolute top-6 bottom-6 -right-3 w-6 z-30 cursor-ew-resize hover:-right-16 hover:w-32 transition-all duration-100"
      />
      <div 
        onMouseEnter={manageBottomMouseEnter} 
        onMouseMove={manageBottomMouseMove} 
        onMouseLeave={manageBottomMouseLeave}
        className="absolute -bottom-3 left-6 right-6 h-6 z-30 cursor-ns-resize hover:-bottom-16 hover:h-32 transition-all duration-100"
      />
      <div 
        onMouseEnter={manageLeftMouseEnter} 
        onMouseMove={manageLeftMouseMove} 
        onMouseLeave={manageLeftMouseLeave}
        className="absolute top-6 bottom-6 -left-3 w-6 z-30 cursor-ew-resize hover:-left-16 hover:w-32 transition-all duration-100"
      />

      {/* Dynamic Elastic SVG Border */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-20" 
        style={{ overflow: 'visible' }}
      >
        {/* Top edge */}
        <path 
          ref={topPathRef}
          fill="none" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1.5"
          className="transition-[stroke] duration-300"
        />
        {/* Right edge */}
        <path 
          ref={rightPathRef}
          fill="none" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1.5"
          className="transition-[stroke] duration-300"
        />
        {/* Bottom edge */}
        <path 
          ref={bottomPathRef}
          fill="none" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1.5"
          className="transition-[stroke] duration-300"
        />
        {/* Left edge */}
        <path 
          ref={leftPathRef}
          fill="none" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1.5"
          className="transition-[stroke] duration-300"
        />

      </svg>

      {/* Cyberpunk corner brackets decorative */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-orange-500/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-orange-500/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-orange-500/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-orange-500/40 pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 relative z-10">
        {/* Left Column: Heading */}
        <div className="space-y-3 lg:w-1/3">
          <span className="text-[10px] font-mono text-orange-400 tracking-[0.25em] uppercase block">Missiya / Bosh maqsad</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
            Tesseract agentligida biz :
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
        </div>

        {/* Right Column: Statement with highlighted keywords */}
        <div className="lg:w-2/3">
          <p className="text-xl sm:text-2xl font-light text-neutral-300 leading-relaxed tracking-wide font-sans">
            Tadbirkorlar va ekspertlarning ichidagi{" "}
            <span className="text-white font-semibold relative inline-block mx-1">
              shaxsiyati va maqsadlarini
              <span className="absolute bottom-1 left-0 w-full h-[1px] bg-orange-500/50" />
            </span>{" "}
            strategiyaga ko'rinishiga keltirib, uni{" "}
            <span className="text-orange-400 font-semibold bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              daromad keltiradigan brendga
            </span>{" "}
            aylantirishga yordam beramiz.
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState({ page: 'home', service: null });

  if (view.page === 'service') {
    return (
      <ServicePage 
        serviceName={view.service} 
        onBack={() => setView({ page: 'home', service: null })} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#05020a] text-[#f3f4f6] relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
      {/* Glowing orange ambient lights matching the theme (smaller/subtler) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[220px] bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12)_0%,rgba(245,158,11,0.06)_35%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-[90px] bg-orange-500/10 rounded-full blur-[50px] pointer-events-none z-0" />
      <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[120px] h-[50px] bg-amber-500/8 rounded-full blur-[35px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.02),transparent_70%)] pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="fixed top-5 left-0 right-0 z-50 px-4">
        <div className="max-w-7xl mx-auto px-8 h-16 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-between shadow-xl shadow-orange-950/5">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-lg tracking-wider bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent leading-none text-left">
              TESSERACT<br /><span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-semibold">MARKETING</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Xizmatlar" className="text-sm font-medium" />
            </a>
            <a href="#about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Biz haqimizda" className="text-sm font-medium" />
            </a>
            <a href="#portfolio" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Portfolio" className="text-sm font-medium" />
            </a>
            <a href="#contact" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Kontakt" className="text-sm font-medium" />
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="relative px-5 py-2 rounded-full border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 flex items-center gap-1 group">
              <Text_03 text="Bog'lanish" className="font-semibold text-xs" /> <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 border border-white/10 bg-[#05020a]/90 backdrop-blur-lg px-6 py-6 flex flex-col gap-4 rounded-2xl w-full z-40">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Xizmatlar" className="text-base font-medium" />
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Biz haqimizda" className="text-base font-medium" />
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Portfolio" className="text-base font-medium" />
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-neutral-300 hover:text-white transition-colors"
            >
              <Text_03 text="Kontakt" className="text-base font-medium" />
            </a>
            <hr className="border-white/10 my-1" />
            <button className="w-full text-center py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-bold rounded-full flex items-center justify-center gap-2 group">
              <Text_03 text="Bog'lanish" className="font-bold text-base" /> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 min-h-screen flex items-center justify-center z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 w-full">
          
          {/* Left Hero Content */}
          <ScrollReveal className="flex-1 flex flex-col items-start text-left max-w-2xl lg:pl-16" delay={150}>
            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[66px] tracking-tight leading-[1.15] mb-6 text-white flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Biznesingizni</span> <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">raqamli</span>
              <span>olamda</span>
              <TextSlider text="o'stiramiz" className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent font-display font-extrabold text-5xl sm:text-6xl lg:text-[66px]" />
            </h1>

            {/* Description */}
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Strategiya, kreativ va texnologiyani uyg'unlashtirib, brendingizni keyingi darajaga olib chiqamiz.
            </p>
          </ScrollReveal>

          {/* Right — Globe & Morphing Cube Visualization */}
          <ScrollReveal className="flex-1 flex items-center justify-center p-4 md:p-0 min-h-[550px] w-full relative" delay={300} yOffset={45}>
            <div className="absolute inset-0 bg-radial-gradient opacity-80 blur-xl pointer-events-none scale-75" />
            <div className="relative w-full max-w-[760px] aspect-square flex items-center justify-center">
              <MorphingGlobe />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Solutions Section */}
      <section className="relative border-t border-white/5 bg-[#05020a] py-12 lg:py-16 z-10 overflow-hidden" id="solutions">
        {/* Background glow behind cards on the left */}
        <div className="absolute left-[-100px] top-[10%] w-[350px] h-[350px] bg-orange-500/15 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen" />
        <div className="absolute left-[-40px] top-[50%] -translate-y-1/2 w-[200px] h-[350px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none z-0" />
        
        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal delay={100}>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight">
                Biz sizga qanday{" "}
                <span className="relative inline-block px-4 py-1.5 mx-1">
                  <span className="relative z-10 text-white">yechimlar</span>
                  <svg 
                    className="absolute inset-0 w-full h-full text-orange-500/80 pointer-events-none z-0 scale-y-125 scale-x-105" 
                    viewBox="0 0 100 40" 
                    preserveAspectRatio="none"
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path 
                      d="M92 10 C 60 4, 25 7, 8 18 C -5 27, 5 36, 35 38 C 65 40, 95 32, 98 22 C 100 12, 78 9, 70 11" 
                    />
                  </svg>
                </span>{" "}
                beramiz
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} yOffset={40}>
            <BentoDemo onSelectService={(name) => setView({ page: 'service', service: name })} />
          </ScrollReveal>
        </div>
      </section>

      {/* Agency Mission Statement */}
      <section className="relative border-t border-white/5 bg-[#05020a]/80 py-16 lg:py-20 z-10 overflow-hidden">
        {/* Glowing backdrop */}
        <div className="absolute left-[10%] top-[30%] w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-[90px] pointer-events-none z-0" />
        <div className="absolute right-[10%] bottom-[20%] w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none z-0" />
        
        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-30" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <ScrollReveal delay={100} yOffset={35}>
            <MissionCard />
          </ScrollReveal>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative border-t border-white/5 bg-[#05020a] py-16 lg:py-20 z-10 overflow-hidden" id="partners">
        {/* Ambient glow matching the theme on the right */}
        <div className="absolute -right-[150px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen" />
        <div className="absolute -right-[80px] top-[20%] w-[250px] h-[250px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none z-0" />
        
        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-55" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal delay={100}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Hamkorlarimiz
              </h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200} yOffset={40}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {partners.map((partner) => (
                <div 
                  key={partner.name}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-500 hover:border-orange-500/30 hover:bg-orange-500/5 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/5 min-h-[110px]"
                >
                  <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-t from-orange-500/0 via-orange-500/0 to-orange-500/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 filter grayscale group-hover:grayscale-0">
                    {partner.logo}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative border-t border-white/5 bg-[#05020a]/40 py-20 lg:py-24 z-10 overflow-hidden" id="why-us">
        {/* Background ambient glow */}
        <div className="absolute left-[-150px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
        
        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal delay={100}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Nima uchun{" "}
                <span className="relative inline-block mx-1">
                  30 dan ortiq
                  <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                </span>{" "}
                ekspert va tadbirkorlar bizni tanlashgan?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-r border-b border-white/5 relative z-10">
            {whyChooseUs.map((item, idx) => {
              const xOffset = idx < 2 ? -40 : 40;
              return (
                <ScrollReveal 
                  key={item.title}
                  xOffset={xOffset}
                  yOffset={0}
                  delay={idx * 80}
                  className="group relative flex flex-col justify-between p-8 border-t border-l border-white/5 bg-transparent transition-all duration-500 hover:bg-white/[0.015] overflow-hidden min-h-[250px]"
                >
                  {/* Vertical hover indicator bar on the left */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[16px] rounded-r-full bg-neutral-800 transition-all duration-300 group-hover:h-[36px] group-hover:bg-orange-500 pointer-events-none" />
                  
                  <div>
                    <div className="text-neutral-400 group-hover:text-orange-400 transition-all duration-300 mb-6">
                      {React.cloneElement(item.icon, { strokeWidth: 1.2, className: "w-8 h-8" })}
                    </div>
                    
                    <div>
                      <h3 className="font-display font-bold text-lg text-neutral-200 group-hover:text-white transition-all duration-300 group-hover:translate-x-1.5 mb-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mb-3 font-medium italic border-l border-orange-500/20 pl-2.5">
                        {item.highlight}
                      </p>
                      
                      <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Metrics / Key Indicators Section */}
      <section className="relative border-t border-white/5 bg-[#05020a] py-20 lg:py-24 z-10 overflow-hidden" id="metrics">
        {/* Background ambient glow */}
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
        
        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal delay={100}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Biznesingiz uchun asosiy natijalar
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Client growth 180% */}
            <ScrollReveal className="lg:col-span-2 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300" delay={150}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all duration-500 pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 h-full">
                <div className="space-y-4 max-w-md">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Mijoz oqimi & Taniqlilik o'sishi</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Mijozlarimiz biz bilan ishlagandan so'ng brend orqali keladigan mijoz oqimi va brend taniqliligi o'rtacha 1.8 barobarga oshadi.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end justify-center">
                  <span className="text-6xl sm:text-7xl font-display font-black text-white tracking-tighter bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">180%</span>
                  {/* Mini graph SVG */}
                  <svg className="w-32 h-12 text-orange-500 mt-2" viewBox="0 0 120 40" fill="none">
                    <path d="M0 35C20 30 30 15 50 12C70 9 80 5 120 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="120" cy="2" r="4" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Video quality TOP 10% */}
            <ScrollReveal className="lg:col-span-1 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300" delay={200}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col justify-between h-full gap-8">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Video Production sifati</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Bizning video mahsulotlarimiz sifat va kreativlik bo'yicha O'zbekistonda yetakchi 10% talik reytingga kiradi.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-display font-black text-white tracking-tight">TOP 10%</span>
                  {/* Flashing REC indicator */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-[10px] font-mono text-red-500">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>REC</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Guarantees 8x */}
            <ScrollReveal className="lg:col-span-1 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300" delay={250}>
              <div className="flex flex-col justify-between h-full gap-8">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Kafolat ortig'i bilan</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Aksariyat mijozlarimiz bilan shartnomada kelishilgan kafolatlarimizni kamida 8 barobar ortig'i bilan bajaramiz.
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-5xl font-display font-black text-white">8x</span>
                  {/* Led Indicator */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-1.5 h-6 rounded bg-orange-500/80 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Audience coverage 1,000,000+ */}
            <ScrollReveal className="lg:col-span-2 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300" delay={300}>
              <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 h-full">
                <div className="space-y-4 max-w-md">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Auditoriya qamrovi (Coverage)</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Bizning kampaniyalarimiz orqali umumiy hisobda 1,000,000 dan ortiq foydali auditoriya qamrab olindi.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end justify-center">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tighter bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">1,000,000+</span>
                  {/* Radar animation placeholder */}
                  <div className="w-16 h-16 rounded-full border border-orange-500/20 flex items-center justify-center relative mt-3">
                    <div className="absolute inset-0 rounded-full border border-orange-500/40 animate-ping [animation-duration:3s]" />
                    <div className="w-3.5 h-3.5 bg-orange-500 rounded-full" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Sales assisted $500,000+ */}
            <ScrollReveal className="lg:col-span-3 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300" delay={350}>
              <div className="absolute -left-12 -top-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 h-full">
                <div className="space-y-4 max-w-xl">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-300">Yordam berilgan umumiy sotuvlar</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Hamkorlarimiz bilan olib borilgan tizimli marketing va savdo strategiyalari natijasida umumiy hisobda 500,000 AQSh dollaridan ortiq sotuvlar hajmini shakllantirdik.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end justify-center bg-white/[0.02] border border-white/5 px-8 py-6 rounded-2xl backdrop-blur-sm">
                  <span className="text-5xl font-display font-black text-white">$500,000+</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider mt-1.5">▲ Live Tracked Metric</span>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>





      {/* Contact / Registration Section */}
      <section className="relative border-t border-white/5 bg-[#05020a] py-20 lg:py-24 z-10 overflow-hidden" id="contact">
        {/* Background ambient glow */}
        <div className="absolute right-[-150px] bottom-[-150px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
        
        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
            
            {/* Left side info */}
            <ScrollReveal className="flex-1 space-y-8" delay={100}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono mb-3 block border border-orange-500/30 py-1 px-4 rounded-full bg-orange-500/5 w-fit">
                  Hamkorlik
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                  Agar hammasi tushunarli bo'lsa, birgina savol qoldi
                </h2>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                  Manfaatli hamkorlik qilishga tayyormisiz? Agar javobingiz ha bo'lsa biz shu yerdamiz.
                </p>
              </div>

              {/* Competitor warning box */}
              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 relative overflow-hidden max-w-md">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0 animate-pulse">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block mb-1">Raqobat ogohlantirishi</span>
                    <p className="text-neutral-300 text-sm leading-relaxed font-light">
                      Siz tayyor bo'lmasangiz — <span className="text-red-400 font-semibold">raqobatchilaringiz</span> boshlashga allaqachon tayyor 😉
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side form */}
            <ScrollReveal className="flex-1 w-full max-w-md" delay={200} yOffset={45}>
              <ContactForm />
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#050505]/90 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-display font-bold tracking-tight text-white">VENS.EDGE</span>
          </div>
          
          <div className="flex gap-8 text-sm text-neutral-500">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact Support</a>
          </div>

          <span className="text-xs text-neutral-600 font-mono">
            &copy; 2026 Vens Edge, Inc. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
