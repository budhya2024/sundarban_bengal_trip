import Image from "next/image";
import React from "react";
import { Utensils, Hotel, Users, ShieldCheck, Compass, Train, AlertTriangle } from "lucide-react";

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

          {/* Section 1: What is Included */}
          <div className="border-t border-border/50 pt-10 md:pt-16">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              What Is Included Even in Our Budget-Friendly Sundarban Package?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl text-sm md:text-base">
              Even our most affordable packages cover every essential to ensure a safe, comfortable, and memorable trip. Here is what is included:
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Authentic Local Meals</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy fresh, hot, and hygienic traditional Bengali breakfast, lunch, evening snacks, and dinner.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Hotel className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Comfortable Eco Stays</h3>
                <p className="text-sm text-muted-foreground">
                  Clean, cozy, and secure guest houses or cottages close to natural scenic locations.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Certified Tour Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Accompanied by forest-department-approved local guides with extensive experience in wildlife tracking.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Forest Permits & Entry</h3>
                <p className="text-sm text-muted-foreground">
                  All entry permits, forest checkpoint permission fees, and watchtower fees are fully covered.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Mangrove Boat Safari</h3>
                <p className="text-sm text-muted-foreground">
                  Explore narrow creeks, spot estuarine crocodiles and Royal Bengal Tigers, and visit major watchtowers on shared boats.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Train className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Hassle-Free Transport</h3>
                <p className="text-sm text-muted-foreground">
                  Comfortable, coordinated transit support between Kolkata/Canning and the Godhkhali ferry gateway.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Common Mistakes */}
          <div className="border-t border-border/50 pt-10 md:pt-16">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Common Mistakes People Make While Choosing a Cheap Tour Package
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl text-sm md:text-base">
              Selecting the cheapest operator without verification can result in hidden costs and safety hazards. Avoid these common mistakes:
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Unexpected Hidden Fees</h3>
                <p className="text-sm text-muted-foreground">
                  Many operators omit permit fees, guide charges, or camera taxes from their baseline quote, charging extra later.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Hotel className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Poor Quality Lodging</h3>
                <p className="text-sm text-muted-foreground">
                  Extremely low pricing often means unhygienic, crowded guest houses with poor security, far from the scenic zones.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Overcrowded & Unsafe Boats</h3>
                <p className="text-sm text-muted-foreground">
                  Some companies compromise safety by packing tourists onto small, unlicensed boats lacking life jackets or proper permits.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Booking Unverified Operators</h3>
                <p className="text-sm text-muted-foreground">
                  Entrusting your holiday to unregistered online agents who lack local expertise, offices, or on-ground support teams.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Missing Forest Permits</h3>
                <p className="text-sm text-muted-foreground">
                  Neglecting forest permits to save costs, which results in fines or being turned back from core sanctuary check-posts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-10 md:mt-16 text-base text-foreground/80 bg-foreground/10 p-6 rounded-xl">
          <p className="font-medium text-foreground">
            At Sundarban Bengal Trip, we guarantee budget-friendly pricing with zero hidden costs, premium safety, and excellent home-cooked food. Let us craft the perfect budget tour for you.
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span>Mobile No: +91 70744 32628</span>
            </div>
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <span>Mail: sundarbanbengaltrip@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheapPackageContent;
