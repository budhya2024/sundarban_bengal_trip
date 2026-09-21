import Image from "next/image";

export const CostHero = () => {
  return (
    <section className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[440px] flex items-center pt-28 sm:pt-32 md:pt-44 pb-10 sm:pb-14 md:pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/howrah-bridge-howrah-west-bengal-city-1-hero.jpeg"
          alt="Sundarban Tour Cost from Kolkata"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-brightness-75" />
      </div>

      <div className="container relative z-10 flex h-full items-center">
        <div className="max-w-3xl text-white">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2.5 sm:mb-3.5">
            Sundarban Tour Cost from Kolkata
          </h1>
          <div className="w-16 sm:w-24 md:w-32 h-[2.5px] bg-secondary mb-2.5 sm:mb-3.5 rounded-full" />
          <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
            Sundarban Tour Cost from Kolkata – Complete Package Price Guide for Budget, Family &amp; Luxury Travelers
          </p>
        </div>
      </div>
    </section>
  );
};
