import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { X } from "lucide-react";
import galleryTiger from "@/assets/gallery-tiger.jpg";
import galleryBoat from "@/assets/gallery-boat.jpg";
import galleryBird from "@/assets/gallery-bird.jpg";
import galleryDeer from "@/assets/gallery-deer.jpg";
import galleryCrocodile from "@/assets/gallery-crocodile.jpg";
import gallerySunset from "@/assets/gallery-sunset.jpg";
import heroImage from "@/assets/hero-sundarban.jpg";
import tourPremium from "@/assets/tour-premium.jpg";
import tourAdventure from "@/assets/tour-adventure.jpg";

const categories = ["All", "Wildlife", "Landscape", "Activities", "Sunset"];

const galleryImages = [
  { src: galleryTiger, alt: "Royal Bengal Tiger", category: "Wildlife" },
  { src: heroImage, alt: "Aerial View of Sundarbans", category: "Landscape" },
  { src: galleryBoat, alt: "Traditional Boat Safari", category: "Activities" },
  { src: galleryBird, alt: "Kingfisher Bird", category: "Wildlife" },
  { src: galleryDeer, alt: "Spotted Deer", category: "Wildlife" },
  { src: galleryCrocodile, alt: "Saltwater Crocodile", category: "Wildlife" },
  { src: gallerySunset, alt: "Sundarban Sunset", category: "Sunset" },
  { src: tourPremium, alt: "Luxury Houseboat", category: "Activities" },
  { src: tourAdventure, alt: "Wildlife Spotting", category: "Activities" },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Photo Gallery"
        subtitle="Explore stunning captures from the Sundarbans - from majestic tigers to breathtaking sunsets over the mangroves."
        backgroundImage={gallerySunset}
      />

      {/* Gallery */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div
            data-aos="fade-up"
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.alt}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setLightboxImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-primary-foreground font-medium">{image.alt}</p>
                  <span className="text-primary-foreground/70 text-sm">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
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

export default Gallery;
