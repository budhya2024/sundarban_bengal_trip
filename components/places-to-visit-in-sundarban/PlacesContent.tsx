"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Landmark,
  Footprints,
  ShieldAlert,
  Navigation,
  Binoculars,
  BookOpen,
  Waves,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const PlacesContent: React.FC = () => {
  const touristPlaces = [
    {
      title: "Bhagabatpur Crocodile Sanctuary",
      description:
        "Bhagabatpur Crocodile Sanctuary is a great place to watch estuarine crocodiles and their young, as well as saltwater ones.",
      image: "/assets/Bhagabatpur-Crocodile-Sanctuary.jpeg",
      icon: ShieldAlert,
    },
    {
      title: "Netidhopani (Temple Ruins)",
      description:
        "Netidhopani is a historic place with excavated temple ruins deeply ingrained in local folklore.",
      image: "/assets/Netidhopani-(Temple Ruins).avif",
      icon: Landmark,
    },
    {
      title: "Dobanki Canopy Walk",
      description:
        "Dobanki Canopy Walk is a fantastic opportunity to enjoy the view from above eye level: 20 feet high, the walkway will provide breathtaking panoramic views and a close look at the wilderness below.",
      image: "/assets/Dobanki-Watch-Tower.webp",
      icon: Footprints,
    },
    {
      title: "Burirdabri Watch Tower",
      description:
        "As for Burirdabri Watch Tower, this area has a spectacular long walk of mud walking along the border with Bangladesh and offers wonderful views of the Raimangal river.",
      image: "/assets/Burirdabri Watch Tower.jpg",
      icon: Navigation,
    },
  ];

  const watchTowers = [
    {
      title: "Sudhanyakhali Watch Tower",
      description:
        "Sudhanyakhali Watch Tower is the best place to catch a glimpse of the Royal Bengal Tiger. It also offers good opportunities to sight axis deer, wild pigs, and monitor lizards that congregate around the fresh water lake.",
      image: "/assets/Sudhanyakhali-Watch-Tower.jpeg",
    },
    {
      title: "Sajnekhali Watch Tower",
      description:
        "The Sajnekhali Watch Tower is the central attraction of this place to visit in Sundarban as it allows visitors to get an overview of the mangroves and rivers.",
      image: "/assets/Sajnekhali-Watch-Tower.jpeg",
    },
    {
      title: "Dobanki Watch Tower",
      description:
        "Dobanki Watch Tower along with a 500-meter canopy walk offers a panoramic view of the forest.",
      image: "/assets/DOBANKI_WATCH_TOWER.webp",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Intro Section: H1 Block (Font size and styling matching sundarban-west-bengal-tourism) */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <h1 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
                Places to Visit in Sundarban – Explore the Most Beautiful Tourist Attractions, Watchtowers &amp; Wildlife Spots
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Sundarban offers an opportunity to enjoy the beauty of the Mangrove forest, Sundarban's wildlife and network of rivers. However, exploring this unique ecosystem is not a traditional sightseeing adventure. Rather, it is an endeavor that requires a journey through winding estuaries to the observation points. <br />
                Some are located on secluded islets, while others are within forested reserves, or along the riverbanks. It is possible to take a boat tour or visit these biologically diverse areas as a means of gaining insight into the life that exists within this region that is so far removed from modern society.
              </p>
            </div>
            <div className="overflow-hidden border border-border shadow-md group">
              <Image
                src="/assets/sundarban-beaury.avif"
                alt="Places to Visit in Sundarban"
                width={600}
                height={400}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: 4 Cards from Mockup Photo (bg-muted like home) */}
      <section className="py-12 md:py-18 bg-muted">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-2.5">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
              Discover the Best Sundarban Tourist Places for Wildlife, Nature &amp; Memorable Jungle Experiences
            </h2>

            <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
              There's many places to visit in Sundarban apart from just royal Bengal tiger spotting.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {touristPlaces.map((place, idx) => {
              const Icon = place.icon;
              return (
                <div
                  key={idx}
                  className="group bg-card rounded-sm overflow-hidden border border-border shadow-sm flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image
                      src={place.image}
                      alt={place.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <div className="relative pt-6 px-5 pb-6 flex-1 flex flex-col items-center text-center">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center border-4 border-card shadow-md group-hover:bg-emerald-700 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-semibold text-foreground mb-2 mt-1 group-hover:text-emerald-800 transition-colors">
                      {place.title}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: 3 Cards from Mockup Photo (bg-background like home) */}
      <section className="py-8 md:py-14 bg-background">
        <div className="container">
          <div className="text-center mx-auto mb-10 md:mb-14 space-y-2.5">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
              Explore the Famous Sundarban Watch Towers for Wildlife Sightings &amp; Stunning Mangrove Views
            </h2>

            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              Watchtowers are perfect places to visit in Sundarban view of the terrain while being safe inside the tower. Watchtowers are located near fresh water ponds and clearings which offer the maximum opportunity for spotting wildlife. Some of the notable watchtowers are:
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {watchTowers.map((tower, idx) => (
              <div
                key={idx}
                className="group bg-card rounded-sm overflow-hidden border border-border shadow-sm flex flex-col"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={tower.image}
                    alt={tower.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="relative pt-6 px-6 pb-6 flex-1 flex flex-col items-center text-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center border-4 border-card shadow-md group-hover:bg-emerald-700 transition-colors">
                    <Binoculars className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-semibold text-foreground mb-2 mt-1 group-hover:text-emerald-800 transition-colors">
                    {tower.title}
                  </h3>

                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {tower.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Sajnekhali Wildlife Sanctuary (bg-muted like home) */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
                Visit Sajnekhali Wildlife Sanctuary and Explore the Fascinating Natural World of the Sundarbans
              </h2>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Acting as the entry point and administrative headquarters for Sundarban tiger reserve, Sajnekhali is a must visit place in Sundarban to learn about this unique mangrove ecosystem before venturing into the wilderness.
              </p>

              {/* 4 Feature Badges from Photo */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-card border border-border/70 flex flex-col items-center text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800/10 text-emerald-800 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">
                    Nature Centre
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border/70 flex flex-col items-center text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800/10 text-emerald-800 flex items-center justify-center">
                    <Waves className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">
                    Crocodile Pond
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border/70 flex flex-col items-center text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800/10 text-emerald-800 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">
                    Turtle Hatchery
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border/70 flex flex-col items-center text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800/10 text-emerald-800 flex items-center justify-center">
                    <Binoculars className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">
                    Bird Watching
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="default"
                  size="default"
                  asChild
                  className="bg-secondary hover:bg-primary text-white font-semibold px-6 rounded-sm shadow-sm"
                >
                  <Link href="/packages" className="flex items-center gap-2">
                    <span>Plan Your Visit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden shadow-xl border border-border bg-card group">
                <Image
                  src="/assets/sundarbantourphoto.jpeg"
                  alt="Sajnekhali Wildlife Sanctuary"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};
