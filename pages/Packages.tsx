import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Check, MapPin, Calendar } from "lucide-react";
import tourPremium from "@/assets/tour-premium.jpg";
import tourAdventure from "@/assets/tour-adventure.jpg";
import tourBudget from "@/assets/tour-budget.jpg";
import heroImage from "@/assets/hero-sundarban.jpg";

const packages = [
  {
    id: 1,
    name: "Explorer Day Trip",
    image: tourBudget,
    duration: "1 Day",
    groupSize: "10-15",
    price: "₹2,499",
    originalPrice: "₹3,499",
    rating: 4.7,
    reviews: 124,
    description: "Perfect for first-time visitors, this day trip covers the essential Sundarban experience with boat safari and wildlife spotting.",
    features: [
      "Guided boat safari",
      "Wildlife spotting",
      "Traditional Bengali lunch",
      "Photography stops",
      "Pick-up from Kolkata",
    ],
  },
  {
    id: 2,
    name: "Weekend Getaway",
    image: tourAdventure,
    duration: "2 Days / 1 Night",
    groupSize: "8-12",
    price: "₹6,999",
    originalPrice: "₹8,999",
    rating: 4.8,
    reviews: 89,
    description: "An immersive experience with overnight camping, multiple safaris, and cultural encounters with local villages.",
    features: [
      "Camping experience",
      "Multiple safari rides",
      "Bird watching tour",
      "Local village visit",
      "All meals included",
      "Bonfire evening",
    ],
  },
  {
    id: 3,
    name: "Premium Safari",
    image: tourPremium,
    duration: "3 Days / 2 Nights",
    groupSize: "6-8",
    price: "₹12,999",
    originalPrice: "₹15,999",
    rating: 4.9,
    reviews: 156,
    popular: true,
    description: "Our flagship experience featuring luxury houseboat accommodation, tiger territory exploration, and exclusive access to restricted areas.",
    features: [
      "Luxury houseboat stay",
      "Tiger territory exploration",
      "All meals included",
      "Professional naturalist",
      "Night safari experience",
      "Mangrove walk",
      "Photography guidance",
    ],
  },
  {
    id: 4,
    name: "Photography Expedition",
    image: heroImage,
    duration: "4 Days / 3 Nights",
    groupSize: "4-6",
    price: "₹24,999",
    originalPrice: "₹29,999",
    rating: 5.0,
    reviews: 42,
    description: "Designed for serious photographers, this expedition focuses on wildlife photography with expert guidance and optimal timing.",
    features: [
      "Photography expert guide",
      "Golden hour sessions",
      "Hide photography setup",
      "Premium equipment support",
      "Luxury accommodation",
      "All meals included",
      "Post-processing workshop",
    ],
  },
];

const Packages = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Tour Packages"
        subtitle="Choose from our carefully curated packages designed to give you the best Sundarban experience within your budget and timeline."
        backgroundImage={tourPremium}
      />

      {/* Packages */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                data-aos="fade-up"
                className={`grid lg:grid-cols-2 gap-8 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative lg:sticky lg:top-24 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-[400px] object-cover"
                    />
                    {pkg.popular && (
                      <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium">
                        Most Popular
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-secondary fill-current" />
                      <span className="font-semibold">{pkg.rating}</span>
                      <span className="text-muted-foreground">({pkg.reviews} reviews)</span>
                    </div>
                  </div>

                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {pkg.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      {pkg.groupSize} people
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground line-through">
                        {pkg.originalPrice}
                      </span>
                      <p className="font-display text-3xl font-bold text-foreground">
                        {pkg.price}
                        <span className="text-sm font-normal text-muted-foreground"> / person</span>
                      </p>
                    </div>
                    <Button variant="hero" size="lg">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Info */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div data-aos="fade-up">
              <MapPin className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">Pick-up Available</h3>
              <p className="text-sm text-muted-foreground">Free pick-up from Kolkata included in all packages</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <Calendar className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">Flexible Dates</h3>
              <p className="text-sm text-muted-foreground">Tours available year-round, best season Oct-Mar</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <Star className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-sm text-muted-foreground">Full refund if you don't love the experience</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Packages;
