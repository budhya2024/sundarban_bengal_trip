"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
} from "lucide-react";
import ContactUsForm from "@/components/ContactUsForm";
import { ContactPageValues } from "@/schemas/adminContact.schema";

const DEFAULT_CONTACT_DATA = {
  heroTitle: "Contact Us",
  heroSubtitle:
    "Have questions about our tours? We're here to help you plan the perfect Sundarban adventure.",
  heroImage: "/assets/hero-sundarban.jpg",
  phones: [{ value: "+917074432628" }, { value: "+91 87654 32109" }],
  emails: [
    { value: "sundarbanbengaltrip@gmail.com" },
    { value: "bookings@sundarbantours.com" },
  ],
  address: "123 Forest Road, Canning, South 24 Parganas, WB - 743329",
  schedules: [
    { value: "Mon - Sat: 9:00 AM - 6:00 PM" },
    { value: "Sunday: 10:00 AM - 4:00 PM" },
  ],
  sidebarHeadline: "Need Immediate Help?",
  sidebarDescription:
    "Our travel experts are available to assist you with booking and itinerary customization.",
  whatsappNumber: "9876543210",
};

const ContactPage = ({ data }: { data: ContactPageValues | null }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our travel experts",
      details:
        data?.phones.map((phone) => `+91 ${phone.value}`) ||
        DEFAULT_CONTACT_DATA.phones.map((phone) => phone.value),
      color: "bg-primary",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      details:
        data?.emails.map((email) => email.value) ||
        DEFAULT_CONTACT_DATA.emails.map((email) => email.value),
      color: "bg-secondary",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      details: data?.address ? [data?.address] : [DEFAULT_CONTACT_DATA.address],
      color: "bg-accent",
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "We're available for you",
      details:
        data?.schedules.map((schedule) => schedule.value) ||
        DEFAULT_CONTACT_DATA.schedules.map((schedule) => schedule.value),
      color: "bg-primary",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title={data?.heroTitle || DEFAULT_CONTACT_DATA.heroTitle}
        subtitle={data?.heroSubtitle || DEFAULT_CONTACT_DATA.heroSubtitle}
        backgroundImage={data?.heroImage || DEFAULT_CONTACT_DATA.heroImage}
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
            <ContactUsForm />
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
                    {data?.sidebarHeadline ||
                      DEFAULT_CONTACT_DATA.sidebarHeadline}
                  </h3>
                </div>
                <p className="text-primary-foreground/80 mb-6">
                  {data?.sidebarDescription ||
                    DEFAULT_CONTACT_DATA.sidebarDescription}
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-secondary font-semibold hover:text-secondary/80 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {data?.whatsappNumber ||
                      DEFAULT_CONTACT_DATA.whatsappNumber}
                  </a>
                  <a
                    href={`https://wa.me/${data?.whatsappNumber || DEFAULT_CONTACT_DATA.whatsappNumber}`}
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

export default ContactPage;
