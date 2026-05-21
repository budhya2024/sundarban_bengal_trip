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
  return <SundarbanTourPackageFromKolkata />;
}