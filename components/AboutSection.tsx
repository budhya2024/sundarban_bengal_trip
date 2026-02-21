"use client";

import { useEffect } from "react";
import AOS from "aos";
import { Shield, Award, Heart, Compass } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Expert guides and safety protocols ensure a secure adventure",
  },
  {
    icon: Award,
    title: "15+ Years Experience",
    description: "Trusted by thousands of travelers from around the world",
  },
  {
    icon: Heart,
    title: "Eco-Friendly",
    description: "Committed to sustainable tourism and wildlife conservation",
  },
  {
    icon: Compass,
    title: "Local Expertise",
    description: "Deep knowledge of hidden gems and best viewing spots",
  },
];

export const AboutSection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-10 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            data-aos="fade-right"
            data-aos-duration="800"
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src="/assets/house-boat.jpeg"
                alt="Royal Bengal Tiger"
                className="w-full h-auto object-contain "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            {/* Floating Card */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="absolute -bottom-8 right-0 lg:-right-8 bg-card p-6 rounded-xl shadow-elevated max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-secondary">
                    15+
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    Years of Excellence
                  </p>
                  <p className="text-sm text-muted-foreground">
                    In Wildlife Tourism
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div data-aos="fade-left" data-aos-duration="800">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Your Gateway to the Mystical Sundarbans
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For over 15 years, Sundarban Bengal Trip has been the leading
              travel agency specializing in expeditions to the magnificent
              Sundarbans. Our passion for nature and commitment to sustainable
              tourism has made us the preferred choice for wildlife enthusiasts
              and adventure seekers.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From thrilling tiger spotting safaris to peaceful bird watching
              cruises, we craft personalized experiences that connect you with
              the raw beauty of this UNESCO World Heritage Site.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
