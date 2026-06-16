import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { CostBody } from "@/components/sundarban-tour-cost/CostBody";


export const metadata: Metadata = {
  title: "Sundarban Tour Cost from Kolkata | Affordable Packages & Price Guide",
  description:
    "Discover the latest Sundarban Tour Cost from Kolkata with budget, standard, and luxury package options. Compare prices, inclusions, travel plans, accommodation, boat safari, and booking details for a memorable Sundarban trip.",
  keywords: [
    "Sundarban Tour Cost from Kolkata",
    "Kolkata to Sundarban Tour Cost",
    "Sundarban Package Cost",
    "Sundarban Tour Price",
    "Sundarban Travel Cost",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata",
  },
  openGraph: {
    title:
      "Sundarban Tour Cost from Kolkata | Affordable Packages & Price Guide",
    description:
      "Discover the latest Sundarban Tour Cost from Kolkata with budget, standard, and luxury package options. Compare prices, inclusions, travel plans, accommodation, boat safari, and booking details for a memorable Sundarban trip.",
    url: "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/howrah-bridge-howrah-west-bengal-city-1-hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Sundarban Tour Cost from Kolkata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sundarban Tour Cost from Kolkata | Affordable Packages & Price Guide",
    description:
      "Discover the latest Sundarban Tour Cost from Kolkata with budget, standard, and luxury package options. Compare prices, inclusions, travel plans, accommodation, boat safari, and booking details for a memorable Sundarban trip.",
    images: ["/assets/howrah-bridge-howrah-west-bengal-city-1-hero.jpeg"],
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
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata/#webpage",
                "url": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata",
                "name": "Sundarban Tour Cost From Kolkata",
                "headline": "Updated Sundarban Tour Cost From Kolkata 2026",
                "description": "Check updated Sundarban tour package prices from Kolkata including budget, premium and family package costs with boat safari and resort stay.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website"
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "breadcrumb": {
                  "@id": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata/#breadcrumb"
                }
              },
              {
                "@type": "Article",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata/#article",
                "headline": "Sundarban Tour Cost From Kolkata",
                "description": "Detailed guide about Sundarban package pricing, budget tours, premium stays and package inclusions from Kolkata.",
                "author": {
                  "@type": "Organization",
                  "name": "Sundarban Bengal Trip"
                },
                "publisher": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "mainEntityOfPage": {
                  "@id": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata/#webpage"
                }
              },
              {
                "@type": "Offer",
                "priceCurrency": "INR",
                "lowPrice": "1499",
                "highPrice": "5999",
                "offerCount": "5",
                "url": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata"
              },
              {
                "@type": "FAQPage",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is the average Sundarban tour cost from Kolkata?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sundarban tour packages from Kolkata generally start from ₹1499 depending on package type and duration."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why do Sundarban package prices vary?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Package prices vary based on resort quality, boat type, travel season and tour duration."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is food included in the package cost?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, most Sundarban packages include meals, sightseeing and boat safari."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://sundarbanbengaltrip.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Sundarban Tour Cost From Kolkata",
                    "item": "https://sundarbanbengaltrip.com/sundarban-tour-cost-from-kolkata"
                  }
                ]
              },
              {
                "@type": "ImageObject",
                "contentUrl": "https://sundarbanbengaltrip.com/assets/og-image.png",
                "name": "Sundarban Tour Cost Guide",
                "description": "Affordable Sundarban tour packages from Kolkata."
              }
            ]
          })
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <PageHeader
          title="Sundarban Tour Cost from Kolkata"
          subtitle="Complete package price guide for budget, family and luxury travelers with hotel, food, boat safari, and season-based pricing."
          backgroundImage="/assets/howrah-bridge-howrah-west-bengal-city-1-hero.jpeg"
        />
        <CostBody />

      </main>

      <Footer />
    </>
  );
}
