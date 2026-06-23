import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MailCheck, Phone } from "lucide-react";

export const BookingContact = () => {
  return (
    <section className="py-8 md:py-16  text-foreground">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="font-display text-lg md:text-xl xl:text-2xl  font-bold leading-tight text-foreground">
              Travel from Kolkata to Sundarban by Train, Car & River Cruise with
              Local Sightseeing
            </div>

            <div className="space-y-4  leading-relaxed text-muted-foreground">
              <p>
                When people travel they like to do things their way. That is why
                our Kolkata to Sundarban Tour Package gives you choices for
                getting. You can take a train to Canning. Then take a short ride
                to get to your destination or you can take a car that is
                air-conditioned and goes straight to the ghat.
              </p>
              <p>
                After you get there you will see a lot of things like villages
                and watchtowers. You will also get to meet the people who live
                there and learn about their culture.
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-base font-medium text-foreground">
                Looking for the best Kolkata to Sundarban Tour Package? Contact
                us now
              </p>
              <p className="mt-3 text-sm text-muted-foreground flex flex-wrap gap-4 items-center">


                <a
                  href="tel:+917074432628"
                  className="text-muted-foreground font-semibold"
                >
                  <Phone className="inline-block w-4 h-4 mr-1 text-primary" />
                  +91 70744 32628
                </a>

                <a
                  href="mailto:sundarbanbengaltrip@gmail.com"
                  className="text-muted-foreground font-semibold"
                >
                  <Mail className="inline-block w-4 h-4 mr-1 text-primary" />
                  sundarbanbengaltrip@gmail.com
                </a>
              </p>
            </div>

            <Button variant="hero" size="lg" asChild className="mx-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Contact Us Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden  border border-border/50 bg-card shadow-2xl">
            <div className="relative h-auto w-full">
              <Image
                src="/assets/sundarbantourphoto.jpeg"
                alt="Sundarban tour photo"
                height={400}
                width={600}
                className="object-cover h-auto w-full"
              />
            </div>
            <div className="  bg-background/90 p-4">
              <p className="text-sm uppercase tracking-wider text-secondary">
                Sundarban Bengal Trip
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Book today and experience the best of Sundarban wildlife,
                rivers, and local culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
