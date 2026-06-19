import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";

export const metadata = {
  title: "Website Sitemap - Sundarban Bengal Trip",
  description: "Explore all pages, Sundarban tour packages, travel guides, gallery, and important information from Sundarban Bengal Trip.",
};

const SitemapPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-muted">
      <Navbar />

      <PageHeader
        title="Website Sitemap"
        subtitle="Explore all pages, Sundarban tour packages, travel guides, gallery, and important information from Sundarban Bengal Trip."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      <section className="bg-muted py-10 md:py-16 px-4 flex-grow">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Pages */}
            <div className="bg-card rounded-2xl shadow-soft p-8 border border-border">
              <h2 className="text-2xl font-bold text-primary mb-6 font-display">
                Main Pages
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Packages */}
            <div className="bg-card rounded-2xl shadow-soft p-8 border border-border">
              <h2 className="text-2xl font-bold text-primary mb-6 font-display">
                Tour Packages
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/packages/1-day-in-sundarban" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    1 Day In Sundarban
                  </Link>
                </li>
                <li>
                  <Link href="/packages/sundarban-1-night-2-days-tour" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Sundarban 1 Night 2 Days Tour
                  </Link>
                </li>
                <li>
                  <Link href="/packages/sundarban-2-night-3-days-tour" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Sundarban 2 Night 3 Days Tour
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Pages */}
            <div className="bg-card rounded-2xl shadow-soft p-8 border border-border">
              <h2 className="text-2xl font-bold text-primary mb-6 font-display">
                Popular Tour Pages
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/sundarban-tour-package-from-kolkata" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Sundarban Tour Package From Kolkata
                  </Link>
                </li>
                <li>
                  <Link href="/kolkata-to-sundarban-tour-package" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Kolkata To Sundarban Tour Package
                  </Link>
                </li>
                <li>
                  <Link href="/cheap-sundarban-tour-package-from-kolkata" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Cheap Sundarban Tour Package From Kolkata
                  </Link>
                </li>
                <li>
                  <Link href="/sundarban-tour-cost-from-kolkata" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Sundarban Tour Cost From Kolkata
                  </Link>
                </li>
                <li>
                  <Link href="/sundarban-1-night-2-days-package-from-kolkata" className="text-primary hover:text-secondary font-semibold transition-colors duration-200">
                    Sundarban 1 Night 2 Days Package From Kolkata
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SitemapPage;
