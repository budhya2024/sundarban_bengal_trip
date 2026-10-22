"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Phone, ArrowRight } from "lucide-react";

interface AnnouncementSlide {
  id: number;
  badge: string;
  text: string;
  highlightText?: string;
  actionLink: string;
  isPhone?: boolean;
}

const ANNOUNCEMENT_SLIDES: AnnouncementSlide[] = [
  {
    id: 1,
    badge: "Winter Special",
    text: "Winter Season Booking Now Open!",
    highlightText: "Flat 15% OFF on All Tour Packages",
    actionLink: "/packages",
  },
  {
    id: 2,
    badge: "Early Bird Deal",
    text: "Reserve Early & Save Flat 15% on 2N/3D & 1N/2D Sundarban Tours",
    highlightText: "Book Today",
    actionLink: "/packages/sundarban-2-night-3-days-tour",
  },
  {
    id: 3,
    badge: "Hotel Sonar Bangla",
    text: "Luxury Resort & Boat Safari Winter Packages with",
    highlightText: "Flat 15% Savings",
    actionLink: "/sundarban-luxury-hotel-tour-package-in-west-bengal",
  },
  {
    id: 4,
    badge: "Instant Booking",
    text: "Call +91 75868 89519 to book your Winter Tour with",
    highlightText: "Flat 15% OFF",
    actionLink: "tel:+917586889519",
    isPhone: true,
  },
];

interface AnnouncementBarProps {
  isScrolled?: boolean;
}

export const AnnouncementBar = ({
  isScrolled: propIsScrolled,
}: AnnouncementBarProps = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [internalScrolled, setInternalScrolled] = useState(false);

  // Fallback scroll listener if prop not provided
  useEffect(() => {
    if (propIsScrolled !== undefined) return;
    const onScroll = () => setInternalScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [propIsScrolled]);

  const isScrolled =
    propIsScrolled !== undefined ? propIsScrolled : internalScrolled;

  // Auto rotation timer every 3.8 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_SLIDES.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const current = ANNOUNCEMENT_SLIDES[currentIndex];

  const LinkWrapper = ({ children }: { children: React.ReactNode }) => {
    if (current.isPhone) {
      return (
        <a
          href={current.actionLink}
          className="group block text-center hover:opacity-95 transition-opacity px-2 py-0.5 w-full"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={current.actionLink}
        className="group block text-center hover:opacity-95 transition-opacity px-2 py-0.5 w-full"
      >
        {children}
      </Link>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-60 w-full bg-red-600  md:py-2 text-white select-none transition-colors duration-300"
    >
      <div className="container text-xs sm:text-sm text-center">

        <div className="overflow-hidden  text-center ">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full text-center"
            >
              <LinkWrapper>
                {/* Badge Indicator (Inline) */}
                <span className="font-bold tracking-wide inline text-[11px] sm:text-xs md:text-sm text-amber-300 mr-1.5">
                  {current.isPhone ? (
                    <Phone className="w-3 h-3 inline-block align-baseline mr-1 mt-1" />
                  ) : (
                    <Sparkles className="w-3 h-3 inline-block align-baseline mr-1 mt-1" />
                  )}
                  <span>{current.badge}:</span>
                </span>

                {/* Text showing in full on mobile (Inline) */}
                <span className="text-[11px] sm:text-xs md:text-sm font-medium text-white/95 leading-tight inline">
                  {current.text}
                </span>

                {/* Highlight (Inline) */}
                {current.highlightText && (
                  <span className="text-[11px] sm:text-xs md:text-sm font-bold text-amber-300 inline ml-1">
                    {current.highlightText}
                  </span>
                )}

                {/* Subtle arrow indicator (Inline) */}
                <ArrowRight className="w-3 h-3 text-white/80 transition-transform group-hover:translate-x-0.5 inline-block align-middle ml-1.5" />
              </LinkWrapper>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
