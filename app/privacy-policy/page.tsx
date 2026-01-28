"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            data-aos="fade-up"
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground"
          >
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, make a booking, or contact us for support.
              This may include:
            </p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Billing and payment information</li>
              <li>Travel preferences and booking history</li>
              <li>Communications with our team</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and confirm your bookings</li>
              <li>Send you booking confirmations and travel updates</li>
              <li>Provide customer support</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our services and user experience</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              necessary to:
            </p>
            <ul>
              <li>
                Complete your booking with tour operators and accommodation
                providers
              </li>
              <li>Comply with legal obligations</li>
              <li>Protect our rights and safety</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the Internet is 100% secure.
            </p>

            <h2>Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience, analyze site
              traffic, and personalize content. You can control cookie
              preferences through your browser settings.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p>
              Email: privacy@sundarbantours.com
              <br />
              Phone: +91 98765 43210
              <br />
              Address: 123 Forest Road, Canning, South 24 Parganas, West Bengal
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
