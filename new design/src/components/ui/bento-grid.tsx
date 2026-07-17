import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[11rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  cta,
  isSmall,
  onCtaClick,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  cta: string;
  isSmall?: boolean;
  onCtaClick?: () => void;
}) => (
  <div
    key={name}
    onClick={onCtaClick}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-3xl cursor-pointer select-none",
      // Dark styles adapted for the site
      "bg-[#05020a]/80 border border-white/10 shadow-xl shadow-black/50 backdrop-blur-md",
      "hover:border-orange-500/30 transition-all duration-500",
      className,
    )}
  >
    <div className="absolute inset-0 pointer-events-none">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-5 lg:p-6 transition-all duration-500 group-hover:-translate-y-2">
      <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-2 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/40 group-hover:bg-orange-500/20 shadow-lg shadow-orange-500/5">
        <Icon className="h-5 w-5 text-orange-400" />
      </div>
      <h3 className="text-lg font-display font-bold text-white mb-1">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400 text-[13px] leading-snug line-clamp-2 md:line-clamp-3">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute z-20 flex transform-gpu flex-row items-center transition-all duration-500",
        "top-2 right-4 md:top-auto md:right-auto",
        isSmall 
          ? "md:top-0 md:right-0 md:opacity-0 md:group-hover:opacity-100 p-5 lg:p-6" 
          : "md:bottom-0 md:left-0 md:translate-y-2 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 p-5 lg:p-6"
      )}
    >
      <Button 
        variant="ghost" 
        size="sm" 
        className={cn(
          "pointer-events-none rounded-full h-7 text-[10px] border-0 shadow-none bg-transparent text-neutral-400/80 transition-all duration-300 pr-0",
          "md:border md:border-white/10 md:bg-[#05020a]/90 md:h-8 md:px-5 md:text-xs md:text-orange-400 md:shadow-md md:backdrop-blur-sm"
        )}
      >
        <span className="md:hidden">Batafsil o'qish</span>
        <span className="hidden md:inline">{cta}</span>
        <ArrowRight className="ml-1 h-3 w-3 md:ml-1.5 md:h-3.5 md:w-3.5" />
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-500 group-hover:bg-gradient-to-t group-hover:from-[#05020a] group-hover:to-transparent opacity-80" />
  </div>
);

export { BentoCard, BentoGrid };
