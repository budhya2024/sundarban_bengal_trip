import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import CheapPackageContent from "@/components/cheap-sundarban-tour-package/CheapPackageContent";

export const metadata: Metadata = {
  title: "Cheap Sundarban Tour Package from Kolkata | Budget-Friendly Sundarban Trips",
  description:
    "Looking for a Cheap Sundarban Tour Package from Kolkata? Explore affordable Sundarban tour packages with boat safari, accommodation, meals, sightseeing, and guided experiences at budget-friendly prices.",
  keywords: [
    "Cheap Sundarban Tour Package from Kolkata",
    "Budget Sundarban Tour Package",
    "Affordable Sundarban Tour from Kolkata",
  ],
  alternates: {
    canonical: "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata",
  },
};

export default function CheapPackagePage() {
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
                "@id": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata/#webpage",
                "url": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata",
                "name": "Cheap Sundarban Tour Package From Kolkata",
                "headline": "Affordable Cheap Sundarban Tour Package From Kolkata",
                "description": "Budget friendly Sundarban tour packages from Kolkata including boat safari, meals, sightseeing and resort stay at affordable prices.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website"
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "breadcrumb": {
                  "@id": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata/#breadcrumb"
                }
              },
              {
                "@type": "TouristTrip",
                "@id": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata/#trip",
                "name": "Cheap Sundarban Tour Package From Kolkata",
                "description": "Affordable Sundarban package with budget resort stay, meals, sightseeing and boat safari for travelers from Kolkata.",
                "touristType": [
                  "Budget Travelers",
                  "Couples",
                  "Families",
                  "Students"
                ],
                "image": [
                  "https://sundarbanbengaltrip.com/assets/og-image.png"
                ],
                "provider": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "1499",
                  "url": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata"
                }
              },
              {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "143"
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Soumik Roy"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Very affordable Sundarban trip with excellent food, clean rooms and enjoyable boat safari."
              },
              {
                "@type": "FAQPage",
                "@id": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is the cheapest Sundarban package price?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Cheap Sundarban tour packages usually start from ₹1499 per person."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is food included in the cheap package?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, meals and sightseeing are included in most budget Sundarban packages."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the package safe for families?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, guided travel support and verified accommodations are provided for family travelers."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata/#breadcrumb",
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
                    "name": "Cheap Sundarban Tour Package From Kolkata",
                    "item": "https://sundarbanbengaltrip.com/cheap-sundarban-tour-package-from-kolkata"
                  }
                ]
              },
              {
                "@type": "ImageObject",
                "contentUrl": "https://sundarbanbengaltrip.com/assets/og-image.png",
                "name": "Cheap Sundarban Tour Package",
                "description": "Affordable Sundarban travel package with boat safari and resort stay."
              }
            ]
          })
        }}
      />
      <main className="min-h-screen bg-background">
        <Navbar />

        <PageHeader
          title="Cheap Sundarban Tour Package from Kolkata"
          subtitle="Affordable shared boat packages, budget hotel stays, and smart group tours for travelers from Kolkata."
          backgroundImage="/assets/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp"
        />

        <CheapPackageContent />

        <Footer />
      </main>
    </>
  );
}
