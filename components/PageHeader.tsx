"use client";
import { useEffect } from "react";
import AOS from "aos";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

export const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
}: PageHeaderProps) => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="relative pt-32 pb-24 min-h-[400px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};
