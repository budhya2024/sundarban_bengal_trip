import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { NationalParkContent } from "@/components/sundarban-national-park-tour/NationalParkContent";

export const metadata: Metadata = {
  title: "Sundarban National Park Tour – Boat Safaris, Mangroves & Wildlife Experience",
  description:
    "Explore the UNESCO World Heritage Sundarban National Park. Enjoy thrilling boat safaris, Royal Bengal Tiger sightings, mangrove waterways, and watchtowers with Sundarban Bengal Trip.",
  keywords: [
    "Sundarban National Park Tour",
    "Sundarban jungle safari",
    "Sundarban boat safari",
    "Royal Bengal Tiger Sundarban",
    "Sundarban wildlife tour",
    "Sundarban National Park permits",
  ],
  alternates: {
    canonical: "https://sundarbanbengaltrip.com/sundarban-national-park-tour",
  },
  openGraph: {
    title: "Sundarban National Park Tour – Wildlife, Mangrove Forests & Boat Safaris",
    description:
      "Explore the UNESCO World Heritage Sundarban National Park with boat safaris, Royal Bengal Tiger spotting, and dense mangrove channels.",
    url: "https://sundarbanbengaltrip.com/sundarban-national-park-tour",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/royel-bengal-tiger.webp",
        width: 1200,
        height: 630,
        alt: "Sundarban National Park Tour",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundarban National Park Tour – Wildlife, Mangrove Forests & Boat Safaris",
    description:
      "Explore the UNESCO World Heritage Sundarban National Park with boat safaris, Royal Bengal Tiger spotting, and dense mangrove channels.",
    images: ["/assets/royel-bengal-tiger.webp"],
  },
};

export default function SundarbanNationalParkTourPage() {
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
                  "https://sundarbanbengaltrip.com/sundarban-national-park-tour/#webpage",
                "url":
                  "https://sundarbanbengaltrip.com/sundarban-national-park-tour",
                "name": "Sundarban National Park Tour",
                "headline":
                  "Sundarban National Park Tour – Experience Wildlife, Mangrove Forests, Boat Safaris & the Wild Side of Bengal",
                "description":
                  "A comprehensive guide and tour package to the UNESCO World Heritage Sundarban National Park in West Bengal.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website",
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization",
                },
                "breadcrumb": {
                  "@id":
                    "https://sundarbanbengaltrip.com/sundarban-national-park-tour/#breadcrumb",
                },
              },
              {
                "@type": "TouristDestination",
                "@id":
                  "https://sundarbanbengaltrip.com/sundarban-national-park-tour/#destination",
                "name": "Sundarban National Park",
                "description":
                  "UNESCO World Heritage Site and tiger reserve in West Bengal famous for tidal mangrove rivers and the Royal Bengal Tiger.",
              },
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://sundarbanbengaltrip.com/sundarban-national-park-tour/#breadcrumb",
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
                    "name": "Sundarban National Park Tour",
                    "item":
                      "https://sundarbanbengaltrip.com/sundarban-national-park-tour",
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
          title="Sundarban National Park Tour"
          subtitle="Experience wildlife, mangrove forests, boat safaris & the wild side of Bengal with Sundarban Bengal Trip."
          backgroundImage="/assets/group-tour-sundarban copy.jpeg"
        />

        <NationalParkContent />
      </main>

      <Footer />
    </>
  );
}
