"use client";

import {
  ArrowRight,
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
    <section className="relative py-8 lg:py-16 bg-[#061117] overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      <div className="container relative z-10">
        {/* Heading */}
        <div className="max-w-4xl mx-auto text-center mb-6 md:mb-12">


          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-[1.1] mb-4">
            Explore The Untamed Beauty Of{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Sundarbans"
              target="/blank"
            >
              Sundarban
            </Link>
          </h2>

          <p className="text-white/60 leading-relaxed max-w-3xl mx-auto">
            Cruise through the world’s largest mangrove forest, witness exotic
            wildlife, luxury riverside stays, and unforgettable boat safari
            adventures with our premium Sundarban tour packages.
          </p>
        </div>

        {/* MAIN GRID FIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-stretch">
          {/* LEFT SIDE */}
          <div className="relative w-full h-[400px] md:h-auto">
            <div className="h-full relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
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

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white text-sm mb-5">
                          <Trees className="w-4 h-4 text-secondary" />
                          {item.tag}
                        </div>

                        <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3">
                          {item.title}
                        </h3>

                        <p className="text-white/70 mb-6">{item.subtitle}</p>

                        <div className="max-w-sm rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                              <ShieldCheck className="w-6 h-6 text-secondary" />
                            </div>

                            <div>
                              <h5 className="text-white font-bold text-lg">
                                {item.title}
                              </h5>
                              <p className="text-white/50 text-sm">
                                {item.subtitle}
                              </p>
                            </div>
                          </div>

                          <p className="text-white/60 leading-relaxed text-sm">
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

          {/* RIGHT SIDE FIX */}
          <div className="w-full">
            <div className="h-full bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-4 md:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-auto">
              <div className="space-y-8">
                {/* Feature */}
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Trees className="w-7 h-7 text-primary" />
                  </div>

                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white mb-3">
                      Explore Iconic Attractions
                    </h4>
                    <p className="text-white/60 leading-relaxed">
                      Visit Sajnekhali Watch Tower, Dobanki Canopy Walk,
                      Sudhanyakhali, Pakhiralay, and stunning mangrove forest
                      landscapes.
                    </p>
                  </div>
                </div>

                {/* Feature */}
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-7 h-7 text-secondary" />
                  </div>

                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white mb-3">
                      Premium Wildlife Experience
                    </h4>
                    <p className="text-white/60 leading-relaxed">
                      Witness crocodiles, spotted deer, exotic birds, and the
                      majestic Royal Bengal Tiger while cruising through serene
                      rivers.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                {/* CTA */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-5">
                    Book Your Premium
                    <span className="block text-secondary">Sundarban Tour</span>
                  </h4>

                  <p className="text-white/60 leading-relaxed mb-8">
                    Luxury stay, Bengali meals, guided safari, transport, and
                    memories.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:+917074432628"
                      className="flex items-center justify-between gap-4 bg-primary text-white px-6 py-4 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" />
                        +91 70744 32628
                      </div>
                    </a>

                    <a
                      href="mailto:sundarbanbengaltrip@gmail.com"
                      className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-secondary" />
                        Contact Us
                      </div>
                    </a>
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
