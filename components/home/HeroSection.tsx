"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/assets/house-boat.jpeg",
    title: "Luxury Houseboat Cruises in the Sundarbans",
    description:
      "Sail through tranquil rivers and lush mangrove forests while enjoying a premium houseboat experience surrounded by nature.",
  },
  {
    id: 2,
    image: "/assets/sonarbanglahotel.jpg",
    title: "Stay at Premium Riverside Resorts",
    description:
      "Relax in elegant accommodations with modern comfort, scenic river views, authentic Bengali cuisine, and warm hospitality.",
  },
  {
    id: 3,
    image: "/assets/tiger-photo.jpg",
    title: "Witness the Majestic Royal Bengal Tiger",
    description:
      "Embark on thrilling wildlife safaris and explore the untouched wilderness of the Sundarbans, home to rare and exotic species.",
  },
];

export const HeroSection = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={(swiper, time, percentage) => {
          setProgress((1 - percentage) * 100);
        }}
        effect="fade"
        loop={true}
        className="h-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-screen w-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/70" />

              {/* Content */}
              <div className="relative z-10 container mx-auto h-full flex items-center px-4">
                <div className="max-w-4xl text-white">
                  <h1
                    data-aos="fade-up"
                    data-aos-duration="700"
                    className="text-2xl sm:text-4xl xl:text-5xl lg:text-6xl font-bold leading-tight mb-6 aos-init aos-animate"
                  >
                    {slide.title}
                  </h1>

                  <p
                    data-aos="fade-up"
                    data-aos-delay="150"
                    data-aos-duration="700"
                    className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mb-8"
                  >
                    {slide.description}
                  </p>

                  

                  {/* Stats */}
                  <div
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-10 mb-6 md:mb-10"
                  >
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold">
                        15+
                      </h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/80 mt-1">
                        Years Experience
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold">
                        10,000+
                      </h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/80 mt-1">
                        Tourists Served
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold">
                        4.9★
                      </h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/80 mt-1">
                        Google Reviews
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold">
                        ISO
                      </h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/80 mt-1">
                        9001:2015 Certified
                      </p>
                    </div>

                
                  </div>

                  {/* CTA */}
                  <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="flex flex-wrap gap-4"
                  >
                    <Button
                      variant="hero"
                      size="xl"
                      asChild
                      className="px-8"
                    >
                      <Link href="/packages">
                       view all packages
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

{/*   
        <div className="hero-prev hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
            <ChevronLeft size={20} />
          </div>
        </div>

        <div className="hero-next hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
            <ChevronRight size={20} />
          </div>
        </div>

   
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div> */}
      </Swiper>
    </section>
  );
};