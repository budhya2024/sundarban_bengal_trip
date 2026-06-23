import Image from "next/image";
import Link from "next/link";

export const TravelServices = () => {
  return (
    <section className="py-8 md:py-16 bg-background text-foreground">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="overflow-hidden border border-border/50 bg-card shadow-2xl order-2 lg:order-1">
            <div className="relative h-full w-full">
              <Image
                src="/assets/houseboat.jpeg"
                alt="Sundarban houseboat stay and boat safari"
                width={900}
                height={700}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="p-6">
              <div className="text-sm uppercase tracking-wider text-secondary">
                Comfortable Boat Stay
              </div>
              <p className="mt-2 text-base font-semibold text-foreground">
                Experience night stays and day safaris right in the heart of nature.
              </p>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="font-display text-lg md:text-xl xl:text-2xl  font-bold leading-tight text-foreground">
              Complete Sundarban Travel Services Including Resort Stay, Boat Safari & Local Guide
            </h3>

            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                In our Sundarban Bengal Trip’s planned{" "}
                <Link href="/packages" className="font-bold text-secondary">
                  Sundarban trout package from Kolkata
                </Link>{" "}
                you will get a whole tour management so that you can easily enjoy your whole trip without taking any extra stress. With our well experienced Local Sundarban Tour Guide in Kolkata and with our professional touring teams any tourist can easily enjoy the beauty of the rivers of Sundarban, the mangroves, the trees, the sunset, the villages, boat stays, camping and the Wildlife nature of Sundarban.
              </p>
              <p>
                In our planned Sundarban trip from Kolkata we not only provide regular types of fooding or touring options you can also visit the no visited areas of Sundarban with Local support, specially made Bengali fish dishes, cultural programs and thrilling boat safaris. So get your inner adventurous mode spark on and connect with us and get the best Sundarban tour package from Kolkata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
