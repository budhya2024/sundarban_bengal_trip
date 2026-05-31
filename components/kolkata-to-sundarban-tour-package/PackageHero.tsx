import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flag } from "lucide-react";

export const PackageHero = () => {
  return (
    <section className="bg-background text-foreground py-8 md:py-16">
      <div className="container ">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8 max-w-3xl">
            <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-tight">
              Kolkata to Sundarban Tour Package – Comfortable Journey from
              Kolkata to the Mangrove Paradise
            </h1>

            <div className="space-y-4 text-sm md:text-base leading-relaxed text-foreground">
              <p>
                Going to the worlds mangrove forest is very exciting. Our
                Kolkata to Sundarban Tour Package is made to make your trip easy
                and fun from the start. We pick you up from Science City, Howrah
                or Sealdah wherever you want.
              </p>
              <p>
                The Kolkata to Sundarban Tour Package takes care of everything.
                The trip from the city to the Godhkhali ferry ghat takes 3
                hours. You will see the city giving way to the peaceful
                countryside of Bengal.
              </p>
              <p>
                You can sit back in our comfortable cars and watch the scenery
                change. The Kolkata, to Sundarban Tour Package makes sure you
                have a time.
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

          <div className="overflow-hidden  border border-border/50 bg-card shadow-2xl ">
            <div className="relative h-full w-full">
              <Image
                src="/assets/mangrove.jpeg"
                alt="Sundarban mangrove tour"
                width={900}
                height={700}
                className="object-cover h-full"
              />
            </div>
            <div className=" p-6">
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
