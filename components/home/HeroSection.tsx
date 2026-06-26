"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "aos/dist/aos.css";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock4, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    image: "/assets/house-boat.jpeg",
    title: "2N/3D Sundarban Tour Package",
    rating: "4.9",
    reviews: "900+ Google Reviews",
    price: "5,499",
    oldPrice: "6,499",
    offer: "Save up to ₹1,000 Book Today!",
  },
  {
    id: 2,
    image: "/assets/sonarbanglahotel.jpg",
    title: "1 Day  Sundarban Tour Package",
    rating: "4.8",
    reviews: "700+ Google Reviews",
    price: "2,499",
    oldPrice: "2,799",
    offer: "Save up to 300₹ Book Today!",
  },
  {
    id: 3,
    image: "/assets/tiger-photo.jpg",
    title: "1N/2D Weekend Sundarban Tour",
    rating: "4.9",
    reviews: "500+ Google Reviews",
    price: "3,999",
    oldPrice: "4,499",
    offer: "Save up to ₹500 Book Today!",
  },
];

export const HeroSection = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    AOS.init({ once: true });
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
        onAutoplayTimeLeft={(_swiper, _time, percentage) => {
          setProgress((1 - percentage) * 100);
        }}
        effect="fade"
        loop={true}
        className="h-[60vh] md:h-[80vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
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

                  {/* Title */}
                  <h1
                    data-aos="fade-up"
                    data-aos-duration="700"
                    className="text-2xl sm:text-4xl xl:text-5xl lg:text-6xl font-bold leading-tight mb-3 md:mb-5"
                  >
                    {slide.title}
                  </h1>

                  {/* Rating */}
                  <p className="flex gap-1.5 items-center mb-6 md:mb-8">
                    <Star size={15} className="fill-yellow-400 text-yellow-400" />
                    <strong className="text-yellow-400">{slide.rating}</strong>
                    <span className="text-sm text-white/80">({slide.reviews})</span>
                  </p>

                  {/* Price block */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">
                      Starting From
                    </p>

                    <div className="flex items-baseline gap-1.5 mt-1 md:mt-3">
                      <span className="text-3xl md:text-4xl font-extrabold text-yellow-400">
                        ₹{slide.price}
                      </span>
                      <span className="text-sm text-white/80 mb-0.5">/person</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-base text-white/60 line-through font-medium">
                        ₹{slide.oldPrice}
                      </span>
                      <span className="bg-red-700 flex items-center gap-1 rounded-[4px] px-2 py-1 text-xs font-semibold text-white">
                        <Tag size={12} />
                        {slide.offer}
                      </span>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-secondary px-3 py-2">
                      <Clock4 size={13} />
                      <p className="text-xs md:text-sm font-semibold text-white">
                        Limited Time Deal
                      </p>
                    </div>

                
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

    
    </section>
  );
};