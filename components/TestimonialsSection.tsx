"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Star, Quote } from "lucide-react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const TestimonialsSection = ({
  data,
  loading,
}: {
  data: {
    review: string;
    name: string;
    place: string;
    rating: number;
    image?: string | null;
  }[];
  loading: boolean;
}) => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section
      className="relative py-10 md:py-20 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('assets/tiger-photo.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/90"></div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our guests
            say.
          </p>
        </div>

        {loading ? (
          <TestimonialSkeleton />
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            spaceBetween={24}
            className="items-stretch"
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {data.map((testimonial, index) => {
              return (
                <SwiperSlide key={index} className="!h-auto">
                  <div className="h-full flex flex-col bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/20">
                    <Quote className="w-10 h-10 text-secondary mb-4" />
                    <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                      “{testimonial.review}”
                    </p>

                    <div className="mt-auto flex items-center gap-4">
                      {/* Container for Avatar/Initials */}
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0",
                          !testimonial.image && "bg-secondary", // Keep secondary bg only if no image
                        )}
                      >
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="font-semibold text-secondary-foreground">
                            {testimonial.name
                              ? testimonial.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((word) => word[0])
                                  .join("")
                                  .toUpperCase()
                              : "ST"}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-primary-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-primary-foreground/60">
                          {testimonial.place}
                        </p>
                      </div>

                      <div className="ml-auto flex">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-secondary fill-current"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export const TestimonialSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 animate-pulse h-full"
        >
          {/* Quote Icon Placeholder */}
          <div className="w-10 h-10 rounded-lg bg-secondary/20 mb-4 flex items-center justify-center">
            <Quote className="w-6 h-6 text-secondary/30" />
          </div>

          {/* Review Text Lines */}
          <div className="space-y-3 mb-8">
            <div className="h-3 w-full bg-primary-foreground/10 rounded" />
            <div className="h-3 w-5/6 bg-primary-foreground/10 rounded" />
            <div className="h-3 w-4/6 bg-primary-foreground/10 rounded" />
          </div>

          {/* Footer Info */}
          <div className="mt-auto flex items-center gap-4">
            {/* Avatar Circle */}
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20" />

            <div className="space-y-2">
              {/* Name */}
              <div className="h-3 w-24 bg-primary-foreground/20 rounded" />
              {/* Place */}
              <div className="h-2 w-16 bg-primary-foreground/10 rounded" />
            </div>

            {/* Stars */}
            <div className="ml-auto flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className="w-3 h-3 bg-secondary/20 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
