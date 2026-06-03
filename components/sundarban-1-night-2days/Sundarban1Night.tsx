import { Mail, Phone } from "lucide-react";

export default function Sundarban1Night() {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="space-y-6 md:space-y-12">
          {/* Part 1: Overview */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="prose prose-neutral">
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
                Sundarban 1 Night 2 Days Package from Kolkata – Perfect Weekend
                Jungle Tour Experience
              </h2>

              <p>
                Looking for a weekend getaway? Our Sundarban 1 Night 2 Days
                Package from Kolkata is perfect for a trip to see the mangroves.
                This package is great for people who're busy couples and
                families. It helps you make the most of your time with a planned
                travel schedule. We pick you up from Kolkata in the morning.
                Take you straight to your river cruise. If you don't have time
                but want to see the jungle this Sundarban tour is a good choice.
                It is a jungle tour where you get to experience the wild beauty
                of the mangroves. The Sundarban 1 Night 2 Days Package from
                Kolkata makes sure you have a time, in the mangroves.
              </p>
            </div>

            <div>
              <img
                src="/assets/bestsundarbantourpackage.jpeg"
                alt="Sundarban overview"
                className="w-full h-72 object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Part 2: Day 1 Itinerary */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
                Sundarban 1 Night 2 Days Package from Kolkata with Hotel Stay,
                Meals & Boat Safari Itinerary
              </h2>

              <p>
                Our Sundarban 1 Night 2 Days Package from Kolkata is packed with
                premium resort accommodations, delicious freshly prepared local
                meals, and thrilling guided excursions. Here is what your first
                day looks like:
              </p>

              <p>
                <strong>Morning Transit:</strong> We start early with a pickup
                from Kolkata at 8:00 AM. Then we take a 3-hour drive to the
                Godhkhali ferry ghat.
              </p>

              <p>
                <strong>Lunch:</strong> From there we take a boat to our -booked
                resort. We check-in to our room and have a heavy Bengali lunch.
              </p>

              <p>
                <strong>Afternoon Safari:</strong> In the afternoon we go on a
                boat safari through the creeks. We see the estuarine ecosystem.
                Watch the sunset over the river. The creeks are very narrow and
                dense.
              </p>

              <p>
                <strong>Evening:</strong> We come back to the resort, for tea.
                We enjoy cultural entertainment and have a freshly prepared
                dinner.
              </p>
            </div>

            <div>
              <img
                src="/assets/sundarban-lunch-menu.jpeg"
                alt="Houseboat"
                className="w-full h-auto object-cover shadow"
              />
            </div>
          </div>

          {/* Part 3: Day 2 & Booking */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="prose">
              <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
                2 Days Sundarban Tour Plan with Day-wise Travel Schedule, Resort
                Stay & Quick Booking Options
              </h2>

              <p>
                Your second day is dedicated to deep jungle exploration before
                concluding the trip:
              </p>

              <p>
                <strong>Morning Watchtower Cruise:</strong> You should get up
                early. Start your day with a safari at 7:30 AM. The Morning
                Watchtower Cruise will take you deeper into the forest so you
                can visit the watchtowers like Sajnekhali or Sudhanyakhali.
              </p>

              <p>
                <strong>Breakfast on Board:</strong> You will get a breakfast on
                the boat. The Breakfast on Board is freshly. You can eat it
                while you look at the riverbanks for animals and other wildlife.
              </p>

              <p>
                <strong>Return Journey:</strong> We will go back to the resort
                by noon so you can have lunch. After you check out we will take
                you home safely. The Return Journey will end in Kolkata by
                evening.
              </p>
            </div>

            <div>
              <img
                src="/assets/sundarban-tour-cost.jpeg"
                alt="Mangrove"
                className="w-full h-80 md:h-[400px] object-cover  shadow"
              />
            </div>
          </div>
        </div>
        <div className="text-sm md:text-base text-foreground/80  bg-foreground/10 p-4 mt-6">
          <p>
            Book your Sundarban 1 Night 2 Days Package from Kolkata now. This is
            a way to have a fun trip to Sundarban.
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
}
