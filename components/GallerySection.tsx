"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllGalleryItems } from "@/app/actions/gallery.actions";
import { GalleryType } from "@/db/schema";
import { Skeleton } from "@/components/ui/skeleton";

const MASONRY_LAYOUT = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

export const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { success, data } = await getAllGalleryItems(5);
      if (success && data) {
        setGalleryImages(data);
      }
      setLoading(false);
    };
    fetchGalleryImages();
  }, []);

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
            by our travelers.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {loading
            ? // Loading Skeletons
              MASONRY_LAYOUT.map((span, i) => (
                <div
                  key={i}
                  className={`
        ${span} 
        rounded-xl 
        bg-slate-300/80 
        border border-slate-200 
        animate-pulse 
        relative overflow-hidden
      `}
                >
                  {/* Optional: Add a slight gradient shimmer for better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
              ))
            : galleryImages.map((image, index) => {
                // Dynamically assign the span class based on the index
                const spanClass =
                  MASONRY_LAYOUT[index] || "col-span-1 row-span-1";

                return (
                  <div
                    key={image.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className={`${spanClass} relative rounded-xl overflow-hidden group cursor-pointer`}
                  >
                    <img
                      src={image.url}
                      alt={image.title || "Sundarban Gallery"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                      <span className="text-primary-foreground font-medium text-lg">
                        {image.title}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* View All CTA */}
        {!loading && (
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
