"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";


const GALLERY_IMAGES = [
  { src: "/assets/sundarbantourphoto.jpeg", caption: "Sundarban Tour — Real Moments" },
  { src: "/assets/group-tour-sundarban.jpeg", caption: "Group Tour in Sundarban" },
  { src: "/assets/houseboat.jpeg", caption: "Houseboat Cruise on the River" },
  { src: "/assets/house-boat.jpeg", caption: "Overnight Stay on Houseboat" },
  { src: "/assets/mangrove.jpeg", caption: "Deep Mangrove Waterways" },
  { src: "/assets/pickup.jpeg", caption: "Pickup & Drop Service" },
  { src: "/assets/Sundarban-tour-booking.jpeg", caption: "Book Your Sundarban Adventure" },
  { src: "/assets/sundarban-tour-cost.jpeg", caption: "Affordable Sundarban Packages" },
  { src: "/assets/bestsundarbantourpackage.jpeg", caption: "Best Sundarban Tour Package" },
  { src: "/assets/hotel (1).jpeg", caption: "Resort Accommodation" },
  { src: "/assets/hotel (3).jpeg", caption: "Comfortable Stay at the Resort" },
  { src: "/assets/hotel (5).jpeg", caption: "Beautiful Resort View" },
  { src: "/assets/sundarban-lunch-menu.jpeg", caption: "Freshly Prepared Tour Meals" },
  { src: "/assets/Couples & Groups.jpeg", caption: "Couples & Group Tours Available" },
];

export const TourGallerySlider = () => {
  return (
    <div data-aos="fade-up" className="space-y-3">
      <div className="relative rounded-xl overflow-hidden shadow-elevated group">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3200, disableOnInteraction: false }}

          navigation={{
            nextEl: ".gallery-next",
            prevEl: ".gallery-prev",
          }}
          loop={true}
          className="w-full"
        >
          {GALLERY_IMAGES.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-80">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                {/* Caption pill */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h1 className="inline-block text-white text-sm font-medium ">
                    {img.caption}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev / Next — visible on hover */}
        <button
          className="gallery-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="gallery-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          aria-label="Next photo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
