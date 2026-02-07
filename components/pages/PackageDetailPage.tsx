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
} from "lucide-react";
import Link from "next/link";
import { PackageValues } from "@/schemas/package.schema";
import { BookingModal } from "../BookingModal";

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
        <div className="container mx-auto px-4">
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
                <p className="text-muted-foreground text-lg leading-relaxed">
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
                  <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Group Size
                  </span>
                  <p className="font-semibold text-foreground">
                    {data.groupSize}
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

              {/* Highlights */}
              <div data-aos="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Highlights
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {data.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {highlight.value}
                      </span>
                    </div>
                  ))}
                </div>
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
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div
                className="bg-card rounded-2xl p-6 shadow-elevated sticky top-24"
                data-aos="fade-left"
              >
                <div className="text-center mb-6">
                  <span className="text-muted-foreground">Starting from</span>
                  <div className="font-display text-4xl font-bold text-primary">
                    {data.price}
                  </div>
                  <span className="text-muted-foreground">per person</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>Daily departures available</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>{data.groupSize}</span>
                  </div>
                </div>

                <BookingModal packageName={data.packageName} />
                <Button variant="outline" className="w-full" asChild>
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
