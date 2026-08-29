import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PlacesContent } from "@/components/places-to-visit-in-sundarban/PlacesContent";

export const metadata: Metadata = {
  title: "Places to Visit in Sundarban – Tourist Attractions, Watchtowers & Wildlife Spots",
  description:
    "Explore the best places to visit in Sundarban. Discover Bhagabatpur Crocodile Sanctuary, Netidhopani temple ruins, Dobanki canopy walk, watchtowers, and Sajnekhali Wildlife Sanctuary with Sundarban Bengal Trip.",
  keywords: [
    "Places to Visit in Sundarban",
    "Sundarban Tourist Places",
    "Sundarban Watch Towers",
    "Sajnekhali Wildlife Sanctuary",
    "Dobanki Canopy Walk",
    "Sudhanyakhali Watch Tower",
    "Sundarban Attractions",
  ],
  alternates: {
    canonical: "https://sundarbanbengaltrip.com/places-to-visit-in-sundarban",
  },
  openGraph: {
    title: "Places to Visit in Sundarban – Explore Beautiful Tourist Attractions & Watchtowers",
    description:
      "Discover the best places to visit in Sundarban: mangrove estuaries, Bhagabatpur, Netidhopani, Dobanki canopy walk, and wildlife watchtowers.",
    url: "https://sundarbanbengaltrip.com/places-to-visit-in-sundarban",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
        width: 1200,
        height: 630,
        alt: "Places to Visit in Sundarban",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Places to Visit in Sundarban – Explore Beautiful Tourist Attractions & Watchtowers",
    description:
      "Discover the best places to visit in Sundarban: mangrove estuaries, Bhagabatpur, Netidhopani, Dobanki canopy walk, and wildlife watchtowers.",
    images: ["/assets/sundarban-river-boating-with-mangrove-forest-.jpg"],
  },
};

export default function PlacesToVisitPage() {
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
                "@id": "https://sundarbanbengaltrip.com/places-to-visit-in-sundarban/#webpage",
                "url": "https://sundarbanbengaltrip.com/places-to-visit-in-sundarban",
                "name": "Places to Visit in Sundarban",
                "headline":
                  "Places to Visit in Sundarban – Explore the Most Beautiful Tourist Attractions, Watchtowers & Wildlife Spots",
                "description":
                  "Discover the top tourist attractions, watchtowers, and wildlife spots across the Sundarbans mangrove ecosystem.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website",
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization",
                },
                "breadcrumb": {
                  "@id":
                    "https://sundarbanbengaltrip.com/places-to-visit-in-sundarban/#breadcrumb",
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://sundarbanbengaltrip.com/places-to-visit-in-sundarban/#breadcrumb",
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
                    "name": "Places to Visit in Sundarban",
                    "item":
                      "https://sundarbanbengaltrip.com/places-to-visit-in-sundarban",
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
          title="Places to Visit in Sundarban"
          subtitle="Explore the most beautiful tourist attractions, watchtowers, and wildlife spots in the Sundarbans with Sundarban Bengal Trip."
          backgroundImage="/assets/house-boat.jpeg"
        />

        <PlacesContent />
      </main>

      <Footer />
    </>
  );
}
