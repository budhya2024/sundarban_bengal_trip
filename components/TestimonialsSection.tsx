"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Star, Quote } from "lucide-react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    name: "Polash Mondal",
    location: "Nadia",
    rating: 5,
    text: "An absolutely incredible experience! We spotted a Royal Bengal Tiger on our first safari. The guides were knowledgeable and the houseboat accommodation was luxurious.",
    avatar: "PM",
  },
  {
    name: "Arup Mondal",
    location: "Mednipur",
    rating: 5,
    text: "Sundarban Bengal Trips made our wildlife photography expedition unforgettable. The attention to detail and local expertise exceeded all expectations.",
    avatar: "AM",
  },
  {
    name: "Amit Sharma",
    location: "Kolkata",
    rating: 5,
    text: "Perfect family trip! The kids loved every moment of the adventure. Safe, well-organized, and absolutely magical.",
    avatar: "AS",
  },
  {
    name: "Rahul Das",
    location: "Howrah",
    rating: 5,
    text: "Smooth booking, friendly staff, and unforgettable memories. Highly recommended!",
    avatar: "RD",
  },
];

export const TestimonialsSection = () => {
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

        {/* Swiper */}
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
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div className="h-full flex flex-col bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/20">
                <Quote className="w-10 h-10 text-secondary mb-4" />
                <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                  “{testimonial.text}”
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="font-semibold text-secondary-foreground">
                      {testimonial.avatar}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-primary-foreground/60">
                      {testimonial.location}
                    </p>
                  </div>

                  <div className="ml-auto flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-secondary fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
