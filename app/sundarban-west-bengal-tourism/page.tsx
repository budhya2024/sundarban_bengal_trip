import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { TourismContent } from "@/components/sundarban-west-bengal-tourism/TourismContent";

export const metadata: Metadata = {
  title: "Sundarban West Bengal Tourism – Discover Wild Beauty, Mangrove Forests & Unique Experiences",
  description:
    "Explore Sundarban West Bengal Tourism. Discover the wild beauty of mangrove forests, Royal Bengal Tigers, wildlife tours, Kolkata travel, and carefully planned tour packages with Sundarban Bengal Trip.",
  keywords: [
    "Sundarban West Bengal Tourism",
    "Sundarban Tourism West Bengal",
    "Sundarban Tour from Kolkata",
    "Sundarban Wildlife Tour",
    "Sundarban Tour Packages",
  ],
  alternates: {
    canonical: "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism",
  },
  openGraph: {
    title: "Sundarban West Bengal Tourism – Discover Wild Beauty & Mangrove Forests",
    description:
      "Explore Sundarban West Bengal Tourism. Discover the wild beauty of mangrove forests, Royal Bengal Tigers, wildlife tours, and tour packages.",
    url: "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/house-boat.jpeg",
        width: 1200,
        height: 630,
        alt: "Sundarban West Bengal Tourism",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundarban West Bengal Tourism – Discover Wild Beauty & Mangrove Forests",
    description:
      "Explore Sundarban West Bengal Tourism. Discover the wild beauty of mangrove forests, Royal Bengal Tigers, wildlife tours, and tour packages.",
    images: ["/assets/house-boat.jpeg"],
  },
};

export default function Page() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism/#webpage",
                "url": "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism",
                "name": "Sundarban West Bengal Tourism",
                "headline":
                  "Sundarban West Bengal Tourism – Discover the Wild Beauty, Mangrove Forests & Unique Experiences of the Sundarbans",
                "description":
                  "Explore Sundarban West Bengal Tourism with Sundarban Bengal Trip. Discover the Royal Bengal Tiger habitat, mangrove river safaris, Kolkata transport, and curated tour packages.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website",
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization",
                },
                "breadcrumb": {
                  "@id":
                    "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism/#breadcrumb",
                },
              },
              {
                "@type": "TravelAgency",
                "@id": "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism/#travelagency",
                "name": "Sundarban Bengal Trip",
                "url": "https://sundarbanbengaltrip.com/",
                "description":
                  "Professional travel agency offering Sundarban tour packages, boat safari, and travel from Kolkata.",
                "telephone": "+91-7074432628",
                "email": "sundarbanbengaltrip@gmail.com",
                "sameAs": [
                  "https://www.instagram.com/sundarbanbengaltrip/",
                  "https://www.facebook.com/profile.php?id=61588168291064",
                ],
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism/#breadcrumb",
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
                    "name": "Sundarban West Bengal Tourism",
                    "item": "https://sundarbanbengaltrip.com/sundarban-west-bengal-tourism",
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
          title="Sundarban West Bengal Tourism"
          subtitle="Explore the world’s largest mangrove delta, Royal Bengal Tiger safaris, and comfortable jungle tour packages with Sundarban Bengal Trip."
          backgroundImage="/assets/sundarban-beaury.avif"
        />

        <TourismContent />
      </main>

      <Footer />
    </>
  );
}
