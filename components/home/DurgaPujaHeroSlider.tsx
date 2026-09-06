"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "aos/dist/aos.css";

import Link from "next/link";
import Image from "next/image";

const durgaPujaSlides = [
  {
    id: 1,
    image: "/assets/2N3D.png",
    alt: "2N/3D Sundarban Durga Puja Tour Package",
    link: "/packages/sundarban-2-night-3-days-tour",
  },
  {
    id: 2,
    image: "/assets/1N2D.png",
    alt: "1N/2D Sundarban Durga Puja Tour Package",
    link: "/packages/sundarban-1-night-2-days-tour",
  },
  {
    id: 3,
    image: "/assets/1DAY.png",
    alt: "1-Day Sundarban Durga Puja Tour Package",
    link: "/packages/1-day-in-sundarban",
  },
];

export const DurgaPujaHeroSlider = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <section className="relative overflow-hidden pt-20">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="w-full durga-puja-hero-swiper [&_.swiper-pagination-bullet-active]:bg-amber-400 [&_.swiper-pagination-bullet]:bg-white"
      >
        {durgaPujaSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Link
              href={slide.link}
              className="block relative w-full overflow-hidden cursor-pointer"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                width={7009}
                height={2191}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                // quality={100}
                className="w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.01]"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
