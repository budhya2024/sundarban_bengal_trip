import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { LuxuryTourContent } from "@/components/sundarban-luxury-hotel-tour-package-in-west-bengal/LuxuryTourContent";

export const metadata: Metadata = {
  title: "Sundarban Luxury Hotel Tour Package in West Bengal | sundarbanbengaltrip",
  description:
    "Experience the ultimate wilderness with our Sundarban luxury hotel tour package in West Bengal. Enjoy 5-star hospitality, VIP safaris & stay at Hotel Sonar Bangla with sundarbanbengaltrip. Book now!",
  keywords: [
    "Sundarban luxury hotel tour package in West Bengal",
    "Luxury Sundarban tour",
    "Sundarban tour package from Kolkata",
    "sundarbanbengaltrip luxury stay",
    "Hotel Sonar Bangla Sundarban",
    "Sundarban VIP safari",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/sundarban-luxury-hotel-tour-package-in-west-bengal",
  },
  openGraph: {
    title: "Sundarban Luxury Hotel Tour Package in West Bengal | sundarbanbengaltrip",
    description:
      "Experience the ultimate wilderness with our Sundarban luxury hotel tour package in West Bengal. Enjoy 5-star hospitality, VIP safaris & stay at Hotel Sonar Bangla with sundarbanbengaltrip.",
    url: "https://sundarbanbengaltrip.com/sundarban-luxury-hotel-tour-package-in-west-bengal",
    siteName: "sundarbanbengaltrip",
    images: [
      {
        url: "/assets/sonarbanglahotel.jpg",
        width: 1200,
        height: 630,
        alt: "Sundarban Luxury Hotel Tour Package in West Bengal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundarban Luxury Hotel Tour Package in West Bengal | sundarbanbengaltrip",
    description:
      "Experience the ultimate wilderness with our Sundarban luxury hotel tour package in West Bengal. Enjoy 5-star hospitality, VIP safaris & stay at Hotel Sonar Bangla with sundarbanbengaltrip.",
    images: ["/assets/sonarbanglahotel.jpg"],
  },
};

export default function SundarbanLuxuryHotelTourPackagePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://sundarbanbengaltrip.com/#organization",
        "name": "sundarbanbengaltrip",
        "url": "https://sundarbanbengaltrip.com/",
        "logo": "https://sundarbanbengaltrip.com/assets/logo.png",
        "image": "https://sundarbanbengaltrip.com/assets/sonarbanglahotel.jpg",
        "description":
          "Leading tour operator in West Bengal offering exclusive Sundarban luxury hotel tour packages, VIP safaris, and premium stays.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "addressCountry": "IN",
        },
        "telephone": "+91-7586889519",
        "priceRange": "₹₹₹",
      },
      {
        "@type": "TouristTrip",
        "@id": "https://sundarbanbengaltrip.com/#trip",
        "name": "Sundarban Luxury Hotel Tour Package in West Bengal",
        "description":
          "Experience the ultimate wilderness with our Sundarban luxury hotel tour package in West Bengal. Enjoy 5-star hospitality, VIP safaris, and premium stay at Hotel Sonar Bangla with sundarbanbengaltrip. Special winter discounts available now!",
        "provider": {
          "@id": "https://sundarbanbengaltrip.com/#organization",
        },
        "touristType": ["Couple", "Family", "Luxury Travelers"],
        "image": "https://sundarbanbengaltrip.com/assets/sonarbanglahotel.jpg",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": "12000",
          "highPrice": "25000",
          "offerCount": "3",
          "availability": "https://schema.org/InStock",
          "url": "https://sundarbanbengaltrip.com/sundarban-luxury-hotel-tour-package-in-west-bengal",
          "description":
            "Book early to grab exclusive seasonal discounts and complimentary VIP watchtower passes on luxury packages.",
        },
        "itinerary": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "Trip",
              "name":
                "Day 1: Luxury pickup from Kolkata, smooth transfer, check-in at Hotel Sonar Bangla, and evening cultural program.",
            },
            {
              "@type": "Trip",
              "name":
                "Day 2: Exclusive VIP Boat Safari through mangrove creeks, Sajnekhali, Sudhanyakhali, and Do Banki Canopy Walk.",
            },
            {
              "@type": "Trip",
              "name":
                "Day 3: Premium breakfast at resort, wildlife photography, and comfortable return journey to Kolkata.",
            },
          ],
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "180",
          "bestRating": "5",
          "worstRating": "1",
        },
      },
    ],
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
          title="Sundarban Luxury Hotel Tour Package in West Bengal"
          subtitle="Ultimate Comfort & Nature — 5-star hospitality, luxury river suites at Hotel Sonar Bangla, and exclusive VIP boat safaris with sundarbanbengaltrip."
          backgroundImage="/assets/sonarbanglahotel.jpg"
        />

        <LuxuryTourContent />
      </main>

      <Footer />
    </>
  );
}
