// components/TravelExperience.tsx

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Pickup & Transfer",
    description:
      "Convenient pickup from Science City, Howrah or Sealdah and comfortable Pickup & Drop to the Godhkhali ferry ghat.",
    image: "/assets/hose-boat.webp",
    alt: "Pickup and transfer",
  },
  {
    title: "Comfortable Stay",
    description:
      "Pre-booked cozy resorts or hotels close to nature so you can relax after the day’s adventures.",
    image: "/assets/sonarbanglahotel.jpg",
    alt: "Hotel stay",
  },
  {
    title: "Boat Safari & Wildlife",
    description:
      "Explore the mangrove creeks on guided boat safaris and experience Sundarban’s unique estuarine wildlife.",
    image: "/assets/houseboat.jpeg",
    alt: "Boat safari",
  },
];

export default function TravelExperience() {
  return (
    <section className="py-10 md:py-16 bg-muted">
      <div className="container">
        <div className="space-y-6 text-left">
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-foreground max-w-5xl">
            Explore the Beauty of Sundarban with Premium Travel Experience
          </h2>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            The true transition into the wild begins the moment you leave the restless streets of Kolkata. The journey from the city to the Sundarbans is beautiful—watching towering buildings slowly melt away into endless paddy fields, little muddy huts and quiet village life as you head deep into the South 24 Parganas.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Experience the journey starting with a premium vehicle pick up from Kolkata , transporting you directly to the Mangrove forests with the Safari boats experience, luxury resort and premium cuisines on board with Sundarban tour package from kolkata.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-lg"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
