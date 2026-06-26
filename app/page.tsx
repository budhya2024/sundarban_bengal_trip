"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomeSettingsValues } from "@/schemas/homeSettings.schema";
import { getHomeSettings } from "@/app/actions/home.actions";
import { HeroSection } from "@/components/home/HeroSection";
import { BookingForm } from "@/components/home/BookingForm";
import { AboutSection } from "@/components/home/WhyChooseSection";
import { ExploreSundarbanSection } from "@/components/home/ExploreSundarbanSection";
import { TourPackagesSection } from "@/components/home/TourPackagesSection";
import { GallerySection } from "@/components/home/GallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { BlogSection } from "@/components/home/BlogSection";
import { ContactSection } from "@/components/home/ContactSection";
import { CTASection } from "@/components/home/CTASection";
import HotelSwiper from "@/components/home/HotelSwiper";
import HotelMenu from "@/components/home/HotelMenu";
import { HeroSlider } from "@/components/home/HeroSlider";
import TravelExperience from "@/components/home/TravelExperience";
import TrustSection from "@/components/home/TrustSection";

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
      <TrustSection />
      <BookingForm />
      <TourPackagesSection />
      <TravelExperience />
      <HotelMenu />
      <AboutSection />
      <ExploreSundarbanSection />

      <GallerySection />
      <HotelSwiper />
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
