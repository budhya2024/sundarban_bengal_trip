"use client";

import React from "react";
import { Zap, Bus, Utensils, Ship, Hotel } from "lucide-react";

export const DurgaPujaHighlights = () => {
  const items = [
    {
      icon: Zap,
      title: "৩ দিন ২ রাত",
      subtitle: "অল-ইনক্লুসিভ প্যাকেজ",
    },
    {
      icon: Bus,
      title: "কলকাতা থেকে যাতায়াত",
      subtitle: "পিক-আপ ও ড্রপ সুবিধা",
    },
    {
      icon: Utensils,
      title: "পূজো স্পেশাল মেনু",
      subtitle: "ইলিশ, চিংড়ি ও খাঁটি বাঙালি খাবার",
    },
    {
      icon: Ship,
      title: "প্রাইভেট বোট সাফারি",
      subtitle: "অভিজ্ঞ গাইড সহ ট্রিপ",
    },
    {
      icon: Hotel,
      title: "প্রিমিয়াম এসি রিসোর্ট",
      subtitle: "আরামদায়ক ও নিরাপদ থাকা",
    },
  ];

  return (
    <section id="highlights" className="relative -mt-6 z-20 font-bengali">
      <div className="container">
        <div className="bg-[#F7F6F0] rounded-xl shadow-md border border-[#E2DFC8] p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-slate-800 border border-[#E2DFC8]/80 hover:border-emerald-600/60 shadow-xs flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-lg h-full transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2.5 shrink-0 bg-emerald-50 text-emerald-800">
                  <item.icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="font-bold text-sm sm:text-base leading-tight mb-1 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] leading-snug text-slate-600">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DurgaPujaHighlights;
