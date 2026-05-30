import Image from "next/image";

export const CostHero = () => {
  return (
    <section className="relative min-h-[520px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/howrah-bridge-howrah-west-bengal-city-1-hero"
          alt="Sundarban Tour Cost from Kolkata"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-brightness-75" />
      </div>

      <div className="container relative z-10 flex h-full items-center">
        <div className="max-w-3xl py-24 text-white">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Sundarban Tour Cost from Kolkata
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/90">
            Sundarban Tour Cost from Kolkata – Complete Package Price Guide for Budget, Family & Luxury Travelers
          </p>
        </div>
      </div>
    </section>
  );
};
