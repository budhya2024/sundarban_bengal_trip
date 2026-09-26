import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { WinterTourContent } from "@/components/sundarban-winter-season-tour-from-kolkata/WinterTourContent";

export const metadata: Metadata = {
  title:
    "Sundarban Winter Season Tour from Kolkata | Best Winter Safari Packages",
  description:
    "Book your Sundarban Winter Season Tour from Kolkata. Witness Royal Bengal Tigers basking in the sun, spot migratory birds, enjoy campfires, and secure safe boat safaris with Sundarban Bengal Trip.",
  keywords: [
    "Sundarban Winter Season Tour from Kolkata",
    "Sundarban winter trip from Kolkata",
    "Sundarban tour package from Kolkata",
    "sundarbanbengaltrip winter safari",
    "winter wildlife Sundarban",
    "best time to visit Sundarban",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/sundarban-winter-season-tour-from-kolkata",
  },
  openGraph: {
    title:
      "Sundarban Winter Season Tour from Kolkata | Best Winter Safari Packages",
    description:
      "Book your Sundarban Winter Season Tour from Kolkata. Witness Royal Bengal Tigers basking in the sun, spot migratory birds, enjoy campfires, and secure safe boat safaris with Sundarban Bengal Trip.",
    url: "https://sundarbanbengaltrip.com/sundarban-winter-season-tour-from-kolkata",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
        width: 1200,
        height: 630,
        alt: "Sundarban Winter Season Tour from Kolkata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sundarban Winter Season Tour from Kolkata | Best Winter Safari Packages",
    description:
      "Book your Sundarban Winter Season Tour from Kolkata. Witness Royal Bengal Tigers basking in the sun, spot migratory birds, enjoy campfires, and secure safe boat safaris with Sundarban Bengal Trip.",
    images: ["/assets/sundarban-river-boating-with-mangrove-forest-.jpg"],
  },
};

export default function SundarbanWinterSeasonTourFromKolkataPage() {
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "TouristTrip",
    "name": "Sundarban Winter Season Tour from Kolkata",
    "description":
      "Experience the best winter wildlife safari in Sundarbans. Spot Royal Bengal Tigers, crocodiles, and migratory birds with warm hospitality and safe transport from Kolkata.",
    "image":
      "https://sundarbanbengaltrip.com/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
    "provider": {
      "@type": "TravelAgency",
      "name": "Sundarban Bengal Trip",
      "url": "https://sundarbanbengaltrip.com/",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "8500",
      "priceValidUntil": "2027-03-31",
      "availability": "https://schema.org/InStock",
      "url":
        "https://sundarbanbengaltrip.com/sundarban-winter-season-tour-from-kolkata/",
    },
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <PageHeader
          title="Sundarban Winter Season Tour from Kolkata"
          subtitle="Witness the Wild in Cold Breeze — basking Royal Bengal Tigers, sunbathing crocodiles, migratory birds, and cozy winter campfires."
          backgroundImage="/assets/sundarban-river-boating-with-mangrove-forest-.jpg"
        />

        <WinterTourContent />
      </main>

      <Footer />
    </>
  );
}
