"use client";

import { Navigation } from "lucide-react";

export const ServicesSection = () => {
  return (
    <section className="relative py-8 md:py-16 overflow-hidden">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/assets/hose-boat.webp')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider mb-5 bg-white backdrop-blur-md px-4 py-2 rounded-full text-sm border border-white/10"
            data-aos="fade-up"
          >
            <Navigation className="w-4 h-4" />
            <span>Complete Services</span>
          </div>

          {/* Heading */}
          <h3
            className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Complete Sundarban Travel Services Including Resort Stay, Boat
            Safari & Local Guide
          </h3>

          {/* Description */}
          <div className="space-y-6" data-aos="fade-up" data-aos-delay="200">
            <p className="text-white leading-relaxed">
              In our Sundarban Bengal Trip&apos;s planned Sundarban tour package
              from Kolkata, you will get complete tour management so you can
              enjoy your trip without any extra stress. With our
              well-experienced Local Sundarban Tour Guide and professional
              touring teams, any tourist can easily enjoy the rivers, mangroves,
              trees, sunsets, villages, boat stays, camping, and the wildlife
              nature of Sundarban.
            </p>

            <p className="text-white leading-relaxed">
              In our planned Sundarban trip from Kolkata we not only provide
              regular fooding or touring options — you can also visit unexplored
              areas of Sundarban with local support, specially made Bengali fish
              dishes, cultural programs, and thrilling boat safaris.{" "}
              <strong className="text-white">
                Get your inner adventurer sparked and connect with us!
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
