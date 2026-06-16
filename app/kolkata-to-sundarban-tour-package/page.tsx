import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PackageHero } from "@/components/kolkata-to-sundarban-tour-package/PackageHero";
import { JourneyHighlights } from "@/components/kolkata-to-sundarban-tour-package/JourneyHighlights";
import { BookingContact } from "@/components/kolkata-to-sundarban-tour-package/BookingContact";

export const metadata: Metadata = {
  title: "Kolkata to Sundarban Tour Package | Best Sundarban Tour from Kolkata",
  description:
    "Book the best Kolkata to Sundarban Tour Package with comfortable travel, sightseeing, wildlife experiences, boat safari, accommodation, and expert guides. Enjoy a memorable Sundarban trip from Kolkata.",
  keywords: [
    "Kolkata to Sundarban Tour Package",
    "Sundarban Tour from Kolkata",
    "Sundarban Travel Package",
    "Sundarban Boat Safari",
    "Sundarban Wildlife Tour",
    "Sundarban Holiday Package",
    "Sundarban Trip Booking",
    "Sundarban Tourism",
    "Weekend Tour Sundarban",
    "Sundarban Tour Cost",
  ],
  alternates: {
    canonical:
      "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package",
  },
  openGraph: {
    title:
      "Kolkata to Sundarban Tour Package | Best Sundarban Tour from Kolkata",
    description:
      "Book the best Kolkata to Sundarban Tour Package with comfortable travel, sightseeing, wildlife experiences, boat safari, accommodation, and expert guides.",
    url: "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/sundarban-tour.jpg",
        width: 1200,
        height: 630,
        alt: "Kolkata to Sundarban Tour",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Kolkata to Sundarban Tour Package | Best Sundarban Tour from Kolkata",
    description:
      "Book the best Kolkata to Sundarban Tour Package with comfortable travel, sightseeing, wildlife experiences, boat safari, accommodation, and expert guides.",
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
                "@id": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package/#webpage",
                "url": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package",
                "name": "Kolkata To Sundarban Tour Package",
                "headline": "Best Kolkata To Sundarban Tour Package With Pickup & Boat Safari",
                "description": "Book affordable Kolkata to Sundarban tour packages with transport, meals, boat safari, resort stay and guided jungle exploration.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@id": "https://sundarbanbengaltrip.com/#website"
                },
                "about": {
                  "@id": "https://sundarbanbengaltrip.com/#organization"
                },
                "breadcrumb": {
                  "@id": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package/#breadcrumb"
                }
              },
              {
                "@type": "TravelAgency",
                "@id": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package/#travelagency",
                "name": "Sundarban Bengal Trip",
                "url": "https://sundarbanbengaltrip.com/",
                "description": "Professional travel agency offering Kolkata to Sundarban tour packages with pickup, sightseeing and boat safari.",
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
                "@id": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package/#trip",
                "name": "Kolkata To Sundarban Tour Package",
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
                  "url": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package"
                }
              },
              {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "168"
              },
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Anik Sen"
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5"
                },
                "reviewBody": "Very comfortable Kolkata to Sundarban journey with excellent boat safari and resort experience."
              },
              {
                "@type": "FAQPage",
                "@id": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package/#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is pickup available from Kolkata?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, pickup services from Kolkata are available for tourists."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How far is Sundarban from Kolkata?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Sundarban is approximately 100 kilometers from Kolkata depending on the route."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is included in the package?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The package includes transport, meals, resort stay, sightseeing and boat safari."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package/#breadcrumb",
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
                    "name": "Kolkata To Sundarban Tour Package",
                    "item": "https://sundarbanbengaltrip.com/kolkata-to-sundarban-tour-package"
                  }
                ]
              },
              {
                "@type": "ImageObject",
                "contentUrl": "https://sundarbanbengaltrip.com/assets/og-image.png",
                "name": "Kolkata To Sundarban Tour",
                "description": "Travel from Kolkata to Sundarban with boat safari and resort stay."
              }
            ]
          })
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <PageHeader
          title="Kolkata to Sundarban Tour Package"
          subtitle="Going to the worlds mangrove forest is very exciting. Our Kolkata to Sundarban Tour Package is made to make your trip easy and fun from the start. We pick you up from Science City, Howrah or Sealdah wherever you want. The Kolkata to Sundarban Tour Package takes care of everything."
          backgroundImage="/assets/house-boat.jpeg"
        />

        <PackageHero />

        <section className="bg-muted">
          <JourneyHighlights />
        </section>

        <section className="bg-background">
          <BookingContact />
        </section>
      </main>
      <Footer />
    </>
  );
}
