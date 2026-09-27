"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";

import { FaClock, FaStar, FaCarSide, FaBed } from "react-icons/fa6";
import { GiHotMeal } from "react-icons/gi";
import { PiBinocularsFill } from "react-icons/pi";
import { Hotel } from "lucide-react";

import Image from "next/image";
import { PackageValues } from "@/schemas/package.schema";
import { getPackages } from "@/app/actions/package.actions";
import { useRouter } from "next/navigation";

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

  // If still loading or no Sonar Bangla packages exist, do not display the section
  if (loading || packages.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-16 overflow-hidden bg-slate-50/60 border-y border-border/40">
      <div className="container">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <Hotel className="w-3.5 h-3.5" />
            <span>Luxury Resort Partner</span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Hotel Sonar Bangla
          </h2>

          <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base">
            Indulge in 5-star comfort and riverside elegance at the renowned Hotel
            Sonar Bangla Sundarban. Experience premium AC cottages, authentic
            Bengali feasts, Kolkata-to-Kolkata transfers, and private mangrove boat
            safaris.
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
            className="!pb-14 md:!pb-16 !pt-3"
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {packages.map((pkg, index) => (
              <SwiperSlide
                key={pkg.id || pkg.key || index}
                className="!h-auto p-1"
              >
                <div
                  className="group relative rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col border-2 border-amber-500/30 hover:border-amber-500/80"
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
                  <div className="p-6 flex-1 flex flex-col justify-between">
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

                    {/* Bottom Action Buttons */}
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
                          className="h-12 px-6 rounded-[4px] font-medium w-full border-amber-300 hover:bg-amber-50 text-slate-800"
                          onClick={() => router.push(`/packages/${pkg.key}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
