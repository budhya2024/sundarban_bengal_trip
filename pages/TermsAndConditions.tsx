import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import heroImage from "@/assets/hero-sundarban.jpg";

const TermsAndConditions = () => {
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
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before booking your tour with us."
        backgroundImage={heroImage}
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            data-aos="fade-up"
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground"
          >
            <h2>Booking and Payment</h2>
            <p>
              By making a booking with Sundarban Bengal Trips, you agree to the
              following terms:
            </p>
            <ul>
              <li>
                A minimum deposit of 30% is required to confirm your booking
              </li>
              <li>
                Full payment must be received at least 7 days before the tour
                date
              </li>
              <li>
                Prices are quoted in Indian Rupees (INR) and are subject to
                change
              </li>
              <li>All bookings are subject to availability</li>
            </ul>

            <h2>Tour Inclusions</h2>
            <p>Unless otherwise specified, our tour packages include:</p>
            <ul>
              <li>Transportation as per the itinerary</li>
              <li>Accommodation in specified category</li>
              <li>Meals as mentioned in the package</li>
              <li>Entry fees to forest and watchtowers</li>
              <li>Services of experienced guides</li>
            </ul>

            <h2>Tour Exclusions</h2>
            <p>The following are generally not included:</p>
            <ul>
              <li>Personal expenses and tips</li>
              <li>Travel insurance</li>
              <li>Any items not specifically mentioned in inclusions</li>
              <li>Camera fees at certain locations</li>
            </ul>

            <h2>Health and Safety</h2>
            <p>Participants must:</p>
            <ul>
              <li>
                Inform us of any medical conditions or dietary requirements
              </li>
              <li>Follow all safety instructions provided by guides</li>
              <li>Maintain appropriate behavior in wildlife areas</li>
              <li>Not feed or disturb wildlife</li>
            </ul>

            <h2>Liability</h2>
            <p>Sundarban Bengal Trips shall not be liable for:</p>
            <ul>
              <li>Personal injury or illness during the tour</li>
              <li>Loss or damage to personal belongings</li>
              <li>Delays or changes due to weather conditions</li>
              <li>Acts beyond our reasonable control (force majeure)</li>
            </ul>

            <h2>Wildlife Sightings</h2>
            <p>
              Wildlife sightings, including tigers, are not guaranteed. Nature
              is unpredictable, and we cannot control animal movements. No
              refunds will be provided for wildlife not spotted.
            </p>

            <h2>Photography</h2>
            <p>
              By joining our tours, you consent to being photographed for
              promotional purposes. If you prefer not to be photographed, please
              inform your guide at the start of the tour.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by the laws of India. Any disputes
              shall be subject to the exclusive jurisdiction of courts in
              Kolkata, West Bengal.
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

export default TermsAndConditions;
