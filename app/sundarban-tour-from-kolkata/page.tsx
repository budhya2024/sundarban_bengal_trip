import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PackageHero } from "@/components/sundarban-tour-from-kolkata/PackageHero";
import { JourneyHighlights } from "@/components/sundarban-tour-from-kolkata/JourneyHighlights";
import { TravelServices } from "@/components/sundarban-tour-from-kolkata/TravelServices";
import { BookingContact } from "@/components/sundarban-tour-from-kolkata/BookingContact";

export const metadata: Metadata = {
  title: "Sundarban Tour From Kolkata for an Unforgettable Journey",
  description:
    "Plan your Sundarban tour from Kolkata and experience wildlife, river cruises, mangrove forests, and a refreshing nature-filled escape.",
  keywords: [
    "Sundarban Tour From Kolkata",
    "Sundarban Travel Package",
    "Kolkata to Sundarban Tour",
    "Sundarban Wildlife Tour",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata",
  },
  openGraph: {
    title: "Sundarban Tour From Kolkata for an Unforgettable Journey",
    description:
      "Plan your Sundarban tour from Kolkata and experience wildlife, river cruises, mangrove forests, and a refreshing nature-filled escape.",
    url: "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/house-boat.jpeg",
        width: 1200,
        height: 630,
        alt: "Sundarban Tour from Kolkata",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sundarban Tour From Kolkata for an Unforgettable Journey",
    description:
      "Plan your Sundarban tour from Kolkata and experience wildlife, river cruises, mangrove forests, and a refreshing nature-filled escape.",
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
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata/#webpage",
                "url": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata",
                "name": "Sundarban Tour From Kolkata",
                "headline": "Sundarban Tour From Kolkata for an Unforgettable Journey",
                "description": "Plan your Sundarban tour from Kolkata and experience wildlife, river cruises, mangrove forests, and a refreshing nature-filled escape.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website"
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "breadcrumb": {
                  "@id": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata/#breadcrumb"
                }
              },
              {
                "@type": "TravelAgency",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata/#travelagency",
                "name": "Sundarban Bengal Trip",
                "url": "https://sundarbanbengaltrip.com/",
                "description": "Professional travel agency offering Sundarban tour packages with pickup, sightseeing and boat safari from Kolkata.",
                "telephone": "+91-7074432628",
                "email": "sundarbanbengaltrip@gmail.com",
                "areaServed": {
                  "@type": "City",
                  "name": "Kolkata"
                },
                "sameAs": [
                  "https://www.instagram.com/sundarbanbengaltrip/",
                  "https://www.facebook.com/profile.php?id=61588168291064"
                ]
              },
              {
                "@type": "TouristTrip",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata/#trip",
                "name": "Sundarban Tour From Kolkata for an Unforgettable Journey",
                "description": "Complete Sundarban travel package from Kolkata including pickup, transport, boat safari, meals and resort stay.",
                "image": [
                  "https://sundarbanbengaltrip.com/assets/og-image.png"
                ],
                "touristType": [
                  "Families",
                  "Couples",
                  "Adventure Travelers",
                  "Weekend Travelers"
                ],
                "itinerary": [
                  "Pickup from Kolkata and transfer to Godkhali",
                  "Boat safari and sightseeing in Sundarban",
                  "Resort stay with meals and cultural program",
                  "Return journey to Kolkata"
                ],
                "provider": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "1599",
                  "url": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata"
                }
              },
              {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "172"
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Rohan Gupta"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Excellent planning of Sundarban trip from Kolkata. Beautiful boat safari and tasty Bengali dishes."
              },
              {
                "@type": "FAQPage",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is pickup available from Kolkata?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our packages include pickup and drop from any destination in Kolkata."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are the major attractions covered?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We cover Sajnekhali Watch Tower, Dobanki Canopy Walk, Sudhanyakhali Watch Tower, Pakhiralay, and various river routes inside the mangrove forest."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How can I book the tour?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You can contact us via phone at +91 70744 32628 or email at sundarbanbengaltrip@gmail.com to book your customized Sundarban tour."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata/#breadcrumb",
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
                    "name": "Sundarban Tour From Kolkata",
                    "item": "https://sundarbanbengaltrip.com/sundarban-tour-from-kolkata"
                  }
                ]
              },
              {
                "@type": "ImageObject",
                "contentUrl": "https://sundarbanbengaltrip.com/assets/og-image.png",
                "name": "Sundarban Tour From Kolkata",
                "description": "Plan your Sundarban tour from Kolkata with boat safari and resort stay."
              }
            ]
          })
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <PageHeader
          title="Sundarban Tour from Kolkata"
          subtitle="Are you looking for the most affordable and best Sundarban tour package from Kolkata? Then you had already visited the most professional and right place - Sundarban Bengal Trip. We will professionally and neatly plan your whole Sundarban trip from Kolkata."
          backgroundImage="/assets/house-boat.jpeg"
        />

        <PackageHero />

        <JourneyHighlights />

        <TravelServices />

        <BookingContact />
      </main>
      <Footer />
    </>
  );
}
