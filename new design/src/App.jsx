import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  User,
  Mail
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
      className={`${className} transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)`}
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

const CountUp = ({ end, duration = 1500, prefix = "", suffix = "", separator = "," }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active) {
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = progress * (2 - progress); // Ease out
            const val = Math.floor(easedProgress * end);
            setCount(val);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      active = false;
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  return <span ref={ref}>{prefix}{formatNumber(count)}{suffix}</span>;
};

const LiveCounter = ({ start = 500000 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 16) + 10; // $10 to $25
      setCount((prev) => prev + increment);
    }, 2500); // every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return <span>{formatNumber(count)}</span>;
};


const partners = [
  {
    name: "Air Samarkand",
    logo: <img src="/hamkorlar/AIR SAMARQAND.png" alt="Air Samarkand" className="h-11 max-h-11 w-auto max-w-[140px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "albem",
    logo: <img src="/hamkorlar/albem.png" alt="albem" className="h-10 max-h-10 w-auto max-w-[140px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "Blizz Art",
    logo: <img src="/hamkorlar/ART.png" alt="Blizz Art" className="h-16 max-h-16 w-auto max-w-[150px] object-contain transition-all duration-300" />
  },
  {
    name: "MEDION",
    logo: <img src="/hamkorlar/MEDION.png" alt="MEDION" className="h-11 max-h-11 w-auto max-w-[140px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "BOLAJON",
    logo: <img src="/hamkorlar/BOLOJON.png" alt="BOLAJON" className="h-14 max-h-14 w-auto max-w-[150px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "PROMAX EDUCATION",
    logo: <img src="/hamkorlar/PROMAX.png" alt="PROMAX EDUCATION" className="h-13 max-h-13 w-auto max-w-[145px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "Sevimli",
    logo: <img src="/hamkorlar/SEVIMLI 2.png" alt="Sevimli" className="h-14 max-h-14 w-auto max-w-[150px] object-contain transition-all duration-300" />
  },
  {
    name: "Sevimli Play",
    logo: <img src="/hamkorlar/SEVV.png" alt="Sevimli Play" className="h-14 max-h-14 w-auto max-w-[150px] object-contain transition-all duration-300" />
  },
  {
    name: "VEN'S ACADEMY",
    logo: <img src="/hamkorlar/VENS.png" alt="VEN'S ACADEMY" className="h-11 max-h-11 w-auto max-w-[140px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "UZBEKISTAN AIRWAYS",
    logo: <img src="/hamkorlar/AIRWAYS.png" alt="UZBEKISTAN AIRWAYS" className="h-11 max-h-11 w-auto max-w-[140px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "COLIZEUM",
    logo: <img src="/hamkorlar/COLIZEUM.png" alt="COLIZEUM" className="h-14 max-h-14 w-auto max-w-[150px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "COLIZEUM 2",
    logo: <img src="/hamkorlar/COLIZEUM 2.png" alt="COLIZEUM 2" className="h-14 max-h-14 w-auto max-w-[150px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "MY SCHOOL",
    logo: <img src="/hamkorlar/MYSCHOOL.png" alt="MY SCHOOL" className="h-14 max-h-14 w-auto max-w-[150px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "REMONT.UZ",
    logo: <img src="/hamkorlar/REMONT UZ.png" alt="REMONT.UZ" className="h-11 max-h-11 w-auto max-w-[140px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "TDIU",
    logo: <img src="/hamkorlar/TDIU.png" alt="TDIU" className="h-13 max-h-13 w-auto max-w-[145px] object-contain transition-all duration-300 brightness-0 invert" />
  },
  {
    name: "TVR",
    logo: <img src="/hamkorlar/TVR.png" alt="TVR" className="h-16 max-h-16 w-auto max-w-[150px] object-contain transition-all duration-300" />
  },
  {
    name: "Sevimli TV",
    logo: <img src="/hamkorlar/IMG_2930.PNG" alt="Sevimli TV" className="h-16 max-h-16 w-auto max-w-[150px] object-contain transition-all duration-300" />
  },
  {
    name: "Barq",
    logo: <img src="/hamkorlar/barq_logo.jpg" alt="Barq" className="h-15 max-h-15 w-auto max-w-[145px] object-contain transition-all duration-300 grayscale brightness-[5] contrast-[1000%] rounded" />
  }
];

