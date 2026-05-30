"use client";

import { useEffect } from "react";
import AOS from "aos";

import { Navbar } from "@/components/Navbar";
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


      {/* Intro */}
      <IntroSection />

      {/* Packages */}
      <PackagesSection />

      {/* Services */}
      <ServicesSection />

      {/* Explore */}
      <ExploreSection />

      <Footer />
    </main>
  );
};

export default SundarbanTourPackageFromKolkata;
