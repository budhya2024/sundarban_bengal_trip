"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Users, MapPin, Phone } from "lucide-react";

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
  });

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking form submitted:", formData);
    // Handle form submission
  };

  return (
    <section className="relative z-20 -mt-24">
      <div className="container mx-auto px-4">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="bg-card rounded-2xl shadow-elevated p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Quick Booking
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              Plan Your Adventure
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Name */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="2"
                    min="1"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="pl-10 h-12 bg-background border-border"
                  />
                </div>
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
