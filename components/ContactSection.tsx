"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const ContactSection = () => {
  return (
    <section className=" bg-white pt-10 md:pt-20 ">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Contact Us
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              Let’s Plan Your Perfect Sundarban Adventure
            </h2>

            <p className="text-muted-foreground  mb-10">
              Whether you’re planning a family trip, honeymoon, or wildlife
              expedition, our experts are here to craft the perfect experience
              for you.
            </p>

            <Button variant="hero" size="xl" asChild>
              <Link href="/packages" className="group">
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
              <Image
                src="/assets/tourman.jpg"
                alt="Sundarban Tour"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
         
          </div>
        </div>
      </div>
    </section>
  );
};
