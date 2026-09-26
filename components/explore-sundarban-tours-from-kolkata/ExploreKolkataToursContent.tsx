import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExploreKolkataToursContent: React.FC = () => {
  const unmatchedFeatures = [
    {
      title: "Scenic River Tours",
      description:
        "Tour the narrow creeks, dense estuaries, and serene estuaries by traditional yet completely safe safari boats complete with all the safety equipment.",
      image: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
    },
    {
      title: "Wildlife Encounters",
      description:
        "Visit the renowned watchtowers like Sajnekhali, Sudhanyakhali, and Do Banki for sighting the Royal Bengal Tiger, estuarine crocodile, spotted deer, and various birds.",
      image: "/assets/royel-bengal-tiger.webp",
    },
    {
      title: "Authentic Bengali Culinary Experience",
      description:
        "Enjoy the freshly cooked meals onboard and at forest resorts with varieties of river fishes, local veggies, and desserts.",
      image: "/assets/Prawn-Malai-Curry.jpg",
    },
    {
      title: "Cultural Evening Shows",
      description:
        "Relax and enjoy evening performances of Baul folk music and tribal dances after your safari tours.",
      image: "/assets/couples-and-groups.jpeg",
    },
  ];

  const travelSafelyPoints = [
    {
      title: "Customized Tours",
      description:
        "Regardless of whether you want a 1-day trip, a 2-day / 1-night escape, or even a more adventurous 3-day / 2-night tour, we design packages keeping in mind your family, individual or business requirements.",
      image: "/assets/group-tour-sundarban.jpeg",
    },
    {
      title: "Safe Stay",
      description:
        "Experience our safe, hygienic, and environment-friendly stay at our partner resorts that feature all modern facilities and well-designed rooms.",
      image: "/assets/hotel-garden.jpeg",
    },
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="container space-y-12 md:space-y-16">
        {/* Top H1 Block */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-foreground mb-4 leading-snug">
              Explore Sundarban Tours with sundarbanbengaltrip from Kolkata - Your Trusted Guide
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Get ready to have the adventure of a lifetime to the world’s biggest mangrove forest via sundarbanbengaltrip. Located right in Kolkata, they are your trusted local partners who help take away all the worries about your journey, making sure you get to enjoy the beauty of nature in Bengal to the fullest. From the road transfer by AC/Non-AC cars to Godkhali—the entry point to the delta— Sundarban Tours with sundarbanbengaltrip from Kolkata have got everything covered for you.
            </p>

            {/* Action Buttons */}
            <div>
              <Button
                variant="default"
                asChild
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 py-2.5 rounded-[4px] shadow-sm"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden border border-border shadow-md rounded-lg">
            <Image
              src="/assets/pickup.jpeg"
              alt="Explore Sundarban Tours with sundarbanbengaltrip from Kolkata"
              width={600}
              height={400}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* H2 Block */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-2">
              Explore Sundarban Tours with sundarbanbengaltrip from Kolkata - Unmatched Experience
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Every tour program that they organize has both the elements of adventure and culture in equal proportion:
            </p>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {unmatchedFeatures.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-44 sm:h-48 w-full bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-start">
                  <h3 className="font-semibold text-base text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* H3 Block */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-2">
              Travel Safely with Expert Guides and Custom Itineraries
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Your safety and comfort always remain the first priority in your trip experience with them. Travelling with sundarbanbengaltrip, you enjoy the company of experienced naturalist guides from the area who know everything about the intricacies of nature around them and keep you safe and enlightened all through your travel experience in the forest.
            </p>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2">
            {travelSafelyPoints.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 sm:h-60 w-full bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-grow flex flex-col justify-start">
                  <h4 className="font-semibold text-base text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last CTA Section */}
        <div className="p-6 md:p-8 rounded-xl border border-border bg-foreground/5 shadow-sm space-y-4">
          <h4 className="text-base md:text-lg font-bold text-foreground">
            Plan Your Sundarban Trip with sundarbanbengaltrip
          </h4>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Ready to explore Sundarban from Kolkata? Contact sundarbanbengaltrip today for personalized holiday packages, government-authorized guide assistance, top-tier boat safety measures, and dedicated customer support.
          </p>
          <div className="flex flex-wrap items-center gap-2 md:gap-6 pt-2">
            <a
              href="tel:+917586889519"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
            >
              <Phone className="w-4 h-4 text-secondary" />
              <span>+91 75868 89519</span>
            </a>
            <a
              href="mailto:sundarbanbengaltrip@gmail.com"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
            >
              <Mail className="w-4 h-4 text-secondary" />
              <span>sundarbanbengaltrip@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
