"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Star,
  Hotel,
  UtensilsCrossed,
  CarTaxiFront,
  MapPinned,
  ArrowRight,
} from "lucide-react";
import { PackageValues } from "@/schemas/package.schema";
import { useRouter } from "next/navigation";

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
        backgroundImage="/assets/tour-premium.jpg"
      />

      {/* Packages */}
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="space-y-14">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                data-aos="fade-up"
                className="group grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={pkg.heroImage}
                    alt={pkg.heroTitle}
                    className="w-full h-full min-h-[350px] lg:min-h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Popular Badge */}
                  {pkg.isPopular && (
                    <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  )}

                  {/* Duration */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {pkg.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-6 md:p-10 flex flex-col justify-between ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div>
                    {/* Rating */}
                    {/* <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-secondary fill-current" />
                      <span className="font-semibold">{pkg.rating}</span>
                      <span className="text-muted-foreground">
                        ({pkg.reviews} reviews)
                      </span>
                    </div> */}

                    {/* Title */}
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 capitalize leading-tight">
                      {pkg.packageName}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                      {pkg.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="flex items-center gap-3 bg-secondary/10 px-4 py-3 rounded-2xl border border-secondary/20">
                        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                          <Hotel className="w-5 h-5 fill-current" />
                        </div>

                        <span className="text-sm font-medium text-foreground">
                          Hotel
                        </span>
                      </div>

                      <div className="flex items-center gap-3 bg-secondary/10 px-4 py-3 rounded-2xl border border-secondary/20">
                        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                          <UtensilsCrossed className="w-5 h-5 fill-current" />
                        </div>

                        <span className="text-sm font-medium text-foreground">
                          Meals
                        </span>
                      </div>

                      <div className="flex items-center gap-3 bg-secondary/10 px-4 py-3 rounded-2xl border border-secondary/20">
                        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                          <CarTaxiFront className="w-5 h-5 fill-current" />
                        </div>

                        <span className="text-sm font-medium text-foreground">
                          Transfer
                        </span>
                      </div>

                      <div className="flex items-center gap-3 bg-secondary/10 px-4 py-3 rounded-2xl border border-secondary/20">
                        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                          <MapPinned className="w-5 h-5 fill-current" />
                        </div>

                        <span className="text-sm font-medium text-foreground">
                          Sightseeing
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-8 border-t border-border">
                    {/* Price */}
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Starting From
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="text-lg text-muted-foreground line-through">
                          ₹ {pkg.originalPrice}
                        </span>

                        <h4 className="text-4xl font-bold text-foreground">
                          ₹ {pkg.price}
                        </h4>
                      </div>

                
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                      <Button
                        variant="outline"
                        className="h-12 px-6 rounded-2xl font-medium"
                        onClick={() =>
                          router.push(`/packages/${pkg.key}`)
                        }
                      >
                        View Details
                      </Button>

                      <Button
                        variant={pkg.isPopular ? "hero" : "nature"}
                        className="h-12 px-6 rounded-2xl font-medium gap-2"
                        onClick={() =>
                          router.push(
                            `/contact?package=${encodeURIComponent(
                              pkg.packageName
                            )}`
                          )
                        }
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
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