"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const hotels = [
  { id: 1, image: "/assets/hotel (4).jpeg" },
  { id: 2, image: "/assets/hotel (3).jpeg" },
  { id: 3, image: "/assets/hotel (4).jpeg" },
  { id: 4, image: "/assets/hotel (5).jpeg" },
];

// duplicate for loop
const loopHotels = [...hotels, ...hotels];

export default function HotelSwiper() {
  return (
    <section className="py-10 md:py-16 bg-muted mt-10 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Sonar Bangla Hotel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comfortable stays in the heart of Sundarban
          </p>
        </div>

        {/* Infinite Scroll */}
        <div className="relative w-full overflow-hidden mask-fade">
          <div className="flex gap-6 animate-scroll">

            {loopHotels.map((hotel, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[14%] md:w-[18%]"
              >
                <div className="relative h-40 sm:h-56 md:h-80 w-full group">
                  <Image
                    src={hotel.image}
                    alt="Hotel image"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover rounded-xl transition-transform duration-500"
                  />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>

      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        // .animate-scroll:hover {
        //   animation-play-state: paused;
        // }

        .mask-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}