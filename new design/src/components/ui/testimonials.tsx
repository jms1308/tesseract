import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    username: "crystalbay.uz",
    name: "ТУРОПЕРАТОР CRYSTAL BAY UZBEKISTAN",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=200&auto=format&fit=crop",
    posts: "383",
    followers: "16.7K",
    following: "58",
    category: "Local & travel website"
  },
  {
    username: "dr.daniyar.baxtiyarovich",
    name: "Daniyar Baxtiyarovich | Stomatolog",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop",
    posts: "121",
    followers: "30.9K",
    following: "197",
    category: "General Dentist"
  },
  {
    username: "cosmetolog.charos",
    name: "KOSMETOLOG | ГУБЫ | ТАШКЕНТ",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    posts: "128",
    followers: "16.4K",
    following: "191",
    category: "Health/Beauty"
  },
  {
    username: "dr.gulhayoo",
    name: "Косметолог | Ташкент",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?q=80&w=200&auto=format&fit=crop",
    posts: "64",
    followers: "7,692",
    following: "3",
    category: "Cosmetologist"
  },
  {
    username: "cosmetolog.nadira.yakubova",
    name: "Nodira Yakubova | Косметолог",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    posts: "918",
    followers: "502K",
    following: "2,735",
    category: "Health/Beauty"
  },
  {
    username: "tvsevimli_official",
    name: "Sevimli TV",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
    posts: "18.1K",
    followers: "1.3M",
    following: "10",
    category: "Digital creator"
  },
  {
    username: "kosmetolog_lobar_ismoilovna",
    name: "Lobar Ismoilova",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    posts: "223",
    followers: "11.4K",
    following: "31",
    category: "Cosmetologist"
  },
  {
    username: "alimardon_hamroyev",
    name: "Alimardon Hamroyev | Trader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    posts: "37",
    followers: "3,363",
    following: "0",
    category: "Trader / Strategist"
  },
  {
    username: "myschooluz",
    name: "MYSCHOOL LC | ENGLISH",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop",
    posts: "1,335",
    followers: "75.2K",
    following: "2",
    category: "Education"
  },
  {
    username: "diyora_keldiyorova",
    name: "Diyora Keldiyorova",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=200&auto=format&fit=crop",
    posts: "490",
    followers: "554K",
    following: "368",
    category: "Athlete / Judoka"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 7);
const thirdColumn = testimonials.slice(7, 10);

export const Testimonials = () => {
  return (
    <section className="bg-transparent my-16 py-12 relative overflow-hidden" id="testimonials">
      {/* Background ambient glow */}
      <div className="absolute right-[-150px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute left-[-150px] top-[20%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* Dotted grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto text-center mb-12"
        >
          <div className="flex justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 font-mono mb-3 block border border-orange-500/30 py-1 px-4 rounded-full bg-orange-500/5">
              Ishonch
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mt-2">
            Bizga ishonch bildirgan Loyihalar
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-lg leading-relaxed font-light">
            Biznesingizni rivojlantirishga hissa qo'shgan va bizga o'z marketingini ishonib topshirgan yetakchi loyihalar va brendlar.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[660px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
