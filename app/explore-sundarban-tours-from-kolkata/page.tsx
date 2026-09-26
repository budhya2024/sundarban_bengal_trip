import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ExploreKolkataToursContent } from "@/components/explore-sundarban-tours-from-kolkata/ExploreKolkataToursContent";

export const metadata: Metadata = {
  title: "Explore Sundarban Tours with sundarbanbengaltrip from Kolkata",
  description:
    "Book the best Sundarban tours from Kolkata with sundarbanbengaltrip. Enjoy safe boat safaris, expert local guides, custom itineraries, and authentic Bengali food.",
  keywords: [
    "Explore Sundarban Tours with sundarbanbengaltrip from Kolkata",
    "sundarbanbengaltrip holiday packages",
    "Sundarban tour package from Kolkata",
    "trusted tour operator Kolkata",
    "Sundarban boat safari",
    "best Sundarban travel agency",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/explore-sundarban-tours-from-kolkata",
  },
  openGraph: {
    title: "Explore Sundarban Tours with sundarbanbengaltrip from Kolkata",
    description:
      "Book the best Sundarban tours from Kolkata with sundarbanbengaltrip. Enjoy safe boat safaris, expert local guides, custom itineraries, and authentic Bengali food.",
    url: "https://sundarbanbengaltrip.com/explore-sundarban-tours-from-kolkata",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
        width: 1200,
        height: 630,
        alt: "Explore Sundarban Tours with sundarbanbengaltrip from Kolkata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Sundarban Tours with sundarbanbengaltrip from Kolkata",
    description:
      "Book the best Sundarban tours from Kolkata with sundarbanbengaltrip. Enjoy safe boat safaris, expert local guides, custom itineraries, and authentic Bengali food.",
    images: ["/assets/sundarban-river-boating-with-mangrove-forest-.jpg"],
  },
};

export default function ExploreSundarbanToursFromKolkataPage() {
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "TravelAgency",
    "name": "Sundarban Bengal Trip",
    "url": "https://sundarbanbengaltrip.com/",
    "image":
      "https://sundarbanbengaltrip.com/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
    "description":
      "Explore Sundarban Tours with sundarbanbengaltrip from Kolkata. Experience safe river safaris, expert local guides, and customized holiday packages.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "addressCountry": "IN",
    },
    "priceRange": "₹₹",
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
          title="Explore Sundarban Tours with sundarbanbengaltrip from Kolkata"
          subtitle="Your Trusted Guide — safe river boat safaris, expert naturalist guides, customized itineraries, and authentic Bengali dining."
          backgroundImage="/assets/sundarban-river-boating-with-mangrove-forest-.jpg"
        />

        <ExploreKolkataToursContent />
      </main>

      <Footer />
    </>
  );
}
