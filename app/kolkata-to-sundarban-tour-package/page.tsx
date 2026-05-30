import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PackageHero } from "@/components/kolkata-to-sundarban-tour-package/PackageHero";
import { JourneyHighlights } from "@/components/kolkata-to-sundarban-tour-package/JourneyHighlights";
import { BookingContact } from "@/components/kolkata-to-sundarban-tour-package/BookingContact";

export const metadata: Metadata = {
  title: "Kolkata to Sundarban Tour Package | Best Sundarban Tour from Kolkata",
  description:
    "Book the best Kolkata to Sundarban Tour Package with comfortable travel, sightseeing, wildlife experiences, boat safari, accommodation, and expert guides. Enjoy a memorable Sundarban trip from Kolkata.",
  keywords: [
    "Kolkata to Sundarban Tour Package",
    "Sundarban Tour from Kolkata",
    "Sundarban Travel Package",
    "Sundarban Boat Safari",
    "Sundarban Wildlife Tour",
    "Sundarban Holiday Package",
    "Sundarban Trip Booking",
    "Sundarban Tourism",
    "Weekend Tour Sundarban",
    "Sundarban Tour Cost",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package",
  },
  openGraph: {
    title:
      "Kolkata to Sundarban Tour Package | Best Sundarban Tour from Kolkata",
    description:
      "Book the best Kolkata to Sundarban Tour Package with comfortable travel, sightseeing, wildlife experiences, boat safari, accommodation, and expert guides.",
    url: "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/sundarban-tour.jpg",
        width: 1200,
        height: 630,
        alt: "Kolkata to Sundarban Tour",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Kolkata to Sundarban Tour Package | Best Sundarban Tour from Kolkata",
    description:
      "Book the best Kolkata to Sundarban Tour Package with comfortable travel, sightseeing, wildlife experiences, boat safari, accommodation, and expert guides.",
    images: ["/assets/sundarban-tour.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <PageHeader
          title="Kolkata to Sundarban Tour Package"
          subtitle="Going to the worlds mangrove forest is very exciting. Our Kolkata to Sundarban Tour Package is made to make your trip easy and fun from the start. We pick you up from Science City, Howrah or Sealdah wherever you want. The Kolkata to Sundarban Tour Package takes care of everything."
          backgroundImage="/assets/house-boat.jpeg"
        />

        <PackageHero />

        <section className="bg-muted">
          <JourneyHighlights />
        </section>

        <section className="bg-background">
          <BookingContact />
        </section>
      </main>
      <Footer />
    </>
  );
}
