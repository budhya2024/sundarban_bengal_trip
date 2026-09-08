"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { DurgaPujaHero } from "./DurgaPujaHero";
import { DurgaPujaHighlights } from "./DurgaPujaHighlights";
import { DurgaPujaWhyVisit } from "./DurgaPujaWhyVisit";
import { DurgaPujaItinerary } from "./DurgaPujaItinerary";
import { DurgaPujaHotel } from "./DurgaPujaHotel";
import { DurgaPujaMoments } from "./DurgaPujaMoments";
import { DurgaPujaReviews } from "./DurgaPujaReviews";
import { DurgaPujaFAQ } from "./DurgaPujaFAQ";
import { DurgaPujaBottomCTA } from "./DurgaPujaBottomCTA";

export const DurgaPujaLanding = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-amber-400 selection:text-slate-900 font-bengali">


      {/* 2. Hero Section with River Sunset, Maa Durga Visual & Booking Card */}
      <DurgaPujaHero />

      {/* 3. 3 Days 2 Nights Package Highlight Strip */}
      <DurgaPujaHighlights />

      {/* 4. Why Sundarban This Puja? (6 Circular Features) */}
      <DurgaPujaWhyVisit />

      {/* 5. 3 Days 2 Nights Tour Itinerary (Red Ribbon + 3 Cards) */}
      <DurgaPujaItinerary />

      {/* 6. Sundar Sonar Bangla Hotel Luxury Stay Feature */}
      <DurgaPujaHotel />

      {/* 7. Tour Moments Photo Showcase (5 Photos) */}
      <DurgaPujaMoments />

      {/* 8. Bengali Guest Reviews / Testimonials (3 Cards) */}
      <DurgaPujaReviews />

      {/* 9. Interactive FAQ Accordions (2 Columns) */}
      <DurgaPujaFAQ />

      {/* 10. Limited Seats Bottom Call to Action */}
      <DurgaPujaBottomCTA />


    </div>
  );
};

export default DurgaPujaLanding;
