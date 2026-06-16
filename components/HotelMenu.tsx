"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Our Special Menu
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Best Sundarban Menu
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Bengal Menu providing you authentic cuisines is an essential
            service in Sundarban tour from Kolkata. We offer delicious meals
            with the authenticity of Sundarban's core aroma.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center hover:bg-amber-500 hover:text-white transition"
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center hover:bg-amber-500 hover:text-white transition"
          >
            <ChevronRight />
          </button>

          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            loop={true}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4.2 },
            }}
          >
            {menus.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-[260px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="text-white text-lg md:text-xl font-bold">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
