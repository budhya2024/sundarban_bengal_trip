import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SonarBanglaResortContent: React.FC = () => {
  const relaxFeatures = [
    {
      title: "First Class Accommodations",
      description:
        "Experience the comfort in first class accommodations such as air conditioned Deluxe rooms and River View suites with private balcony and garden.",
      image: "/assets/sonar-bangla-hotel-deluxe.jpg",
    },
    {
      title: "Facilities at the Location",
      description:
        "Unwind at the swimming pool after completing your safari adventure or get amazed by the lush green gardens.",
      image: "/assets/sonar-bangla-hotel-pool.jpg",
    },
    {
      title: "Safari Packages",
      description:
        "Take a silent journey along the Pirkhali and Dobaki channels and visit the renowned watch towers such as Sajnekhali, Sudhanyakhali, and Do Banki Canopy Walk.",
      image: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
    },
    {
      title: "Dining",
      description:
        "Enjoy multiple cuisines with different buffets such as Bengali seafood cuisine, snacks, and special dishes.",
      image: "/assets/sonar-bangla-hotel-dining.jpeg",
    },
  ];

  const allInclusivePerks = [
    {
      title: "Hassle-Free Pick-Up & Drop",
      description:
        "Exclusive AC car services directly from Calcutta or the airport to boat departure point.",
      image: "/assets/pickup.jpeg",
    },
    {
      title: "Priority Room Reservation",
      description:
        "Ensure yourself premium rooms on the boat with excellent views of the river during the peak season.",
      image: "/assets/sonar-bangla-hotel-balcony.webp",
    },
    {
      title: "All Permits & Guides",
      description:
        "Arrange forest entry permits, safety gears, and local naturalists.",
      image: "/assets/Sajnekhali-Watch-Tower.jpeg",
    },
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="container space-y-12 md:space-y-16">
        {/* Top H1 Block */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-foreground mb-4 leading-snug">
              Sundarban Sonar Bangla Resort Package in West Bengal - Your Dream Holiday
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Thinking about a holiday? Bring your dreams to life by availing yourself of a Sundarban Sonar Bangla Resort Package in West Bengal. The holiday resort package will ensure that you avail yourself of all the comforts of a five-star stay as you revel in the wild. Ideal for the holidaymakers looking forward to indulging themselves in the wild, the holiday resort package is sure to offer you the comfort of a five-star stay in the most exotic locales like the world’s largest mangrove forest.
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
              alt="Sundarban Sonar Bangla Resort Package in West Bengal - Your Dream Holiday"
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
              Sundarban Sonar Bangla Resort Package in West Bengal - Relax &amp; Rejuvenate
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Move out of the urban noise and unwind in the peaceful and tranquil surrounding. Engage in various indoor and outdoor games on the sprawling lawn areas of the resort. As evening falls, experience the mesmerizing local cultural programs, including traditional Baul music and folk dance arrangements meticulously organized by sundarbanbengaltrip to make your nights as vibrant as your days.
            </p>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relaxFeatures.map((item, idx) => (
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
              Grab the Best Resort Deals &amp; Offers with sundarbanbengaltrip
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-2">
              sundarbanbengaltrip guarantees comprehensive management for your stay at Hotel Sonar Bangla Sundarban.
            </p>
            <h4 className="text-base md:text-lg font-semibold text-foreground">
              Sundarbanbengaltrip Offers You All Inclusive Perks on Your Stay at Sonar Bangla Resort:
            </h4>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allInclusivePerks.map((item, idx) => (
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

          <div className="space-y-1 pt-1">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Get your package to Sonar Bangla Sundarban resort from sundarbanbengaltrip now and enjoy season discount offers and early bird special offers!
            </p>
            <p className="text-sm md:text-base font-medium text-foreground">
              Book your tickets now and enjoy the breathtaking beauty of Sundarban.
            </p>
          </div>
        </div>

        {/* Last CTA Section */}
        <div className="p-6 md:p-8 rounded-xl border border-border bg-foreground/5 shadow-sm space-y-4">
          <h4 className="text-base md:text-lg font-bold text-foreground">
            Reserve Your Sonar Bangla Resort Stay
          </h4>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Book your Sundarban Sonar Bangla Resort Package in West Bengal today! Contact sundarbanbengaltrip for exclusive season discount offers, priority room reservations, Kolkata AC car transfers, and customized mangrove safaris.
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
