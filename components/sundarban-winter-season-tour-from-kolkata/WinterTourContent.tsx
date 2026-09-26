import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WinterTourContent: React.FC = () => {
  const wildlifeSpottingFeatures = [
    {
      title: "Royal Bengal Tiger",
      description:
        "Because of the pleasant temperatures, the royal Bengal tiger often comes out to bask in the warmth of the winter sun near the river bank.",
      image: "/assets/royel-bengal-tiger.webp",
    },
    {
      title: "Reptile and Mammals",
      description:
        "Saltwater crocodiles can often be seen sunbathing along the banks, and you can also observe spotted deer, wild boar, and rhesus macaque moving close to the banks.",
      image: "/assets/Bhagabatpur-Crocodile-Sanctuary.jpeg",
    },
    {
      title: "Migratory Birds",
      description:
        "Many migratory birds join with native birds such as kingfisher, eagle, and heron to make this delta home.",
      image: "/assets/gallery-bird.jpg",
    },
    {
      title: "Tour to Watch Towers",
      description:
        "You get to explore famous watch towers of Sundarbans like Sajnekhali, Sudhanyakhali, and Do Banki.",
      image: "/assets/Sudhanyakhali-Watch-Tower.jpeg",
    },
  ];

  const winterExpeditionFeatures = [
    {
      title: "Transportation Facility",
      description:
        "Hassle free transportation facility from Kolkata to Godkhali point from where you start your tour of Sundarbans.",
      image: "/assets/pickup.jpeg",
    },
    {
      title: "Safety & Permits",
      description:
        "Well equipped boats with the necessary permit for the tourists to move around in the Sundarbans, navigated by the well trained naturalists of the area.",
      image: "/assets/Sajnekhali-Watch-Tower.jpeg",
    },
    {
      title: "Comfortable Stay & Hot Meals",
      description:
        "Stay comfortably along with having hot authentic Bengali cuisine and hot drinks on board as well as in the resort.",
      image: "/assets/Prawn-Malai-Curry.jpg",
    },
    {
      title: "Campfires in Winter",
      description:
        "After an adventurous trip on the boat, relax around campfires with hot food and performances of baul songs and dances in winter.",
      image: "/assets/couples-and-groups.jpeg",
    },
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="container space-y-12 md:space-y-16">
        {/* Top H1 Block */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <h1 className="text-lg md:text-xl xl:text-2xl font-bold text-foreground mb-4 leading-snug">
              Sundarban Winter Season Tour from Kolkata - Witness the Wild in Cold Breeze
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Experience the magic of the world’s largest mangrove delta through a memorable winter experience. Set off for a winter holiday into the heart of the Sundarbans straight from Kolkata and revel in a fun ride in the foggy river channels along with cool breeze and clear water. Experience the wonderful sights of nature with the cool breezes sweeping past the boat rides through the thick forests surrounding you with Sundarban Winter Season Tour from Kolkata.
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
              src="/assets/sundarban-river-boating-with-mangrove-forest-.jpg"
              alt="Sundarban Winter Season Tour from Kolkata - Witness the Wild in Cold Breeze"
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
              Sundarban Winter Season Tour from Kolkata - Best Time for Wildlife Spotting
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Winter – from November to March – is considered to be the ideal time for visiting Sundarbans. In this period, there will be a lot of animals active along the mudflats and river banks of Sundarbans:
            </p>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wildlifeSpottingFeatures.map((item, idx) => (
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
              Plan Your Safe and Warm Winter Expedition with sundarbanbengaltrip
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Enjoy a safe and organized Sundarban Winter Season Tour from Kolkata to the Sundarbans.
            </p>
          </div>

          {/* Cards with image on top and text under in a box */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {winterExpeditionFeatures.map((item, idx) => (
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

        {/* Last CTA Section */}
        <div className="p-6 md:p-8 rounded-xl border border-border bg-foreground/5 shadow-sm space-y-4">
          <h4 className="text-base md:text-lg font-bold text-foreground">
            Book Your Winter Safari with sundarbanbengaltrip
          </h4>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Book your Sundarban Winter Season Tour from Kolkata today! Contact sundarbanbengaltrip for winter wildlife behavior insights, spotting basking tigers and crocodiles in the sun, photography guidelines, warm clothing tips, and dedicated customer support.
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
