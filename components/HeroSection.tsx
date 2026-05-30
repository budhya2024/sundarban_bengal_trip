"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

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
        className="h-[100vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-screen w-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt="Sundarban"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="relative z-10 container h-full flex items-center">
                <div className="grid lg:grid-cols-7 gap-10 items-center w-full">
                  <div className="lg:col-span-4 text-white">
                    <h1
                      data-aos="fade-up"
                      data-aos-duration="700"
                      className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                    >
                      {slide.title}
                    </h1>

                    <p
                      data-aos="fade-up"
                      data-aos-delay="200"
                      data-aos-duration="700"
                      className="text-base md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl"
                    >
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div
                      data-aos="fade-up"
                      data-aos-delay="300"
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <Button
                        variant="hero"
                        size="xl"
                        asChild
                        className="px-8"
                      >
                        <Link href="/packages">Plan Your Trip</Link>
                      </Button>

                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Right Side Navigation */}
        <div className="absolute right-10 bottom-10 z-30 flex items-center gap-4">
          
          {/* Prev Button */}
          <div className="hero-prev cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
              <ChevronLeft size={20} />
            </div>
          </div>

      

          {/* Next Button */}
          <div className="hero-next cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </Swiper>
    </section>
  );
};