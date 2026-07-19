import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const firstColumnImages = [
  "/loyihalar/IMG_9506.PNG",
  "/loyihalar/IMG_9507.PNG",
  "/loyihalar/IMG_9508.PNG",
  "/loyihalar/IMG_9509.PNG",
  "/loyihalar/IMG_2929.PNG"
];

const secondColumnImages = [
  "/loyihalar/IMG_9510.PNG",
  "/loyihalar/IMG_9511.PNG",
  "/loyihalar/IMG_9512.PNG",
  "/loyihalar/IMG_9513.PNG",
  "/loyihalar/IMG_2931.PNG"
];

const thirdColumnImages = [
  "/loyihalar/IMG_9514.PNG",
  "/loyihalar/IMG_9515.PNG",
  "/loyihalar/IMG_9516.PNG",
  "/loyihalar/IMG_9517.PNG"
];

export const Testimonials = ({ lang = "uz" }: { lang?: "uz" | "ru" }) => {
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
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mt-2">
            {lang === "uz" ? "Bizga ishonch bildirgan Loyihalar" : "Проекты, доверившие нам свой маркетинг"}
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-lg leading-relaxed font-light">
            {lang === "uz"
              ? "Biznesingizni rivojlantirishga hissa qo'shgan va bizga o'z marketingini ishonib topshirgan yetakchi loyihalar va brendlar."
              : "Ведущие проекты и бренды, которым мы помогли вырасти, доверившие свой маркетинг нашей команде."}
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 md:gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[660px] overflow-hidden">
          <TestimonialsColumn images={firstColumnImages} duration={22} />
          <TestimonialsColumn images={secondColumnImages} className="hidden md:block" duration={26} />
          <TestimonialsColumn images={thirdColumnImages} className="hidden lg:block" duration={24} />
        </div>
      </div>
    </section>
  );
};
