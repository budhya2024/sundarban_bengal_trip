"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PopularPackagesSection } from "@/components/PopularPackagesSection";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Clock,
  Users,
  MapPin,
  Calendar,
  Star,
  ArrowLeft,
  Car,
  Coffee,
  CupSoda,
  Moon,
  Utensils,
  Info,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { PackageValues } from "@/schemas/package.schema";
import { BookingModal } from "../BookingModal";
import { FaCarSide } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { TourGallerySlider } from "@/components/TourGallerySlider";

const PackageDetailsPage = ({
  data,
}: {
  data: (PackageValues & { key: string }) | null;
}) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, [data]);

  if (!data) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="font-display text-4xl font-bold mb-4 text-foreground">
            Package Not Found
          </h1>
          <Button variant="hero" asChild>
            <Link href="/packages">View All Packages</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        backgroundImage={data.heroImage}
      />

      <section className="py-16 bg-background">
        <div className="container">
          {/* Back Link */}
          <Link
            href="/packages"
            data-aos="fade-right"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Packages
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div data-aos="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Overview
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Summary Box */}
              <div
                data-aos="fade-up"
                className="bg-card border-l-4 border-primary p-6 rounded-r-xl shadow-soft"
              >
                <p className="text-foreground leading-relaxed">{data.note}</p>
              </div>

              {/* Quick Info */}
              <div
                data-aos="fade-up"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <p className="font-semibold text-foreground">
                    {data.duration}
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <FaCarSide className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Pickup & Drop
                  </span>
                  <p className="font-semibold text-foreground">
                    {/* {data.groupSize} */}
                    kolkata & Caning
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <MapPin className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Location
                  </span>
                  <p className="font-semibold text-foreground text-sm">
                    {data.location}
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <p className="font-semibold text-foreground">{data.rating}</p>
                </div>
              </div>

              {/* Menu Details*/}
              {/* Menu Details*/}
              <div data-aos="fade-up" className="space-y-8">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Menu Details
                </h2>
                {data.menu && data.menu.length > 0 ? (
                  <div className="space-y-8">
                    {data.menu.map((dayMenu, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-primary pl-6"
                      >
                        <h3 className="font-display text-xl font-bold text-foreground mb-4">
                          {dayMenu.dayTitle}
                        </h3>

                        <div className="space-y-4">
                          {[
                            { label: "Breakfast", value: dayMenu.breakfast },
                            { label: "Lunch", value: dayMenu.lunch },
                            { label: "Evening Snacks", value: dayMenu.eveningSnacks },
                            { label: "Dinner", value: dayMenu.dinner },
                          ]
                            .filter((meal) => meal.value)
                            .map((meal, mealIdx) => (
                              <div key={mealIdx} className="space-y-1">
                                <span className="text-sm font-semibold text-secondary">
                                  {meal.label}
                                </span>
                                <p className="text-muted-foreground leading-relaxed">
                                  {meal.value}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic text-sm">
                    No structured menu details available.
                  </p>
                )}
              </div>

              {/* Tour Timeline */}
              <div data-aos="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Tour Timeline
                </h2>
                <div className="space-y-8">
                  {data.timeline.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="border-l-4 border-primary pl-6"
                    >
                      <h3 className="font-display text-xl font-bold text-foreground mb-4">
                        {day.dayTitle}
                      </h3>
                      <div className="space-y-6">
                        {day?.events.map((activity, actIndex) => (
                          <div key={actIndex} className="space-y-1">
                            <span className="text-sm font-semibold text-secondary">
                              {activity.time}
                            </span>
                            <h4 className="font-semibold text-foreground">
                              {activity.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div data-aos="fade-up">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  What's Included
                </h3>
                <div className="bg-card border border-border p-6 shadow-soft">
                  <ul className="space-y-3">
                    {data.inclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground"
                      >
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* What's Not Included */}
              <div data-aos="fade-up">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  What's Not Included
                </h3>
                <div className="bg-card border border-border p-6 shadow-soft">
                  <ul className="space-y-3">
                    {data.exclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Things to Carry */}
              <div data-aos="fade-up">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Things to Carry
                </h3>
                <div className="bg-card border border-border p-6 shadow-soft space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Specific Medicine If You Need.",
                      "Must carry valid id proof during travel",
                      "Foreigners must carry their original passport",
                      "Camera / binoculars if you want to view distant animal & landscape",
                      "Light baggage that is easy to carry",
                      "Comfortable footwear",
                      "Carry sunglasses / hat cap / sun tan lotions to avoid sun-burn",
                      "Preferably Carry Cash As Possibility of Accessing ATM Is tough.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-border/60 pt-3.5 flex items-start gap-2.5 text-xs md:text-sm text-muted-foreground">
                    <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground font-medium">Important ATM Notice:</strong> Only SBI ATM Is Available At Gosaba. Please carry sufficient cash for local expenses.
                    </span>
                  </div>
                </div>
              </div>

              {/* Child Policy */}
              <div data-aos="fade-up" className="space-y-4">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Child Policy
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Card 1: Below 5 Years - Green */}
                  <div className="bg-card border-2 border-green-600 p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm md:text-base font-semibold text-green-600">
                        Below 5 Years
                      </span>
                      <span className="text-sm md:text-base font-bold text-green-600">
                        Free
                      </span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                      Complimentary Stay
                    </h4>
                    <p className="text-sm  text-muted-foreground leading-relaxed">
                      Free of charge when sharing bed and seating with parents.
                    </p>
                  </div>

                  {/* Card 2: 5 to 8 Years - Orange */}
                  <div className="bg-card border-2 border-orange-500 p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm md:text-base font-semibold text-orange-500">
                        5 to 8 Years
                      </span>
                      <span className="text-sm md:text-base font-bold text-orange-500">
                        50% Charge
                      </span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                      Half Package Cost
                    </h4>
                    <p className="text-sm  text-muted-foreground leading-relaxed">
                      Charged at 50% rate with dedicated seat and meals included.
                    </p>
                  </div>

                  {/* Card 3: 9+ Years - Red */}
                  <div className="bg-card border-2 border-red-500 p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm md:text-base font-semibold text-red-500">
                        9+ Years
                      </span>
                      <span className="text-sm md:text-base font-bold text-red-500">
                        Full Charge
                      </span>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-foreground mb-1.5">
                      Full Adult Rate
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Considered as adult guest with separate bed and full services.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/40 px-4 py-2.5 border border-border text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    Please carry valid age proof (Birth Certificate or Aadhaar Card) for children during the tour.
                  </span>
                </div>
              </div>

              {/* Important Note */}
              <div data-aos="fade-up">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Important Note
                </h3>
                <div className="bg-card border border-border p-6 shadow-soft space-y-3">
                  {[
                    "Itinerary / tour timings may be changed depending on the weather conditions.",
                    "Food menu may be changed due to availability.",
                    "Hotel / rooms may be changed due to availability / technical issues.",
                    "Vehicle / boat may vary due to weather conditions / technical issues concerning the safety of our guests.",
                  ].map((note, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm md:text-base text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div
                className="bg-card rounded-2xl p-6 shadow-elevated sticky top-24"
                data-aos="fade-left"
              >
                <TourGallerySlider />
                {/* <div className="text-center mb-6">
                  <span className="text-muted-foreground">Starting from</span>
                  <div className="font-display text-4xl font-bold text-primary">
                    {data.price}
                  </div>
                  <span className="text-muted-foreground">per person</span>
                </div> */}

                <div className="space-y-4 mb-6">
                  {/* <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>Daily departures available</span>
                  </div> */}
                  {/* <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>{data.groupSize}</span>
                  </div> */}
                </div>
                <div className="flex gap-2 items-center">

                  <BookingModal packageName={data.packageName} />
                  <Button variant="outline" className="w-full text-base h-12" asChild>
                    <Link href="/contact">Custom Tour</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Packages Section */}
      <PopularPackagesSection excludePackage={data.key} />

      <Footer />
    </main>
  );
};

export default PackageDetailsPage;
