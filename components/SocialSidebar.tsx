"use client";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { PhoneIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const socialLinks = [
  // {
  //   Icon: FacebookIcon,
  //   href: "https://www.facebook.com/profile.php?id=61588168291064",
  //   label: "Facebook",
  //   bgColor: "bg-[hsl(221,44%,41%)]",
  // },
  // {
  //   Icon: InstagramIcon,
  //   href: "https://www.instagram.com/sundarbanbengaltrip/",
  //   label: "Instagram",
  //   bgColor:
  //     "bg-gradient-to-br from-[hsl(280,100%,44%)] via-[hsl(350,100%,55%)] to-[hsl(28,95%,59%)]", // Instagram gradient
  // },
  {
    Icon: PhoneIcon,
    href: "tel:+917074432628",
    label: "Call",
    bgColor: "bg-green-600",
  },
  {
    Icon: WhatsAppIcon,
    href: "https://wa.me/917074432628",
    label: "WhatsApp",
    bgColor: "bg-[hsl(142,70%,49%)]",
  },
];

export const SocialSidebar = () => {
  const pathname = usePathname();

  if (pathname?.includes("admin")) return null;
  return (
    <div className="fixed right-1 md:right-2 top-1/2 -translate-y-1/2 z-40 scale-75 md:scale-100 flex flex-col gap-2">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={`w-12 h-12 flex items-center justify-center text-primary-foreground transition-all rounded-full scale-90 hover:scale-100 duration-300 ${social.bgColor}`}
        >
          <social.Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};
