"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const galleryImages = [
  {
    src: "/assets/gallery-tiger.jpg",
    alt: "Royal Bengal Tiger",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/assets/gallery-boat.jpg",
    alt: "Traditional Boat Safari",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/gallery-bird.jpg",
    alt: "Kingfisher Bird",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/gallery-deer.jpg",
    alt: "Spotted Deer",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/assets/gallery-crocodile.jpg",
    alt: "Saltwater Crocodile",
    span: "col-span-1 row-span-1",
  },
  
];

export const GallerySection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-10 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Gallery
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Moments from the Wild
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the stunning wildlife and breathtaking landscapes captured
            by our travelers during their Sundarban adventures.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`${image.span} relative rounded-xl overflow-hidden group cursor-pointer`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-primary-foreground font-medium text-lg">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
