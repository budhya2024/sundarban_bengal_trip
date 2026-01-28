"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Users, Star } from "lucide-react";
import Link from "next/link";
import type { HeroContent } from "@/lib/content";

// Icon mapping
const iconMap = {
  MapPin,
  Users,
  Star,
};

export const HeroSection = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.refresh();
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content/home");
      if (response.ok) {
        const data = await response.json();
        setContent(data.hero);
      }
    } catch (error) {
      console.error("Failed to load hero content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback content while loading or if fetch fails
  if (isLoading || !content) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={content.posterUrl}
        >
          <source src={content.videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up" data-aos-duration="600">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary font-medium text-sm mb-6 backdrop-blur-sm border border-secondary/30">
              {content.tag}
            </span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            {content.title}{" "}
            <span className="text-secondary">{content.titleHighlight}</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
            className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {content.description}
          </p>

          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button variant="hero" size="xl" asChild>
              <Link href={content.buttons.primary.link}>
                {content.buttons.primary.text}
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link href={content.buttons.secondary.link}>
                {content.buttons.secondary.text}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="400"
            className="grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {content.stats.map((stat, index) => {
              const IconComponent =
                iconMap[stat.icon as keyof typeof iconMap] || MapPin;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-secondary mb-1">
                    <IconComponent className="w-5 h-5" />
                    <span className="font-display text-2xl md:text-3xl font-bold">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-primary-foreground/70 text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="text-primary-foreground/60">
            <ChevronDown className="w-8 h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};
