"use client";

import { useEffect } from "react";
import AOS from "aos";
import {
  FaBed,
  FaBowlFood,
  FaShieldHalved,
  FaLock,
  FaShip,
  FaCarSide,
  FaCamera,
  FaUserDoctor
} from "react-icons/fa6";

const features = [
  {
    icon: FaBed,
    title: "ACCOMMODATION",
    description: "We provide the best accommodation facility",
  },
  {
    icon: FaBowlFood,
    title: "GOOD FOOD",
    description: "We provide the best kind of Bengali food",
  },
  {
    icon: FaShieldHalved,
    title: "SAFETY",
    description: "Your safety is our most priority job here",
  },
  {
    icon: FaLock,
    title: "PRIVACY",
    description: "We know the value of the privacy of our visitors",
  },
  {
    icon: FaShip,
    title: "HOUSE BOAT",
    description: "You will get best boating experience",
  },
  {
    icon: FaCarSide,
    title: "PICKUP & DROP",
    description: "We also provide efficient pickup & drop service",
  },
  {
    icon: FaCamera,
    title: "SIGHTSEEING",
    description: "make your experience memorable here",
  },
  {
    icon: FaUserDoctor,
    title: "DOCTOR ON CALL",
    description: "Emergency doctor call available anytime",
  },
];

export const AboutSection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-10 md:py-16 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div
            data-aos="fade-right"
            data-aos-duration="800"
            className="relative"
          >
            <div className="relative  overflow-hidden ">
              <img
                src="/assets/Sundarban-tour-booking.jpeg"
                alt="sundarban tour booking"
                className="w-full h-[280px] md:h-[360px]  object-cover "
              />

            </div>

          </div>

          {/* Content */}
          <div data-aos="fade-left" data-aos-duration="800">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-3xl font-bold text-foreground mt-2 mb-6 ">
              Why Travellers Choose Our Sundarban Travel Package

            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our expertly organised Sundarban trips are designed to immerse you safely into this UNESCO World Heritage site. For over 15 years Sundarban Bengal trip has been the first choice for wildlife enthusiastic and adventure seeker people. We take care of every detail—from securing required forest department permits and arranging local, naturalist guides to booking eco-friendly jungle resorts.
            </p>
            <p className="text-muted-foreground leading-relaxed ">
              Whether you are an wildlife photographer, a birdwatcher, or a traveler seeking deep tranquility,  Sundarban tour package from kolkata balance thrilling wilderness exploration with sustainable, responsible travel practices that support local island communities.
            </p>


          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 mt-12 border-t border-dashed border-gray-200/80">
          {features.map((feature, index) => {
            let borderClasses = "border-dashed border-gray ";

            // Mobile & Tablet (2 columns, 4 rows): bottom border for first 3 rows (index 0-5)
            if (index >= 6) {
              borderClasses += "border-b-0 ";
            } else {
              borderClasses += "border-b ";
            }
            // Right border for left column (even index)
            if (index % 2 === 0) {
              borderClasses += "border-r ";
            } else {
              borderClasses += "border-r-0 ";
            }

            // Desktop (4 columns, 2 rows): bottom border for first row only (index 0-3)
            if (index >= 4) {
              borderClasses += "md:border-b-0 ";
            } else {
              borderClasses += "md:border-b ";
            }
            // Right border for cols 1-3, not col 4
            if (index % 4 === 3) {
              borderClasses += "md:border-r-0 ";
            } else {
              borderClasses += "md:border-r ";
            }

            return (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 100}
                className={`p-3 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-slate-50/50 ${borderClasses}`}
              >
                <div className=" mb-4">
                  <feature.icon className="w-12 h-12 text-secondary hover:text-primary transition-all duration-300" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground text-base uppercase tracking-wider mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-base max-w-[250px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
