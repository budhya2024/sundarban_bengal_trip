"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our travel experts",
    details: ["+91 98765 43210", "+91 87654 32109"],
    color: "bg-primary",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    details: ["info@sundarbantours.com", "bookings@sundarbantours.com"],
    color: "bg-secondary",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    details: ["123 Forest Road, Canning", "South 24 Parganas, WB - 743329"],
    color: "bg-accent",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "We're available for you",
    details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    color: "bg-primary",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully!",
      description: "Our team will get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Contact Us"
        subtitle="Have questions about our tours? We're here to help you plan the perfect Sundarban adventure."
        backgroundImage="/assets/hero-sundarban.jpg"
      />

      {/* Contact Cards */}
      <section className="py-16 bg-background -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, index) => (
              <div
                key={card.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card rounded-2xl p-6 shadow-elevated hover:shadow-glow transition-all duration-300 border border-border group"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <card.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {card.description}
                </p>
                {card.details.map((detail) => (
                  <p
                    key={detail}
                    className="text-foreground font-medium text-sm"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div
              data-aos="fade-right"
              className="lg:col-span-3 bg-card rounded-3xl p-8 md:p-10 shadow-elevated"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    We'll respond as quickly as possible
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-background border-border h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg-background border-border h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-background border-border h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="bg-background border-border h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Message *
                  </label>
                  <Textarea
                    placeholder="Tell us about your travel plans, questions, or special requirements..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Map */}
              <div
                data-aos="fade-left"
                className="rounded-3xl overflow-hidden h-[300px] shadow-elevated"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.5631094339!2d88.26495045!3d21.9497277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02db8cb3ffbfb1%3A0x6e3e2d2b4e2f2b2b!2sSundarban%20National%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sundarban Location"
                />
              </div>

              {/* Quick Contact */}
              <div
                data-aos="fade-left"
                data-aos-delay="100"
                className="bg-primary rounded-3xl p-8 text-primary-foreground"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Headphones className="w-8 h-8" />
                  <h3 className="font-display text-xl font-bold">
                    Need Immediate Help?
                  </h3>
                </div>
                <p className="text-primary-foreground/80 mb-6">
                  Our travel experts are available to assist you with booking,
                  itinerary customization, and any questions.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-secondary font-semibold hover:text-secondary/80 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +91 98765 43210
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#22c55e] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
