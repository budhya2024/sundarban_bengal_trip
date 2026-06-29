"use client";
import { useEffect } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTASection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="relative py-10 md:py-16overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={"/assets/gallery-sunset.jpg"}
          alt="Sundarban Sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-xl md:text-3xl font-bold text-white mt-2 mb-4">
            Ready for Your Sundarban Adventure?
          </h2>
          <p className="text-base text-primary-foreground/80 mb-8 leading-relaxed">
            Book your journey today and experience the magic of the world's
            largest mangrove forest. Limited spots available for the peak
            season!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link href="/packages">Book Your Tour Now</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
