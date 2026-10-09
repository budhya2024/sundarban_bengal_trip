"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

import { FaClock, FaStar, FaCarSide, FaBed } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { PiBinocularsFill } from "react-icons/pi";
import { Hotel, TrendingUp } from "lucide-react";

import Image from "next/image";
import { PackageValues } from "@/schemas/package.schema";
import { getPackages } from "@/app/actions/package.actions";
import { useRouter } from "next/navigation";

// Helper for deterministic 30-day booking data
const get30DaysBookingData = (identifier: string, index: number) => {
  const ratios = [96, 92, 98, 94, 91, 95];
  const counts = [185, 140, 210, 162, 128, 175];
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
import { PackageSkeleton } from "./TourPackagesSection";

interface PackageListValue extends PackageValues {
  key: string;
  id: string;
}

export const SonarBanglaPackagesSection = () => {
  const [packages, setPackages] = useState<PackageListValue[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);

      const { data, success } = await getPackages();

      if (success && data) {
        const sonarBanglaPkgs = data.filter(
          (pkg) => pkg.isSonarBangla === true
        );
        setPackages(sonarBanglaPkgs);
      }

      setLoading(false);
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, []);

  if (loading || packages.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-16 overflow-hidden bg-primary/5">
      <div className="container">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="text-center max-w-4xl mx-auto mb-8 md:mb-12"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">

            Hotel Sonar Bangla Sundarban Tour Package
          </h2>

          <p className="text-muted-foreground max-w-4xl mx-auto text-sm md:text-base">
            Experience the perfect blend of Luxury and Wilderness with the Hotel Sonar Bangla Sundarban Package Tour. Nestled in the heart of nature, Hotel Sonar Bangla is a Premier Luxury Resort in Sundarban that offers unmatched comfort and elegance amidst the enchanting mangroves of the Sundarbans.
          </p>
        </div>

        {/* Packages Slider */}
        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            <PackageSkeleton />
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
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
                <SwiperSlide
                  key={pkg.id || pkg.key || index}
                  className="!h-auto p-1"
                >
                  <div
                    className="group relative rounded-xl overflow-hidden bg-card shadow-sm  transition-all duration-500 h-full flex flex-col border-2 border-amber-500/30 hover:border-amber-500/80"
                  >
                    {/* Popular Badge */}
                    {pkg.isPopular && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-4 py-1.5 rounded-full bg-secondary  text-white text-xs font-semibold ">
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
                        <FaStar className="w-5 h-5 text-white" />
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
                              <span className="tracking-wide font-semibold text-xs md:text-sm  text-white">Last 30 Days:</span>
                            </div>
                            <span className=" text-white  text-xs md:text-sm font-semibold tracking-wider shadow-inner">
                              {booking.count}+ Tour Booked
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-y-3 gap-x-6 mb-4 md:mb-6">
                          <div className="flex items-center gap-2">
                            <FaBed className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-medium">
                              Sonar Bangla Resort
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <GiHotMeal className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-medium">All Meals</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaCarSide className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-medium">Pickup &amp; Drop</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <PiBinocularsFill className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-medium">Boat Safari</span>
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
                              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
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
                              triggerClassName="text-sm rounded-[4px] font-medium w-full bg-amber-600 hover:bg-amber-700 text-white"
                            />
                          </div>

                          <div className="w-full">
                            <Button
                              variant="outline"
                              className="h-12 px-6 rounded-[4px] font-medium w-full hover:bg-primary text-primary"
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
