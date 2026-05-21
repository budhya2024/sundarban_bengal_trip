"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Navbar } from "@/components/Navbar";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";

import { SundarbanHeroSection } from "@/components/sundarban-tour-package-from-kolkata/HeroSection";
import { IntroSection } from "@/components/sundarban-tour-package-from-kolkata/IntroSection";
import { PackagesSection } from "@/components/sundarban-tour-package-from-kolkata/PackagesSection";
import { ServicesSection } from "@/components/sundarban-tour-package-from-kolkata/ServicesSection";
import { ExploreSection } from "@/components/sundarban-tour-package-from-kolkata/ExploreSection";


const SundarbanTourPackageFromKolkata = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero */}
      <SundarbanHeroSection />

      {/* Booking Form */}
      <div
        className="relative z-20 container pb-12 lg:-mt-16 lg:pb-20"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <BookingForm />
      </div>

      {/* Intro — H1 content */}
      <IntroSection />

      {/* H2 — Affordable Packages */}
      <PackagesSection />

      {/* H3 — Complete Services */}
      <ServicesSection />

      {/* H4 — Explore Wildlife */}
      <ExploreSection />
      <Footer />
    </main>
  );
};

export default SundarbanTourPackageFromKolkata;
