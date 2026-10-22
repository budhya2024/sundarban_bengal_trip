"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

const TermsAndConditions = () => {
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
        title="Terms & Conditions"
        subtitle="Please review our terms of service, booking rules, and forest safari regulations."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-4xl mx-auto">
          {/* Metadata */}
          <div className="pb-6 mb-8 border-b border-border flex flex-wrap items-center justify-between text-xs sm:text-sm text-muted-foreground gap-2">
            <span>Last Updated: October 2026</span>
            <span>Sundarban Bengal Trip • Official Terms of Service</span>
          </div>

          <div className="space-y-8 text-sm md:text-base leading-relaxed text-foreground/80">
            {/* Introduction */}
            <div>
              <p>
                Welcome to <strong>Sundarban Bengal Trip</strong>. These Terms and
                Conditions govern the booking, reservation, and operation of our
                Sundarban tour packages, boat safaris, resort accommodations, and
                transport services. By confirming a booking through our website,
                phone, email, or authorized booking desks, you acknowledge that
                you have read, understood, and agreed to be legally bound by
                these terms.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                1. Booking &amp; Payment Terms
              </h2>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Advance Deposit:</strong> A minimum advance deposit of{" "}
                  <strong>30%</strong> of the total package cost is required to
                  confirm any booking and secure hotel rooms and boat allocations.
                </li>
                <li>
                  <strong>Balance Clearance:</strong> The remaining balance of{" "}
                  <strong>70%</strong> must be cleared on or before the tour
                  departure date at the Kolkata pickup point or upon arrival at
                  Godkhali/Gosaba.
                </li>
                <li>
                  <strong>Currency &amp; Taxes:</strong> All rates are quoted in
                  Indian National Rupees (INR) and include applicable tourist
                  taxes and GST unless specifically stated otherwise.
                </li>
                <li>
                  <strong>Availability:</strong> All bookings, room categories,
                  and transport seats are subject to availability at the time of
                  payment receipt.
                </li>
                <li>
                  <strong>Official Invoice:</strong> A computerized booking
                  confirmation voucher with detailed pickup schedules and tour
                  coordinator contacts will be issued upon advance receipt.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                2. Cancellation &amp; Refund Policy
              </h2>
              <p className="mb-4">
                Tour cancellation requests must be submitted in writing via email
                to{" "}
                <a
                  href="mailto:sundarbanbengaltrip@gmail.com"
                  className="text-primary underline hover:text-secondary"
                >
                  sundarbanbengaltrip@gmail.com
                </a>{" "}
                or WhatsApp. The cancellation fee is determined by the date your
                written request is received:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>15 or more days before departure:</strong> 100% refund
                  of the deposit amount (subject to a standard processing fee of
                  ₹500 per person).
                </li>
                <li>
                  <strong>7 to 14 days before departure:</strong> 50% refund of
                  the advance deposit amount.
                </li>
                <li>
                  <strong>3 to 6 days before departure:</strong> 25% refund of
                  the deposit, or the option to reschedule tour dates subject to
                  hotel and boat availability.
                </li>
                <li>
                  <strong>Less than 72 hours or No-Show:</strong> No refund is
                  applicable as vehicles, boats, guides, and resort rooms are
                  pre-committed.
                </li>
              </ul>
              <p>
                Eligible refunds are processed directly to the original payment
                method (Bank Account or UPI) within <strong>5 to 7 business days</strong>.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                3. Tour Inclusions &amp; Exclusions
              </h2>
              <p className="font-semibold text-foreground mb-2">
                Standard Tour Inclusions:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Round-trip transportation from Kolkata to Godkhali/Gosaba
                  (AC/Non-AC as per package).
                </li>
                <li>
                  Mechanized, Forest-Department-permitted tourist boats with
                  safety equipment.
                </li>
                <li>
                  Resort or Hotel Sonar Bangla accommodation (AC/Deluxe rooms as
                  specified).
                </li>
                <li>
                  All authentic Bengali meals: Breakfast, Lunch, Evening Snacks,
                  and Dinner.
                </li>
                <li>
                  Forest Department entry permits and watchtower fees (Sajnekhali,
                  Sudhanyakhali, Dobanki).
                </li>
                <li>Certified local naturalist guide for the jungle safari.</li>
              </ul>

              <p className="font-semibold text-foreground mb-2">
                Standard Tour Exclusions:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Professional DSLR/video camera fees levied directly at forest
                  checkpoints.
                </li>
                <li>
                  Personal expenses such as beverages, laundry, tips, and room
                  service.
                </li>
                <li>Personal travel and medical insurance.</li>
                <li>
                  Any route alterations or extra transport requested outside the
                  itinerary.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                4. Jungle Safari &amp; Wildlife Guidelines
              </h2>
              <p className="mb-4">
                The Sundarban Mangrove Delta is an open, untamed wildlife
                reserve. Sighting wild animals, including the Royal Bengal Tiger,
                estuarine crocodiles, and spotted deer, is purely natural and
                cannot be guaranteed. <strong>No refund or compensation claim will
                be entertained on the grounds of wildlife sightings.</strong>
              </p>
              <p className="font-semibold text-foreground mb-2">
                Biosphere Reserve Rules:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Zero Plastic:</strong> Throwing plastics, wrappers, or
                  bottles into rivers or forest grounds is strictly forbidden.
                </li>
                <li>
                  <strong>Noise Control:</strong> Playing music, loud speakers, or
                  disturbing wildlife is strictly prohibited by forest law.
                </li>
                <li>
                  <strong>Boating Hours:</strong> Mechanized safari boats operate
                  strictly from sunrise (6:30 AM) to sunset (5:30 PM) per Forest
                  Department directives. Core creek navigation after dark is
                  banned for safety.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                5. Mandatory Government Identification &amp; Safety
              </h2>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Indian Nationals:</strong> Must carry one valid original
                  government-issued photo ID (Aadhaar Card, Passport, Voter ID, or
                  Driving License) for every traveler.
                </li>
                <li>
                  <strong>Foreign Nationals &amp; NRIs:</strong> Valid original
                  Passport and Indian Visa are mandatory for forest entry permits
                  at Godkhali/Sajnekhali.
                </li>
                <li>
                  <strong>Life Jackets:</strong> Wearing life jackets during boat
                  cruises is mandatory under inland water transport safety
                  regulations.
                </li>
                <li>
                  <strong>Health Declarations:</strong> Guests with mobility
                  impairments, cardiac conditions, or severe allergies must inform
                  our tour team prior to travel.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                6. Limitation of Liability &amp; Force Majeure
              </h2>
              <p className="mb-4">
                Sundarban Bengal Trip shall not be held liable for:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Loss, theft, or damage of personal belongings, cash, or
                  electronic equipment.
                </li>
                <li>
                  Injuries or illnesses arising from non-adherence to safety
                  guidelines or watchtower boundaries.
                </li>
                <li>
                  Delays, route changes, or boat cancellations caused by cyclonic
                  weather, severe river fog, low tides, road blockades, natural
                  calamities, or sudden forest department closure orders (Force
                  Majeure).
                </li>
              </ul>
              <p>
                In case of adverse weather or safety risks, our certified
                captains hold the final authority to alter routes to safeguard
                passengers.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                7. Photography &amp; Promotional Media
              </h2>
              <p>
                Our media team occasionally photographs tours for promotional
                brochures and official digital channels. If you do not wish to be
                photographed, please notify your guide at the start of the trip
                and your preference will be respected.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                8. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms and Conditions and any tour contracts shall be
                governed by and interpreted in accordance with the laws of the
                Republic of India. Any legal disputes or claims shall be subject
                to the exclusive jurisdiction of the competent courts in{" "}
                <strong>Kolkata / South 24 Parganas, West Bengal, India</strong>.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                9. Contact &amp; Grievance Redressal
              </h2>
              <p className="mb-4">
                For questions regarding these terms, booking agreements, or tour
                feedback, please contact our administrative desk:
              </p>
              <div className="space-y-1 text-sm md:text-base text-foreground">
                <p>
                  <strong>Sundarban Bengal Trip</strong>
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

export default TermsAndConditions;
