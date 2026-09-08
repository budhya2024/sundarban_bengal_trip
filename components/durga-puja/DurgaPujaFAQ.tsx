"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const DurgaPujaFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const col1 = [
    {
      q: "ট্যুরের মেয়াদ কতদিন?",
      a: "আমাদের এই বিশেষ পূজো প্যাকেজটি ৩ দিন ও ২ রাতের।",
    },
    {
      q: "কখন বুকিং করা ভালো?",
      a: "পূজোর সময় সিট সংখ্যা অত্যন্ত সীমিত থাকে। শেষ মুহূর্তের ভিড় এড়াতে এবং ২০% ডিসকাউন্ট পেতে আজই বুকিং করা ভালো।",
    },
    {
      q: "খাবার কি অন্তর্ভুক্ত আছে?",
      a: "হ্যাঁ, একদম! সকালের প্রাতরাশ থেকে শুরু করে দুপুরের খাঁটি বাঙালি থালি (ইলিশ/চিংড়ি সহ), বিকেলের স্ন্যাক্স এবং নৈশভোজ—সবই প্যাকেজের অন্তর্ভুক্ত।",
    },
    {
      q: "কোন কোন জায়গা ঘোরানো হবে?",
      a: "সজনেখালি ওয়াচটাওয়ার, দোবাঙ্কি ক্যানোপি ওয়াক, সুধন্যখালি এবং নদীর বুকে রোমাঞ্চকর বোট সাফারি করানো হবে।",
    },
  ];

  const col2 = [
    {
      q: "হোটেল বা রিসোর্ট কেমন হবে?",
      a: "আপনার থাকার জন্য থাকছে সুসজ্জিত এসি রুম, প্রয়োজনীয় সব আধুনিক সুবিধা এবং মনোরম পরিবেশযুক্ত প্রিমিয়াম রিসোর্ট (Sundar Sonar Bangla Hotel)।",
    },
    {
      q: "কীভাবে পেমেন্ট করবেন?",
      a: "আপনি UPI (PhonePe/Google Pay), ব্যাঙ্ক ট্র্যান্সফার বা ক্যাশের মাধ্যমে সহজে অ্যাডভান্স বুকিং করতে পারবেন।",
    },
    {
      q: "ক্যানসোলেশন পলিসি কী?",
      a: "যেকোনো জরুরি পরিস্থিতিতে ট্রিপ বাতিল বা ডেট পরিবর্তন করতে চাইলে আমাদের সহজ ক্যানসোলেশন ও রিফান্ড নীতি প্রযোজ্য হবে। বিস্তারিত জানতে আমাদের সাথে কথা বলুন।",
    },
    {
      q: "কোনো বয়সের কড়াকড়ি বা বাচ্চাদের জন্য ব্যবস্থা আছে?",
      a: "একদমই না! ছোট বাচ্চা থেকে বয়স্ক সদস্য—সবার জন্যই সম্পূর্ণ নিরাপদ ও আরামদায়ক ভ্রমণের ব্যবস্থা রয়েছে।",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-10 sm:py-14 bg-white font-bengali">
      <div className="container max-w-5xl">
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D3B22] tracking-tight mb-2">
            সচরাচর জিজ্ঞাসা (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            সুন্দরবন ভ্রমণ নিয়ে আপনার মনে থাকা সব প্রশ্নের সহজ উত্তর
          </p>
        </div>

        {/* 2-Column Accordion */}
        <div
          className="grid md:grid-cols-2 gap-3 sm:gap-4 items-start"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Column 1 */}
          <div className="space-y-3">
            {col1.map((item, index) => {
              const idx = index;
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-emerald-600/60 bg-emerald-50/30 shadow-xs"
                      : "border-slate-200 bg-[#FBFBFA] hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3 font-semibold text-sm sm:text-[15px] text-slate-800 hover:text-emerald-900 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-emerald-800 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-4.5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-100/80 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            {col2.map((item, index) => {
              const idx = index + 4;
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-emerald-600/60 bg-emerald-50/30 shadow-xs"
                      : "border-slate-200 bg-[#FBFBFA] hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3 font-semibold text-sm sm:text-[15px] text-slate-800 hover:text-emerald-900 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-emerald-800 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-4.5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-100/80 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DurgaPujaFAQ;
