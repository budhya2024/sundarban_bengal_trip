"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "King of the Jungle",
    title: "Meet the Majestic",
    highlight: "Royal Bengal Tiger",
    description:
      "Witness the awe-inspiring Royal Bengal Tiger in its natural habitat. The Sundarbans is home to the largest population of these magnificent creatures.",
    image: "/assets/gallery-tiger.jp",
    stats: { count: "400+", label: "Tigers in Wild" },
  },
  {
    id: 2,
    badge: "Ancient Predator",
    title: "Encounter the Mighty",
    highlight: "Saltwater Crocodile",
    description:
      "Spot the powerful saltwater crocodile basking along the riverbanks. These ancient reptiles have ruled these waters for millions of years.",
    image: "/assets/gallery-crocodile.jpg",
    stats: { count: "2000+", label: "Crocodiles" },
  },
  {
    id: 3,
    badge: "Graceful Wildlife",
    title: "Discover the Beautiful",
    highlight: "Spotted Deer",
    description:
      "Watch herds of spotted deer gracefully moving through the mangrove forest. A common sight that adds charm to every safari.",
    image: "/assets/gallery-deer.jpg",
    stats: { count: "10K+", label: "Spotted Deer" },
  },
  {
    id: 4,
    badge: "Birdwatcher's Paradise",
    title: "Explore the Vibrant",
    highlight: "Exotic Birds",
    description:
      "The Sundarbans hosts over 300 species of birds. From kingfishers to white-bellied sea eagles, every turn reveals a new winged wonder.",
    image: "/assets/2f29fc56f3eac69861f9fc597d5fa775.gif",
    stats: { count: "300+", label: "Bird Species" },
  },
];

const contentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.3 },
  },
};

export const HeroSlider = () => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // Refresh swiper on mount
    if (swiperRef.current) {
      swiperRef.current.swiper?.update();
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,hsl(var(--secondary))_0%,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,hsl(var(--accent))_0%,transparent_50%)]" />
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !w-3 !h-3 !bg-primary-foreground/40 !opacity-100",
          bulletActiveClass: "!bg-secondary !w-8 !rounded-full",
        }}
        loop={true}
        speed={800}
        className="h-screen hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="h-full flex items-center">
                <div className="container mx-auto px-4 pt-20">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      variants={contentVariants}
                      className="text-left z-10 order-2 lg:order-1"
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6 backdrop-blur-sm border border-secondary/30">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        {slide.badge}
                      </span>

                      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
                        {slide.title}
                        <br />
                        <span className="text-secondary relative inline-block">
                          {slide.highlight}
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="absolute -bottom-2 left-0 w-full h-1 bg-secondary/50 origin-left rounded-full"
                          />
                        </span>
                      </h1>

                      <p className="text-base md:text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <Button variant="hero" size="xl" asChild>
                          <Link href="/packages" className="group">
                            Explore Tours
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <Button variant="heroOutline" size="xl" asChild>
                          <Link href="/contact">Plan Your Trip</Link>
                        </Button>
                      </div>

                      {/* Stats Bar */}
                      <motion.div
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        variants={statsVariants}
                        className="flex flex-wrap gap-6 md:gap-8 pt-6 border-t border-primary-foreground/10"
                      >
                        <div className="text-left">
                          <div className="flex items-center gap-2 text-secondary mb-1">
                            <MapPin className="w-4 h-4" />
                            <span className="font-display text-2xl md:text-3xl font-bold">
                              {slide.stats.count}
                            </span>
                          </div>
                          <p className="text-primary-foreground/60 text-sm">
                            {slide.stats.label}
                          </p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-primary-foreground/20" />
                        <div className="text-left">
                          <div className="flex items-center gap-2 text-secondary mb-1">
                            <Users className="w-4 h-4" />
                            <span className="font-display text-2xl md:text-3xl font-bold">
                              50K+
                            </span>
                          </div>
                          <p className="text-primary-foreground/60 text-sm">
                            Happy Travelers
                          </p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-primary-foreground/20" />
                        <div className="text-left">
                          <div className="flex items-center gap-2 text-secondary mb-1">
                            <Star className="w-4 h-4 fill-secondary" />
                            <span className="font-display text-2xl md:text-3xl font-bold">
                              4.9
                            </span>
                          </div>
                          <p className="text-primary-foreground/60 text-sm">
                            Rating
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                      initial="hidden"
                      animate={isActive ? "visible" : "hidden"}
                      variants={imageVariants}
                      className="relative order-1 lg:order-2"
                    >
                      <div className="relative">
                        {/* Decorative Frame */}
                        <div className="absolute -inset-4 md:-inset-6 border-2 border-secondary/20 rounded-3xl -rotate-3" />
                        <div className="absolute -inset-4 md:-inset-6 border-2 border-accent/20 rounded-3xl rotate-3" />

                        {/* Main Image */}
                        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                          <motion.img
                            src={slide.image}
                            alt={slide.highlight}
                            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                            initial={{ scale: 1.2 }}
                            animate={isActive ? { scale: 1 } : { scale: 1.2 }}
                            transition={{ duration: 6, ease: "easeOut" }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent" />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            isActive
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 20 }
                          }
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-card px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                              <span className="font-display text-lg md:text-xl font-bold text-secondary">
                                #{index + 1}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-foreground text-sm md:text-base">
                                Wildlife Spotlight
                              </p>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                Must See Experience
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center text-primary-foreground/60">
          <span className="text-xs mb-2 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 50L48 45.8C96 41.7 192 33.3 288 35.2C384 37 480 49 576 52.3C672 55.7 768 50.3 864 47.5C960 44.7 1056 44.3 1152 48.5C1248 52.7 1344 61.3 1392 65.7L1440 70V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .hero-swiper .swiper-pagination {
          bottom: 100px !important;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .hero-swiper .swiper-pagination {
            bottom: 80px !important;
          }
        }
      `}</style>
    </section>
  );
};
