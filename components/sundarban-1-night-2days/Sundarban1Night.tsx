export default function Sundarban1Night() {
  return (
    <section className="py-12">
      <div className="container">
       

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            {/* Section 1: Overview & Highlights */}
            <section className="prose prose-neutral">
              <h1>Sundarban 1 Night 2 Days Package from Kolkata</h1>

              <p>
                Sundarban 1 Night 2 Days Package from Kolkata – Perfect Weekend
                Jungle Tour Experience
              </p>

              <p>
                Looking for a weekend getaway? Our Sundarban 1 Night 2 Days
                Package from Kolkata is perfect for a trip to see the mangroves.
                This package is great for busy couples and families. It helps
                you make the most of your time with a planned travel schedule.
                We pick you up from Kolkata in the morning and take you to the
                river cruise and resort. Enjoy premium stays, meals, and guided
                safaris.
              </p>
            </section>

            {/* Section 2: Day 1 Itinerary */}
            <section>
              <h2 className="text-xl font-semibold">Day 1 — Itinerary</h2>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>
                  <strong>Morning Transit:</strong> Pickup from Kolkata at 08:00
                  AM and 3-hour drive to Godkhali ferry ghat.
                </li>
                <li>
                  <strong>Lunch:</strong> Boat transfer to resort, check-in, and
                  heavy Bengali lunch.
                </li>
                <li>
                  <strong>Afternoon Safari:</strong> Boat safari through narrow
                  creeks and sunset cruise.
                </li>
                <li>
                  <strong>Evening:</strong> Tea, cultural entertainment, and
                  dinner at the resort.
                </li>
              </ul>
            </section>

            {/* Section 3: Day 2 & Booking */}
            <section>
              <h2 className="text-xl font-semibold">
                Day 2 — Itinerary & Booking
              </h2>
              <p>
                <strong>Morning Watchtower Cruise:</strong> Early morning safari
                at 07:30 AM to visit watchtowers like Sajnekhali or
                Sudhanyakhali with breakfast on board.
              </p>

              <p>
                <strong>Return Journey:</strong> Return to resort by noon for
                lunch, checkout, and drop back to Kolkata arriving by evening.
              </p>

              <div className="mt-4">
                <a
                  href="/contact"
                  className="inline-block bg-secondary text-secondary-foreground px-6 py-3  font-medium mr-3"
                >
                  Contact / Book
                </a>
                <a
                  href="mailto:sundarbanbengaltrip@gmail.com"
                  className="inline-block border border-border px-6 py-3  "
                >
                  Email Us
                </a>
              </div>

              <div className="mt-4  text-muted-foreground">
                <p>
                  Mobile: <a href="tel:+917074432628">+91 70744 32628</a>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:sundarbanbengaltrip@gmail.com">
                    sundarbanbengaltrip@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Right column: 3 stacked photos */}
          <aside className="space-y-4">
            <img
              src="/assets/sundarban-package-tour-from-kolkata-with-hotel-sonar-bangla.webp"
              alt="Sundarban hero"
              className="w-full h-72 object-cover  shadow-lg"
            />
            <img
              src="/assets/houseboat.jpeg"
              alt="Houseboat"
              className="w-full h-40 object-cover "
            />
            <img
              src="/assets/mangrove.jpeg"
              alt="Mangrove"
              className="w-full h-40 object-cover "
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
