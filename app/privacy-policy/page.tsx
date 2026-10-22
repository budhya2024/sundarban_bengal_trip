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
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <PageHeader
        title="Privacy Policy"
        subtitle="Learn how Sundarban Bengal Trip collects, handles, and protects your personal data."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-4xl mx-auto">
          {/* Metadata */}
          <div className="pb-6 mb-8 border-b border-border flex flex-wrap items-center justify-between text-xs sm:text-sm text-muted-foreground gap-2">
            <span>Last Updated: October 2026</span>
            <span>Sundarban Bengal Trip • Official Privacy Policy</span>
          </div>

          <div className="space-y-8 text-sm md:text-base leading-relaxed text-foreground/80">
            {/* Introduction */}
            <div>
              <p>
                At <strong>Sundarban Bengal Trip</strong> (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your privacy
                and are committed to safeguarding the personal information you
                share with us. This Privacy Policy describes how we collect,
                use, and protect your information when you visit our website (
                <strong>sundarbanbengaltrip.com</strong>), book tour packages, or
                communicate with our team, in compliance with the Information
                Technology Act, 2000 and applicable Indian data protection laws.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We collect only the personal information necessary to deliver
                tour services and comply with government forest directives:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Contact Details:</strong> Full name, phone number,
                  email address, and preferred Kolkata pickup/drop point.
                </li>
                <li>
                  <strong>Government Identification:</strong> Aadhaar Card,
                  Passport, or Voter ID details of traveling guests, legally
                  mandated for Forest Department entry tokens.
                </li>
                <li>
                  <strong>Travel Preferences:</strong> Accommodation category,
                  meal choices (Veg, Non-Veg, Jain), and special requirements.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, device type,
                  browser details, and pages viewed, gathered via standard
                  server logs and analytics.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the collected information for the following legitimate
                operational purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Processing and confirming your tour reservations and hotel
                  accommodations.
                </li>
                <li>
                  Issuing computerized booking vouchers and coordinate vehicle
                  pickup logistics.
                </li>
                <li>
                  Submitting passenger manifests to the West Bengal Forest
                  Directorate for biosphere entry permits and watchtower access.
                </li>
                <li>
                  Providing trip assistance, itinerary updates, and responsive
                  customer support.
                </li>
                <li>
                  Communicating important weather advisories and safety updates.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                3. Mandatory Forest Permits &amp; Government IDs
              </h2>
              <p className="mb-4">
                The Sundarbans Mangrove Delta is an ecologically sensitive
                international border biosphere. Under directives issued by the{" "}
                <strong>West Bengal Forest Directorate</strong> and the{" "}
                <strong>Coastal Police</strong>, all passenger manifests must be
                verified before boat entry passes are approved.
              </p>
              <p>
                We collect identification documents solely to fulfill this legal
                statutory requirement. These records are transmitted securely to
                authorized forest checkpoints (Godkhali / Sajnekhali) and are
                never sold or repurposed for commercial marketing.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                4. Payment &amp; Financial Security
              </h2>
              <p className="mb-4">
                All advance deposits and tour payments are protected under strict
                banking security measures:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Payments are processed through RBI-authorized, PCI-DSS compliant
                  Indian payment gateways.
                </li>
                <li>
                  We <strong>never</strong> store credit card numbers, CVVs, UPI
                  PINs, or net banking passwords on our servers.
                </li>
                <li>
                  Every transaction generates a computerized GST invoice sent
                  directly to your registered email and WhatsApp.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                5. Cookies &amp; Web Analytics
              </h2>
              <p className="mb-4">
                Our website uses standard cookies and analytics tools (Google
                Analytics and Meta Pixel) to improve browsing speed, evaluate
                popular tour routes, and maintain website performance.
              </p>
              <p>
                You can configure your browser to disable or refuse cookies.
                However, certain interactive features of our tour booking system
                may require functional cookies to operate properly.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                6. Non-Disclosure &amp; Information Sharing
              </h2>
              <p className="mb-4">
                We adhere to a strict non-disclosure policy. We{" "}
                <strong>never sell, rent, or trade</strong> your personal contact
                information to external advertising agencies or telemarketers.
              </p>
              <p className="mb-2">
                Information is shared strictly on a need-to-know basis with:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Verified resort partners (e.g., Hotel Sonar Bangla and
                  authorized eco-resorts) for room assignments and catering.
                </li>
                <li>
                  Assigned drivers and boat captains for passenger pickup and
                  navigation coordination.
                </li>
                <li>
                  Authorized Forest Department staff for entry pass verification.
                </li>
                <li>
                  Law enforcement authorities if strictly mandated under valid
                  legal processes.
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                7. Data Security &amp; Storage Safeguards
              </h2>
              <p className="mb-4">
                We implement physical, electronic, and procedural controls to
                protect your data:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  Our website uses 256-bit TLS/SSL encryption to safeguard all
                  transmitted data.
                </li>
                <li>
                  Access to customer identity records is restricted to authorized
                  operations personnel.
                </li>
                <li>
                  Sensitive ID copies submitted for forest passes are retained
                  only as long as needed for regulatory audits, after which they
                  are permanently deleted.
                </li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                8. Your Data Protection Rights
              </h2>
              <p className="mb-4">
                Under Indian data protection laws, you retain the following
                rights regarding your personal data:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Right to Access:</strong> You can request a summary of
                  the personal data we hold about your booking.
                </li>
                <li>
                  <strong>Right to Correction:</strong> You can request updates or
                  corrections to any inaccurate records.
                </li>
                <li>
                  <strong>Right to Deletion:</strong> You can request deletion of
                  your records upon completion of your tour and audit
                  requirements.
                </li>
                <li>
                  <strong>Opt-Out:</strong> You can opt out of non-essential
                  SMS/WhatsApp tour promotional updates at any time.
                </li>
              </ul>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                9. Protection of Minors (Children&apos;s Privacy)
              </h2>
              <p>
                Our services are directed to adults and families. We do not
                knowingly collect personal details directly from children under
                18 years of age. All bookings involving minors must be made and
                authorized by a parent or legal guardian.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-4 pb-2 border-b border-border">
                10. Privacy Officer &amp; Inquiries
              </h2>
              <p className="mb-4">
                For questions regarding this policy, data access requests, or
                grievances, please contact our administrative desk:
              </p>
              <div className="space-y-1 text-sm md:text-base text-foreground">
                <p>
                  <strong>Sundarban Bengal Trip — Privacy &amp; Grievance Cell</strong>
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

export default PrivacyPolicy;
