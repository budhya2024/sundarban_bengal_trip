"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const menus = [
  {
    id: 1,
    name: "Mutton Curry",
    image: "/assets/Punjabi-Mutton-Curry-5.jpg",
  },
  {
    id: 2,
    name: "Chicken Kosha",
    image: "/assets/ChickenKosha.webp",
  },
  {
    id: 3,
    name: "Bhetki Curry",
    image: "/assets/Bhetki-Curry.jpeg",
  },
  {
    id: 4,
    name: "Prawn Malai Curry",
    image: "/assets/Prawn-Malai-Curry.jpg",
  },
  {
    id: 5,
    name: "Crab Kalia",
    image: "/assets/Crab-Kalia.jpeg",
  },
  {
    id: 6,
    name: "Ilish Sorshe",
    image: "/assets/Ilish-Sorshe.jpg",
  },
  {
    id: 7,
    name: "Doi Ilish",
    image: "/assets/DoiIlish.JPG",
  },
  {
    id: 8,
    name: "Ilish Vapa",
    image: "/assets/Ilish_Bhapa_Shorshe.webp",
  },
];

export default function HotelMenu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 768) return;
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - viewportWidth + 32);

      const requiredHeight = window.innerHeight + maxTranslate;
      setContainerHeight(requiredHeight);
    };

    updateDimensions();

    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      if (!containerRef.current || !trackRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -containerRect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = Math.max(0, trackWidth - viewportWidth + 32);

      setTranslateX(-progress * maxTranslate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      updateDimensions();
      handleScroll();
    }, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <>
      {/* DESKTOP VIEW: Sticky Pinned Horizontal Scroll */}
      <section
        ref={containerRef}
        className="hidden md:block relative bg-white"
        style={{ height: containerHeight ? `${containerHeight}px` : "auto" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Our Special Menu
              </span>

              <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">
                Best Sundarban Menu
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto text-base">
                Bengal Menu providing you authentic cuisines is an essential service
                in Sundarban tour from Kolkata. We offer delicious meals with the
                authenticity of Sundarban's core aroma.
              </p>
            </div>

            <div className="relative w-full overflow-hidden">
              <div
                ref={trackRef}
                className="flex gap-5 transition-transform duration-100 ease-out will-change-transform"
                style={{ transform: `translateX(${translateX}px)` }}
              >
                {menus.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-[320px]"
                  >
                    <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl group">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="360px"
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 p-5">
                        <h3 className="text-white text-xl font-bold">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE VIEW: Zero Blank Space Compact Section with Touch Swipe */}
      <section className="md:hidden py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <span className="text-secondary font-medium text-xs uppercase tracking-wider">
              Our Special Menu
            </span>

            <h2 className="font-display text-2xl font-bold text-foreground mt-1 mb-2">
              Best Sundarban Menu
            </h2>

            <p className="text-muted-foreground max-w-2xl mx-auto text-xs">
              Bengal Menu providing you authentic cuisines is an essential service
              in Sundarban tour from Kolkata. We offer delicious meals with the
              authenticity of Sundarban's core aroma.
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2">
            {menus.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[220px] snap-center"
              >
                <div className="relative h-[240px] rounded-2xl overflow-hidden shadow-lg group">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="240px"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white text-base font-bold">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
