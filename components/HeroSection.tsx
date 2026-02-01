import { useEffect } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="relative  py-10 md:py-20 flex   overflow-hidden bg-primary ">
      {/* Background Video */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:pt-20">
        <div className="grid md:grid-cols-7 ">
          <div className="md:col-span-4">
            <h1
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="100"
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
            >
              Discover the Wild Beauty of{" "}
              <span className="text-secondary">Sundarbans</span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="200"
              className="text-lg md:text-xl text-primary-foreground/90 mb-8  leading-relaxed"
            >
              Embark on an unforgettable journey through the world's largest
              mangrove forest. Witness the majestic Royal Bengal Tiger and
              explore the enchanting waterways of this natural wonder.
            </p>

            <div
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="300"
              className="flex flex-col sm:flex-row gap-4  mb-12"
            >
              <Button variant="hero" size="xl" asChild>
                <Link href="/packages">Explore Tours</Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link href="/contact">Plan Your Trip</Link>
              </Button>
            </div>
          </div>
          <div className="md:col-span-3">
            <img
              src="assets/2f29fc56f3eac69861f9fc597d5fa775.gif"
              alt="Sundarbans Hero Image"
              className="w-full h-auto object-contain transform -scale-x-100 "
            />
          </div>
        </div>
      </div>
    </section>
  );
};
