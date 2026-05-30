"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

import {
  FaClock,
  FaStar,
  FaHotel,
  FaUtensils,
  FaCarSide,
  FaMapLocationDot,
  FaBed,
} from "react-icons/fa6";
import { GiHotMeal, GiWorld } from "react-icons/gi";
import { PiBinocularsFill } from "react-icons/pi";

import Link from "next/link";
import { PackageValues } from "@/schemas/package.schema";
import { getPackages } from "@/app/actions/package.actions";

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
    <section className="py-8 md:py-16 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Choose Your Perfect Adventure
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore breathtaking destinations with premium stays, delicious
            meals, seamless Pickup & Drop, and unforgettable sightseeing
            experiences.
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
                data-aos-delay={index * 120}
                className={`group relative rounded-xl overflow-hidden bg-card border border-border/60 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                  pkg.isPopular ? "ring-2 ring-secondary" : ""
                }`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.packageImage}
                    alt={pkg.packageName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                    <FaStar className="w-5 h-5 text-yellow-400" />
                    <span className="text-white text-sm font-medium">
                      {pkg.rating}
                    </span>
                  </div>

                  {/* Package Name */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-xl font-bold leading-snug">
                      {pkg.packageName}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-white/90 text-sm">
                      <FaClock className="w-5 h-5" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <FaBed className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium">Premium Hotel</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GiHotMeal className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium">All Meals</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCarSide className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-medium">Pickup & Drop</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <PiBinocularsFill className="w-5 h-5 text-secondary" />
                      

                      <span className="text-sm font-medium">Sightseeing</span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* Price */}
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Starting From
                      </span>

                      <h4 className="text-xl font-bold text-foreground">
                        ₹ {pkg.price}
                      </h4>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 w-full lg:w-auto">
                      <Button
                        variant="outline"
                        className="text-base rounded-xl py-4 font-medium w-full lg:w-auto"
                        asChild
                      >
                        <Link href={`/packages/${pkg.key}`}>Details</Link>
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
            ))
          )}
        </div>

        {/* View All */}
        {!loading && (
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center mt-14"
          >
            <Button size="lg" variant="outline" className="px-8" asChild>
              <Link href="/contact">Contact for Custom Tour</Link>
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
          className="rounded-xl overflow-hidden border border-border animate-pulse"
        >
          <div className="h-64 bg-slate-200" />

          <div className="p-6">
            <div className="h-6 w-2/3 bg-slate-200 rounded mb-3" />
            <div className="h-4 w-24 bg-slate-100 rounded mb-6" />

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-20 rounded-xl bg-slate-100" />
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="h-3 w-20 bg-slate-100 rounded mb-2" />
                <div className="h-8 w-28 bg-slate-200 rounded" />
              </div>

              <div className="w-14 h-14 rounded-xl bg-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 rounded-xl bg-slate-200" />
              <div className="h-11 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};