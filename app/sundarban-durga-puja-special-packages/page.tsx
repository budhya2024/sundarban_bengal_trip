import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import DurgaPujaLanding from "@/components/durga-puja/DurgaPujaLanding";

export const metadata: Metadata = {
  title: "Sundarban Durga Puja Special Packages 2026 – ৩ দিন ২ রাত পুজো স্পেশাল ট্যুর",
  description:
    "এই দুর্গাপূজায় সুন্দরবন ভ্রমণের বিশেষ প্যাকেজ। ৩ দিন ২ রাত অল-ইনক্লুসিভ প্যাকেজ, কলকাতা থেকে পিক-আপ, এসি রিসোর্ট, খাঁটি বাঙালি খাবার ও বোট সাফারি।",
  keywords: [
    "Sundarban Durga Puja Special Packages",
    "Sundarban Durga Puja Tour Package",
    "Durga Puja Sundarban Tour 2026",
    "সুন্দরবন দুর্গাপূজা প্যাকেজ",
    "Kolkata to Sundarban Durga Puja Tour",
    "Sundarban Puja Special 3 Days 2 Nights",
  ],
  alternates: {
    canonical: "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages",
  },
  openGraph: {
    title: "Sundarban Durga Puja Special Packages 2026 – ৩ দিন ২ রাত পুজো স্পেশাল ট্যুর",
    description:
      "এই দুর্গাপূজায় সুন্দরবন ভ্রমণের বিশেষ প্যাকেজ। ৩ দিন ২ রাত অল-ইনক্লুসিভ প্যাকেজ, কলকাতা থেকে পিক-আপ, এসি রিসোর্ট, খাঁটি বাঙালি খাবার ও বোট সাফারি।",
    url: "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/durgpuja-banner.png",
        width: 1200,
        height: 630,
        alt: "Sundarban Durga Puja Special Packages",
      },
    ],
    locale: "bn_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundarban Durga Puja Special Packages 2026 – ৩ দিন ২ রাত পুজো স্পেশাল ট্যুর",
    description:
      "এই দুর্গাপূজায় সুন্দরবন ভ্রমণের বিশেষ প্যাকেজ। ৩ দিন ২ রাত অল-ইনক্লুসিভ প্যাকেজ, কলকাতা থেকে পিক-আপ, এসি রিসোর্ট, খাঁটি বাঙালি খাবার ও বোট সাফারি।",
    images: ["/assets/durgpuja-banner.png"],
  },
};

export default function SundarbanDurgaPujaSpecialPackagesPage() {
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
                  "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages/#webpage",
                "url":
                  "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages",
                "name": "Sundarban Durga Puja Special Packages",
                "headline":
                  "Sundarban Durga Puja Special Packages – ৩ দিন ২ রাতের সম্পূর্ণ ট্যুর প্ল্যান",
                "description":
                  "এই দুর্গাপূজায় সুন্দরবন ভ্রমণের বিশেষ প্যাকেজ। কলকাতা থেকে যাতায়াত, এসি রিসোর্ট, খাঁটি বাঙালি খাবার ও বোট সাফারি।",
                "inLanguage": "bn-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website",
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization",
                },
                "breadcrumb": {
                  "@id":
                    "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages/#breadcrumb",
                },
              },
              {
                "@type": "TouristTrip",
                "@id":
                  "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages/#touristtrip",
                "name": "Sundarban Durga Puja Special Tour (3 Days 2 Nights)",
                "description":
                  "৩ দিন ২ রাতের বিশেষ দুর্গাপূজা সুন্দরবন প্যাকেজ।",
                "touristType": ["Families", "Couples", "Groups", "Eco Tourists"],
              },
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages/#breadcrumb",
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
                    "name": "Sundarban Durga Puja Special Packages",
                    "item":
                      "https://sundarbanbengaltrip.com/sundarban-durga-puja-special-packages",
                  },
                ],
              },
            ],
          }),
        }}
      />

      <Navbar />

      <main className="min-h-screen">
        <DurgaPujaLanding />
      </main>

      <Footer />
    </>
  );
}
