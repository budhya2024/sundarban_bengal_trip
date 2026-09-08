"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";

export const DurgaPujaReviews = () => {
  const reviews = [
    {
      name: "অরিন্দম মুখার্জী",
      location: "সল্টলেক, কলকাতা",
      image: "/assets/review-user-1.jpg",
      trip: "৩ দিন ২ রাত পূজা স্পেশাল",
      comment:
        "গত বছর পুজোয় পুরো পরিবার নিয়ে সুন্দরবন বেঙ্গল ট্রিপের সাথে গিয়েছিলাম। কলকাতা থেকে পিকআপ, Sundar Sonar Bangla হোটেলের লাক্সারি রুম এবং নদীর বুকে বোট সাফারি—সবকিছুই নিখুঁত ছিল। বিশেষ করে দুপুরের খাঁটি ইলিশ ও চিংড়ির মালাইকারি ছিল অপূর্ব!",
      rating: 5,
    },
    {
      name: "ডঃ সুস্মিতা ব্যানার্জী",
      location: "বালিগঞ্জ, কলকাতা",
      image: "/assets/review-user-2.jpg",
      trip: "ফ্যামিলি গ্রুপ ট্যুর",
      comment:
        "বাচ্চা এবং বয়স্ক বাবা-মাকে নিয়ে যাওয়া সত্ত্বেও এতটুকু ক্লান্তি লাগেনি। অভিজ্ঞ ট্রাভেল গাইড আমাদের সজনেখালি ও দোবঙ্কির ক্যানোপি ওয়াকে চমৎকারভাবে ঘুরিয়েছেন। পুজোয় পরিবারের সঙ্গে কাটানো অন্যতম সেরা ছুটির অভিজ্ঞতা!",
      rating: 5,
    },
    {
      name: "রাহুল দত্ত",
      location: "হাওড়া",
      image: "/assets/review-user-3.jpg",
      trip: "কাপল প্রিমিয়াম প্যাকেজ",
      comment:
        "নদীর বুকে সূর্যাস্ত এবং রাতে রিসোর্টে লোকনৃত্যের আসর সত্যিই মন ছুঁয়ে গেছে। সময়মতো খাঁটি বাঙালি খাবার পরিবেশন এবং সম্পূর্ণ নিরাপত্তা ব্যবস্থা অত্যন্ত প্রশংসনীয়। সুন্দরবনে ট্যুরের জন্য এনাদের সার্ভিস ১০০% রিকমেন্ডেড!",
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="py-8 sm:py-12 bg-[#FAF9F5] font-bengali">
      <div className="container">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D3B22] tracking-tight">
            আমাদের পর্যটকদের আসল অভিজ্ঞতা ও মতামত
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            শত শত আনন্দিত পর্যটকদের বিশ্বস্ত ভ্রমণ অভিজ্ঞতা
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6" data-aos="fade-up" data-aos-delay="100">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-white rounded-sm p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                {/* User Header with Photo & Verified Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-700/50 shadow-sm shrink-0">
                    <Image
                      src={rev.image}
                      alt={rev.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {rev.name}
                    </h3>
                    <p className="text-xs text-slate-500">{rev.location}</p>
                  </div>
                </div>

                {/* Tour Type Tag */}
                <div className="mb-3">
                  <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-sm border border-emerald-200/60">
                    {rev.trip}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[#EAB308]">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="flex gap-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Guest
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DurgaPujaReviews;
