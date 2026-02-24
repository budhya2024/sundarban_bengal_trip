"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Check, MapPin, Calendar } from "lucide-react";
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
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Tour Packages"
        subtitle="Choose from our carefully curated packages designed to give you the best Sundarban experience within your budget and timeline."
        backgroundImage="/assets/tour-premium.jpg"
      />

      {/* Packages */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                data-aos="fade-up"
                className={`grid lg:grid-cols-2 gap-8 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative lg:sticky lg:top-24 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.heroTitle}
                      className="w-full h-[400px] object-cover"
                    />
                    {pkg.isPopular && (
                      <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium">
                        Most Popular
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  {/* <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-secondary fill-current" />
                      <span className="font-semibold">{pkg.rating}</span>
                      <span className="text-muted-foreground">
                        ({pkg.reviews} reviews)
                      </span>
                    </div>
                  </div> */}

                  <h2 className="font-display text-3xl font-bold text-foreground mb-4 capitalize">
                    {pkg.packageName}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {pkg.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      {pkg.groupSize} people
                    </div>
                  </div>

                  {/* Features */}
                  {/* <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {pkg.highlights.map((feature) => (
                      <div
                        key={feature.value}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature.value}
                        </span>
                      </div>
                    ))}
                  </div> */}

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground line-through">
                        {pkg.originalPrice}
                      </span>
                      <p className="font-display text-3xl font-bold text-foreground">
                        {pkg.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}
                          / person
                        </span>
                      </p>
                    </div>
                    <Button
                      onClick={() => router.push(`/packages/${pkg.key}`)}
                      variant="hero"
                      size="lg"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Info */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div data-aos="fade-up">
              <MapPin className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">
                Pick-up Available
              </h3>
              <p className="text-sm text-muted-foreground">
                Free pick-up from Kolkata included in all packages
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <Calendar className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">
                Flexible Dates
              </h3>
              <p className="text-sm text-muted-foreground">
                Tours available year-round, best season Oct-Mar
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <Star className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">
                Satisfaction Guaranteed
              </h3>
              <p className="text-sm text-muted-foreground">
                Full refund if you don't love the experience
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Packages;
