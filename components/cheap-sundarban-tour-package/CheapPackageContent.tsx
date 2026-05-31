import Image from "next/image";
import React from "react";

const CheapPackageContent: React.FC = () => {
  return (
    <section className="bg-background py-10 md:py-16">
      <div className="container">
        <div className="grid gap-6 md:gap-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] ">
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground text-base">
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
                Cheap Sundarban Tour Package from Kolkata – Affordable Jungle Trip
                for Budget Travelers &amp; Families
              </h2>

              <p>
                Exploring the wild mangroves should not have to be expensive. We have
                an Cheap Sundarban Tour Package from Kolkata, that makes it possible
                for people who are traveling alone groups and families to see the
                wild mangroves without spending a lot of money. We make sure that the
                cost of traveling is low by planning the transportation and other
                things You do not have to hire a vehicle that is expensive. You can
                take a train from Kolkata to Canning. Take a shared vehicle that is
                cheap. This way you can save money from the beginning of your trip to
                the Sundarban Tour. You will still have a guided trip to the wild
                heart of Bengal.
              </p>
            </div>

            <div className=" overflow-hidden border border-border bg-card shadow-lg">
              <Image
                src="/assets/sundarbantourphoto.jpeg"
                alt="Sundarban tour"
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]  lg:flex-row-reverse">
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground text-base">
              <h3 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
                Cheap Sundarban Tour Package from Kolkata with Shared Boat, Budget
                Hotel Stay &amp; Group Tour Offers
              </h3>

              <p>
                The secret to keeping our Cheap Sundarban Tour Package from Kolkata so
                remarkably affordable lies in our smart, shared resource model.
                Instead of paying heavy premiums for private excursions, guests can
                leverage our excellent group tour offers and jump onto a spacious,
                shared safari boat. This really brings down the cost of the trip while
                making it twice as fun to see animals with people who like nature. We
                do not stay at expensive resorts. Instead we stay at budget hotels
                and local places that're clean and safe. These places have everything
                we need food that people from that area like to eat and a cozy
                feeling. This means we can sleep well without spending a lot of money.
              </p>
            </div>

            <div className=" overflow-hidden border border-border bg-card shadow-lg">
              <Image
                src="/assets/sundarban-tour-food.jpeg"
                alt="Sundarban tour food"
                width={900}
                height={700}
                className="aspect-[16/9] h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] ">
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-foreground text-base">
              <h3 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground">
                Low Cost Sundarban Travel Package with Off-Season Discounts, Couple
                Plans &amp; Budget Friendly Safari Experience
              </h3>

              <p>
                If you want to pay the amount of money we have special prices when it
                is not the busy season and discounts that help you save even more money
                when you travel. We also have plans for couples that are affordable
                and let you have a lot of privacy and adventure without spending too
                much money. Our safari trip is easy, on your wallet. Includes all the
                big things you want to see. Like going through the dense mangrove
                creeks visiting the famous watchtowers and going to the local island
                villages. And we do not charge you any extra fees that you do not know
                about.
              </p>

              <p>
                Ready to plan your next pocket-friendly adventure? Book your Cheap
                Sundarban Tour Package from Kolkata with Sundarban Bengal Trip today.
              </p>

              <h4>Contact Us:</h4>

              <p>
                Mobile No: +91 70744 32628, Mail: sundarbanbengaltrip@gmail.com
              </p>
            </div>

            <div className=" overflow-hidden border border-border bg-card shadow-lg">
              <Image
                src="/assets/houseboat.jpeg"
                alt="Houseboat in Sundarban"
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheapPackageContent;
