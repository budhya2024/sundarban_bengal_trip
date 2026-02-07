"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Check } from "lucide-react";
import Link from "next/link";
import { PackageValues } from "@/schemas/package.schema";
import { getPackages } from "@/app/actions/package.actions";

const packages = [
  {
    name: "Explorer Day Trip",
    image: "/assets/tour-budget.jpg",
    duration: "1 Day",
    groupSize: "10-15",
    price: "₹2,499",
    rating: 4.7,
    features: [
      "Guided boat safari",
      "Wildlife spotting",
      "Traditional lunch",
      "Photography stops",
    ],
    popular: false,
  },
  {
    name: "Premium Safari",
    image: "/assets/tour-premium.jpg",
    duration: "3 Days / 2 Nights",
    groupSize: "6-8",
    price: "₹12,999",
    rating: 4.9,
    features: [
      "Luxury houseboat stay",
      "Tiger territory exploration",
      "All meals included",
      "Professional naturalist",
      "Night safari experience",
    ],
    popular: true,
  },
  {
    name: "Adventure Expedition",
    image: "/assets/tour-adventure.jpg",
    duration: "2 Days / 1 Night",
    groupSize: "8-12",
    price: "₹6,999",
    rating: 4.8,
    features: [
      "Camping experience",
      "Multiple safari rides",
      "Bird watching tour",
      "Local village visit",
    ],
    popular: false,
  },
];

interface PackageListValue extends PackageValues {
  key: string;
  id: string;
}

export const TourPackagesSection = () => {
  const [packages, setPackages] = useState<PackageListValue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      const { data, success } = await getPackages(false, 3);
      if (success && data) {
        setPackages(data);
      }
      setLoading(false);
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-10 md:py-20 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Tour Packages
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Choose Your Perfect Adventure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From quick day trips to immersive multi-day expeditions, we have the
            perfect package to match your schedule and budget.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <PackageSkeleton />
          ) : (
            packages.map((pkg, index) => (
              <div
                key={pkg.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group ${
                  pkg.isPopular ? "ring-2 ring-secondary" : ""
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    Most Popular
                  </div>
                )}

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.packageImage}
                    alt={pkg.packageName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <h3 className="font-display text-xl font-bold text-primary-foreground">
                      {pkg.packageName}
                    </h3>
                    <div className="flex items-center gap-1 text-secondary">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-primary-foreground font-medium">
                        {pkg.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {pkg.groupSize} people
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {pkg.highlights.map((highlight) => (
                      <li
                        key={highlight.value}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                        {highlight.value}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Starting from
                      </span>
                      <p className="font-display text-2xl font-bold text-foreground">
                        {pkg.price}
                      </p>
                    </div>
                    <Button variant={pkg.isPopular ? "hero" : "nature"} asChild>
                      <Link href={`/packages/${pkg.key}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All CTA */}
        {!loading && (
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/packages">View All Packages</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export const PackageSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative bg-card rounded-2xl overflow-hidden shadow-soft border border-slate-100 animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="relative h-56 bg-slate-200" />

          {/* Content Placeholder */}
          <div className="p-6 space-y-6">
            {/* Meta Row */}
            <div className="flex gap-4">
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-4/5 bg-slate-100 rounded" />
              <div className="h-3 w-5/6 bg-slate-100 rounded" />
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-slate-100 rounded" />
                <div className="h-6 w-24 bg-slate-200 rounded" />
              </div>
              {/* Button Placeholder */}
              <div className="h-10 w-28 bg-slate-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
