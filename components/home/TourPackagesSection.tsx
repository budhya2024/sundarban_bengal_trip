"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

import { FaClock, FaStar, FaCarSide, FaBed } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { PiBinocularsFill } from "react-icons/pi";
import { TrendingUp } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { PackageValues } from "@/schemas/package.schema";
import { getPackages } from "@/app/actions/package.actions";
import { useRouter } from "next/navigation";

// Helper for deterministic 30-day booking data
const get30DaysBookingData = (identifier: string, index: number) => {
  const ratios = [94, 88, 96, 91, 93, 90, 95];
  const counts = [142, 98, 165, 118, 134, 105, 156];
  const hash = identifier
    ? identifier.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : index;
  const idx = Math.abs(hash) % ratios.length;
  return {
    ratio: ratios[idx],
    count: counts[idx],
  };
};

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface PackageListValue extends PackageValues {
  key: string;
  id: string;
}

export const TourPackagesSection = () => {
  const [packages, setPackages] = useState<PackageListValue[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);

      const { data, success } = await getPackages();

      if (success && data) {
        setPackages(data.filter((pkg) => !pkg.isSonarBangla));
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
          className="text-center max-w-4xl mx-auto mb-8 md:mb-12"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
            Choose Your Sundarban tour package from kolkata
          </h1>

          <p className="text-muted-foreground max-w-4xl mx-auto">
            Finding the perfect travel destination isn’t about picking the most
            popular spot on social media—it is about finding the place that
            matches your current energy, budget, and travel style. Experience
            the natural beauty of Sundarban with Kolkata to Sundarban tour
            package comfortable journey, delicious meals and extraordinary
            sightseeing.
          </p>
        </div>

        {/* Packages Slider with Dots Pagination */}
        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            <PackageSkeleton />
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerGroup={1}
            className="!pb-2"
            breakpoints={{
              0: { slidesPerView: 1, slidesPerGroup: 1 },
              768: { slidesPerView: 2, slidesPerGroup: 1 },
              1200: { slidesPerView: 3, slidesPerGroup: 1 },
            }}
          >
            {packages.map((pkg, index) => {
              const booking = get30DaysBookingData(pkg.key || pkg.id || "", index);
              return (
                <SwiperSlide key={pkg.id || pkg.key || index} className="!h-auto p-1">
                  <div
                    className={`group relative rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-all duration-500 h-full flex flex-col ${pkg.isPopular
                      ? "border-2 border-secondary"
                      : "border border-border/60"
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
                    <div className="relative h-64 overflow-hidden shrink-0">
                      <Image
                        src={pkg.packageImage}
                        alt={pkg.packageName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Rating */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-secondary  text-white px-3 py-1 rounded-full">
                        <FaStar className="w-5 h-5 texr-white" />
                        <span className="text-white text-sm font-medium">
                          {pkg.rating}
                        </span>
                      </div>

                      {/* Package Name */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="text-white text-base md:text-lg font-semibold leading-snug">
                          {pkg.packageName}
                        </h3>
                      </div>
                    </div>

                    {/* Content (Outside Image Box) */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* 30-Day Booking Quantity - Edge-to-Edge Full Width Red Banner with Shine Effect */}
                        <div className="relative overflow-hidden bg-primary text-white py-2 px-6  -mx-6 -mt-6 mb-6 w-[calc(100%+3rem)]">
                          <div className="shine" />
                          <div className="relative z-10 flex items-center justify-between text-xs font-bold">
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="w-4 h-4 text-white shrink-0" />
                              <span className="tracking-wide font-semiboldtext-xs md:text-sm  text-white">Last 30 Days:</span>
                            </div>
                            <span className=" text-white text-xs md:text-sm font-semibold tracking-wider shadow-inner">
                              {booking.count}+ Tour Booked
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-y-3 gap-x-6 mb-4 md:mb-6">
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
                            <span className="text-sm font-medium">Pickup &amp; Drop</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <PiBinocularsFill className="w-5 h-5 text-secondary" />
                            <span className="text-sm font-medium">Sightseeing</span>
                          </div>
                        </div>
                      </div>

                      {/* Price & Action Buttons */}
                      <div>
                        {/* Price Display (Commented out)
                        {pkg.price && (
                          <div className="mb-4 flex items-baseline justify-between border-t border-border/50 pt-3">
                            <span className="text-xs text-muted-foreground font-medium">Starting from</span>
                            <div className="flex items-baseline gap-1.5">
                              {pkg.originalPrice && (
                                <span className="text-xs line-through text-muted-foreground">
                                  ₹{pkg.originalPrice}
                                </span>
                              )}
                              <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                                ₹{pkg.price}
                              </span>
                              <span className="text-[11px] text-muted-foreground">/ person</span>
                            </div>
                          </div>
                        )}
                        */}

                        <div className="flex items-center gap-3 mt-auto">
                          <div className="w-full">
                            <BookingModal
                              packageName={pkg.packageName}
                              triggerLabel="Book Now"
                              triggerClassName="text-sm rounded-[4px] font-medium w-full"
                            />
                          </div>

                          <div className="w-full">
                            <Button
                              variant="outline"
                              className="h-12 px-6 rounded-[4px] font-medium w-full"
                              onClick={() => router.push(`/packages/${pkg.key}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
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
