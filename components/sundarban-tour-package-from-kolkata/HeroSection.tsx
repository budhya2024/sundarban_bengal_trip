"use client";

import { Phone, CheckCircle2, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export const SundarbanHeroSection = () => {
  return (
    <section className="relative pt-10 pb-24 lg:pt-24 lg:pb-32 bg-primary overflow-hidden">
     

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Content */}
          <div className="lg:w-[55%] pt-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur borde4 border-white text-white mb-6"
              data-aos="fade-up"
            >
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span className="text-sm font-semibold  tracking-wide uppercase">
                Top Rated Tour Package
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.3]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="text-secondary block mb-3 text-4xl md:text-5xl lg:text-6xl leading-tight">
                Sundarban Tour from Kolkata
              </span>

              <span className="text-2xl md:text-3xl font-medium text-white/80 leading-tight">
                Best Sundarban Package Tour with Hotel, Boat Safari & Food |
                Sundarban Bengal Trip
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Experience the majestic Royal Bengal Tigers, thrilling boat
              safaris, luxury resort stays, and authentic Bengali cuisine.
              Enjoy a safe, comfortable, and unforgettable Sundarban adventure
              with expert guides and premium hospitality.
            </p>

            {/* Buttons */}
            <div
              className="flex flex-wrap gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
               <Button variant="hero" size="xl" asChild>
                          <Link href="/packages" className="group">
                         Book now
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <Button variant="heroOutline" size="xl" asChild>
                          <Link href="/contact">Plan Your Trip</Link>
                        </Button>
            </div>
          </div>

      {/* Right Images Collage */}
<div
  className="lg:w-[45%] relative w-full mt-8 lg:mt-0"
  data-aos="fade-left"
  data-aos-delay="200"
>

  {/* MOBILE / TABLET GRID */}
  <div className="sm:hidden grid grid-cols-2 gap-3 h-[300px]">
    
    <div className="relative rounded-2xl overflow-hidden border-2 border-white">
      <Image
        src="/assets/hero-sundarban.jpg"
        alt="Sundarban Nature"
        fill
        className="object-cover"
      />
    </div>

    <div className="relative rounded-2xl overflow-hidden border-2 border-white">
      <Image
        src="/assets/tiger-photo.jpg"
        alt="Royal Bengal Tiger"
        fill
        className="object-cover"
      />
    </div>

    <div className="relative rounded-2xl overflow-hidden border-2 border-white col-span-2 h-[140px]">
      <Image
        src="/assets/gallery-boat.jpg"
        alt="Boat Safari"
        fill
        className="object-cover"
      />
    </div>

  </div>

  {/* DESKTOP COLLAGE (YOUR ORIGINAL) */}
  <div className="hidden sm:block relative h-[400px] sm:h-[500px] lg:h-[600px]">

    {/* Main Image */}
    <div className="absolute top-0 right-0 w-[80%] h-[70%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10">
      <Image
        src="/assets/hero-sundarban.jpg"
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
        src="/assets/gallery-boat.jpg"
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