"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Stethoscope, Compass, Users, BadgeCheck, Phone } from "lucide-react";
import { Button } from "../ui/button";

export const SundarbanHeroSection = () => {
  return (
    <section className="py-8 md:py-14 bg-white">
      <div className="container">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Sundarban Tour Package from Kolkata – Best Sundarban Package Tour with Hotel, Boat Safari &amp; Food | Sundarban Bengal Trip
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              Are you looking for the most affordable and best Sundarban tour package from Kolkata? Then you had already visited the most professional and right place —{" "}
              <Link href="/" className="text-primary font-bold hover:underline">
                Sundarban Bengal Trip
              </Link>
              . We will professionally and neatly plan your whole Sundarban trip from Kolkata offering a perfect mix of adventure, nature, wildlife, and other tourist destinations in Sundarban.
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Whether you are planning a Sundarban trip from Kolkata with friends, family, your partner, or a corporate group — we provide complete travel solutions: hotel stays, fooding, and professional guiding. As the most trusted Sundarban tour guide in Kolkata, we always ensure our clients&apos; safety, comfort, and enjoyment as our top priority.
            </p>


            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="default"
                size="default"
                asChild
                className="bg-secondary hover:bg-primary text-white font-semibold px-6 rounded-[4px] shadow-sm"
              >
                <Link href="/packages" className="flex items-center gap-2">
                  <span>Explore Tours</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <a
                href="tel:+917586889519"
                className="inline-flex items-center gap-2 text-foreground font-semibold text-sm hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 75868 89519</span>
              </a>
            </div>
          </div>

          {/* Right Single Image */}
          <div className="overflow-hidden border border-border shadow-md group rounded-sm">
            <Image
              src="/assets/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp"
              alt="Sundarban Tour Package from Kolkata"
              width={600}
              height={400}
              className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};