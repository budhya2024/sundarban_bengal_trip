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
  );
}
