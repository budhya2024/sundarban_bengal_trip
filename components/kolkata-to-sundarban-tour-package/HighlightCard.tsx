import Image from "next/image";

type HighlightCardProps = {
  title: string;
  description: string;
  image: string;
  alt?: string;
};

export const HighlightCard = ({ title, description, image, alt }: HighlightCardProps) => {
  return (
    <article className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-lg">
      <div className="relative h-44 w-full">
        <Image src={image} alt={alt || title} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </article>
  );
};
