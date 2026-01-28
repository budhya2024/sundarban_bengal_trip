import { Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const popularPackages = [
  {
    id: "day-trip",
    name: "Day Trip Package",
    image: "/assets/tour-budget.jpg",
    duration: "1 Day",
    groupSize: "Up to 15",
    price: "₹2,500",
    rating: 4.6,
  },
  {
    id: "weekend",
    name: "Weekend Getaway",
    image: "/assets/tour-adventure.jpg",
    duration: "2 Days / 1 Night",
    groupSize: "Up to 12",
    price: "₹5,500",
    rating: 4.8,
  },
  {
    id: "premium",
    name: "Premium Safari",
    image: "/assets/tour-premium.jpg",
    duration: "3 Days / 2 Nights",
    groupSize: "Up to 8",
    price: "₹12,000",
    rating: 4.9,
  },
];

interface PopularPackagesSectionProps {
  currentPackageId?: string;
}

export const PopularPackagesSection = ({
  currentPackageId,
}: PopularPackagesSectionProps) => {
  // Filter out the current package from the list
  const filteredPackages = popularPackages.filter(
    (pkg) => pkg.id !== currentPackageId,
  );

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Explore More
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Popular Packages
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="font-display text-lg font-bold text-primary-foreground">
                    {pkg.name}
                  </h3>
                  <div className="flex items-center gap-1 text-secondary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-primary-foreground font-medium">
                      {pkg.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta */}
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {pkg.groupSize}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-sm text-muted-foreground">From</span>
                    <p className="font-display text-xl font-bold text-foreground">
                      {pkg.price}
                    </p>
                  </div>
                  <Button variant="nature" size="sm" asChild>
                    <Link href={`/packages/${pkg.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
