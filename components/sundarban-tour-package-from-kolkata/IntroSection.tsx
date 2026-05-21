"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export const IntroSection = () => {
  return (
    <section id="content" className="  relative overflow-hidden py-8 md:py-16">
      <div className="container" data-aos="fade-up">
        {/* Main text */}
        <div className="mb-3 md:mb-6">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
            Are you looking for the most affordable and best Sundarban tour
            package from Kolkata? Then you had already visited the most
            professional and right place —{" "}
            <strong className="text-primary font-bold">
              Sundarban Bengal Trip
            </strong>
            . We will professionally and neatly plan your whole Sundarban trip
            from Kolkata offering a perfect mix of adventure, nature, wildlife,
            and other tourist destinations in Sundarban.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Whether you are planning a Sundarban trip from Kolkata with friends,
            family, your partner, or a corporate group — we provide complete
            travel solutions: hotel stays, fooding, and professional guiding. As
            the most trusted Sundarban tour guide in Kolkata, we always ensure
            our clients&apos; safety, comfort, and enjoyment as our top
            priority.
          </p>
        </div>

        {/* Contact strip */}
        <div className="border-t border-border/60 pt-3 md:pt-6">
          <p className=" text-base md:text-lg font-bold text-foreground mb-4">
            Looking for the best Sundarban tour package from Kolkata?{" "}
            <span className="text-primary">Contact us now</span>
          </p>
          <div className="flex flex-col sm:flex-row  gap-4">
            <a
              href="tel:+917074432628"
              className="flex gap-1 items-center"
            >
              <Phone className="w-5 h-5" />
              +91 70744 32628
            </a>
            <a
              href="mailto:sundarbanbengaltrip@gmail.com"
              className="flex gap-1 items-center"
            >
              <Mail className="w-5 h-5" />
              sundarbanbengaltrip@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
