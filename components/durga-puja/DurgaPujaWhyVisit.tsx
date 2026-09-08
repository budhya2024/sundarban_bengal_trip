"use client";

import React from "react";
import { TreePine, Ship, Sparkles, Home, Utensils, Camera } from "lucide-react";

export const DurgaPujaWhyVisit = () => {
  const reasons = [
    {
      icon: TreePine,
      title: "শ্বাসরোধ জঙ্গল ও প্রকৃতির সৌন্দর্য",
    },
    {
      icon: Ship,
      title: "নদীপথে বোট ভ্রমণ",
    },
    {
      icon: Sparkles,
      title: "Royal Bengal Tiger দেখার সুযোগ",
    },
    {
      icon: Home,
      title: "গ্রামীণ জীবন ও সংস্কৃতি",
    },
    {
      icon: Utensils,
      title: "সুস্বাদু খাবার ও আরামদায়ক থাকা",
    },
    {
      icon: Camera,
      title: "অসাধারণ ছবি তোলার সুযোগ",
    },
  ];

  return (
    <section id="why-visit" className="py-8 sm:py-12 bg-[#FAF9F5] font-bengali">
      <div className="container">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D3B22] tracking-tight">
            কেন এই পুজোয় সুন্দরবন যাবেন?
          </h2>
          <p className="text-sm sm:text-base text-[#1E5136] font-medium mt-2">
            প্রকৃতি, অ্যাডভেঞ্চার আর সংস্কৃতির এক অনন্য মেলবন্ধন
          </p>
        </div>

        {/* 6 Circular Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center" data-aos="fade-up" data-aos-delay="100">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E5EFE4] border-2 border-[#D1E2CF] flex items-center justify-center text-[#0D3B22] mb-3.5 shadow-sm group-hover:bg-[#D5E8D3] transition-colors duration-300">
                <item.icon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.7]" />
              </div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug px-1">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DurgaPujaWhyVisit;
