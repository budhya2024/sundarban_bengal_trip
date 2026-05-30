import { HighlightCard } from "./HighlightCard";

const items = [
  {
    title: "Pickup & Transfer",
    description:
      "Convenient pickup from Science City, Howrah or Sealdah and comfortable Pickup & Drop to the Godhkhali ferry ghat.",
    image: "/assets/tourman.jpg",
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
    image: "/assets/gallery-boat.jpg",
    alt: "Boat safari",
  },
];

export const HighlightsGrid = () => {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <HighlightCard
          key={it.title}
          title={it.title}
          description={it.description}
          image={it.image}
          alt={it.alt}
        />
      ))}
    </div>
  );
};
