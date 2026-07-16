import { TrendingUp, Share2, FileText, Sparkles, Video } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: TrendingUp,
    name: "Performance marketing",
    description: "Natijaga yo'naltirilgan raqamli reklama. Har bir harakat (klik, ariza, sotuv) aniq o'lchanadi va tahlil qilinadi.",
    href: "#",
    cta: "Batafsil",
    background: <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    isSmall: false,
  },
  {
    Icon: Share2,
    name: "Social Media Marketing",
    description: "Brendingizni ijtimoiy tarmoqlarda shakllantirish va rivojlantirish jarayoni. To'g'ri kontent, dizayn va strategiyalar orqali auditoriya jalb qilinadi.",
    href: "#",
    cta: "Batafsil",
    background: <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    isSmall: false,
  },
  {
    Icon: FileText,
    name: "Content Marketing",
    description: "Foydali, dolzarb va muhim kontent orqali auditoriya ishonchi qozoniladi.",
    href: "#",
    cta: "Batafsil",
    background: <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    isSmall: true,
  },
  {
    Icon: Sparkles,
    name: "Branding",
    description: "Brendingizning tashqi ko'rinishi, ovozi va pozitsiyasini shakllantirish. Yagona va esda qoladigan obraz yaratamiz.",
    href: "#",
    cta: "Batafsil",
    background: <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    isSmall: true,
  },
  {
    Icon: Video,
    name: "Video Production",
    description: "Professional video kontent yaratish xizmati. Reklama roliklaridan tortib korporativ videolargacha brend qiymatini oshiradi.",
    href: "#",
    cta: "Batafsil",
    background: <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 opacity-0 object-cover w-full h-full mix-blend-overlay transition-opacity duration-700 group-hover:opacity-60" alt="bg" />,
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
