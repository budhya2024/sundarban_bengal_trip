"use client";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const floatingButtons = [
  {
    Icon: Phone,
    href: "tel:+917586889519",
    label: "Call Us",
    bgColor: "bg-blue-600 hover:bg-blue-700",
    isExternal: false,
    iconClass: "w-5 h-5 text-white animate-phone-ring",
    hasWave: true,
    waveColor: "bg-blue-500",
  },
  {
    Icon: WhatsAppIcon,
    href: "https://wa.me/917586889519",
    label: "WhatsApp",
    bgColor: "bg-[hsl(142,70%,49%)] hover:bg-[#20bd5a]",
    isExternal: true,
    iconClass: "w-5 h-5 fill-current text-white",
    hasWave: false,
    waveColor: "bg-green-500",
  },
];

export const SocialSidebar = () => {
  const pathname = usePathname();

  if (pathname?.includes("admin")) return null;
  return (
    <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 scale-90 md:scale-100 flex flex-col gap-3.5">
      {floatingButtons.map((btn) => (
        <div key={btn.label} className="relative flex items-center justify-center">
          {btn.hasWave && (
            <span
              className={`absolute inset-0 rounded-full ${btn.waveColor} animate-call-wave pointer-events-none`}
            />
          )}
          <a
            href={btn.href}
            target={btn.isExternal ? "_blank" : undefined}
            rel={btn.isExternal ? "noopener noreferrer" : undefined}
            aria-label={btn.label}
            title={btn.label}
            className={`relative z-10 w-12 h-12 flex items-center justify-center text-primary-foreground transition-all rounded-full shadow-lg hover:scale-110 active:scale-95 duration-300 ${btn.bgColor}`}
          >
            <btn.Icon className={btn.iconClass} />
          </a>
        </div>
      ))}
    </div>
  );
};


