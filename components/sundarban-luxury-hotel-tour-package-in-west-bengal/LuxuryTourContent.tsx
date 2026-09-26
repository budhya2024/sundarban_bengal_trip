import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LuxuryTourContent: React.FC = () => {
  const luxuryFeatures = [
    {
      title: "Luxury Boat Tours",
      description:
        "Exclusive tours by luxury boats along the exclusive creeks like Pirkhali, Dobaki and Gazikhali.",
      image: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
    },
    {
      title: "Luxury Watchtower Tours",
      description:
        "Exclusive tours along the exclusive watchtowers that include Sajnekhali, Sudhanyakhali, and Do Banki Canopy Walk.",
      image: "/assets/Dobanki-Watch-Tower.webp",
    },
    {
      title: "Wildlife Safaris",
      description:
        "Get to know the mysterious Royal Bengal Tigers, estuarine crocodiles, axis deers, and different birds with the help of our expert guides.",
      image: "/assets/royel-bengal-tiger.webp",
    },
    {
      title: "Culture Nights",
      description:
        "Get to see the traditional Jhumar dance along with the Baul music at evening high tea.",
      image: "/assets/couples-and-groups.jpeg",
    },
  ];

  const specialFacilities = [
    {
      title: "Superb Accommodation",
      description:
        "Get accommodated in superb lodging facilities at top hotels facing the river like Hotel Sonar Bangla Sundarban, along with luxury air-conditioned rooms having balconies and green surroundings.",
      image: "/assets/sonar-bangla-hotel-deluxe.jpg",
    },
    {
      title: "Prestigious Food Menu",
      description:
        "Indulge yourself into the buffet menu which is multilingual with a variety of seafood along with other types of food menus.",
      image: "/assets/Prawn-Malai-Curry.jpg",
    },
    {
      title: "Superb Transfers By AC Cars",
      description:
        "Luxury transfers from Kolkata/airport to ferry terminal in AC cars.",
      image: "/assets/pickup.jpeg",
    },
    {
      title: "VIP Facilities",
      description:
        "Forest permit and naturalist services available on request.",
      image: "/assets/Sajnekhali-Watch-Tower.jpeg",
    },
  ];

  const hashtags = [
    "#SundarbanLuxuryTour",
    "#SundarbanBengalTrip",
    "#HotelSonarBangla",
    "#SundarbanTourism",
    "#WestBengalTourism",
    "#WildlifeSafari",
    "#SundarbanHolidays",
    "#LuxuryTravelIndia",
    "#MangroveForest",
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="container space-y-12 md:space-y-16">
        {/* Top H1 Block */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-foreground mb-4 leading-snug">
              Sundarban luxury hotel tour package in West Bengal - Ultimate Comfort &amp; Nature
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Enjoy your very own wildlife adventure at the Sundarban luxury hotel tour package in West Bengal. Offering a combination of lavish comforts along with the raw nature of the region, this ultimate vacation is your way of exploring the largest mangrove forest in the world while maintaining all of its modern-day charm. Relax in luxurious eco-lodges situated on the banks of beautiful rivers, sleep with picturesque views of the forests and enjoy exclusive wilderness safaris.
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
              src="/assets/sonarbanglahotel.jpg"
              alt="Sundarban luxury hotel tour package in West Bengal - Ultimate Comfort & Nature"
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
              Sundarban luxury hotel tour package in West Bengal - Premium Stays &amp; Safari
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              Sundarbans luxury hotel tour package in West Bengal is a perfect fusion of adventure, thrill, and utmost comfort. We provide luxurious tours packages for discerning tourists, couples, families, and everyone else through the mangrove creeks and water ways.
            </p>
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Features of your Luxurious Tour Package
            </h3>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {luxuryFeatures.map((item, idx) => (
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
                  <h4 className="font-semibold text-base text-foreground mb-2">
                    {item.title}
                  </h4>
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
              Experience 5-Star Hospitality &amp; Luxury Tour with sundarbanbengaltrip
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
              Make Your Visit To The Rainforests More Exhilarating With Superlative Hospitality And Personalized Management by sundarbanbengaltrip
            </p>
            <h4 className="text-base md:text-lg font-semibold text-foreground">
              Special Facilities On Booking Prestige Packages:
            </h4>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specialFacilities.map((item, idx) => (
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
                  <h5 className="font-semibold text-base text-foreground mb-2">
                    {item.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
            Experience 5-Star Luxury in Sundarbans
          </h4>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Try Out the Prestige Package of Sundarban today! Contact sundarbanbengaltrip for booking inquiries, VIP safaris, high-end resort amenities, swimming pool and spa facilities, fine dining, and personalized management.
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

        {/* Social Hashtags */}
        <div className="pt-2 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            {hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium text-primary/80 bg-foreground/5 border border-border px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
