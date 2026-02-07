"use client";

import {
  FacebookIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { Link2, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ShareButtons({ title }: { title?: string }) {
  const pathname = usePathname();
  const { toast } = useToast();

  // Hide on admin pages
  if (pathname?.includes("admin")) return null;

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const shareTitle = title || "Check out this amazing Sundarban adventure!";

  const socialShares = [
    {
      Icon: WhatsAppIcon,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
      label: "WhatsApp",
      bgColor: "bg-[#25D366]",
    },
    {
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      label: "Facebook",
      bgColor: "bg-[#1877F2]",
    },
    {
      Icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      label: "Twitter",
      bgColor: "bg-black",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied!",
      description: "You can now share it anywhere.",
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
        <Share2 size={18} className="text-emerald-600" />
        <span>Share:</span>
      </div>

      <div className="flex items-center gap-3">
        {socialShares.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${social.label}`}
            className={`w-10 h-10 flex items-center justify-center text-white transition-all rounded-full hover:scale-110 active:scale-90 duration-300 ${social.bgColor} shadow-sm`}
          >
            <social.Icon className="w-4 h-4" />
          </a>
        ))}

        <button
          onClick={copyToClipboard}
          aria-label="Copy Link"
          className="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600 transition-all rounded-full hover:bg-emerald-600 hover:text-white hover:scale-110 active:scale-90 duration-300 border border-slate-200"
        >
          <Link2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
