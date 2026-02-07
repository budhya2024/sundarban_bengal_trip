"use client";

import { useEffect, useState } from "react";
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
import { HomeSettingsValues } from "@/schemas/homeSettings.schema";
import { getHomeSettings } from "@/app/actions/home.actions";

const Index = () => {
  const [homeSetting, setHomeSetting] = useState<HomeSettingsValues | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHomeSettings = async () => {
      setLoading(true);
      const { success, data } = await getHomeSettings();
      if (success && data) {
        setHomeSetting(data);
      }
      setLoading(false);
    };
    fetchHomeSettings();
  }, []);

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
      <TestimonialsSection
        data={homeSetting?.testimonials || []}
        loading={loading}
      />
      <FAQSection data={homeSetting?.faqs || []} loading={loading} />
      <BlogSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
