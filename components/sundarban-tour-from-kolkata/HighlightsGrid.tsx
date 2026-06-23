import { HighlightCard } from "./HighlightCard";

const items = [
  {
    title: "Family & Couples Tour",
    description:
      "Specially curated, safe, and comfortable travel packages designed for families and romantic couple getaways.",
    image: "/assets/Couples & Groups.jpeg",
    alt: "Sundarban Family & Couples Tour",
  },
  {
    title: "Group Tour Packages",
    description:
      "Exciting group travel plans offering cost-effective packages with shared guides, boats, and transfers.",
    image: "/assets/group-tour-sundarban.jpeg",
    alt: "Sundarban Group Tour Packages",
  },
  {
    title: "Resort & Hotel Stays",
    description:
      "Pre-booked rooms in clean budget hotels or premium luxury resorts surrounded by natural mangrove beauty.",
    image: "/assets/hotel.jpeg",
    alt: "Sundarban Resort & Hotel Stays",
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
