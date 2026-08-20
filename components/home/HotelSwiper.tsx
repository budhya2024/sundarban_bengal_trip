"use client";

import Image from "next/image";

const row1Hotels = [
  {
    id: 1,
    image: "/assets/sonarbanglahotel.jpg",
    title: "Hotel Sonar Bangla Resort",
    alt: "Hotel Sonar Bangla Sundarban luxury resort front view and landscaped gardens",
  },
  {
    id: 2,
    image: "/assets/sonar-bangla-hotel-cottage.webp",
    title: "Premium Resort Cottages",
    alt: "Hotel Sonar Bangla Sundarban premium cottage accommodation and modern architecture",
  },
  {
    id: 3,
    image: "/assets/sonar-bangla-hotel-balcony.webp",
    title: "Riverfront Balcony View",
    alt: "Hotel Sonar Bangla Sundarban scenic riverfront balcony view overlooking mangroves",
  },
  {
    id: 4,
    image: "/assets/sonar-bangla-hotel-grounds.jpg",
    title: "Grand Resort Grounds",
    alt: "Hotel Sonar Bangla Sundarban luxury resort exterior campus and pathways",
  },
  {
    id: 5,
    image: "/assets/sonar-bangla-hotel-pool.jpg",
    title: "Pool & Courtyard",
    alt: "Hotel Sonar Bangla Sundarban swimming pool area and relaxed open courtyard",
  },
  {
    id: 6,
    image: "/assets/hotel-room-1.jpeg",
    title: "Deluxe AC Rooms",
    alt: "Hotel Sonar Bangla Sundarban deluxe AC room with comfortable bedding and interior",
  },
  {
    id: 7,
    image: "/assets/hotel-garden.jpeg",
    title: "Scenic Greenery",
    alt: "Sundarban Sonar Bangla hotel lush green lawns and natural surroundings",
  },
  {
    id: 8,
    image: "/assets/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp",
    title: "Sonar Bangla Tour Stay",
    alt: "Sundarban package tour from Kolkata with Hotel Sonar Bangla luxury stay",
  },
];

const row2Hotels = [
  {
    id: 9,
    image: "/assets/sonar-bangla-hotel-suite.jpg",
    title: "River View Suites",
    alt: "Hotel Sonar Bangla Sundarban river view luxury resort rooms",
  },
  {
    id: 10,
    image: "/assets/sonar-bangla-hotel-ambience.jpg",
    title: "Eco Resort Ambience",
    alt: "Hotel Sonar Bangla Sundarban eco-friendly resort ambiance and serene atmosphere",
  },
  {
    id: 11,
    image: "/assets/sonar-bangla-hotel-deluxe.jpg",
    title: "Executive Deluxe Stay",
    alt: "Hotel Sonar Bangla Sundarban executive deluxe accommodations and hospitality",
  },
  {
    id: 12,
    image: "/assets/sonar-bangla-hotel-dining.jpeg",
    title: "Dining & Restaurant",
    alt: "Hotel Sonar Bangla Sundarban dining area serving delicious Bengali tour meals",
  },
  {
    id: 13,
    image: "/assets/hotel-bedroom.jpeg",
    title: "Comfortable Bedroom Suite",
    alt: "Hotel Sonar Bangla Sundarban premium bedroom interior with modern amenities",
  },
  {
    id: 14,
    image: "/assets/hotel-lounge.jpeg",
    title: "Spacious Guest Lounge",
    alt: "Sundarban luxury hotel lounge area for family and group travelers",
  },
  {
    id: 15,
    image: "/assets/hotel-modern-room.jpeg",
    title: "Modern Hospitality",
    alt: "Sundarban Hotel Sonar Bangla premium room stay with clean attached washroom",
  },
  {
    id: 16,
    image: "/assets/hotel.jpeg",
    title: "Peaceful Resort Stay",
    alt: "Best luxury hotel in Sundarban for family weekend tours and holiday stays",
  },
];

// Duplicated arrays for seamless continuous looping (2x is sufficient with 50% translateX)
const loopRow1 = [...row1Hotels, ...row1Hotels];
const loopRow2 = [...row2Hotels, ...row2Hotels];

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
                <div className="relative h-44 sm:h-56 md:h-64 w-full rounded-sm overflow-hidden shadow-sm hover:shadow-elevated border border-border/60 transition-all duration-300 bg-card">
                  <Image
                    src={hotel.image}
                    alt={hotel.alt}
                    fill
                    sizes="(max-width: 768px) 288px, 384px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
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
                <div className="relative h-44 sm:h-56 md:h-64 w-full rounded-sm overflow-hidden shadow-sm hover:shadow-elevated border border-border/60 transition-all duration-300 bg-card">
                  <Image
                    src={hotel.image}
                    alt={hotel.alt}
                    fill
                    sizes="(max-width: 768px) 288px, 384px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
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
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          display: flex;
          width: max-content;
          animation: scrollLeft 45s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        .animate-scroll-right {
          display: flex;
          width: max-content;
          animation: scrollRight 45s linear infinite;
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