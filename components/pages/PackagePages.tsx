"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { FaCarSide, FaBed } from "react-icons/fa6";
import { Clock, Star } from "lucide-react";
import { GiHotMeal } from "react-icons/gi";
import { PiBinocularsFill } from "react-icons/pi";
import { PackageValues } from "@/schemas/package.schema";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookingModal } from "../BookingModal";

const Packages = ({
  packages,
}: {
  packages: (PackageValues & { key: string; id: string })[];
}) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <PageHeader
        title="Tour Packages"
        subtitle="Choose from our carefully curated packages designed to give you the best Sundarban experience within your budget and timeline."
        backgroundImage="/assets/pickup.jpeg"
      />

      {/* Packages */}
      <section className="py-8 md:py-16">
        <div className="container">
          <div className="space-y-8 md:space-y-14">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                data-aos="fade-up"
                className="group grid lg:grid-cols-2 overflow-hidden  border border-border bg-card shadow-sm  transition-all duration-500"
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                >
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.heroTitle}
                    width={800}
                    height={600}
                    className="w-full h-40 sm:h-80 md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Popular Badge */}
                  {pkg.isPopular && (
                    <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{pkg.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-4 md:p-6 flex flex-col justify-between ${index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                >
                  <div>
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-secondary fill-current" />
                      <span className="font-semibold">{pkg.rating}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-xl sm:text-lg md:text-xl xl:text-2xl  font-bold text-foreground mb-4 capitalize leading-tight">
                      {pkg.packageName}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground  text-sm md:text-base leading-relaxed mb-4 md:mb-8 ">
                      {pkg.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <FaBed className="w-5 h-5 text-secondary" />
                        <span className="text-sm font-medium">
                          Premium Hotel
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <GiHotMeal className="w-5 h-5 text-secondary" />
                        <span className="text-sm font-medium">All Meals</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaCarSide className="w-5 h-5 text-secondary" />
                        <span className="text-sm font-medium">
                          Pickup & Drop
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <PiBinocularsFill className="w-5 h-5 text-secondary" />

                        <span className="text-sm font-medium">Sightseeing</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 pt-4 md:pt-8 border-t border-border">
                    {/* Price */}
                    {/* <div>
                      <span className="text-sm text-muted-foreground">
                        Starting From
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="text-lg text-muted-foreground line-through">
                          ₹ {pkg.originalPrice}
                        </span>

                        <h4 className="text-2xl md:text-4xl font-bold text-foreground">
                          ₹ {pkg.price}
                        </h4>
                      </div>
                    </div> */}

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                      <Button
                        variant="outline"
                        className="h-12 px-6 rounded-xl font-medium"
                        onClick={() => router.push(`/packages/${pkg.key}`)}
                      >
                        View Details
                      </Button>

                      <div className="w-full lg:w-auto">
                        <BookingModal
                          packageName={pkg.packageName}
                          triggerLabel="Book Now"
                          triggerVariant="outline"
                          triggerClassName="text-base rounded-xl font-medium w-full lg:w-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Packages;
