"use client";

import React from "react";
import Image from "next/image";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

export const DurgaPujaBottomCTA = () => {
  return (
    <section className="relative py-10 sm:py-14 text-white font-bengali overflow-hidden">
      {/* Background Image: Mangrove Sunset Boat */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/durga-puja-hero-bg.jpg"
          alt="Sundarban Sunset Cruise"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/85" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
          {/* Left Content */}
          <div className="space-y-3 max-w-2xl" data-aos="fade-right">


            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              পূজোর Limited Seats! আজই ২০% অফার পান
            </h2>

            {/* Sub-heading */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              পরিবার বা বন্ধুদের নিয়ে একটি স্মরণীয় পূজোর ছুটির জন্য এখনই Booking Enquiry পাঠান।
            </p>
          </div>

          {/* Right Action Buttons */}
          <div
            className="flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-end gap-3 shrink-0 w-full lg:w-auto"
            data-aos="fade-left"
          >
            {/* Green WhatsApp Button */}
            <a
              href="https://wa.me/917586889519?text=%E0%A6%A8%E0%A6%AE%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A6%BE%E0%A6%B0!%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%B8%E0%A7%81%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%B0%E0%A6%AC%E0%A6%A8%20%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%BE%E0%A6%AA%E0%A7%82%E0%A6%9C%E0%A6%BE%20%E0%A6%9F%E0%A7%8D%E0%A6%AF%E0%A7%81%E0%A6%B0%E0%A7%87%E0%A6%B0%20%E0%A6%B8%E0%A7%80%E0%A6%9F%20%E0%A6%AC%E0%A7%81%E0%A6%95%20%E0%A6%95%E0%A6%B0%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87।"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#1E9E49] hover:bg-[#18883e] text-white font-bold text-sm sm:text-base px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span className="flex shrink-0">WhatsApp-এ বুক করুন</span>
            </a>

            {/* Red Call Button */}
            <a
              href="tel:+917586889519"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-sm sm:text-base px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>এখনই কল করুন</span>
            </a>

            {/* Yellow Form Fillup Button */}
            <a
              href="#hero"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFE600] hover:bg-[#ffd000] text-slate-950 font-bold text-sm sm:text-base px-5 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <span>ফর্ম ফিলাপ করুন</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DurgaPujaBottomCTA;
