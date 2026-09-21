"use client";

import {
  Phone,
  Mail,
  Sparkles,
  Trees,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

const galleryImages = [
  {
    image: "/assets/hose-boat.webp",
    tag: "Luxury River Safari",
    title: "Safe Boat Safari",
    subtitle: "Guided & Comfortable Journey",
    description:
      "Explore Dobanki, Sajnekhali, Sudhanyakhali, and hidden river routes with experienced local guides and premium hospitality.",
  },
  {
    image: "/assets/tiger-photo.jpg",
    tag: "Wildlife Adventure",
    title: "Royal Bengal Tiger",
    subtitle: "Witness The King Of Sundarban",
    description:
      "Experience thrilling jungle safaris and spot the majestic Royal Bengal Tiger deep inside the world’s largest mangrove forest.",
  },
];

export const ExploreSection = () => {
  return (
    <section className="relative py-10 md:py-16 bg-white overflow-hidden border-t border-border/40">
      <div className="container relative z-10">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-snug mb-4">
            Explore The Untamed Beauty Of{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Sundarbans"
              target="_blank"
              className="text-primary hover:underline"
            >
              Sundarban
            </Link>
          </h2>

          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-sm md:text-base">
            Cruise through the world’s largest mangrove forest, witness exotic
            wildlife, luxury riverside stays, and unforgettable boat safari
            adventures with our premium Sundarban tour packages.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
          {/* LEFT SIDE: SLIDER */}
          <div className="relative w-full h-[400px] md:h-auto">
            <div className="h-full relative rounded-2xl overflow-hidden border border-border/40 shadow-xl bg-card">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
              >
                {galleryImages.map((item, index) => (
                  <SwiperSlide key={index} className="h-full">
                    <div className="relative h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      <div className="absolute bottom-0 left-0 w-full p-5 sm:p-7 z-10">


                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
                          {item.title}
                        </h3>

                        <p className="text-white/80 text-xs sm:text-sm mb-4">{item.subtitle}</p>

                        <div className="rounded-xl border border-white/15 bg-black/40 backdrop-blur-md p-4 shadow-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                              <ShieldCheck className="w-5 h-5 text-secondary" />
                            </div>

                            <div>
                              <h5 className="text-white font-bold text-sm sm:text-base">
                                {item.title}
                              </h5>
                              <p className="text-white/60 text-xs">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          <p className="text-white/75 leading-relaxed text-xs md:text-sm font-normel">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* RIGHT SIDE: FEATURES & CTA */}
          <div className="w-full">
            <div className="h-full bg-white border border-border/60 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Trees className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                      Explore Iconic Attractions
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Visit Sajnekhali Watch Tower, Dobanki Canopy Walk,
                      Sudhanyakhali, Pakhiralay, and stunning mangrove forest
                      landscapes.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                      Premium Wildlife Experience
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Witness crocodiles, spotted deer, exotic birds, and the
                      majestic Royal Bengal Tiger while cruising through serene
                      rivers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-border/60" />

              {/* CTA */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  Book Your Premium{" "}
                  <span className="text-primary">Sundarban Tour</span>
                </h4>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                  Luxury stay, Bengali meals, guided safari, transport, and
                  memories.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:+917586889519"
                    className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl shadow-sm transition-all  text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 75868 89519</span>
                  </a>

                  <a
                    href="mailto:sundarbanbengaltrip@gmail.com"
                    className="inline-flex items-center justify-center gap-2.5 bg-muted hover:bg-secondary/15 text-foreground hover:text-secondary font-medium px-5 py-3 rounded-xl border border-border/60 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

