import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BestTourContent } from "@/components/best-sundarban-tour-in-2026/BestTourContent";

export const metadata: Metadata = {
  title: "Best Sundarban Tour in 2026 – Premium Stay, Food & Jungle Safari",
  description:
    "Plan your wilderness holiday with the best Sundarban tour in 2026. Enjoy luxury eco-resorts, authentic Bengali meals, Kolkata pickup, and guided boat safaris with Sundarban Bengal Trip.",
  keywords: [
    "Best Sundarban Tour in 2026",
    "Sundarban 2 Nights 3 Days Tour",
    "Sundarban tour packages from Kolkata",
    "luxury Sundarban tour",
    "Sundarban resort and safari",
    "all-inclusive Sundarban package 2026",
  ],
  alternates: {
    canonical: "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026",
  },
  openGraph: {
    title: "Best Sundarban Tour in 2026 – Premium Stay, Food & Jungle Safari",
    description:
      "Plan your wilderness holiday with the best Sundarban tour in 2026. Luxury eco-resorts, Bengali delicacies, Kolkata pickup, and private boat safaris.",
    url: "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/bestsundarbantourpackage.jpeg",
        width: 1200,
        height: 630,
        alt: "Best Sundarban Tour in 2026",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Sundarban Tour in 2026 – Premium Stay, Food & Jungle Safari",
    description:
      "Plan your wilderness holiday with the best Sundarban tour in 2026. Luxury eco-resorts, Bengali delicacies, Kolkata pickup, and private boat safaris.",
    images: ["/assets/bestsundarbantourpackage.jpeg"],
  },
};

export default function BestSundarbanTourIn2026Page() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id":
                  "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026/#webpage",
                "url":
                  "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026",
                "name": "Best Sundarban Tour in 2026",
                "headline":
                  "Best Sundarban Tour in 2026 – Plan an Unforgettable Wildlife Holiday with Premium Stay, Food & Jungle Safari",
                "description":
                  "All-inclusive Sundarban tour package for 2026 featuring Kolkata pickup, deluxe eco-resort stays, fresh Bengali cuisine, and private boat safaris.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website",
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization",
                },
                "breadcrumb": {
                  "@id":
                    "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026/#breadcrumb",
                },
              },
              {
                "@type": "TouristTrip",
                "@id":
                  "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026/#touristtrip",
                "name": "Sundarban 2 Nights 3 Days Tour 2026",
                "description":
                  "2 Nights 3 Days balanced tour package featuring river cruise, Baul music, deep forest boat safari, watchtowers, and heritage bungalow tours.",
                "touristType": ["Eco Tourists", "Wildlife Enthusiasts", "Families", "Groups"],
              },
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://sundarbanbengaltrip.com/",
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Best Sundarban Tour in 2026",
                    "item":
                      "https://sundarbanbengaltrip.com/best-sundarban-tour-in-2026",
                  },
                ],
              },
            ],
          }),
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <PageHeader
          title="Best Sundarban Tour in 2026"
          subtitle="Plan an unforgettable wildlife holiday with premium stay, food & jungle safari with Sundarban Bengal Trip."
          backgroundImage="/assets/bestsundarbantourpackage.jpeg"
        />

        <BestTourContent />
      </main>

      <Footer />
    </>
  );
}
