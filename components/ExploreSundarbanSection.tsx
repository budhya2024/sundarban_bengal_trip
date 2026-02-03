import { MapPin, Clock, Users, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const highlights = [
  {
    id: 1,
    name: "Sajnekhali",
    description: "Wildlife Sanctuary & Watch Tower",
  },
  { id: 2, name: "Sudhanyakhali", description: "Tiger Spotting Point" },
  { id: 3, name: "Dobanki", description: "Canopy Walk Experience" },
  { id: 4, name: "Netidhopani", description: "Ancient Temple Ruins" },
  { id: 5, name: "Pakhiralaya", description: "Bird Watching Paradise" },
];

const features = [
  {
    icon: MapPin,
    title: "100 km from Kolkata",
    description: "Easy access via road and waterways",
  },
  {
    icon: Clock,
    title: "3-4 Hours Journey",
    description: "Scenic drive through rural Bengal",
  },
  {
    icon: Users,
    title: "Group Tours Available",
    description: "Daily departures from Kolkata",
  },
  {
    icon: Compass,
    title: "Multiple Entry Points",
    description: "Godkhali, Sonakhali, Namkhana",
  },
];

export const ExploreSundarbanSection = () => {
  return (
    <section className="py-10 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Your Gateway
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
            Explore Sundarban from <span className="text-primary">Kolkata</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the world's largest mangrove forest, just a few hours away
            from the City of Joy
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
          {/* Left Side - Details */}
          <div data-aos="fade-right" className="lg:sticky top-24">
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-4 lg:mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card p-5 rounded-xl shadow-soft flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-card p-6 rounded-xl shadow-soft lg:mb-8">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Journey from Kolkata
              </h3>
              <p className="text-muted-foreground mb-4">
                Start your adventure from Kolkata with our comfortable transport
                service. Drive through the picturesque countryside of South 24
                Parganas, crossing rivers and villages, before reaching the
                gateway to Sundarbans.
              </p>
              <p className="text-muted-foreground mb-6">
                Our packages include pickup from Kolkata, all meals, boat
                safari, forest permits, and experienced naturalist guides who
                bring the wilderness to life.
              </p>
              <Button variant="hero" asChild>
                <Link href="/packages">View Tour Packages</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Map with Highlighted Places */}
          <div data-aos="fade-left">
            <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
              {/* Map Container */}
              <div className="relative aspect-square bg-primary/5">
                {/* Embedded Map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.8426837067!2d88.3857764!3d21.9497277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a01a3e93ce0a085%3A0x41bf82cd11ee2b06!2sSundarban%20National%20Park!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sundarban Map"
                />

                {/* Blinking Markers Overlay with Location Pins */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Sajnekhali Marker */}
                  <div className="absolute top-[35%] left-[55%] -translate-x-1/2">
                    <div className="relative flex flex-col items-center">
                      <span className="bg-card text-foreground text-xs font-semibold px-2 py-1 rounded shadow-md mb-1 whitespace-nowrap">
                        Sajnekhali
                      </span>
                      <div className="relative">
                        <span className="flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-destructive">
                            <MapPin className="w-3 h-3 text-white" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sudhanyakhali Marker */}
                  <div className="absolute top-[30%] left-[65%] -translate-x-1/2">
                    <div className="relative flex flex-col items-center">
                      <span className="bg-card text-foreground text-xs font-semibold px-2 py-1 rounded shadow-md mb-1 whitespace-nowrap">
                        Sudhanyakhali
                      </span>
                      <div className="relative">
                        <span className="flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-destructive">
                            <MapPin className="w-3 h-3 text-white" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dobanki Marker */}
                  <div className="absolute top-[45%] left-[50%] -translate-x-1/2">
                    <div className="relative flex flex-col items-center">
                      <span className="bg-card text-foreground text-xs font-semibold px-2 py-1 rounded shadow-md mb-1 whitespace-nowrap">
                        Dobanki
                      </span>
                      <div className="relative">
                        <span className="flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-destructive">
                            <MapPin className="w-3 h-3 text-white" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Netidhopani Marker */}
                  <div className="absolute top-[55%] left-[60%] -translate-x-1/2">
                    <div className="relative flex flex-col items-center">
                      <span className="bg-card text-foreground text-xs font-semibold px-2 py-1 rounded shadow-md mb-1 whitespace-nowrap">
                        Netidhopani
                      </span>
                      <div className="relative">
                        <span className="flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-destructive">
                            <MapPin className="w-3 h-3 text-white" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pakhiralaya Marker */}
                  <div className="absolute top-[40%] left-[45%] -translate-x-1/2">
                    <div className="relative flex flex-col items-center">
                      <span className="bg-card text-foreground text-xs font-semibold px-2 py-1 rounded shadow-md mb-1 whitespace-nowrap">
                        Pakhiralaya
                      </span>
                      <div className="relative">
                        <span className="flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-destructive">
                            <MapPin className="w-3 h-3 text-white" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlighted Places Legend */}
              <div className="p-6 border-t border-border">
                <h4 className="font-display font-semibold text-foreground mb-4">
                  Key Destinations
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {highlights.map((place) => (
                    <div key={place.id} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-destructive flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-2.5 h-2.5 text-white" />
                      </span>
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {place.name}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {place.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
