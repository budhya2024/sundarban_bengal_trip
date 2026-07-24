import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PackageHero } from "@/components/kolkata-to-sundarban-tour-package/PackageHero";
import { JourneyHighlights } from "@/components/kolkata-to-sundarban-tour-package/JourneyHighlights";
import { BookingContact } from "@/components/kolkata-to-sundarban-tour-package/BookingContact";
import { Car, Train, Bus, Users, Plane, MapPin, Clock } from "lucide-react";

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

        {/* Transportation Options Section */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container">
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
                Transportation Options from Kolkata to Sundarban
              </h2>
              <p className="text-muted-foreground max-w-3xl text-sm md:text-base">
                Getting to Godhkhali Ghat (the gateway to the Sundarbans) from Kolkata can be done in several ways. Choose the transport option that best fits your budget and convenience:
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Private Car / Cab</h3>
                  <p className="text-sm text-muted-foreground">
                    Offers maximum luxury and doorstep pickup straight to Godhkhali Ghat. It is the fastest route but comes with premium pricing.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Train className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Local Train</h3>
                  <p className="text-sm text-muted-foreground">
                    A highly budget-friendly way. Board a train from Sealdah to Canning, then hire a local auto or shared toto to reach Godhkhali Ghat.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Bus className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Public Bus</h3>
                  <p className="text-sm text-muted-foreground">
                    Budget-conscious travellers can easily board buses heading towards Basanti or Godhkhali directly from Esplanade or Science City.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Shared Agency Van</h3>
                  <p className="text-sm text-muted-foreground">
                    Pre-booked AC/Non-AC travel vans organized by the agency. Offers comfortable journeys at highly optimized shared rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estimated Travel Time Section */}
        <section className="py-10 md:py-16 bg-muted">
          <div className="container">
            <div className="space-y-6">
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
                Estimated Travel Time from Different Parts of Kolkata
              </h2>
              <p className="text-muted-foreground max-w-3xl text-sm md:text-base">
                All land transit routes from Kolkata lead to Godhkhali Ghat (approx. 85–100 km), where your mangrove boat safari begins. Here is the estimated travel time from key hubs:
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Kolkata Airport (CCU)</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>3.5 to 4 Hours</strong><br />
                      Best traveled via the Eastern Metropolitan Bypass and Basanti Highway.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Howrah Station</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>3.5 to 4 Hours</strong><br />
                      Routes navigate through the Maa Flyover and connect to the highway.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Sealdah Station</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>3 to 3.5 Hours</strong> by road, or 1.5 hours by Canning local train + 1 hour road transfer.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-border/30 bg-card shadow-sm hover:shadow-md transition duration-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Salt Lake & New Town</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>3 to 3.5 Hours</strong><br />
                      Enjoys swift direct access via the EM Bypass and Basanti Highway.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background">
          <BookingContact />
        </section>
      </main>
      <Footer />
    </>
  );
}
