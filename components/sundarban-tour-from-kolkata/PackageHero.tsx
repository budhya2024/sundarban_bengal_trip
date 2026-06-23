import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const PackageHero = () => {
  return (
    <section className="bg-background text-foreground py-8 md:py-16">
      <div className="container ">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8 max-w-3xl">
            <h1 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground text-foreground">
              Sundarban Tour from Kolkata – Best Sundarban Package Tour with Hotel, Boat Safari & Food | Sundarban Bengal Trip
            </h1>

            <div className="space-y-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              <p>
                Are you looking for the most affordable and best Sundarban tour package from Kolkata? Then you had already visited the most professional and right place - Sundarban Bengal Trip. We will professionally and neatly plan your whole Sundarban trip from Kolkata in which we will offer a mix of adventure, nature, wildlife, and other tourist destinations in Sundarban.
              </p>
              <p>
                Whether you are looking to plan a Sundarban trip from Kolkata, with your friends, family members or your partner or a corporate group we will provide complete travel solutions and hotel stay options, with proper fooding and guiding. As the most trusted Sundarban tour guide in Kolkata we always ensure our clients safety, comfort and enjoyment at our priority.
              </p>
              <p>
                So if you are looking for the best Sundarban tour package from Kolkata then you must contact us - <strong>Sundarban Bengal Trip</strong> , PH No- <strong>+91 70744 32628</strong> ,  Mail- <strong>sundarbanbengaltrip@gmail.com</strong>.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="hero"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <Link
                  href="/packages"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Book Your Kolkata to Sundarban Tour
                </Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden border border-border/50 bg-card shadow-2xl">
            <div className="relative h-full w-full">
              <Image
                src="/assets/mangrove.jpeg"
                alt="Sundarban mangrove tour"
                width={900}
                height={700}
                className="object-cover h-full w-full"
                priority
              />
            </div>
            <div className="p-6">
              <div className="text-sm uppercase tracking-wider text-secondary">Sundarban River Cruise</div>
              <p className="mt-2 text-base font-semibold text-foreground">
                Boat safari, cozy resort stay, and relaxed travel from Kolkata.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