const TimelineItem = ({ item, idx, isEven }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-25% 0px -25% 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center w-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isEven ? 'flex-row' : 'flex-row-reverse'} ${hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      {/* Card container */}
      <div className="w-[45%]">
        <div className={`relative p-8 rounded-3xl bg-[#0b0813]/60 border backdrop-blur-md transition-all duration-500 ${isIntersecting ? 'border-orange-500/30' : 'border-white/5'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 transition-transform duration-300">
              {React.cloneElement(item.icon, { strokeWidth: 1.5, className: "w-6 h-6" })}
            </div>
            <h3 className="font-display font-bold text-2xl text-white transition-all duration-500">
              {item.title}
            </h3>
          </div>

          <p className="text-base md:text-[17px] font-semibold text-orange-300 leading-relaxed border-l-2 border-orange-500 pl-3.5 mb-4">
            {item.highlight}
          </p>

          <p className="text-sm text-neutral-400 leading-relaxed font-light">
            {item.description}
          </p>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="w-[10%] flex justify-center relative">
        <div className={`w-10 h-10 rounded-full bg-[#05020a] border-2 flex items-center justify-center relative z-20 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.1)] ${isIntersecting ? 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-orange-500/30'}`}>
          <div className={`w-3 h-3 rounded-full bg-orange-500 absolute ${isIntersecting ? 'animate-ping opacity-100' : 'opacity-0'}`} />
          <div className={`w-3 h-3 rounded-full transition-colors duration-500 relative z-30 ${isIntersecting ? 'bg-orange-500' : 'bg-neutral-700'}`} />
        </div>
      </div>

      {/* Number block */}
      <div className={`w-[45%] flex items-center ${isEven ? 'justify-start pl-12' : 'justify-end pr-12'}`}>
        <span className={`text-8xl lg:text-9xl font-black select-none pointer-events-none tracking-tighter transition-all duration-700 ${isIntersecting ? 'text-orange-500/20 scale-105' : 'text-white/[0.06]'}`}>
          {`0${idx + 1}`}
        </span>
      </div>
    </div>
  );
};

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
    highlight: "Diqqat jalb qilish oson — biznesga foyda keltirish qiyin. Biz aynan shu qiyin ishni qilamiz.",
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
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const servicesList = ['Branding', 'SMM', 'Video Production', 'Marketing Strategiya'];

  const handleToggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && phone) {
      setIsLoading(true);
      try {
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw0HmH8jkJ0AoI-2vaQrJb1cWD6RsKNzY1ItbY0nE_75RxLM6VcZ6cgOq4Vmt6JBgXizA/exec";
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify({
            ism: name,
            nomer: phone,
            soha: selectedServices.join(', ')
          })
        });
      } catch (err) {
        console.error("Error sending to Google Sheets:", err);
      } finally {
        setIsLoading(false);
        setSubmitted(true);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden shadow-2xl min-h-[400px]">
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-center mb-6">
          {/* Rotating gradient ring */}
          <div className="w-16 h-16 rounded-full border-2 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute w-10 h-10 rounded-full bg-orange-500/10 animate-pulse" />
        </div>

        <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest block font-semibold animate-pulse">
          Yuborilmoqda...
        </span>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-full flex flex-col justify-center items-center bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden shadow-2xl min-h-[400px] text-center"
      >
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Glowing Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative flex items-center justify-center mb-6"
        >
          <div className="absolute w-20 h-20 rounded-full bg-orange-500/10 animate-ping opacity-75" />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-red-500 border border-orange-500/30 flex items-center justify-center text-white shadow-[0_0_30px_rgba(249,115,22,0.4)]">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <ShieldCheck className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="space-y-2"
        >
          <h3 className="text-2xl font-black text-white tracking-wide bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent">Yuborildi!</h3>
          <p className="text-xs text-neutral-400 font-light max-w-[200px] mx-auto leading-relaxed">
            Tez orada bog'lanamiz
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between bg-[#0b0813]/60 border border-white/5 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-6 flex-grow">
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
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-[#05020a]/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-all duration-300"
            />
          </div>
        </div>

        {/* Dynamic Services Selector to Fill Space Beautifully */}
        <div className="space-y-3 pt-2">
          <label className="text-xs text-neutral-400 font-medium block">Qaysi yo'nalishlar sizni ko'proq qiziqtiryapti?</label>
          <div className="flex flex-wrap gap-2">
            {servicesList.map((service) => {
              const isSelected = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleToggleService(service)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all duration-300 cursor-pointer ${isSelected
                    ? 'bg-orange-500/10 border-orange-500/50 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]'
                    : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:border-white/15 hover:text-neutral-200'
                    }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 group transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 active:scale-98 cursor-pointer"
        >
          <span>Hamkorlikni boshlash</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Security / trust badge */}
        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
          <Lock className="w-3 h-3 text-orange-500/60" />
          <span>Ma'lumotlaringiz shifrlangan holda xavfsiz uzatiladi</span>
        </div>
      </div>
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
        <div className="max-w-7xl mx-auto px-8 h-16 rounded-full border border-white/5 bg-[#05020a]/80 backdrop-blur-md flex items-center justify-between shadow-xl shadow-orange-950/5">
          <div className="flex items-center gap-1 h-14">
            <img src="/logo_icon.png" alt="Tesseract Logo" className="h-full w-auto object-contain" />
            <img src="/logo_text.png" alt="Tesseract Marketing" className="h-10 sm:h-11 w-auto object-contain" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#solutions" className="text-xs lg:text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Xizmatlar" className="text-xs lg:text-sm font-medium" />
            </a>
            <a href="#partners" className="text-xs lg:text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Hamkorlar" className="text-xs lg:text-sm font-medium" />
            </a>
            <a href="#why-us" className="text-xs lg:text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Afzalliklar" className="text-xs lg:text-sm font-medium" />
            </a>
            <a href="#metrics" className="text-xs lg:text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Natijalar" className="text-xs lg:text-sm font-medium" />
            </a>
            <a href="#contact" className="text-xs lg:text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              <Text_03 text="Bog'lanish" className="text-xs lg:text-sm font-medium" />
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="relative px-5 py-2 rounded-full border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white font-semibold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 flex items-center gap-1 group cursor-pointer"
            >
              <Text_03 text="Bog'lanish" className="font-semibold text-xs" /> <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white z-50 relative"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 animate-in fade-in zoom-in duration-300" /> : <Menu className="w-6 h-6 animate-in fade-in zoom-in duration-300" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown with smooth animated transition */}
        <div
          className={`md:hidden absolute left-4 right-4 top-20 border border-white/10 bg-[#05020a]/95 backdrop-blur-xl px-6 py-8 flex flex-col gap-5 rounded-3xl transition-all duration-500 ease-out origin-top ${mobileMenuOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
            }`}
        >
          <a
            href="#solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-neutral-300 hover:text-white transition-all duration-300 border-b border-white/5 pb-2"
          >
            <Text_03 text="Xizmatlar" className="text-lg font-medium" />
          </a>
          <a
            href="#partners"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-neutral-300 hover:text-white transition-all duration-300 border-b border-white/5 pb-2"
          >
            <Text_03 text="Hamkorlar" className="text-lg font-medium" />
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-neutral-300 hover:text-white transition-all duration-300 border-b border-white/5 pb-2"
          >
            <Text_03 text="Afzalliklar" className="text-lg font-medium" />
          </a>
          <a
            href="#metrics"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-neutral-300 hover:text-white transition-all duration-300 border-b border-white/5 pb-2"
          >
            <Text_03 text="Natijalar" className="text-lg font-medium" />
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-neutral-300 hover:text-white transition-all duration-300 pb-1"
          >
            <Text_03 text="Bog'lanish" className="text-lg font-medium" />
          </a>
          <hr className="border-white/10 my-1" />
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full text-center py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white font-bold rounded-full flex items-center justify-center gap-2 group shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Text_03 text="Bog'lanish" className="font-bold text-base" /> <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 min-h-screen flex items-center justify-center z-10 pt-28 pb-12 md:pt-20 md:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8 w-full">

          {/* Left Hero Content */}
          <ScrollReveal className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-16 mt-2 md:mt-0" delay={150}>
            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-[8.5vw] sm:text-[6vw] md:text-[5.5vw] lg:text-[66px] tracking-tight leading-[1.15] mb-6 text-white space-y-2 w-full">
              <div className="block whitespace-nowrap">Biznesingizni</div>
              <div className="block whitespace-nowrap">
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">tizimli</span>{" "}
                <span>marketing</span>
              </div>
              <div className="block whitespace-nowrap flex items-center justify-center lg:justify-start gap-x-2 sm:gap-x-3">
                <span>bilan</span>
                <TextSlider text="o'stiramiz" className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-400 bg-clip-text text-transparent font-display font-extrabold text-[8.5vw] sm:text-[6vw] md:text-[5.5vw] lg:text-[66px]" />
              </div>
            </h1>

            {/* Description */}
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Biz taxmin qilmaymiz, isbotlaymiz. Muammoni tahlil qilamiz, yechim yaratamiz, natijani raqamda ko'rsatamiz.
            </p>
          </ScrollReveal>

          {/* Right — Globe & Morphing Cube Visualization */}
          <ScrollReveal className="flex-1 flex items-center justify-center p-4 md:p-0 min-h-[300px] md:min-h-[550px] w-full relative" delay={300} yOffset={45}>
            <div className="absolute inset-0 bg-radial-gradient opacity-80 blur-xl pointer-events-none scale-75" />
            <div className="relative w-full max-w-[760px] aspect-square flex items-center justify-center">
              <MorphingGlobe />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Solutions Section */}
      <section className="relative border-t border-white/5 bg-[#05020a] pt-4 pb-12 md:py-16 z-10 overflow-hidden" id="solutions">
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
      <section className="relative bg-[#05020a] py-16 lg:py-20 z-10 overflow-hidden" id="partners">
        {/* Top border with gradient to fade out on the edges */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] md:w-[50%] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        {/* Ambient glow matching the theme on the right */}
        <div className="hidden md:block absolute -right-[150px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen" />
        <div className="hidden md:block absolute -right-[80px] top-[20%] w-[250px] h-[250px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none z-0" />

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
            {/* Desktop Grid Layout */}
            <div className="hidden md:flex flex-wrap justify-center gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md transition-all duration-500 hover:border-orange-500/30 hover:bg-orange-500/5 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/5 min-h-[110px] w-full md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)] min-w-[170px]"
                >
                  <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-t from-orange-500/0 via-orange-500/0 to-orange-500/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                    {partner.logo}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Infinite Scrolling Tickers (Three rows) */}
            <div className="md:hidden flex flex-col gap-3 overflow-hidden relative w-[calc(100%+3rem)] -mx-6 py-2">
              {/* Fade masks for edges */}
              <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-[#05020a] to-transparent z-20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-[#05020a] to-transparent z-20 pointer-events-none" />

              {/* Row 1 */}
              <div className="flex overflow-hidden w-full">
                <div className="animate-marquee flex gap-2 pr-2">
                  {[...partners.slice(0, 7), ...partners.slice(0, 7), ...partners.slice(0, 7)].map((partner, idx) => (
                    <div
                      key={`${partner.name}-r1-${idx}`}
                      className="flex items-center justify-center px-3 py-2 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm min-w-[110px] h-[55px]"
                    >
                      <div className="opacity-60 scale-75">
                        {partner.logo}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex overflow-hidden w-full">
                <div className="animate-marquee-fast flex gap-2 pr-2">
                  {[...partners.slice(7, 13), ...partners.slice(7, 13), ...partners.slice(7, 13)].map((partner, idx) => (
                    <div
                      key={`${partner.name}-r2-${idx}`}
                      className="flex items-center justify-center px-3 py-2 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm min-w-[110px] h-[55px]"
                    >
                      <div className="opacity-60 scale-75">
                        {partner.logo}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex overflow-hidden w-full">
                <div className="animate-marquee-slow flex gap-2 pr-2">
                  {[...partners.slice(13, 19), ...partners.slice(13, 19), ...partners.slice(13, 19)].map((partner, idx) => (
                    <div
                      key={`${partner.name}-r3-${idx}`}
                      className="flex items-center justify-center px-3 py-2 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm min-w-[110px] h-[55px]"
                    >
                      <div className="opacity-60 scale-75">
                        {partner.logo}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                  70 dan ortiq
                  <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                </span>{" "}
                ekspert va tadbirkorlar bizni tanlashgan?
              </h2>
            </div>
          </ScrollReveal>

          {/* Mobile and Tablet Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6 relative z-10">
            {whyChooseUs.map((item, idx) => {
              const xOffset = idx % 2 === 0 ? -30 : 30;
              return (
                <ScrollReveal
                  key={item.title}
                  xOffset={xOffset}
                  yOffset={0}
                  delay={idx * 60}
                  className="w-full"
                >
                  <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0b0813]/60 border border-white/5 backdrop-blur-md transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                        {React.cloneElement(item.icon, { strokeWidth: 1.5, className: "w-6 h-6" })}
                      </div>
                      <h3 className="font-display font-bold text-xl text-white">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-base font-semibold text-orange-300 leading-relaxed border-l-2 border-orange-500 pl-3.5 mb-4">
                      {item.highlight}
                    </p>

                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Desktop Timeline Layout (modern and highly creative) */}
          <div className="hidden lg:block relative mt-24 max-w-5xl mx-auto">
            {/* Timeline center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-orange-500/50 via-amber-500/30 to-orange-500/10 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-amber-400 to-transparent animate-pulse" />
            </div>

            <div className="space-y-8 relative z-10">
              {whyChooseUs.map((item, idx) => (
                <TimelineItem
                  key={item.title}
                  item={item}
                  idx={idx}
                  isEven={idx % 2 === 0}
                />
              ))}
            </div>
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
            <ScrollReveal className="md:col-span-2 lg:col-span-2 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-orange-500/30 hover:bg-[#0c0816] hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 transition-all duration-500" delay={150}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all duration-500 pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 h-full">
                <div className="space-y-4 max-w-md">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Mijoz oqimi & Taniqlilik o'sishi</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Mijozlarimiz biz bilan ishlagandan so'ng brend orqali keladigan mijoz oqimi va brend taniqliligi o'rtacha 1.8 barobarga oshadi.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end justify-center w-full md:w-auto">
                  <span className="text-5xl sm:text-7xl font-display font-black text-white tracking-tighter bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">180%</span>
                  {/* Mini graph SVG */}
                  <svg className="w-32 h-12 text-orange-500 mt-2 group-hover:scale-105 group-hover:text-amber-400 transition-all duration-500" viewBox="0 0 120 40" fill="none">
                    <path d="M0 35C20 30 30 15 50 12C70 9 80 5 120 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="120" cy="2" r="4" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Video quality TOP 10% */}
            <ScrollReveal className="md:col-span-1 lg:col-span-1 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-orange-500/30 hover:bg-[#0c0816] hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 transition-all duration-500" delay={200}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col justify-between h-full gap-8">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-500">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Video Production sifati</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Bizning video mahsulotlarimiz sifat va kreativlik bo'yicha O'zbekistonda yetakchi 10% talik reytingga kiradi.
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight group-hover:text-amber-400 transition-colors duration-500">TOP 10%</span>
                  {/* Flashing REC indicator */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-[10px] font-mono text-red-500 group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse group-hover:bg-white" />
                    <span>REC</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Guarantees 8x */}
            <ScrollReveal className="md:col-span-1 lg:col-span-1 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-orange-500/30 hover:bg-[#0c0816] hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 transition-all duration-500" delay={250}>
              <div className="flex flex-col justify-between h-full gap-8">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Kafolat ortig'i bilan</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Aksariyat mijozlarimiz bilan shartnomada kelishilgan kafolatlarimizni kamida 8 barobar ortig'i bilan bajarganmiz va barcha mijozlarimizga kafolatdan ortig'ini bajarishga harakat qilamiz.
                  </p>
                </div>
                <div className="flex items-end justify-between w-full">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white group-hover:text-orange-400 transition-colors duration-500"><CountUp end={8} suffix="x" /></span>
                  {/* Led Indicator */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-1.5 h-6 rounded bg-orange-500/80 animate-pulse group-hover:h-8 group-hover:bg-orange-400 transition-all duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Audience coverage 1,000,000+ */}
            <ScrollReveal className="md:col-span-2 lg:col-span-2 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-orange-500/30 hover:bg-[#0c0816] hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 transition-all duration-500" delay={300}>
              <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 h-full">
                <div className="space-y-4 max-w-md">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-300">Auditoriya qamrovi (Coverage)</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Bizning kampaniyalarimiz orqali umumiy hisobda 1,000,000 dan ortiq foydali auditoriya qamrab olindi.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end justify-center w-full md:w-auto">
                  <span className="text-3xl sm:text-5xl font-display font-black text-white tracking-tighter bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">1,000,000+</span>
                  {/* Radar animation placeholder */}
                  <div className="w-16 h-16 rounded-full border border-orange-500/20 flex items-center justify-center relative mt-3 group-hover:border-orange-500/50 group-hover:scale-110 transition-all duration-500">
                    <div className="absolute inset-0 rounded-full border border-orange-500/40 animate-ping [animation-duration:2s]" />
                    <div className="w-3.5 h-3.5 bg-orange-500 rounded-full group-hover:bg-orange-400 transition-colors" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Sales assisted $500,000+ */}
            <ScrollReveal className="md:col-span-2 lg:col-span-3 bg-[#0b0813]/60 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden group hover:border-orange-500/30 hover:bg-[#0c0816] hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 transition-all duration-500" delay={350}>
              <div className="absolute -left-12 -top-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 h-full">
                <div className="space-y-4 max-w-xl">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all duration-500">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-300">Yordam berilgan umumiy sotuvlar</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    Hamkorlarimiz bilan olib borilgan tizimli marketing va savdo strategiyalari natijasida umumiy hisobda 500,000 AQSh dollaridan ortiq sotuvlar hajmini shakllantirdik.
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end justify-center bg-white/[0.02] border border-white/5 px-4 py-4 sm:px-8 sm:py-6 rounded-2xl backdrop-blur-sm w-full md:w-auto group-hover:border-orange-500/30 group-hover:bg-[#05020a]/80 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.1)] transition-all duration-500">
                  <span className="text-3xl sm:text-5xl font-display font-black text-white group-hover:scale-105 transition-transform duration-500">$<LiveCounter />+</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Tracked Metric
                  </span>
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
        <div className="absolute left-[-150px] top-[-150px] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

        {/* Dotted grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Centered Heading */}
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-8" delay={100}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Agar hammasi tushunarli bo'lsa, birgina{" "}
              <span className="relative inline-block px-4 py-1.5 mx-1">
                <span className="relative z-10 text-white">savol</span>
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
              qoldi
            </h2>

            {/* Styled Question Block */}
            <div className="space-y-6 max-w-3xl mx-auto pt-2 flex flex-col items-center">

              {/* Arrow: Hand-drawn curly arrow pointing down */}
              <div className="text-orange-500/90 my-2">
                <svg
                  className="w-48 h-32 transform rotate-12"
                  viewBox="0 0 100 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* A hand-drawn style loop going down */}
                  <path d="M40 5 C 60 0, 75 10, 60 25 C 45 40, 35 25, 48 48 C 50 50, 52 52, 54 53" />
                  {/* Arrowhead */}
                  <path d="M44 46 L54 53 L52 41" />
                </svg>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-center leading-relaxed text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-white">
                  Manfaatli hamkorlik qilishga tayyormisiz? <br />
                  Agar javobingiz{" "}
                </span>
                <span className="relative inline-block text-orange-400 px-1.5 font-black">
                  ha
                  <span className="absolute bottom-1 left-0 w-full h-[3px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-white">
                  {" "}bo'lsa, biz shu yerdamiz.
                </span>
              </h3>
            </div>
          </ScrollReveal>

          {/* Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">

            {/* Left side Warning Card */}
            <ScrollReveal className="w-full flex" delay={150}>
              <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/20 via-red-900/10 to-transparent p-8 md:p-10 shadow-[0_0_50px_rgba(239,68,68,0.05)] group/warn w-full h-full flex flex-col justify-between gap-6">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none group-hover/warn:bg-red-500/15 transition-colors duration-500" />
                <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-[0.25em]">Raqobat ogohlantirishi</span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight">
                    Siz tayyor bo'lmasangiz — <span className="bg-gradient-to-r from-red-400 via-rose-500 to-rose-400 bg-clip-text text-transparent font-black">raqobatchilaringiz</span> boshlashga allaqachon tayyor 😉
                  </h3>

                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
                    Biznes olamida vaqt — eng qimmatli resurs. Har bir kechiktirilgan kun raqiblaringizga oldinga o'tib olish uchun yangi imkoniyat beradi.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side form */}
            <ScrollReveal className="w-full flex" delay={250} yOffset={45}>
              <div className="w-full h-full">
                <ContactForm />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 pb-12 mt-12" id="footer">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] border border-white/5 bg-[#0b0813]/60 backdrop-blur-md p-8 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Brand Info and Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/5">
            {/* Map Left Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-orange-400" />
                  Bizning Manzil
                </h4>
                <div className="relative w-full h-[180px] rounded-2xl overflow-hidden border border-white/5 bg-[#05020a]/40 shadow-inner group">
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1SfrMMbNN12I5yH71pM5UPZmpUoiR4JE"
                    width="100%"
                    className="border-0 opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-2xl absolute -top-[52px] left-0 w-full h-[235px]"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <a
                  href="https://www.google.com/maps/d/u/0/edit?mid=1SfrMMbNN12I5yH71pM5UPZmpUoiR4JE&usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors mt-1 font-medium group"
                >
                  Google Maps'da ochish
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {/* Column 1: Services */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display">Xizmatlar</h4>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <a href="#solutions" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Performance Marketing
                    </a>
                  </li>
                  <li>
                    <a href="#solutions" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      SMM
                    </a>
                  </li>
                  <li>
                    <a href="#solutions" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Content Marketing
                    </a>
                  </li>
                  <li>
                    <a href="#solutions" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Branding
                    </a>
                  </li>
                  <li>
                    <a href="#solutions" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Video Production
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Company */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display">Kompaniya</h4>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <a href="#about" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Biz haqimizda
                    </a>
                  </li>
                  <li>
                    <a href="#partners" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Hamkorlarimiz
                    </a>
                  </li>
                  <li>
                    <a href="#why-us" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Nima uchun biz?
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1 group">
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      Bog'lanish
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Metrics */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display">Natijalarimiz</h4>
                <ul className="space-y-2.5 text-sm">
                  <li className="text-neutral-400 flex items-center gap-2">
                    <span className="text-orange-400 font-bold text-xs">180%</span> Mijoz oqimi
                  </li>
                  <li className="text-neutral-400 flex items-center gap-2">
                    <span className="text-orange-400 font-bold text-xs">TOP 10%</span> Video production
                  </li>
                  <li className="text-neutral-400 flex items-center gap-2">
                    <span className="text-orange-400 font-bold text-xs">8x</span> Kafolatlangan natija
                  </li>
                  <li className="text-neutral-400 flex items-center gap-2">
                    <span className="text-orange-400 font-bold text-xs">1M+</span> Qamrov darajasi
                  </li>
                  <li className="text-neutral-400 flex items-center gap-2">
                    <span className="text-orange-400 font-bold text-xs">$500k+</span> Sotuvlar hajmi
                  </li>
                </ul>
              </div>

              {/* Column 4: Socials */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display">Ijtimoiy Tarmoqlar</h4>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <a href="https://www.instagram.com/tesseract_marketing/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/tesseract_marketing" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.61l-1.91 9c-.14.65-.53.81-1.08.5l-2.91-2.15-1.4 1.35c-.15.15-.28.28-.58.28l.2-2.94 5.35-4.83c.23-.21-.05-.32-.36-.12L9.94 13.3 7.1 12.41c-.62-.19-.63-.62.13-.92l11.07-4.27c.51-.19.96.11.8.81z" />
                      </svg>
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/share/1A9H5YPDpM/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/tesseract-marketing-agency-8404853b1/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="mailto:tesseactmarketingagency@gmail.com" className="text-neutral-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neutral-400 hover:text-orange-400" />
                      Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 border-t border-white/5">
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-300 transition-colors">Maxfiylik siyosati</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Foydalanish shartlari</a>
            </div>
            <div className="font-mono">
              &copy; {new Date().getFullYear()} Tesseract Marketing. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
