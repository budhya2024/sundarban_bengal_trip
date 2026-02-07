import { Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PackageValues } from "@/schemas/package.schema";
import { getPopularPackages } from "@/app/actions/package.actions";
import { useEffect, useState } from "react";

interface PopularPackage extends PackageValues {
  id: string;
  key: string;
}

export const PopularPackagesSection = ({
  excludePackage,
}: {
  excludePackage: string;
}) => {
  const [popularPackages, setPopularPackages] = useState<PopularPackage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularPackages = async () => {
      setLoading(true);
      const { success, data, error } = await getPopularPackages(excludePackage);
      if (success) {
        setPopularPackages(data);
      }
      setLoading(false);
    };
    fetchPopularPackages();
  }, []);

  if (loading || popularPackages.length === 0) return null;

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
          {popularPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.packageImage}
                  alt={pkg.packageName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="font-display text-lg font-bold text-primary-foreground">
                    {pkg.packageName}
                  </h3>
                  {/* <div className="flex items-center gap-1 text-secondary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-primary-foreground font-medium">
                      {pkg.rating}
                    </span>
                  </div> */}
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
                    {/* <span className="text-sm text-muted-foreground">From</span> */}
                    <p className="font-display text-xl font-bold text-foreground">
                      {pkg.price}
                    </p>
                  </div>
                  <Button variant="nature" size="sm" asChild>
                    <Link href={`/packages/${pkg.key}`}>View Details</Link>
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
