"use client";

import { CheckCircle2, Star } from "lucide-react";
import Image from "next/image";

const services = [
  { title: "Travelling", desc: "Comfortable transport" },
  { title: "Hotels & Resorts", desc: "Premium accommodations" },
  { title: "Sightseeing", desc: "Guided local tours" },
  { title: "Fooding", desc: "Authentic Bengali meals" },
  { title: "Pickup & Drop", desc: "From Kolkata locations" },
  { title: "Boat Safari", desc: "Thrilling river cruises" },
];

export const PackagesSection = () => {
  return (
    <section className="py-8 md:py-16 bg-muted/20 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
          {/* Image Side */}
          <div className=" w-full lg:w-1/2 relative" data-aos="fade-right">
            <div className="relative h-[420px] md:h-[540px] w-full max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-background z-20">
              <Image
                src="/assets/tour-budget.jpg"
                alt="Sundarban Affordable Tour"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            {/* Decorative offset box */}
            <div className="absolute top-8 -left-8 w-full h-full bg-primary/10 rounded-[2.5rem] -z-10 border border-primary/20"></div>

            {/* Floating stat */}
            <div className="absolute bottom-14 -right-6 md:-right-10 z-30 bg-background p-5 rounded-2xl shadow-xl border border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-foreground leading-none">
                    100%
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2" data-aos="fade-left">
            <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider mb-5 bg-primary/10 px-4 py-2 rounded-full text-sm">
              <Star className="w-4 h-4" />
              <span>Affordable Packages</span>
            </div>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-7 leading-tight">
              Book Affordable Sundarban Tour Packages from Kolkata for Family,
              Couples & Groups
            </h2>
            <p className="text-muted-foreground  leading-relaxed mb-5">
              In our well-modified Sundarban tour package from Kolkata, we
              provide all types of ready-to-have services — Travelling, Hotels,
              Sightseeing, Fooding, and more. In our Sundarban Bengal Trip Tours
              & Guide agency you will receive both budget-friendly and luxury
              resort stays, with flexible tour options for our clients.
            </p>
            <p className="text-muted-foreground text-base  md:text-lg leading-relaxed mb-6 md:mb-10">
              Moreover, you will also receive pickup and drop from any
              destination in Kolkata, journey fooding support, boat safari or
              boat-stay options, and many local sightseeing visits too.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2  gap-5">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start bg-white p-4 rounded-md"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
