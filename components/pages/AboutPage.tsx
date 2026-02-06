"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Target, Eye, Shield, Heart, Leaf, Award } from "lucide-react";
import { AboutValues } from "@/schemas/about.schema";

// const team = [
//   {
//     name: "Rajiv Banerjee",
//     role: "Founder & Lead Guide",
//     experience: "18 years in wildlife tourism",
//   },
//   {
//     name: "Priya Mukherjee",
//     role: "Operations Manager",
//     experience: "12 years of tour planning",
//   },
//   {
//     name: "Arun Das",
//     role: "Senior Naturalist",
//     experience: "15 years studying Sundarban wildlife",
//   },
// ];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your safety is our top priority. Our expert guides and well-maintained equipment ensure a secure adventure.",
  },
  {
    icon: Heart,
    title: "Passion for Nature",
    description:
      "We're deeply passionate about the Sundarbans and committed to sharing its wonders responsibly.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description:
      "We practice sustainable tourism to preserve the fragile ecosystem for future generations.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "With 15+ years of experience, we deliver exceptional service that exceeds expectations.",
  },
];

const AboutPage = ({ data }: { data: AboutValues }) => {
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
        title={data.heroTitle || "About Sundarban Tours"}
        subtitle={
          data.heroSubtitle ||
          "For over 15 years, we've been the trusted gateway to the magnificent Sundarbans, helping thousands of travelers experience the magic of the world's largest mangrove forest."
        }
        backgroundImage={data.heroImage || "/assets/hero-sundarban.jpg"}
      />

      {/* Story Section */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                {data.storyTitle || "A Journey Born from Passion"}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {data.storyDescription || (
                  <>
                    <p>
                      Sundarban Tours was founded in 2009 by Rajiv Banerjee, a
                      lifelong nature enthusiast who grew up in the villages
                      surrounding the Sundarban delta. His deep connection to
                      the land and its wildlife inspired him to share this
                      incredible ecosystem with the world.
                    </p>
                    <p>
                      What started as small group expeditions has grown into the
                      region's most trusted travel agency, serving over 50,000
                      travelers from across the globe. Yet, we've never lost
                      sight of our core mission: to provide authentic,
                      sustainable, and life-changing experiences.
                    </p>
                    <p>
                      Today, our team includes experienced naturalists, skilled
                      boat operators, and hospitality professionals who share
                      our passion for the Sundarbans and commitment to
                      excellence.
                    </p>
                  </>
                )}
              </div>
            </div>

            <div data-aos="fade-left" className="relative">
              <img
                src={data.storyImage || "/assets/gallery-tiger.jpg"}
                alt="Royal Bengal Tiger"
                className="rounded-2xl shadow-elevated w-full h-[400px] object-cover"
              />
              {/* <img
                src="/assets/gallery-boat.jpg"
                alt="Boat Safari"
                className="absolute -bottom-8 -left-8 w-48 h-48 rounded-xl shadow-elevated object-cover border-4 border-background"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10 md:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              data-aos="fade-up"
              className="bg-card rounded-2xl p-8 shadow-soft"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {data.ourMissionContent ||
                  `To provide safe, authentic, and memorable wildlife experiences
                while promoting conservation awareness and supporting local
                communities in the Sundarban region.`}
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-card rounded-2xl p-8 shadow-soft"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {data.ourVisionContent ||
                  `To be the leading sustainable tourism operator in the
                Sundarbans, recognized globally for our commitment to wildlife
                conservation, community development, and exceptional travel
                experiences.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="text-center mb-8 md:mb-16">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Drives Us
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-10 md:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="text-center mb-8 md:mb-16">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-2">
              Meet the Experts
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-secondary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-secondary font-medium text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-primary-foreground/60 text-sm">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
};

export default AboutPage;
