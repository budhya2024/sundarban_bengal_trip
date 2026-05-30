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
