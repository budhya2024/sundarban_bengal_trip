"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const DurgaPujaItinerary = () => {
  const days = [
    {
      day: "Day 1",
      title: "কলকাতা থেকে সুন্দরবন যাত্রা ও প্রথম দিন",
      image: "/assets/pickup.jpeg",
      points: [
        "কলকাতা থেকে আরামদায়ক যাত্রা (পিক-আপ পয়েন্ট থেকে শুরু)",
        "সুন্দরবনে স্বাগতম ও প্রিমিয়াম রিসোর্টে চেক-ইন",
        "তাজা ও সুস্বাদু মধ্যাহ্নভোজ (Lunch)",
        "বিকেলের মনোরম লোকাল সাইটসিয়িং",
        "সন্ধ্যায় লোকনৃত্য ও ঝুলন/সাংস্কৃতিক অনুষ্ঠান (Cultural Night)",
        "গরম গরম নৈশভোজ ও আরামদায়ক নাইট স্টে",
      ],
    },
    {
      day: "Day 2",
      title: "আসল রোমাঞ্চ ও গভীর জঙ্গল অভিযান",
      image: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
      points: [
        "সকালের পুষ্টিকর প্রাতরাশ (Breakfast)",
        "সারাদিনের রোমাঞ্চকর বোট সাফারি",
        "ম্যানগ্রোভ ফরেস্ট ও ওয়াচটাওয়ার এক্সপ্লোরেশন",
        "রয়েল বেঙ্গল টাইগার ও বন্যপ্রাণী দেখার সুযোগ",
        "নদীর বুকে স্পেশাল লাঞ্চ ও আইল্যান্ড ভিজিট",
        "সন্ধ্যায় নদীর পাড়ে চা-স্ন্যাক্স ও স্পেশাল ডিনার",
      ],
    },
    {
      day: "Day 3",
      title: "মধুর স্মৃতি নিয়ে ঘরের পথে রওনা",
      image: "/assets/sundarban-beaury.avif",
      points: [
        "সকালের প্রাতরাশ ও রিফ্রেশমেন্ট",
        "সকালের শেষ মুহূর্তের সাইটসিয়িং ও কেনাকাটা",
        "রিসোর্ট থেকে চেক-আউট ও দুপুরের খাবার",
        "মিষ্টি স্মৃতি সাথে নিয়ে কলকাতার উদ্দেশ্যে রওনা",
      ],
    },
  ];

  return (
    <section id="itinerary" className="py-8 sm:py-12 bg-white font-bengali">
      <div className="container">
        {/* Centered Red Ribbon Title */}
        <div className="text-center mb-6 sm:mb-8" data-aos="fade-up">
          <div className="inline-block bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-black text-lg sm:text-2xl md:text-3xl px-8 sm:px-12 py-2.5 sm:py-3 rounded-full shadow-lg">
            ৩ দিন ২ রাতের সম্পূর্ণ ট্যুর প্ল্যান
          </div>
        </div>

        {/* 3 Day Cards Grid */}
        <div
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {days.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Day Badge */}
                <div className="absolute top-3 left-3 bg-[#0D3B22] text-white text-xs font-bold px-3 py-1 rounded-md shadow">
                  {item.day}
                </div>
              </div>

              {/* Itinerary Title & Points */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-start">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 min-h-[3.25rem] flex items-center">
                  {item.title}
                </h3>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 flex-1">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DurgaPujaItinerary;
