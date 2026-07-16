import React from "react";
import { X, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

const SERVICE_DETAILS: Record<string, {
  description: string;
  whyNeed: string[];
  whatWeDo: Array<{ title: string; desc: string }>;
  platforms: string[];
  whyUs: string[];
  note: string;
}> = {
  "Branding": {
    description: "Brendingizning tashqi ko'rinishi, ovozi va pozitsiyasini shakllantirish jarayoni. Logo, ranglar, uslub, ohang va kommunikatsiya orqali bozorda sizni boshqalardan ajratib turadigan yagona obraz yaratiladi. Kuchli branding — bu ishonch, tanilish va uzoq muddatli mijozlar bazasi.",
    whyNeed: [
      "Brendingiz professional ko'rinadi",
      "Raqobatchilardan ajralib turasiz",
      "Mijozlarda ishonch paydo bo'ladi",
      "Brand recognition (taniqlilik) oshadi",
      "Narx bilan emas, qiymat bilan raqobat qilasiz",
      "Uzoq muddatli barqaror biznes quriladi"
    ],
    whatWeDo: [
      { title: "Brand strategiya tuzamiz", desc: "Bozoringiz, auditoriyangiz va maqsadingiz asosida brend pozitsiyasini ishlab chiqamiz." },
      { title: "Logo va vizual identitet yaratamiz", desc: "Logo, rang palitrasi, shriftlar va umumiy dizayn stilini ishlab chiqamiz." },
      { title: "Brand book tayyorlaymiz", desc: "Brenddan qanday foydalanish kerakligi bo'yicha to'liq qo'llanma yaratamiz." },
      { title: "Naming va slogan ishlab chiqamiz", desc: "Brendingizga mos, esda qoladigan nom va shior tayyorlaymiz." },
      { title: "Profil va sahifalarni brendlash", desc: "Instagram, Telegram, sayt va boshqa platformalarni yagona stilga keltiramiz." },
      { title: "Vizual kontent ishlab chiqamiz", desc: "Postlar, bannerlar, reklama dizaynlari va prezentatsiyalar tayyorlaymiz." }
    ],
    platforms: ["Instagram", "Facebook", "Telegram", "Website", "YouTube", "LinkedIn"],
    whyUs: [
      "Sizni oddiy biznes emas, kuchli brendga aylantiradi",
      "Mijozlar sizni tez eslab qoladi va tanib oladi",
      "Ishonch va obro' mukammal shakllanadi",
      "Sotuv va xizmat ko'rsatish jarayonini osonlashtiradi",
      "Brendingiz uzoq yillar davomida siz uchun ishlaydi"
    ],
    note: "Agar bozorda ko'rinmayotgan bo'lsangiz, branding aynan siz uchun."
  },
  "Video Production": {
    description: "Biznesingiz uchun professional video kontent yaratish jarayoni. Reels, reklama roliklari, imij videolar va taqdimotlar orqali auditoriyaga tez, tushunarli va ta'sirli tarzda yetib borish imkonini beradi. Video — bugungi marketingning eng kuchli quroli.",
    whyNeed: [
      "Auditoriya diqqatini tez jalb qiladi",
      "Kontent ko'proq ko'riladi va ijtimoiy tarmoqlarda ulashiladi",
      "Mijozlar oldidagi ishonch keskin oshadi",
      "Sotuvga va arizalar soniga kuchli ta'sir qiladi",
      "Brand image (brend nufuzi) mustahkamlanadi",
      "Reels va TikTok algoritmlarida tezroq o'sish beradi"
    ],
    whatWeDo: [
      { title: "Video strategiya tuzamiz", desc: "Qaysi turdagi video sizga ko'proq natija berishini aniqlab beramiz." },
      { title: "Ssenariy yozamiz", desc: "Har bir video uchun sotuvga yo'naltirilgan va qiziqarli ssenariy tayyorlaymiz." },
      { title: "Professional syomka qilamiz", desc: "Yuqori sifatli professional kameralar va yoritish texnikalari bilan suratga olamiz." },
      { title: "Montaj va post-production", desc: "Video kesish, rang berish (color grading), subtitr, effekt va musiqa qo'shamiz." },
      { title: "Reels / Shorts / TikTok videolar", desc: "Trendga mos, qisqa va viral bo'lishi mumkin bo'lgan kreativ videolar tayyorlaymiz." },
      { title: "Reklama roliklari ishlab chiqamiz", desc: "Target va promo kampaniyalar uchun maxsus sotuv videolari yaratamiz." }
    ],
    platforms: ["Instagram", "TikTok", "YouTube", "Facebook", "Telegram", "LinkedIn"],
    whyUs: [
      "Video kontent orqali mijozlarni tezroq ishontirib, sotuv qilasiz",
      "Brendingiz bozorda raqobatdosh va professional ko'rinadi",
      "Auditoriya shaxsingiz yoki mahsulotingizga ko'proq ishonadi",
      "Video kontentingiz sifati raqobatchilardan bir necha barobar ustun bo'ladi",
      "Target reklamasida reklamadan keladigan arizalar narxi arzonlashadi"
    ],
    note: "Agar kontentingiz ko'rilmayotgan bo'lsa — muammo videoda. Biz buni mukammal hal qilamiz."
  },
  "Social Media Marketing": {
    description: "Brendingizni ijtimoiy tarmoqlarda shakllantirish va rivojlantirish jarayoni. To'g'ri kontent, dizayn va strategiyalar orqali auditoriya jalb qilinadi.",
    whyNeed: [
      "Brendingiz ijtimoiy tarmoqlarda faol va professional ko'rinadi",
      "Auditoriya bilan to'g'ridan-to'g'ri ishonchli muloqot o'rnatiladi",
      "Sodiq mijozlar hamjamiyati (community) yaratiladi",
      "Brendingizga bo'lgan umumiy ishonch va obro' oshadi",
      "Doimiy va bepul mijozlar oqimini ta'minlaydi"
    ],
    whatWeDo: [
      { title: "SMM strategiya va tahlil", desc: "Raqobatchilar va auditoriyani tahlil qilib, brendga mos kontent strategiya tuzamiz." },
      { title: "Vizual dizayn (Grid layout)", desc: "Sahifaning umumiy dizayni, stories va post shablonlarini yuqori darajada tayyorlaymiz." },
      { title: "Kontent rejalashtirish", desc: "Har oy uchun foydali, qiziqarli va sotuvga yo'naltirilgan stories hamda postlar rejasini tuzamiz." },
      { title: "Professional Copywriting", desc: "Postlar uchun o'quvchini jalb qiladigan, ta'sirchan va savodli matnlar yozamiz." },
      { title: "Moderatsiya (Community)", desc: "Direct va izohlardagi mijozlarning savollariga tezkor javob qaytarishni yo'lga qo'yamiz." }
    ],
    platforms: ["Instagram", "Telegram", "Facebook", "TikTok", "LinkedIn"],
    whyUs: [
      "Biz shunchaki post joylamaymiz, brend imidji va faolligini oshiramiz",
      "Sizning sahifangiz raqobatchilardan estetik va mazmunan ajralib turadi",
      "Ijtimoiy tarmoqlar brendingizning eng faol savdo kanaliga aylanadi"
    ],
    note: "Brendingiz ijtimoiy tarmoqlarda qanchalik tartibli bo'lsa, mijozlarning sizga bo'lgan ishonchi shunchalik yuqori bo'ladi."
  },
  "Content Marketing": {
    description: "Foydali, dolzarb va vaqti-vaqti bilan chiquvchi kontent orqali auditoriya ishonchi qozoniladi. Quruq reklama o'rniga mijozlarga bilim va qiymat ulashib, brend ekspertligini isbotlash.",
    whyNeed: [
      "Mijozlarda brendingizga nisbatan ekspertlik ishonchi uyg'onadi",
      "Sotuv jarayoni osonlashadi (mijozlar o'zi tushunib sotib olishadi)",
      "Uzoq muddatli va juda sodiq mijozlar bazasi shakllanadi",
      "Brendingiz sohaga oid qidiruvlarda birinchilardan bo'lib chiqadi"
    ],
    whatWeDo: [
      { title: "Ekspertlik kontenti yaratish", desc: "Mahsulot yoki xizmatingiz foydasini ko'rsatuvchi foydali post va maqolalar tayyorlaymiz." },
      { title: "Storytelling", desc: "Loyiha keyslari, mijozlar muvaffaqiyati va brend tarixini qiziqarli hikoyalar orqali sotasiz." },
      { title: "Infografika va qo'llanmalar", desc: "Murakkab ma'lumotlarni o'quvchiga sodda va vizual tarzda tushuntirib beramiz." },
      { title: "Haftalik axborotnomalar (Newsletters)", desc: "Mijozlarga Telegram yoki Email orqali muntazam foydali va ekspertlik materiallarini yuboramiz." }
    ],
    platforms: ["Telegram", "Instagram", "Website Blog", "LinkedIn", "Medium"],
    whyUs: [
      "Biz quruq maqtov bilan emas, mijozning muammosini hal qilish orqali sotamiz",
      "Sizning brendingiz bozorda o'z sohasining eng ishonchli ekspertiga aylanadi",
      "Kontentingiz qiymati reklama xarajatlarini sezilarli darajada kamaytiradi"
    ],
    note: "Mijozga birinchi bo'lib qiymat bering, keyin u sizdan shubhasiz sotib oladi."
  },
  "Performance marketing": {
    description: "Natijaga yo'naltirilgan raqamli reklama. Har bir harakat (klik, ariza, sotuv) aniq o'lchanadi va tahlil qilinadi. Reklamaga sarflangan har bir dollarning qaytimini (ROI) maksimal qilish.",
    whyNeed: [
      "Reklama byudjeti mutlaqo havoga uchmaydi, har bir tiyin natija beradi",
      "Savdo bo'limi har kuni issiq arizalar (leadlar) bilan ta'minlanadi",
      "Reklama faqat sotib olish ehtimoli eng yuqori bo'lgan auditoriyaga ko'rsatiladi",
      "Savdo va arizalar sonini istalgancha masshtablashtirish (scale) mumkin"
    ],
    whatWeDo: [
      { title: "Target reklamalarni sozlash", desc: "Meta Ads (Instagram, Facebook) va TikTok Ads platformalarida target sozlaymiz." },
      { title: "Kontekstli reklama (Google Ads)", desc: "Qidiruv tizimlarida sizning xizmatingizni izlayotgan mijozlarga reklamani ko'rsatamiz." },
      { title: "Retargeting (Qayta jalb etish)", desc: "Avval qiziqqan yoki saytingizga kirib hech narsa sotib olmaganlarni qayta jalb etamiz." },
      { title: "CRM va Analitika integratsiyasi", desc: "Google Analytics va CRM orqali arizalar va real sotuvlar hisobotini yuritamiz." }
    ],
    platforms: ["Meta Ads (Instagram / Facebook)", "Google Ads", "TikTok Ads", "Yandex Direct"],
    whyUs: [
      "Biz chiroyli ko'rsatkichlar yoki layklar uchun emas, balki real arizalar va savdo uchun ishlaymiz",
      "Siz reklama xarajatlarining biznesingizga qancha daromad keltirayotganini aniq bilasiz",
      "Biz doimiy testlar va A/B testlar orqali arizalar narxini maksimal arzonlashtiramiz"
    ],
    note: "Biznesingiz uchun layk emas, arizalar va real savdo kerak bo'lsa, ushbu xizmat aynan sizga mos."
  }
};

export const ServiceModal = ({
  serviceName,
  onClose,
}: {
  serviceName: string;
  onClose: () => void;
}) => {
  const details = SERVICE_DETAILS[serviceName];

  if (!details) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#05020a]/98 backdrop-blur-xl overflow-y-auto px-4 md:px-6 py-12 flex justify-center items-start">
      {/* Background ambient glow inside modal */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Card */}
      <div className="max-w-4xl w-full bg-[#0b0813]/60 border border-white/10 rounded-3xl p-6 md:p-12 relative shadow-2xl mt-8 mb-8 z-10">
        
        {/* Top bar with back button & close button */}
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
          <button 
            onClick={onClose}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-all duration-300 group cursor-pointer text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Orqaga
          </button>
          
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Description */}
        <div className="space-y-6 mb-10">
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent w-fit">
            {serviceName}
          </h1>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
            {details.description}
          </p>
        </div>

        {/* Why Needed & What We Do Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          
          {/* Why Needed */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-lg text-white">Nima uchun {serviceName} kerak?</h3>
            <ul className="space-y-3">
              {details.whyNeed.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed font-light">
                  <CheckCircle2 className="w-4.5 h-4.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms we work on */}
          <div className="space-y-5">
            <h3 className="font-display font-bold text-lg text-white">Quyidagi platformalarda ishlaymiz:</h3>
            <div className="flex flex-wrap gap-2.5">
              {details.platforms.map((platform, index) => (
                <span 
                  key={index}
                  className="px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-xs text-neutral-300 font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* What We Do Detail List */}
        <div className="space-y-6 mb-10 border-t border-white/5 pt-8">
          <h3 className="font-display font-bold text-xl text-white">Biz nima qilamiz?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.whatWeDo.map((item, index) => (
              <div 
                key={index} 
                className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col gap-2 hover:border-orange-500/10 transition-colors duration-300"
              >
                <h4 className="font-bold text-sm text-neutral-200">{item.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose this service */}
        <div className="space-y-5 border-t border-white/5 pt-8 mb-10">
          <h3 className="font-display font-bold text-lg text-white">Nima uchun {serviceName} xizmatini tanlashingiz kerak:</h3>
          <ul className="space-y-3">
            {details.whyUs.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed font-light">
                <CheckCircle2 className="w-4.5 h-4.5 text-orange-500 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Warning / Note Banner */}
        <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-neutral-300 text-sm leading-relaxed font-light">
                {details.note}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
