"use client";

import { Phone, CheckCircle2, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export const SundarbanHeroSection = () => {
  return (
    <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 bg-primary overflow-hidden">
      <div className="container  relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">

          {/* Left Content */}
          <div className="lg:w-[55%] pt-8">



            {/* Heading */}
            <h1
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.3]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="text-secondary block mb-3 text-4xl md:text-5xl lg:text-6xl leading-tight">
                Sundarban Tour Package from Kolkata
              </span>

              <span className="text-lg md:text-xl xl:text-2xl font-medium text-white/80 leading-tight">
                Best Sundarban Package Tour with Hotel, Boat Safari & Food |
                Sundarban Bengal Trip
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-base md:text-lg text-white/70 mb-8 max-w-xl leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Are you looking for the most affordable and best Sundarban tour
              package from Kolkata? Sundarban Bengal Trip professionally plans
              your whole trip — a perfect mix of adventure, nature, wildlife,
              hotel stay, boat safari, and local food.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-wrap gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Button
                variant="hero"
                size="xl"
                asChild
                className="w-full md:w-auto"
              >
                <Link href="/packages" className="group">
                  Book now

                </Link>
              </Button>

              <Button
                variant="heroOutline"
                size="xl"
                asChild
                className="w-full md:w-auto"
              >
                <Link href="/contact">Plan Your Trip</Link>
              </Button>
            </div>
          </div>

          {/* Right Images Collage - Desktop Only */}
          <div
            className="lg:w-[45%] relative w-full mt-8 lg:mt-0 hidden lg:block"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="relative h-[600px]">

              {/* Main Image */}
              <div className="absolute top-0 right-0 w-[80%] h-[70%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10">
                <Image
                  src="/assets/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp"
                  alt="Sundarban Nature"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Bottom Left */}
              <div className="absolute bottom-4 left-0 w-[55%] h-[45%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20">
                <Image
                  src="/assets/tiger-photo.jpg"
                  alt="Royal Bengal Tiger"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Right */}
              <div className="absolute bottom-10 right-4 w-[40%] h-[35%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-30">
                <Image
                  src="/assets/house-boat.jpeg"
                  alt="Boat Safari"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute top-1/2 left-0 z-40 bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/60 uppercase">
                      Trusted By
                    </p>
                    <p className="font-display font-bold text-white">
                      10,000+ Tourists
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};