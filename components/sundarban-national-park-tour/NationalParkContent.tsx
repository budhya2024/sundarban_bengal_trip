"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileCheck,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  Waves,
  Footprints,
  Bird,
  Trees,
  Compass,
} from "lucide-react";
import { PiBoat, PiBinoculars, PiBird } from "react-icons/pi";
import { FaTowerObservation } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export const NationalParkContent: React.FC = () => {
  return (
    <div className="bg-background text-foreground">
      {/* 1. INTRO / MAIN H1 SECTION */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <h1 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
                Sundarban National Park Tour – Experience Wildlife, Mangrove Forests, Boat Safaris &amp; the Wild Side of Bengal
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                A Sundarban National Park tour, located in the coastal region of West Bengal is one of the most unbeliveable experiences one could ever think of. The Sundarbans are a UNESCO World Heritage Site and one of the largest biosphere reserves in the world. Spread across several districts in West Bengal.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                This unique mangrove ecosystem offers one of the world’s most unbeliveable wilderness experiences, including boat tours, wildlife safaris, bird watching, and many more thrilling activities, with high chances of seeing Bengal tigers and other rare flora and fauna that inhabit this region governed by the rise and fall of the tides.
              </p>
              <div>
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
              </div>
            </div>

            <div className="overflow-hidden border border-border shadow-md group rounded-sm">
              <Image
                src="/assets/royel-bengal-tiger.webp"
                alt="Sundarban National Park Tour - Royal Bengal Tiger"
                width={600}
                height={400}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS STRIP MATCHING ATTACHED DESIGN */}
      <section className="pb-6 sm:pb-10  bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/80">
            {/* Item 1: Scenic Boat Safaris */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4">
              <PiBoat className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                SCENIC<br />BOAT SAFARIS
              </h3>
            </div>

            {/* Item 2: Wildlife Experiences */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4 border-l md:border-l-0 border-border/80">
              <PiBinoculars className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                WILDLIFE<br />EXPERIENCES
              </h3>
            </div>

            {/* Item 3: Bird Watching */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4">
              <PiBird className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                BIRD<br />WATCHING
              </h3>
            </div>

            {/* Item 4: Watch Towers */}
            <div className="flex flex-col items-center justify-center text-center py-4 px-3 sm:py-6 sm:px-4 border-l md:border-l-0 border-border/80">
              <FaTowerObservation className="w-10 h-10 sm:w-11 sm:h-11 text-emerald-800" />
              <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-foreground leading-snug">
                WATCH<br />TOWERS
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE COLUMNS CONTENT SECTION */}
      <section className="py-12 md:py-18 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {/* Column 1 */}
            <div className="bg-card rounded-sm border border-border p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  Enjoy an Exciting Sundarban Jungle Safari Through the Dense Mangrove Forests of the National Park
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  In contrast to jeep safaris, a sundarban jungle safari is a boat tour through narrow tidal channels in Sundari and Gewa mangroves. On the way, through muddy banks, professional guides show you rare wildlife. Since the tides are out, the ground is exposed, attracting many varieties of crabs and other creatures. There is no two alike in a jungle safari, since, with every new adventure, nature unveils a new surprise for the curious explorer.
                </p>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-4">
                <Image
                  src="/assets/sundarban-mangrove-forest.jpg"
                  alt="Sundarban Jungle Safari"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-card rounded-sm border border-border p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  Discover the Majestic Royal Bengal Tiger and the Incredible Wildlife of the Sundarbans
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  The forest is famous worldwide as the best habitat for the Royal Bengal tiger, the only tiger species that can swim in saltwater.
                </p>
                <p className="text-xs md:text-sm text-foreground font-medium mb-4">
                  The forest is also home to many other animals, you can watch animals in Sundarban national park tour , including
                </p>

                {/* Wildlife List with Icons */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Waves className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground font-semibold">Reptiles &amp; aquatic life:</strong> large estuarine crocodiles, olive ridley turtles, and water monitors,
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Footprints className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground font-semibold">Mammals:</strong> spotted deer, wild boars, and fishing cats,
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bird className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground font-semibold">Birds:</strong> kingfishers, white-bellied sea eagles, and brown-winged kingfishers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Trees className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground font-semibold">Mangrove Flora:</strong> dense Sundari, Gewa, and Goran tidal forests with exposed aerial roots.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wildlife Sighting Tip Callout Box */}
              <div className="mt-5 p-3.5 rounded-sm bg-emerald-800/10 border border-emerald-800/20">
                <div className="flex items-center gap-1.5 text-emerald-950 font-semibold text-xs sm:text-sm mb-1">
                  <Compass className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>Wildlife Sighting Tip</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Wildlife movements are directly governed by the tides. Low tide reveals expansive mudflats, offering the highest chance of spotting tigers and aquatic reptiles along the banks.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-card rounded-sm border border-border p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  Experience an Unforgettable Sundarban Boat Safari Through Rivers, Creeks &amp; Mangrove Channels
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
                  The boat safari is the prime attraction of any holiday spent exploring the Sundarban National park tour. Well-equipped wooden motor boats drift noiselessly through mangrove-lined waterways such as the Matla and Bidya rivers, offering passengers a stunning view over the forest. Vantage points include open observation decks on the boat and watch towers such as Sudhanyakhali and Dobanki.
                </p>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-muted group mt-4">
                <Image
                  src="/assets/DOBANKI_WATCH_TOWER.webp"
                  alt="Sundarban Boat Safari and Watchtower"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRACTICAL TRAVEL INFORMATION / FAQ SECTION */}
      <section className="py-12 md:py-18 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
              Frequently Asked Questions &amp; Travel Guidelines
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Essential rules, permissions, and safety tips for visiting the Sundarban National Park.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-muted/40 rounded-sm border border-border p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center mb-4">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Do I need any special permissions to visit the reserve forest of sundarban?
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Yes, all visitors and boatmen require a mandatory permit issued by the forest department, which can be obtained through most tour operators.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-muted/40 rounded-sm border border-border p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center mb-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  What do I carry along with on my visit?
                </h3>
                <div className="text-xs md:text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <p>
                    <strong className="text-foreground font-semibold">INDIAN NATIONALS:</strong> Valid photo ID issued by the government (Aadhaar/ Voters ID/ Passport/ Driving License)
                  </p>
                  <p>
                    <strong className="text-foreground font-semibold">FOREIGN NATIONALS:</strong> Original passport with valid Indian Visa
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-muted/40 rounded-sm border border-border p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-800/10 text-emerald-800 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Is it safe to visit the forest?
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Yes, tourists are allowed to visit only in the designated Eco-Tourism zone with licensed forest guides and inside the secured boat or watchtower. Life jacket is mandatory for river cruise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CONTACT STRIP */}
      <div className="pb-8 md:pb-16">

        <div className="container">
          <div className="text-base text-foreground/80 bg-foreground/10 p-4">
            <p>
              Experience the thrilling wildlife, mangrove forests, and boat safaris of Sundarban National Park. Contact our team today to get a customized, obligation-free quote tailored exactly to your group size and travel preferences.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+917074432628" className="hover:text-primary transition-colors">
                  +91 70744 32628
                </a>
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:sundarbanbengaltrip@gmail.com" className="hover:text-primary transition-colors">
                  sundarbanbengaltrip@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
