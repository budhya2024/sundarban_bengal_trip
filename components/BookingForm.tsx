"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Package,
  ChevronDown,
} from "lucide-react";

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    package: "",
  });

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking form submitted:", formData);
  };

  return (
    <section className="relative z-20 -mt-24 ">
      <div className="container px-4">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="bg-card rounded-2xl shadow-elevated p-5 md:p-10"
        >
          <div className="text-center mb-5 md:mb-10">
           
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              Plan Your Adventure
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Name */}
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder=" Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder=" Your  email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder=" Your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    min="1"
                    placeholder="2"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Package Dropdown */}
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <select
                  value={formData.package}
                  onChange={(e) =>
                    setFormData({ ...formData, package: e.target.value })
                  }
                  className="w-full h-12 pl-10 pr-12 rounded-md border border-border 
               bg-background text-foreground appearance-none
               cursor-pointer "
                >
                  <option value="">Select Package</option>
                  <option value="1-night">1 Night / 2 Days</option>
                  <option value="2-night">2 Nights / 3 Days</option>
                  <option value="luxury">Luxury Sundarban Tour</option>
                  <option value="custom">Custom Package</option>
                </select>

                {/* Custom Arrow */}
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div className="text-center">
              <Button type="submit" variant="hero" size="xl">
                Check Availability
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
