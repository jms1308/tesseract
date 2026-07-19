import { TrendingUp, Share2, FileText, Sparkles, Video, ArrowUpRight } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: TrendingUp,
    name: "Performance marketing",
    description: "Reklama emas — natija sotamiz. Har bir mijoz qayerdan kelganini tahlil qilib, aniq daromad keltiramiz.",
    href: "#",
    cta: "Batafsil",
    background: <img src="/ads_manager_bg.png" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    isSmall: false,
  },
  {
    Icon: Share2,
    name: "Social Media Marketing",
    description: "SMM bilan, Onlaynda ko'rinasiz, offlaynda sotasiz. Ijtimoiy tarmoq profilingizni haqiqiy mijoz keltiradigan vositaga aylantiramiz.",
    href: "#",
    cta: "Batafsil",
    background: <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    isSmall: false,
  },
  {
    Icon: FileText,
    name: "Content Marketing",
    description: "Mazmunli va kreativ kontent bilan auditoriya ishonchini qozonib, sotuvlarni oshiramiz.",
    href: "#",
    cta: "Batafsil",
    background: <img src="/content_bg_minimal.png" className="absolute inset-0 opacity-0 object-cover w-full h-full transition-opacity duration-700 group-hover:opacity-35" alt="bg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    isSmall: true,
    HoverIcon: ArrowUpRight,
  },
  {
    Icon: Sparkles,
    name: "Branding",
    description: "Yodda qoladigan brend. Logotip, ranglar va uslub orqali bozorda tanilib oling.",
    href: "#",
    cta: "Batafsil",
    background: <img src="/branding_bg.png" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    isSmall: true,
  },
  {
    Icon: Video,
    name: "Video Production",
    description: "Tomoshabinlarni 3 soniyada to'xtatamiz. Diqqatni jalb qiluvchi va oxirigacha ko'riladigan professional videolar.",
    href: "#",
    cta: "Batafsil",
    background: <img src="/video_bg.png" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    isSmall: false,
  },
];

export function BentoDemo({ onSelectService }: { onSelectService: (serviceName: string) => void }) {
  return (
    <BentoGrid className="max-w-7xl mx-auto lg:grid-rows-[11rem_11rem_11rem]">
      {features.map((feature) => (
        <BentoCard 
          key={feature.name} 
          {...feature} 
          onCtaClick={() => onSelectService(feature.name)} 
        />
      ))}
    </BentoGrid>
  );
}
