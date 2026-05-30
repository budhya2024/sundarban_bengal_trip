import type { Metadata } from "next";
import React from "react";
import SundarbanTourPackageFromKolkata from "@/app/sundarban-tour-package-from-kolkata/SundarbanTourPackageFromKolkata";

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
  return <SundarbanTourPackageFromKolkata />;
}
