"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { Button } from "./ui/button";

const hotels = [
  { id: 1, image: "/assets/hotel (1).jpeg" },
  { id: 2, image: "/assets/hotel (2).jpeg" },
  { id: 3, image: "/assets/hotel (3).jpeg" },
  { id: 4, image: "/assets/hotel (4).jpeg" },
  { id: 5, image: "/assets/hotel (5).jpeg" },
  { id: 6, image: "/assets/hotel (6).jpeg" },
  { id: 7, image: "/assets/hotel (7).jpeg" },
  { id: 8, image: "/assets/hotel (8).jpeg" },
];

export default function HotelSwiper() {
  return (
    <section className="py-10 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Sonar Bangla Hotel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comfortable stays in the heart of Sundarban
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {hotels.map((hotel) => (
            <SwiperSlide key={hotel.id}>
              <div className="rounded-xl overflow-hidden bg-white">
                <div className="relative h-56 md:h-80 w-full">
                  <Image
                    src={hotel.image}
                    alt="Hotel image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}