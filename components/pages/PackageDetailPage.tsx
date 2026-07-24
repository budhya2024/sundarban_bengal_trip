"use client";

import { use, useEffect } from "react";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PopularPackagesSection } from "@/components/PopularPackagesSection";
import { Button } from "@/components/ui/button";
import {
  Check,
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
} from "lucide-react";
import Link from "next/link";
import { PackageValues } from "@/schemas/package.schema";
import { BookingModal } from "../BookingModal";
import { FaCarSide } from "react-icons/fa6";
import { cn } from "@/lib/utils";

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

          <div className="grid lg:grid-cols-3 gap-12">
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

              {/* Includes/Excludes */}
              <div data-aos="fade-up" className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {data.inclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        {item.value}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {data.exclusions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="w-4 h-4 flex items-center justify-center text-destructive">
                          ×
                        </span>
                        {item.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Package-specific sections for 1 night 2 days tour */}
              {data.key === "sundarban-1-night-2-days-tour" && (
                <div className="space-y-10 border-t border-border/50 pt-10">
                  {/* FAQs */}
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Frequently Asked Questions Before Booking This Package
                    </h2>
                    <div className="space-y-4">
                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">Q: Will I get mobile network coverage during the Sundarban tour?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A: Yes, major networks like Jio and Airtel work decently in main inhabited islands like Gosaba and Pakhiralay, though signal gets weak or drops completely during deep river safaris inside the core forest area.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">Q: Can I charge my phone, camera, and power bank during the boat safari?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A: Yes, tourist boats feature charging points powered by onboard generators, though it’s wise to carry a fully charged power bank just in case.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">Q: Are there ATMs nearby, or should I carry cash?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A: You should carry sufficient cash. ATMs are only available in Canning or Gosaba town, and online payment modes may fail due to weak mobile connectivity.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">Q: Is electricity available 24/7 at the resort?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A: Yes, standard resorts provide 24/7 power, often backed by generators, though some eco-cottages conserve energy during the late night hours.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">Q: Is this tour suitable for kids and senior citizens?</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A: Yes, it is a very manageable, relaxed tour. The boat cruises are safe, and walking is minimal at all sightseeing points.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Packing Checklist */}
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Packing Checklist for Your Sundarban Trip
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                      To make your journey from Kolkata to Sundarban comfortable and hassle-free, make sure to pack these travel essentials:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-card shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Valid ID Proof (Aadhaar/Voter ID)</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-card shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Sunscreen lotion & Sunglasses</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-card shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Essential medicines & first-aid kit</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-card shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Comfortable walking shoes</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-card shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Light raincoat or Umbrella</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-card shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Portable Power bank</span>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl border border-border/30 bg-card shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-foreground">Sufficient cash (limited ATMs)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Package-specific sections for 1 Day Tour */}
              {(data.key === "1-day-in-sundarban" || data.key === "sundarban-1-day-tour") && (
                <div className="space-y-10 border-t border-border/50 pt-10">
                  {/* Is it worth it */}
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Is a One-Day Sundarban Trip Worth It?
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      A one-day trip is ideal for quick weekenders or travelers on tight schedules like students, corporate workers, freelancers, and teachers. Here is what you should expect from a 1-day itinerary:
                    </p>

                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">Who It Is Suitable For</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Best suited for busy professionals, students, and tourists who want to experience the iconic mangroves but cannot commit to an overnight stay.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">What You Will Cover</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Cruising through main rivers, visiting Sajnekhali Watchtower, spotting wildlife like crocodiles, monitor lizards, and exotic birds.
                        </p>
                      </div>

                      <div className="p-5 rounded-xl border border-border/30 bg-card">
                        <h4 className="font-semibold text-foreground mb-2">What You Will Miss</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Due to travel time, you will miss deep forest safaris (Dobanki/Sudhanyakhali Watchtowers) and the peaceful evening resort/island culture.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* How to Make the Most */}
                  <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      How to Make the Most of Your One-Day Sundarban Tour
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                      With limited hours, optimizing your schedule is key. Follow these expert recommendations to get the best experience:
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="flex gap-3 p-4 rounded-xl border border-border/30 bg-card">
                        <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">Early Departure (5:00 AM)</h4>
                          <p className="text-xs text-muted-foreground">Start early from Kolkata to beat traffic and maximize your daylight cruise hours.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-4 rounded-xl border border-border/30 bg-card">
                        <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">Opt for Boat Deck Seating</h4>
                          <p className="text-xs text-muted-foreground">Sit on the upper deck of the boat safari for panoramic views and faster wildlife spotting.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-4 rounded-xl border border-border/30 bg-card">
                        <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">Pre-Book Express Safari</h4>
                          <p className="text-xs text-muted-foreground">Arrange fast-moving safari boats through your tour provider to cover distances quickly.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-4 rounded-xl border border-border/30 bg-card">
                        <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">Wildlife Photography Prep</h4>
                          <p className="text-xs text-muted-foreground">Keep zoom lenses and camera setups handy on the deck as animal sightings happen fast.</p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-4 rounded-xl border border-border/30 bg-card">
                        <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">Pack Compact & Smart</h4>
                          <p className="text-xs text-muted-foreground">Bring a small daypack with essentials only: ID proof, power bank, sunscreen, and cash.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div
                className="bg-card rounded-2xl p-6 shadow-elevated sticky top-24"
                data-aos="fade-left"
              >
                {/* <div className="text-center mb-6">
                  <span className="text-muted-foreground">Starting from</span>
                  <div className="font-display text-4xl font-bold text-primary">
                    {data.price}
                  </div>
                  <span className="text-muted-foreground">per person</span>
                </div> */}

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>Daily departures available</span>
                  </div>
                  {/* <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>{data.groupSize}</span>
                  </div> */}
                </div>

                <BookingModal packageName={data.packageName} />
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/contact">Contact for Custom Tour</Link>
                </Button>
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
