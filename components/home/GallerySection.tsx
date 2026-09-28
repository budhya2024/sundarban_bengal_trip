"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllGalleryItems } from "@/app/actions/gallery.actions";
import { GalleryType } from "@/db/schema";

export const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { success, data } = await getAllGalleryItems(4);
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
    <section className="py-10 md:py-16">
      <div className="container">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Gallery
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
            Sundarban Jungle Safari Moments
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the stunning wildlife and breathtaking landscapes captured
            by our travelers.
          </p>
        </div>

        {/* Gallery Grid — 2 columns × 2 rows = 4 images */}
        <div className="grid grid-cols-2 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl bg-slate-300/80 border border-slate-200 animate-pulse relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            ))
            : galleryImages.slice(0, 4).map((image, index) => (
              <div
                key={image.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.url}
                  alt={image.title || "Sundarban Gallery"}
                  fill
                  sizes="(max-width: 768px) 50vw, 50vw"
                  quality={85}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300" />
                <div className="absolute inset-4 border border-white/50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                  <span className="text-primary-foreground font-semibold text-lg drop-shadow">
                    {image.title}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* View All CTA */}
        {!loading && (
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center mt-12"
          >
            <Button variant="hero" size="lg" asChild>
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
