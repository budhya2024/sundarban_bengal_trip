import Image from "next/image";
import { Mail, Phone, Calendar, Train, Hotel, Compass, Users, AlertTriangle } from "lucide-react";

export const CostBody = () => {
  return (
    <section className=" py-8 md:py-16">
      <div className="container">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Sundarban Tour Cost from Kolkata – Complete Package Price Guide
              for Budget, Family & Luxury Travelers
            </h2>
            <p>
              So you want to go to the Sundarban. This is a trip. You need to
              think about how money you will spend. The Sundarban Tour Cost from
              Kolkata is important to know. This helps you choose what you want
              to do.
            </p>

            <p>
              The Sundarban trip usually costs between{" "}
              <strong>₹3,500 and ₹9,500 per person.</strong> This depends on how
              you stay. For example you can go for 1 Night and 2 Days or 2
              Nights and 3 Days. If you go with a group it is cheaper for each
              person. This is good for families or companies. If you want a trip
              just for you and your partner it will cost more. You get a car to
              take you places and special things just for you. This makes the
              trip more expensive.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/sundarban-lunch-menu.jpeg"
              alt="Sundarban tour food"
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>
          <div>
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Sundarban Tour Cost from Kolkata with Hotel, Food, Boat Safari &
              Seasonal Price Breakdown
            </h2>

            <p>
              A transparent and well-planned Sundarban Tour Cost from Kolkata
              includes all your core travel essentials: standard or luxury
              accommodation, all daily meals (breakfast, traditional Bengali
              lunch, evening snacks, and dinner), a dedicated mechanized boat
              safari, and mandatory forest department entry permits. Seasonal
              shifts have an effect on prices. During the winter season from
              October to March prices go up a little because a lot of tourists
              want to visit and the weather is really nice. In contrast, the
              summer and monsoon months bring heavy discounts, offering an
              affordable alternative for offbeat travelers who want to explore
              the lush green mangroves on a tighter budget.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/sundarbantourphoto.jpeg"
              alt="Sundarban mangroves"
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>

          <div>
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Budget vs Premium Sundarban Tour Price, Couple & Group Package
              Cost with Hidden Charges Details
            </h2>

            <p>
              When you are thinking about the cost of your Sundarban Tour from
              Kolkata you need to know what makes a cheap trip different from an
              expensive one. The cheap trips try to save money by using
              transport that is not air-conditioned or transport that you share
              with others and they use simple guest houses and boats that you
              share with other people. The expensive trips are for people who
              want to travel in style they use air-conditioned cars stay in nice
              resorts rent private boats and have local guides who are very
              knowledgeable. To make sure your trip goes smoothly you should
              always ask about any costs before you pay, like fees for taking
              pictures permission to record videos, money for tips and special
              dance performances, by local tribes because these things are
              usually not included in the basic price of the trip.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/houseboat.jpeg"
              alt="Sundarban mangroves"
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>

          {/* Section 1: Hidden Factors */}
          <div className="col-span-full border-t border-border/50 pt-10 md:pt-16">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Hidden Factors That Can Increase Your Sundarban Tour Cost
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              While the packages you book may look highly budget-friendly, unexpected hidden fees and customization upgrades can quickly increase your total trip budget. Be aware of these key factors:
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Peak Travel Season</h3>
                <p className="text-sm text-muted-foreground">
                  Prices rise significantly from October to March due to ideal weather conditions and heavy tourist rushes.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Train className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Transportation & Pickup Location</h3>
                <p className="text-sm text-muted-foreground">
                  Upgrading to private AC vehicles or choosing custom pickup points outside standard Kolkata locations adds to the cost.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Hotel className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Hotel & Resort Category</h3>
                <p className="text-sm text-muted-foreground">
                  Switching from basic non-AC cottages or home-stays to premium luxury eco-resorts with AC packages raises costs.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Private Boat Safari</h3>
                <p className="text-sm text-muted-foreground">
                  Renting a private boat for exclusive safaris is far costlier than booking a seat on standard shared group cruise safaris.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Group Size Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Smaller groups and couples bear higher per-head costs for transport, guide fees, and boat rentals compared to larger groups.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Forest Permits & Activity Fees</h3>
                <p className="text-sm text-muted-foreground">
                  Forest department entry permits, mandatory local guide fees, camera charges, and optional cultural shows are often excluded in cheap packages.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: How to Save Money */}
          <div className="col-span-full border-t border-border/50 pt-10 md:pt-16">
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              How to Save Money Without Compromising Your Sundarban Experience
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              You can experience a wonderful Sundarban mangrove safari and delta journey without stretching your wallet by making a few smart planning decisions:
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Advance Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Secure your dates and bookings early to capture early-bird discounts and lock in standard pricing before seasonal hikes.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Group & Shared Bookings</h3>
                <p className="text-sm text-muted-foreground">
                  Booking in a group or opting for shared packages distributes boat rental and forest permit fees across more travelers.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Weekday Travel</h3>
                <p className="text-sm text-muted-foreground">
                  Plan your tour during weekdays to enjoy lower resort tariffs and quieter, less crowded watchtower visits.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Off-Season & Monsoon Trips</h3>
                <p className="text-sm text-muted-foreground">
                  Travel during summer or monsoon months to access beautiful green vistas, lower rates, and exclusive resort offers.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Train className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Opt for Local Transport</h3>
                <p className="text-sm text-muted-foreground">
                  Use local trains or buses from Kolkata to Canning or Godhkhali to dramatically cut down transit costs compared to private cabs.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition duration-200">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
                  <Hotel className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Cozy Eco Homestays</h3>
                <p className="text-sm text-muted-foreground">
                  Choose clean, local eco-cottages or traditional village homestays over premium resorts for an authentic, budget-friendly experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-6 md:mt-10">
        <div className="text-base text-foreground/80  bg-foreground/10 p-4" >
          <p className="">
            At Sundarban Bengal Trip, we guarantee absolute transparency with no
            hidden surprises, allowing you to plan your holiday with complete
            peace of mind. Contact our team today to get a customized,
            obligation-free quote tailored exactly to your group size and travel
            preferences.
          </p>
          <div className="pt-2  flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Phone className="w-4 h-4" />
              <span>+91 70744 32628</span>
            </div>
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Mail className="w-4 h-4" />
              <span>sundarbanbengaltrip@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
