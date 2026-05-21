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
  metadataBase: new URL("https://sundarbanbengaltrip.com/"),

  title: {
    default: "Sundarban Bengal Trip",
    template: "%s | Sundarban Bengal Trip",
  },

  description:
    "Explore Sundarban Bengal Trip packages with wildlife safari, boat tours, and hotel booking.",

  keywords: [
    "Sundarban trip",
    "Sundarban tour package",
    "Sundarban safari",
    "Sundarban travel",
    "West Bengal tourism",
  ],

  authors: [{ name: "Sundarban Bengal Trip" }],

  //  Google verification (your meta tag converted)
  verification: {
    google: "9FSJi5A2SrAH1tthKLUgyO-cWycSEtKTlZYHJrO0qHY",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Sundarban Bengal Trip",
    description:
      "Book Sundarban tour packages with wildlife safari, boat rides, and hotel stays.",
    url: "https://sundarbanbengaltrip.com/",
    siteName: "Sundarban Bengal Trip",
    images: [
      {
        url: "/assets/og-image.png", //
        width: 1200,
        height: 630,
        alt: "Sundarban Tour",
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

  icons: {
    icon: "/favicon.ico",
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
        {/*  Schema Markup (SEO boost) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Sundarban Bengal Trip",
              url: "https://sundarbanbengaltrip.com/",
              logo: "https://sundarbanbengaltrip.com//assets/og-image.png",
              description:
                "Best Sundarban tour packages with safari and travel services.",
              address: {
                "@type": "PostalAddress",
                addressRegion: "West Bengal",
                addressCountry: "India",
              },
            }),
          }}
        />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MY4XY10BKQ"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
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
