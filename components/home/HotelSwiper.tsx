"use client";

import Image from "next/image";

const row1Hotels = [
  { id: 1, image: "/assets/sonarbanglahotel.jpg", title: "Luxury Resort View" },
  { id: 2, image: "/assets/hotel (1).jpeg", title: "Premium Rooms" },
  { id: 3, image: "/assets/hotel (2).jpeg", title: "Scenic Surroundings" },
  { id: 4, image: "/assets/hotel (3).jpeg", title: "Comfortable Interiors" },
  { id: 5, image: "/assets/hotel (4).jpeg", title: "Riverfront Ambiance" },
  { id: 6, image: "/assets/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp", title: "Sonar Bangla Stay" },
];

const row2Hotels = [
  { id: 7, image: "/assets/hotel (5).jpeg", title: "Deluxe Suite" },
  { id: 8, image: "/assets/hotel (6).jpeg", title: "Lush Gardens" },
  { id: 9, image: "/assets/hotel (7).jpeg", title: "Spacious Lounge" },
  { id: 10, image: "/assets/hotel (8).jpeg", title: "Modern Amenities" },
  { id: 11, image: "/assets/hotel.jpeg", title: "Relaxing Stays" },
  { id: 12, image: "/assets/sonarbanglahotel.jpg", title: "Hotel Sonar Bangla" },
];

// Duplicated arrays for seamless continuous looping
const loopRow1 = [...row1Hotels, ...row1Hotels, ...row1Hotels];
const loopRow2 = [...row2Hotels, ...row2Hotels, ...row2Hotels];

export default function HotelSwiper() {
  return (
    <section className="py-10 md:py-16 bg-muted/60 overflow-hidden">
      <div className="container mb-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Premium Accommodation
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
            Sundarban Sonar Bangla Hotel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience world-class hospitality, luxury amenities, and serene nature views in the heart of the Sundarbans.
          </p>
        </div>
      </div>

      {/* Dual Row Opposite Direction Sliders */}
      <div className="space-y-5 md:space-y-6">
        {/* Row 1: Left Scroll */}
        <div className="relative w-full overflow-hidden mask-fade">
          <div className="flex gap-4 md:gap-6 animate-scroll-left">
            {loopRow1.map((hotel, index) => (
              <div
                key={`r1-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 group"
              >
                <div className="relative h-44 sm:h-56 md:h-64 w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-elevated border border-border/60 transition-all duration-300 bg-card">
                  <Image
                    src={hotel.image}
                    alt={hotel.title}
                    fill
                    sizes="(max-width: 768px) 288px, 384px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium tracking-wide">
                      {hotel.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right Scroll (Opposite Direction) */}
        <div className="relative w-full overflow-hidden mask-fade">
          <div className="flex gap-4 md:gap-6 animate-scroll-right">
            {loopRow2.map((hotel, index) => (
              <div
                key={`r2-${index}`}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 group"
              >
                <div className="relative h-44 sm:h-56 md:h-64 w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-elevated border border-border/60 transition-all duration-300 bg-card">
                  <Image
                    src={hotel.image}
                    alt={hotel.title}
                    fill
                    sizes="(max-width: 768px) 288px, 384px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium tracking-wide">
                      {hotel.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          display: flex;
          width: max-content;
          animation: scrollLeft 55s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: scrollRight 55s linear infinite;
        }

        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        .mask-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
}