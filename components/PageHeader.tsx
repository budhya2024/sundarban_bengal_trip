"use client";

import Link from "next/link";

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
  return (
    <section className="relative overflow-hidden min-h-[520px] flex items-center pt-32 pb-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/60" />
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 blur-3xl rounded-full" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-white/90 mb-8 text-sm md:text-base font-medium">
            <Link
              href="/"
              className="hover:text-secondary transition-colors"
            >
              Home
            </Link>

            <span>»</span>

            <span className="text-white">{title}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 max-w-5xl">
            {title}
          </h1>

          {/* Line */}
          <div className="w-40 h-[3px] bg-secondary mb-8 rounded-full" />

          {/* Subtitle */}
          <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" /> */}
    </section>
  );
};