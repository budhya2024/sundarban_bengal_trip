"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const PaymentPolicy = () => {
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
        title="Payment Policy"
        subtitle="Understand our cancellation and refund policies before making your booking."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">

          {/*  NOTES CARD (NEW ADDED) */}
          <div
            data-aos="fade-up"
            className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-border"
          >
            <div className="bg-gradient-to-b from-[#0f5a4a] to-[#062f28] text-white p-6 md:p-8">

              <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6">
                Notes
              </h2>

              <ul className="space-y-4 text-sm md:text-base leading-6">

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Payment should be made in INR as per exchange rate on the day of payment.
                  </p>
                </li>

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Rate changes: Be aware that rates are subject to change without prior notice.
                  </p>
                </li>

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Rooms/seats Availability: Rooms and seats depend on availability at the time of booking. Note that drivers are not guides.
                  </p>
                </li>

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Service confirmations: Confirmations of hotels and other services depend on availability.
                  </p>
                </li>

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Early check-In/Late check-Out: subject to availability.
                  </p>
                </li>

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Itinerary changes: Keep in mind that itineraries may be subject to change.
                  </p>
                </li>

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Cancellation charges: Applicable as per the company's policy.
                  </p>
                </li>

                <li className="flex gap-3">
                  <span>🔔</span>
                  <p>
                    Hotel Alternatives: If the mentioned hotel is unavailable, a similar category hotel will be provided. Any cost changes will be advised.
                  </p>
                </li>

              </ul>
            </div>
          </div>

          {/* EXISTING CONTENT */}
          <div
            data-aos="fade-up"
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground"
          >
            <h2>Cancellation by Customer</h2>
            <p>
              We understand plans can change. Our Payment Policy is as follows:
            </p>

            <div className="bg-muted p-6 rounded-xl my-6">
              <h3 className="text-foreground mt-0">Cancellation Charges</h3>
              <ul className="mb-0">
                <li>
                  <strong>30+ days before departure:</strong> 10% of total cost
                </li>
                <li>
                  <strong>15-29 days before departure:</strong> 25% of total cost
                </li>
                <li>
                  <strong>7-14 days before departure:</strong> 50% of total cost
                </li>
                <li>
                  <strong>Less than 7 days before departure:</strong> 100% (No refund)
                </li>
              </ul>
            </div>

            <h2>Cancellation by Sundarban Bengal Trips</h2>
            <p>We reserve the right to cancel tours due to:</p>
            <ul>
              <li>Insufficient participants</li>
              <li>Adverse weather conditions</li>
              <li>Government restrictions</li>
              <li>Natural disasters</li>
            </ul>

            <p>In such cases, customers will receive:</p>
            <ul>
              <li>Full refund OR</li>
              <li>Option to reschedule</li>
            </ul>

            <h2>Refund Process</h2>
            <ul>
              <li>Card: 7-10 days</li>
              <li>Bank: 5-7 days</li>
              <li>UPI: 3-5 days</li>
            </ul>

            <h2>Rescheduling Policy</h2>
            <ul>
              <li>15+ days: Free</li>
              <li>7-14 days: ₹500 fee</li>
              <li>Less than 7 days: Treated as cancellation</li>
            </ul>

            <h2>No-Show Policy</h2>
            <p>No refund if not informed.</p>

            <h2>Travel Insurance</h2>
            <p>Recommended for safety.</p>

            <h2>Contact</h2>
            <p>
              Email: sundarbanbengaltrip@gmail.com <br />
              Phone: +917074432628
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: January 2026
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PaymentPolicy;