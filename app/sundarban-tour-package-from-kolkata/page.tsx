import type { Metadata } from "next";
import SundarbanTourPackageFromKolkata from "./SundarbanTourPackageFromKolkata";


export const metadata: Metadata = {
  title:
    "Sundarban Tour Package From Kolkata With Scenic Stay",

  description:
    "Book a Sundarban tour package from Kolkata for a relaxing wildlife adventure with boat rides, nature views, and memorable travel experiences.",

  keywords: [
    "Sundarban Tour Package From Kolkata",
    "Sundarban Travel Package",
    "Kolkata to Sundarban Tour",
    "Sundarban Holiday Trip",
  ],

  alternates: {
    canonical:
      "https://yourdomain.com/sundarban-tour-package-from-kolkata",
  },

  openGraph: {
    title:
      "Sundarban Tour Package From Kolkata With Scenic Stay",

    description:
      "Enjoy a memorable Sundarban wildlife adventure with scenic boat rides, peaceful stays, and nature experiences.",

    url:
      "https://yourdomain.com/sundarban-tour-package-from-kolkata",

    siteName: "Sundarban Bengal Trip",

    images: [
      {
        url: "/assets/sundarban-tour.jpg",
        width: 1200,
        height: 630,
        alt: "Sundarban Tour Package",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Sundarban Tour Package From Kolkata With Scenic Stay",

    description:
      "Book a relaxing Sundarban wildlife tour from Kolkata with scenic stays and boat rides.",

    images: ["/assets/sundarban-tour.jpg"],
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
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata/#webpage",
                "url": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata",
                "name": "Best Sundarban Tour Package From Kolkata",
                "headline": "Affordable Sundarban Tour Package From Kolkata",
                "description": "Affordable Sundarban tour package from Kolkata including boat safari, meals, resort stay, jungle sightseeing and guided travel experience.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website"
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "breadcrumb": {
                  "@id": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata/#breadcrumb"
                }
              },
              {
                "@type": "TouristTrip",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata/#trip",
                "name": "Sundarban Tour Package From Kolkata",
                "description": "2 days Sundarban package including boat safari, resort stay, local sightseeing, village experience and meals.",
                "image": [
                  "https://sundarbanbengaltrip.com/assets/og-image.png"
                ],
                "touristType": [
                  "Couples",
                  "Families",
                  "Adventure Travelers",
                  "Group Travelers"
                ],
                "itinerary": [
                  "Day 1 - Pickup, boat safari, lunch and resort stay",
                  "Day 2 - Sunrise, village tour and sightseeing"
                ],
                "provider": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "1499",
                  "url": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata"
                }
              },
              {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "187"
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Rahul Das"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Amazing Sundarban travel experience with comfortable stay, tasty food and peaceful boat safari."
              },
              {
                "@type": "FAQPage",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is included in the Sundarban package?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The package includes meals, resort stay, sightseeing, local guide and boat safari."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is pickup available from Kolkata?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, pickup and transport support from Kolkata is available."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is Sundarban safe for family tours?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Sundarban is generally safe for family tours with guided support."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata/#breadcrumb",
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
                    "name": "Sundarban Tour Package From Kolkata",
                    "item": "https://sundarbanbengaltrip.com/sundarban-tour-package-from-kolkata"
                  }
                ]
              },
              {
                "@type": "ImageObject",
                "contentUrl": "https://sundarbanbengaltrip.com/assets/og-image.png",
                "name": "Sundarban Boat Safari",
                "description": "Boat safari experience in Sundarban mangrove forest."
              }
            ]
          })
        }}
      />
      <SundarbanTourPackageFromKolkata />
    </>
  );
}