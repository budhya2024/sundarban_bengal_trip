import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

export const BookingContact = () => {
  return (
    <section className="py-8 md:py-16 text-foreground bg-muted">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <h4 className="font-display text-lg md:text-xl xl:text-2xl  font-bold leading-tight text-foreground">
              Explore Sajnekhali, Dobanki, Mangrove Forest & Royal Bengal Tiger Area
            </h4>

            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                With our Sundarban Bengal Trip - Tours & Travel agency you will easily cover the major attractions of Sundarban which are included in our every Sundarban tour package from Kolkata. Like visiting Sajnekhali Watch Tower, Dobanki Canopy Walk, Sudhanyakhali Watch Tower, Pakhiralay, and several beautiful river routes inside the mangrove forest.
              </p>
              <p>
                Every tourist can easily enjoy the deep nature and raw beauty of Sundarban’s whole nature. You can even spot wildlife animals with proper safety with our Tour guides like watching crocodiles, deer, exotic birds, and the famous Royal Bengal Tiger. So come and enjoy the immense beauty of Sundarban’s nature and the whole environment with our best sundarban tour package from kolkata. Our Mobile No- <strong>+91 70744 32628</strong> ,  Mail- <strong>sundarbanbengaltrip@gmail.com</strong>.
              </p>
            </div>


          </div>

          <div className="overflow-hidden border border-border/50 bg-card shadow-2xl">
            <div className="relative h-auto w-full">
              <Image
                src="/assets/sundarban-tiger.jpeg"
                alt="sundarban tiger photo"
                height={400}
                width={600}
                className="object-cover h-64 w-full"
              />
            </div>
            <div className="bg-background/90 p-4">
              <p className="text-sm uppercase tracking-wider text-secondary">
                Sundarban Bengal Trip
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Book today and experience the best of Sundarban wildlife, rivers, and local culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
