"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { X, ImageOff, RefreshCcw } from "lucide-react";
import { GalleryType } from "@/db/schema";

const ITEMS_PER_LOAD = 6;

const GalleryPage = ({
  galleryItems,
  categories,
}: {
  galleryItems: GalleryType[];
  categories: string[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [selectedCategory]);

  const filteredImages =
    selectedCategory.toLowerCase() === "all"
      ? galleryItems
      : galleryItems.filter(
          (img) =>
            img.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Photo Gallery"
        subtitle="Explore stunning captures from the Sundarbans - from majestic tigers to breathtaking sunsets over the mangroves."
        backgroundImage="/assets/house-boat.jpeg"
      />

      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          {galleryItems.length > 0 && (
            <div
              data-aos="fade-up"
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {visibleImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleImages.map((image, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                    onClick={() => setLightboxImage(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-primary-foreground font-medium">
                        {image.title}
                      </p>
                      <span className="text-primary-foreground/70 text-sm">
                        {image.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* LOAD MORE BUTTON */}
              {visibleCount < filteredImages.length && (
                <div
                  data-aos="fade-up"
                  className="flex justify-center mt-14"
                >
                  <button
                    onClick={() =>
                      setVisibleCount((prev) => prev + ITEMS_PER_LOAD)
                    }
                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            /* EMPTY STATE */
            <div
              data-aos="fade-up"
              className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-muted rounded-3xl"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <ImageOff className="w-10 h-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                {galleryItems.length === 0
                  ? "Gallery is Empty"
                  : `No photos in ${selectedCategory}`}
              </h3>
              <p className="text-muted-foreground max-w-xs mb-8">
                {galleryItems.length === 0
                  ? "We are currently updating our collection. Please check back later."
                  : `We couldn't find any photos under ${selectedCategory}.`}
              </p>

              {galleryItems.length > 0 && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  <RefreshCcw size={16} />
                  View All Photos
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </main>
  );
};

export default GalleryPage;