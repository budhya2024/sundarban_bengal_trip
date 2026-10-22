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
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <PageHeader
        title="Payment Policy"
        subtitle="Understand our transparent payment terms, deposit requirements, and cancellation slabs."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-4xl mx-auto">
          {/* Metadata */}
          <div className="pb-6 mb-8 border-b border-border flex flex-wrap items-center justify-between text-xs sm:text-sm text-muted-foreground gap-2">
            <span>Last Updated: October 2026</span>
            <span>Sundarban Bengal Trip • Official Payment &amp; Cancellation Policy</span>
          </div>

          <div className="space-y-8 text-sm md:text-base leading-relaxed text-foreground/80">
            {/* Introduction */}
            <div>
              <p>
                At <strong>Sundarban Bengal Trip</strong>, we are committed to
                offering completely transparent pricing, secure transaction
                processing, and fair cancellation guidelines. This Payment Policy
                outlines the terms governing booking deposits, balance
                clearance, cancellations, and refund turnarounds for all tour
                packages and accommodations operated by us.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                1. Currency &amp; Pricing Terms
              </h2>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Currency:</strong> All package rates and invoices are
                  calculated and billed in Indian National Rupees (INR).
                </li>
                <li>
                  <strong>Rate Stability:</strong> Rates confirmed upon receipt of
                  an advance booking deposit are locked and will not fluctuate.
                  Unconfirmed quotes are subject to change based on peak seasonal
                  tariffs and fuel price adjustments.
                </li>
                <li>
                  <strong>Taxes &amp; Tolls:</strong> Package prices include
                  applicable GST, Forest Department entry passes, and boat
                  permits unless specifically indicated on custom itineraries.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                2. Advance Deposit &amp; Payment Schedule
              </h2>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Advance Deposit:</strong> A minimum deposit of{" "}
                  <strong>30%</strong> of the total package value is mandatory to
                  confirm any booking, reserve hotel/resort rooms, and assign
                  mechanized tourist boats.
                </li>
                <li>
                  <strong>Balance Clearance:</strong> The remaining{" "}
                  <strong>70%</strong> balance must be cleared on or before the
                  scheduled date of departure at the Kolkata pickup location or
                  upon arrival at Godkhali/Gosaba.
                </li>
                <li>
                  <strong>Accepted Payment Modes:</strong> We accept UPI (Google
                  Pay, PhonePe, Paytm), Net Banking (NEFT / IMPS / RTGS), Visa,
                  MasterCard, and cash payments at our Kolkata pickup desks.
                </li>
                <li>
                  <strong>Official Receipts:</strong> A computerized booking
                  voucher and GST invoice are generated and delivered via email
                  and WhatsApp upon receipt of payment.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                3. Customer Cancellation Slabs
              </h2>
              <p className="mb-4">
                If you wish to cancel your confirmed tour, a written cancellation
                notice must be sent via email to{" "}
                <a
                  href="mailto:sundarbanbengaltrip@gmail.com"
                  className="text-primary underline hover:text-secondary"
                >
                  sundarbanbengaltrip@gmail.com
                </a>{" "}
                or WhatsApp. Cancellation charges are calculated based on the
                notice date received:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>30 or more days before departure:</strong> 10%
                  cancellation fee of the total tour package cost.
                </li>
                <li>
                  <strong>15 to 29 days before departure:</strong> 25%
                  cancellation fee of the total tour package cost.
                </li>
                <li>
                  <strong>7 to 14 days before departure:</strong> 50%
                  cancellation fee of the total tour package cost.
                </li>
                <li>
                  <strong>Less than 7 days before departure or No-Show:</strong>{" "}
                  100% cancellation charge (non-refundable) due to pre-committed
                  resort rooms, transport vehicles, and boat permits.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                4. Cancellation by Sundarban Bengal Trip
              </h2>
              <p className="mb-4">
                In rare events, we may be compelled to alter or cancel tour
                departures due to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Adverse cyclonic weather, river storms, or low tidal conditions
                  rendering navigation unsafe.
                </li>
                <li>
                  Government or West Bengal Forest Directorate sudden closure
                  advisories.
                </li>
                <li>
                  Natural calamities or road blockades beyond our reasonable
                  control (Force Majeure).
                </li>
              </ul>
              <p>
                In such instances, customers will be offered either a{" "}
                <strong>100% full refund</strong> or the option to reschedule
                their tour to an alternate date without any penalty fees.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                5. Refund Processing Timeline
              </h2>
              <p className="mb-4">
                All approved refunds are remitted directly to the original bank
                account, card, or UPI handle used during booking within the
                following standard timelines:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>UPI Transactions:</strong> 3 to 5 business days.
                </li>
                <li>
                  <strong>Net Banking / NEFT:</strong> 5 to 7 business days.
                </li>
                <li>
                  <strong>Debit / Credit Cards:</strong> 7 to 10 business days
                  (subject to respective bank clearing cycles).
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                6. Date Rescheduling Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>15+ days before departure:</strong> Free rescheduling
                  (subject to resort room availability on the newly requested
                  dates).
                </li>
                <li>
                  <strong>7 to 14 days before departure:</strong> Rescheduling
                  permitted with a nominal administration fee of ₹500 per
                  person.
                </li>
                <li>
                  <strong>Less than 7 days before departure:</strong> Treated as
                  a cancellation and subject to standard cancellation charges.
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                7. Hotel Alternatives &amp; Room Allocations
              </h2>
              <p className="mb-4">
                Rooms and categories (AC Deluxe, Cottage, Hotel Sonar Bangla)
                are confirmed based on availability at the time of deposit
                clearance. If an agreed property becomes unavailable due to
                unforeseen technical reasons or government requisitions, a
                property of equal or superior standard will be provided with
                advance customer notification.
              </p>
              <p>
                Standard hotel check-in is typically at 12:00 PM and check-out
                at 10:00 AM. Early check-in or late check-out is subject to room
                availability.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                8. No-Show &amp; Non-Arrival
              </h2>
              <p>
                Guests who fail to arrive at the designated pickup point without
                prior intimation shall be marked as a &ldquo;No-Show&rdquo;. No
                refunds, credits, or date adjustments will be provided for
                no-show reservations.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                9. Payment Desk &amp; Inquiries
              </h2>
              <p className="mb-4">
                For queries regarding advance payments, tax receipts, or refund
                status, please contact our accounts desk:
              </p>
              <div className="space-y-1 text-sm md:text-base text-foreground">
                <p>
                  <strong>Sundarban Bengal Trip — Accounts &amp; Billing Desk</strong>
                </p>
                <p>
                  Address: 5R82+296, Nath Para, Gosaba, Arampur, South 24
                  Parganas, West Bengal 743370
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+917586889519"
                    className="text-primary underline hover:text-secondary"
                  >
                    +91 75868 89519
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:sundarbanbengaltrip@gmail.com"
                    className="text-primary underline hover:text-secondary"
                  >
                    sundarbanbengaltrip@gmail.com
                  </a>
                </p>
                <p>Operating Hours: Monday – Sunday: 8:00 AM – 10:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PaymentPolicy;