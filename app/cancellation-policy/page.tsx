"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const CancellationPolicy = () => {
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
        title="Cancellation Policy"
        subtitle="Understand our cancellation and refund policies before making your booking."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            data-aos="fade-up"
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground"
          >
            <h2>Cancellation by Customer</h2>
            <p>
              We understand plans can change. Our cancellation policy is as
              follows:
            </p>

            <div className="bg-muted p-6 rounded-xl my-6">
              <h3 className="text-foreground mt-0">Cancellation Charges</h3>
              <ul className="mb-0">
                <li>
                  <strong>30+ days before departure:</strong> 10% of total cost
                </li>
                <li>
                  <strong>15-29 days before departure:</strong> 25% of total
                  cost
                </li>
                <li>
                  <strong>7-14 days before departure:</strong> 50% of total cost
                </li>
                <li>
                  <strong>Less than 7 days before departure:</strong> 100% (No
                  refund)
                </li>
              </ul>
            </div>

            <h2>Cancellation by Sundarban Bengal Trips</h2>
            <p>We reserve the right to cancel tours due to:</p>
            <ul>
              <li>Insufficient participants (minimum group size not met)</li>
              <li>Adverse weather conditions making travel unsafe</li>
              <li>Government restrictions or forest department closures</li>
              <li>Natural disasters or unforeseen circumstances</li>
            </ul>
            <p>In such cases, customers will receive:</p>
            <ul>
              <li>Full refund of the amount paid, OR</li>
              <li>Option to reschedule to a future date at no extra cost</li>
            </ul>

            <h2>Refund Process</h2>
            <p>Refunds will be processed within:</p>
            <ul>
              <li>
                <strong>Credit/Debit Card:</strong> 7-10 business days
              </li>
              <li>
                <strong>Bank Transfer:</strong> 5-7 business days
              </li>
              <li>
                <strong>UPI:</strong> 3-5 business days
              </li>
            </ul>
            <p>
              Refunds will be made to the original payment method used during
              booking.
            </p>

            <h2>Rescheduling Policy</h2>
            <p>If you wish to reschedule instead of cancel:</p>
            <ul>
              <li>
                <strong>15+ days before departure:</strong> Free rescheduling
                (subject to availability)
              </li>
              <li>
                <strong>7-14 days before departure:</strong> ₹500 rescheduling
                fee
              </li>
              <li>
                <strong>Less than 7 days:</strong> Treated as cancellation + new
                booking
              </li>
            </ul>

            <h2>No-Show Policy</h2>
            <p>
              Failure to arrive at the designated pickup point without prior
              notice will be treated as a cancellation made on the day of
              travel. No refund will be provided.
            </p>

            <h2>Travel Insurance</h2>
            <p>
              We strongly recommend purchasing travel insurance to protect
              against unforeseen cancellations due to personal emergencies,
              medical issues, or other unexpected circumstances.
            </p>

            <h2>How to Cancel</h2>
            <p>To cancel your booking, please contact us:</p>
            <p>
              Email: bookings@sundarbantours.com
              <br />
              Phone: +91 98765 43210
              <br />
              WhatsApp: +91 98765 43210
            </p>
            <p>
              Please include your booking reference number and the name under
              which the booking was made.
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

export default CancellationPolicy;
