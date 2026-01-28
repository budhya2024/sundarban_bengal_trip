"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BookingForm } from "@/components/BookingForm";
import { AboutSection } from "@/components/AboutSection";
import { ExploreSundarbanSection } from "@/components/ExploreSundarbanSection";
import { TourPackagesSection } from "@/components/TourPackagesSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BookingForm />
      <AboutSection />
      <ExploreSundarbanSection />
      <TourPackagesSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <BlogSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
