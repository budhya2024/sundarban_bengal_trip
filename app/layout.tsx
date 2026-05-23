import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import "swiper/css";
import "aos/dist/aos.css";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SocialSidebar } from "@/components/SocialSidebar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import TanstackProvider from "@/components/TanstackProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sundarbanbengaltrip.com"),

  title: {
    default: "Sundarban Bengal Trip",
    template: "%s | Sundarban Bengal Trip",
  },

  description:
    "Sundarban Bengal Trip is a trusted Sundarban tour operator offering jungle safari, boat tours, hotel booking, wildlife exploration, and customized Sundarban travel packages from Kolkata.",

  keywords: [
    "Sundarban trip",
    "Sundarban tour package",
    "Sundarban safari",
    "Sundarban travel",
    "Sundarban tour from Kolkata",
    "Sundarban package",
    "Sundarban jungle safari",
    "boat tour Sundarban",
    "West Bengal tourism",
    "Sundarban Bengal Trip",
  ],

  authors: [{ name: "Sundarban Bengal Trip" }],

  creator: "Sundarban Bengal Trip",

  publisher: "Sundarban Bengal Trip",

  verification: {
    google: "9FSJi5A2SrAH1tthKLUgyO-cWycSEtKTlZYHJrO0qHY",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Sundarban Bengal Trip",
    description:
      "Book Sundarban tour packages with wildlife safari, boat rides, and hotel stays.",
    url: "https://sundarbanbengaltrip.com/",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sundarban Bengal Trip",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sundarban Bengal Trip",
    description:
      "Best Sundarban travel packages with safari and boat experience.",
    images: ["/assets/og-image.png"],
  },

  category: "travel",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Local Business + Travel Agency Schema */}
        <Script
          id="travel-agency-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "@id": "https://sundarbanbengaltrip.com/#business",

              name: "Sundarban Bengal Trip",

              url: "https://sundarbanbengaltrip.com/",

              logo:
                "https://sundarbanbengaltrip.com/wp-content/uploads/logo.png",

              image:
                "https://sundarbanbengaltrip.com/wp-content/uploads/banner.jpg",

              description:
                "Sundarban Bengal Trip is a trusted Sundarban tour operator offering jungle safari, boat tours, hotel booking, wildlife exploration, and customized Sundarban travel packages from Kolkata.",

              telephone: "+91 70744 32628",

              email: "sundarbanbengaltrip@gmail.com",

              priceRange: "₹₹",

              address: {
                "@type": "PostalAddress",
                streetAddress: "5R82+296, Nath Para, Gosaba, Arampur",
                addressLocality: "South 24 Parganas",
                addressRegion: "West Bengal",
                postalCode: "743370",
                addressCountry: "IN",
              },

              geo: {
                "@type": "GeoCoordinates",
                latitude: "22.1650",
                longitude: "88.8080",
              },

              areaServed: [
                {
                  "@type": "City",
                  name: "Kolkata",
                },
                {
                  "@type": "Place",
                  name: "Sundarban",
                },
              ],

              sameAs: [
                "https://www.facebook.com/profile.php?id=61588168291064",
                "https://www.instagram.com/sundarbanbengaltrip/",
              ],

              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "08:00",
                  closes: "22:00",
                },
              ],

              hasMap:
                "https://maps.google.com/?q=5R82+296+Nath+Para+Gosaba+Arampur+West+Bengal+743370",

              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 70744 32628",
                contactType: "customer support",
                areaServed: "IN",
                availableLanguage: ["English", "Bengali", "Hindi"],
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MY4XY10BKQ"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-MY4XY10BKQ');
          `}
        </Script>

        <TanstackProvider>
          <TooltipProvider>
            <Sonner />

            <ScrollToTop />

            <SocialSidebar />

            <ScrollToTopButton />

            {children}
          </TooltipProvider>
        </TanstackProvider>

        <Toaster />
      </body>
    </html>
  );
}