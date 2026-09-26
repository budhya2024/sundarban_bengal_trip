import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { SonarBanglaResortContent } from "@/components/sundarban-sonar-bangla-resort-package-west-bengal/SonarBanglaResortContent";

export const metadata: Metadata = {
  title: "Sundarban Sonar Bangla Resort Package | Best Luxury Stay",
  description:
    "Book Sundarban Sonar Bangla Resort Package in West Bengal with Sundarban Bengal Trip. Enjoy 5-star comfort, luxury stay, river view rooms & exclusive safari.",
  keywords: [
    "Sundarban Sonar Bangla Resort Package in West Bengal",
    "Sonar Bangla resort booking",
    "Sundarban tour package from Kolkata",
    "sundarbanbengaltrip resort offers",
    "luxury resort in Sundarban",
    "Hotel Sonar Bangla Sundarban",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/sundarban-sonar-bangla-resort-package-west-bengal",
  },
  openGraph: {
    title: "Sundarban Sonar Bangla Resort Package | Best Luxury Stay",
    description:
      "Book Sundarban Sonar Bangla Resort Package in West Bengal with Sundarban Bengal Trip. Enjoy 5-star comfort, luxury stay, river view rooms & exclusive safari.",
    url: "https://sundarbanbengaltrip.com/sundarban-sonar-bangla-resort-package-west-bengal",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/sonarbanglahotel.jpg",
        width: 1200,
        height: 630,
        alt: "Sundarban Sonar Bangla Resort Package in West Bengal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundarban Sonar Bangla Resort Package | Best Luxury Stay",
    description:
      "Book Sundarban Sonar Bangla Resort Package in West Bengal with Sundarban Bengal Trip. Enjoy 5-star comfort, luxury stay, river view rooms & exclusive safari.",
    images: ["/assets/sonarbanglahotel.jpg"],
  },
};

export default function SundarbanSonarBanglaResortPackagePage() {
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Sundarban Sonar Bangla Resort Package in West Bengal",
    "image": "https://sundarbanbengaltrip.com/assets/sonarbanglahotel.jpg",
    "description":
      "Experience luxury stay, 5-star comfort, and exclusive boat safari with the Sundarban Sonar Bangla Resort Package in West Bengal by Sundarban Bengal Trip.",
    "brand": {
      "@type": "Brand",
      "name": "Sundarban Bengal Trip",
    },
    "offers": {
      "@type": "AggregateOffer",
      "url":
        "https://sundarbanbengaltrip.com/sundarban-sonar-bangla-resort-package-west-bengal",
      "priceCurrency": "INR",
      "lowPrice": "9999",
      "highPrice": "25000",
      "offerCount": "5",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "124",
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
          title="Sundarban Sonar Bangla Resort Package in West Bengal"
          subtitle="Your Dream Holiday — 5-star comforts, luxury river view suites, swimming pool, and mangrove safaris with sundarbanbengaltrip."
          backgroundImage="/assets/sonarbanglahotel.jpg"
        />

        <SonarBanglaResortContent />
      </main>

      <Footer />
    </>
  );
}
