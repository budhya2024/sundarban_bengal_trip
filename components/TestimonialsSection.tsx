"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Polash Mondal",
    location: "Nadia",
    rating: 5,
    text: "An absolutely incredible experience! We spotted a Royal Bengal Tiger on our first safari. The guides were knowledgeable and the houseboat accommodation was luxurious.",
    avatar: "pM",
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
    location: "kolkata",
    rating: 5,
    text: "Perfect family trip! The kids loved every moment of the adventure. Safe, well-organized, and absolutely magical. Highly recommend!",
    avatar: "AS",
  },
  //   {
  //   name: "Amit Sharma",
  //   location: "kolkata",
  //   rating: 5,
  //   text: "Perfect family trip! The kids loved every moment of the adventure. Safe, well-organized, and absolutely magical. Highly recommend!",
  //   avatar: "AS",
  // },
];

export const TestimonialsSection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our guests have to say
            about their Sundarban adventures with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20"
            >
              <Quote className="w-10 h-10 text-secondary mb-4" />
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
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
          ))}
        </div>
      </div>
    </section>
  );
};
