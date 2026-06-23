import Link from "next/link";
import { HighlightsGrid } from "./HighlightsGrid";

export const JourneyHighlights = () => {
  return (
    <section className="py-10 md:py-16 bg-muted">
      <div className="container">
        <div className="space-y-6 text-left">
          <h2 className="font-display text-lg md:text-xl xl:text-2xl  font-bold leading-tight text-foreground max-w-5xl">
            Book Affordable Sundarban Tour Packages from Kolkata for Family, Couples & Groups
          </h2>

          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              In our well modified{" "}
              <Link href="/packages" className="font-bold text-secondary">
                Sundarban tour package from Kolkata
              </Link>{" "}
              we will provide your all types of ready to have services like - Travelling, Hotels, sightseeing, Fooding and more on. In our Sundarban Bengal Trip - Tours & Guide agency you will receive both bridget friendly and luxury resort stays options while on your Sundarban trip from Kolkata, we always used to offer flexible tours options for our clients.
            </p>
            <p>
              Moreover in our Sundarban tour package from Kolkata you will also receive, Pickup and drop from any destination of Kolkata, while journey fooding support, boat safari or boat stays options and many local sight visitings too. So if you are looking to relax yourself in the nature of Sundarban by planning a great Sundarban trip from Kolkata then you may connect with us - Sundaban Bengal Trip.
            </p>
          </div>
        </div>

        <HighlightsGrid />
      </div>
    </section>
  );
};
