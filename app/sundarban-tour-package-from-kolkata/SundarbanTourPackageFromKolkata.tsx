"use client";

import { useEffect } from "react";
import AOS from "aos";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

import { SundarbanHeroSection } from "@/components/sundarban-tour-package-from-kolkata/HeroSection";
import { IntroSection } from "@/components/sundarban-tour-package-from-kolkata/IntroSection";
import { PackagesSection } from "@/components/sundarban-tour-package-from-kolkata/PackagesSection";
import { ServicesSection } from "@/components/sundarban-tour-package-from-kolkata/ServicesSection";
import { ExploreSection } from "@/components/sundarban-tour-package-from-kolkata/ExploreSection";
import { Heart, Users, Award, Coins, GraduationCap, Briefcase, ShieldCheck, Anchor, Utensils, Car, FileText, Hotel } from "lucide-react";

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

      <PageHeader
        title="Sundarban Tour Package from Kolkata"
        subtitle="Book a relaxing Sundarban tour package from Kolkata with hotel stay, boat safari, and food included."
        backgroundImage="/assets/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp"
      />

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

      {/* How to Choose section */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container">
          <div className="space-y-6">
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
              How to Choose the Right Sundarban Package for Your Travel Style
            </h2>
            <p className="text-muted-foreground max-w-3xl text-sm md:text-base">
              The ideal Sundarban package depends heavily on who you travel with. Find the style that perfectly fits your group:
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Couples & Romantic Getaways</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy private river cruises, candle-light deck dinners, and cozy luxury resorts designed for memorable moments.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Family Friendly Packages</h3>
                <p className="text-sm text-muted-foreground">
                  Well-paced itineraries with premium secure resorts, low-walking sightseeing points, and comfort for kids and seniors.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Luxury Stays</h3>
                <p className="text-sm text-muted-foreground">
                  Features premium air-conditioned hotel suites, private boat cruises, customizable food, and highly experienced personal guides.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Budget-Friendly Delta Tours</h3>
                <p className="text-sm text-muted-foreground">
                  Shared boat excursions and cozy local eco-cottages offering an authentic experience at optimized shared prices.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Students & Academics</h3>
                <p className="text-sm text-muted-foreground">
                  Educational excursions exploring mangrove biosphere habitats, local delta ecosystems, and historic village cultures.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Corporate Retreats</h3>
                <p className="text-sm text-muted-foreground">
                  Quick weekend team-building packages with group activities, resort conference halls, and optimized travel times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Things to Confirm section */}
      <section className="py-10 md:py-16 bg-muted">
        <div className="container">
          <div className="space-y-6">
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
              Things You Should Confirm Before Booking Any Sundarban Tour Package
            </h2>
            <p className="text-muted-foreground max-w-3xl text-sm md:text-base">
              Ensure a seamless delta safari experience by verifying these critical details with your travel operator before booking:
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Hotel & Resort Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Confirm clean rooms, private bathrooms, running water, electricity power backup, and location convenience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Anchor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Safari Boat Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    Verify the boat holds safety licenses, features life jackets, is spacious, and offers a clean washroom.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Meal Customizations</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure all daily meals (breakfast, lunch, snacks, dinner) are fully covered and dietary preferences are accommodated.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Pickup & Transit Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Double-check if pick-up is direct from Kolkata hubs (Science City, Howrah) and what vehicle type is assigned.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Forest Permits & Entry</h3>
                  <p className="text-sm text-muted-foreground">
                    Permits, forest check-point fees, guide charges, and entry permissions must be included in the baseline package.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Refund & Booking Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    Read the guidelines on date modifications, weather cancellation policies, and transparent advance payment models.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SundarbanTourPackageFromKolkata;
