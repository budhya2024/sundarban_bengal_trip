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
    <section className="relative overflow-hidden min-h-[260px] sm:min-h-[320px] md:min-h-[440px] flex items-center pt-28 sm:pt-32 md:pt-44 pb-10 sm:pb-14 md:pb-24">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 blur-3xl rounded-full" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/90 mb-2.5 sm:mb-3.5 text-xs sm:text-sm font-medium">
            <Link
              href="/"
              className="hover:text-secondary transition-colors"
            >
              Home
            </Link>

            <span>»</span>

            <span className="text-white line-clamp-1">{title}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed  mb-2.5 sm:mb-3.5 max-w-4xl">
            {title}
          </h1>

          {/* Line */}
          <div className="w-16 sm:w-24 md:w-32 h-[2.5px] bg-secondary mb-2.5 sm:mb-3.5 rounded-full" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl line-clamp-2 sm:line-clamp-none">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" /> */}
    </section>
  );
};