"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  CheckCircle2,
  Calendar,
  Compass,
  Music,
  Binoculars,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { PiBed, PiForkKnife, PiBoat, PiCar } from "react-icons/pi";
import { Button } from "@/components/ui/button";

export const BestTourContent: React.FC = () => {
  return (
    <div className="bg-background text-foreground">
      {/* 1. INTRO / MAIN H1 SECTION */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <h1 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
                Best Sundarban Tour in 2026 – Plan an Unforgettable Wildlife Holiday with Premium Stay, Food &amp; Jungle Safari
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                Plan your adventure in the wilderness in 2026 and choose the best Sundarban tour in 2026 that promises ultimate luxury and comfort to the tourists. The tour provides an amazing opportunity to the guests to explore the beauty of the place with the comfort of a high-end resort without any compromise.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                The all-inclusive holiday package includes the most exquisite local and foreign delicacies for the guests. Besides, the tourists also enjoy their private boat safari to explore the wilderness on guided tours.
              </p>
              <div>
                <Button
                  variant="default"
                  size="default"
                  asChild
                  className="bg-secondary hover:bg-primary text-white font-semibold px-6 rounded-[4px] shadow-sm"
                >
                  <Link href="/packages" className="flex items-center gap-2">
                    <span>Book 2026 Tour Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden border border-border shadow-md group rounded-sm">
              <Image
                src="/assets/bestsundarbantourpackage.jpeg"
                alt="Best Sundarban Tour in 2026 - Premium Wildlife Holiday"
                width={600}
                height={400}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS STRIP (MATCHING DESIGN WITH REACT ICONS & VERTICAL DIVIDERS) */}
      <section className="py-6 sm:py-10 border-y border-border/80 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/80">
            {/* Item 1: Luxury Eco Resorts */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4">
              <PiBed className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                PREMIUM<br />ECO RESORTS
              </h3>
            </div>

            {/* Item 2: Delicious Food */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4 border-l md:border-l-0 border-border/80">
              <PiForkKnife className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                DELICIOUS<br />BENGALI FOOD
              </h3>
            </div>

            {/* Item 3: Private Boat Safari */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4">
              <PiBoat className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                PRIVATE<br />BOAT SAFARI
              </h3>
            </div>

            {/* Item 4: Kolkata Transfers */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4 border-l md:border-l-0 border-border/80">
              <PiCar className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                KOLKATA<br />TRANSFERS
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 1: PACKAGES FROM KOLKATA (bg-muted) */}
      <section className="py-10 md:py-16 bg-muted">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
                Explore the Best Sundarban Tour Packages from Kolkata with Comfortable Travel &amp; Complete Tour Arrangements
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                Booking the best Sundarban tour in 2026 , with Sundarban Bengal trip ensures an easy travel from Kolkata as the packages offer pick up facility from your doorstep. However, if you are looking for a more convenient option, the tour operators also arrange for an AC vehicle pick up from central Kolkata, such as the Indian Museum or Science City. You will then be taken to Godkhali or Sonakhali from where you can board on private and safe motorized boats.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                The tour operators take care of everything including clearances, travel arrangements, watchtower visits, and evening cultural shows so that you can enjoy a seamless ride from the busy streets of Kolkata to the serene waters of the Sundarbans.
              </p>

              {/* Feature points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">Doorstep &amp; Central Pickup</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">Comfortable AC Vehicles</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">Private Motorized Boats</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">All Forest Clearances Included</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden border border-border shadow-md group rounded-sm bg-card">
              <Image
                src="/assets/pickup.jpeg"
                alt="Comfortable Kolkata to Sundarban Pick-up and Transfers"
                width={600}
                height={400}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 2: 2 NIGHTS 3 DAYS TOUR (bg-background) */}
      <section className="py-12 md:py-18 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-2.5">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
              Choose the Perfect Sundarban 2 Nights 3 Days Tour for a Relaxing &amp; Exciting Jungle Holiday
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              The traditional Two Nights Three Days tour is just perfect with its balanced mix of relaxation plus exploring on a cultural level and a more adventurous one in the heart of the jungle:
            </p>
          </div>

          {/* 3 Day Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {/* Day 1 */}
            <div className="bg-card rounded-sm border border-border p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white rounded-xs">
                    Day 1
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center">
                    <Music className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Kolkata Departure, River Cruise &amp; Baul Music
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  Departure from Kolkata followed by a river cruise to your resort, morning village walk and a night of Baul music.
                </p>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-4">
                <Image
                  src="/assets/sonar-bangla-hotel-deluxe.jpg"
                  alt="Sundarban Resort Stay and Baul Music"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Day 2 */}
            <div className="bg-card rounded-sm border border-border p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white rounded-xs">
                    Day 2
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center">
                    <Binoculars className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Full-Day Deep Forest Safari &amp; Watch Towers
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  Full day boat safari in the deep forest , narrow creeks and a visit to Sajnekhali, Sudhanyakhali and Dobanki Watch towers.
                </p>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-4">
                <Image
                  src="/assets/sundarban-river-boating-with-mangrove-forest-.jpg"
                  alt="Deep Forest Safari in Sundarban"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Day 3 */}
            <div className="bg-card rounded-sm border border-border p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white rounded-xs">
                    Day 3
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center">
                    <Landmark className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Heritage Tour &amp; Return to Kolkata
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  Morning heritage tour including the Bungalow of Sir Daniel Hamilton, Rabindranath Tagore’s places followed by your return to Kolkata.
                </p>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-4">
                <Image
                  src="/assets/house-boat.jpeg"
                  alt="Heritage Tour and River Boat Return"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: ALL-INCLUSIVE PACKAGE HIGHLIGHTS (bg-muted) */}
      <section className="py-12 md:py-18 bg-muted">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-2.5">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
              Enjoy a Complete Sundarban Tour Package with Comfortable Hotel Stay, Delicious Meals &amp; Boat Safari
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              An all-inclusive sundarban tour in 2026 package takes care of every detail so that you can focus on enjoying this unique eco-destination to the absolute:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-sm border border-border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center mb-4">
                  <PiBed className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Deluxe AC Rooms &amp; Eco-Resorts
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  Experience luxury and convenience of deluxe AC rooms and eco-friendly forest resorts with modern amenities.
                </p>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-2">
                <Image
                  src="/assets/hotel-bedroom.jpeg"
                  alt="Deluxe AC Rooms in Sundarban Eco Resort"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-sm border border-border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center mb-4">
                  <PiForkKnife className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Exquisite Local Bengali Cuisine
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  Taste local Bengali cuisine of hot and fresh river fish, prawns, and crab at the resort and during the boat safari.
                </p>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-2">
                <Image
                  src="/assets/sundarban-tour-food.jpeg"
                  alt="Fresh River Fish, Prawns & Crab Bengali Cuisine"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-sm border border-border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center mb-4">
                  <PiBoat className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Guided Wildlife &amp; Tiger Safari
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  Join local guides to navigate the narrow estuarine channels by a skilled captain and naturalist to spot tigers, crocodiles, and rare birds.
                </p>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-2">
                <Image
                  src="/assets/royel-bengal-tiger.webp"
                  alt="Skilled Captain and Naturalist Tiger Safari"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 4: FAQ / ALL-INCLUSIVE QUESTION (bg-background) */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container">
          <div className=" bg-muted/40 rounded-sm border border-border p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  Are packages fully inclusive in 2026?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Yes, packages cover Kolkata pickup, eco-resort stays, fresh regional meals, forest permits, and guided boat safaris completely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};
