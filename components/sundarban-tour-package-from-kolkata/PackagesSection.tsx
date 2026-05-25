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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-14 lg:gap-20 items-stretch">
          
          {/* Image Side */}
          <div
            className="w-full relative h-full"
            data-aos="fade-right"
          >
            <div className="relative rounded-2xl overflow-hidden border-4 border-background h-full min-h-[300px] md:min-h-[500px] shadow-xl">
              <Image
                src="/assets/gallery-bird.jpg"
                alt="Sundarban Tour"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Text Side */}
          <div
            className="flex flex-col justify-between h-full"
            data-aos="fade-left"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider mb-5 bg-primary/10 px-4 py-2 rounded-full text-sm">
                <Star className="w-4 h-4" />
                <span>Affordable Packages</span>
              </div>

              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-7 leading-tight">
                Book Affordable Sundarban Tour Packages from Kolkata for
                Family, Couples & Groups
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-5">
                In our well-modified Sundarban tour package from Kolkata,
                we provide all types of ready-to-have services —
                Travelling, Hotels, Sightseeing, Fooding, and more.
                In our Sundarban Bengal Trip Tours & Guide agency you
                will receive both budget-friendly and luxury resort
                stays, with flexible tour options for our clients.
              </p>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-10">
                Moreover, you will also receive pickup and drop from
                any destination in Kolkata, journey fooding support,
                boat safari or boat-stay options, and many local
                sightseeing visits too.
              </p>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start bg-white p-4 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="font-bold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.desc}
                    </p>
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