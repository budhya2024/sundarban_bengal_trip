import Link from "next/link";
import { HighlightsGrid } from "./HighlightsGrid";

export const JourneyHighlights = () => {
  return (
    <section className="py-10 md:py-16 bg-muted">
      <div className="container">
        <div className="space-y-6 text-left">
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-foreground max-w-5xl">
            Kolkata to Sundarban Tour Package with Pickup, Travel, Hotel Stay &
            Boat Safari Experience
          </h2>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            As part of this comprehensive Kolkata to{" "}
            <Link href="/packages" className="font-bold  text-secondary">Sundarban Tour Package</Link>, your road travel smoothly
            transitions into a captivating river cruise. We want you to feel
            comfortable so we plan your travel for the times. This way you can
            see all the sights without getting too tired. When you get to where
            you're going we will take you to your hotel or resort. You will
            already have a room booked. It will be a cozy place to stay. It is
            near nature which's really nice. After you get to your hotel and get
            settled it is time, for the part of your trip: the boat safari. This
            is very exciting. You will go through the mangrove creeks on a boat.
            The mangrove creeks are very dense. You will feel the air and see
            how beautiful the estuarine ecosystem is. This will make your trip
            very memorable.
          </p>
        </div>

        <HighlightsGrid />

      </div>
    </section>
  );
};
