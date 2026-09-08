"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Sparkles, ShieldCheck, Award, Calendar, Users, User, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { toast } from "sonner";
import { createBooking } from "@/app/actions/home.actions";

export const DurgaPujaHero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "২ - ৪ জন",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("অনুগ্রহ করে আপনার নাম, ইমেল এবং মোবাইল নম্বর লিখুন");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit to database & trigger automated Email to admin + confirmation response Email to user
      const result = await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date || "Durga Puja 2026",
        guests: formData.guests || "2-4",
        package: "Sundarban Durga Puja Special (3D/2N)",
        status: "pending",
      });

      if (result.success) {
        toast.success("আপনার বুকিং সফল হয়েছে! আপনার ইমেলে কনফার্মেশন পাঠানো হয়েছে।");
      } else {
        toast.info("আপনার অনুরোধ গ্রহণ করা হয়েছে! আমরা অবিলম্বে যোগাযোগ করছি।");
      }

      // 2. Open WhatsApp for instant booking assistance
      const msg = `নমস্কার! আমি সুন্দরবন দুর্গাপূজা স্পেশাল ট্যুর বুকিং করতে চাই।\n\n👤 নাম: ${formData.name}\n✉ ইমেল: ${formData.email}\n📱 ফোন: ${formData.phone}\n📅 তারিখ: ${formData.date || "শীঘ্রই"}\n👥 যাত্রী সংখ্যা: ${formData.guests}`;
      const waUrl = `https://wa.me/917586889519?text=${encodeURIComponent(msg)}`;

      setTimeout(() => {
        window.open(waUrl, "_blank");
        setIsSubmitting(false);
        setFormData({ name: "", email: "", phone: "", date: "", guests: "২ - ৪ জন" });
      }, 700);
    } catch (err) {
      console.error("Booking submit error:", err);
      toast.error("বুকিং জমা দেওয়ার সময় ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন বা WhatsApp-এ লিখুন।");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[540px] lg:min-h-[600px] pt-24 pb-10 sm:pb-12 flex items-center font-bengali overflow-hidden"
    >
      {/* Background Image: River sunset with safari boat & mangrove forest */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/durgpuja-banner.png"
          alt="Sundarban Durga Puja River Sunset"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Semi-transparent dark gradient overlays for maximum contrast & crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
      </div>

      <div className="container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: Durga Visual & Headline */}
          <div className="lg:col-span-7 space-y-5 text-white" data-aos="fade-right">

            {/* Badges Row with 20% Discount Offer Tag */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Red Special Ribbon Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-4 sm:px-5 py-1.5 rounded-sm text-white text-sm sm:text-base font-bold shadow-lg border-b-2 border-amber-300">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>পূজো স্পেশাল অফার</span>
              </div>


            </div>

            {/* Durga Idol Art and Typography Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">


              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] drop-shadow-lg py-4">
                  এবারের পূজায় শহরের ভিড়  <br className="hidden sm:inline" />
                  <span className="text-[#FFE600] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    এড়িয়ে ঘুরে আসুন সুন্দরবন!
                  </span>
                </h1>

              </div>
            </div>

            {/* Subtext description */}
            <p className="text-sm sm:text-base text-slate-100 font-medium max-w-2xl leading-relaxed drop-shadow">
              নদী, জঙ্গল আর খাঁটি স্বাদের রাজকীয় ভূরিভোজ— ৩ দিন ২ রাতের সম্পূর্ণ নিশ্চিন্ত ট্যুর প্যাকেজ।
            </p>

            {/* Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-sm border border-amber-400/50 text-amber-300">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Govt. Approved</span>
              </div>
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-sm border border-emerald-400/50 text-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>COVID Safe</span>
              </div>
            </div>
          </div>

          {/* Right Column: CTA Buttons & White Booking Form */}
          <div className="lg:col-span-5 space-y-4" data-aos="fade-left">

            {/* 2 Top Quick CTA Buttons */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <a
                href="https://wa.me/917586889519?text=%E0%A6%A8%E0%A6%AE%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A6%BE%E0%A6%B0!%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%B8%E0%A7%81%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A6%B0%E0%A6%AC%E0%A6%A8%20%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%BE%E0%A6%AA%E0%A7%82%E0%A6%9C%E0%A6%BE%20%E0%A6%9F%E0%A7%8D%E0%A6%AF%E0%A7%81%E0%A6%B0%20%E0%A6%AC%E0%A6%BE%E0%A6%AC%E0%A6%A6%E0%A7%87%20%E0%A6%AC%E0%A7%81%E0%A6%95%E0%A6%BF%E0%A6%82%20%E0%A6%95%E0%A6%B0%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87।"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#1E9E49] hover:bg-[#18883e] text-white font-bold text-xs sm:text-sm sm:text-base py-3 px-4 rounded-sm shadow-lg transition-colors duration-200"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span className="flex shrink-0">WhatsApp-এ বুক করুন</span>
              </a>

              <a
                href="tel:+917586889519"
                className="flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs sm:text-sm sm:text-base py-3 px-4 rounded-sm shadow-lg transition-colors duration-200"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>এখনই কল করুন</span>
              </a>
            </div>

            {/* Booking Form Card */}
            <div className="bg-white rounded-sm p-5 sm:p-6 shadow-2xl border border-slate-200">
              {/* 20% OFF Offer Ribbon with Red Background & Continuous Shine */}
              <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-bold text-xs sm:text-sm py-2 px-3 rounded-sm text-center mb-3.5 shadow-md">
                <span className="shine" />
                <span className="text-yellow-300 font-black mr-1.5"> আজই বুক করলে পাচ্ছেন
                </span>
                <span>— ২০% ফ্ল্যাট ছাড়!</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">

                {/* Name Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="আপনার নাম *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-sm border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-slate-900 bg-white placeholder-slate-400"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="আপনার ইমেল অ্যাড্রেস *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-sm border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-slate-900 bg-white placeholder-slate-400"
                  />
                </div>

                {/* Mobile Number & Date in Same Row */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {/* Mobile Number Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="মোবাইল নম্বর *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-2.5 py-2.5 sm:py-3 rounded-sm border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-400 outline-none text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400"
                    />
                  </div>

                  {/* Date Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="যাত্রার তারিখ"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                      }}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-2.5 py-2.5 sm:py-3 rounded-sm border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-400 outline-none text-xs sm:text-sm text-slate-900 bg-white placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Person Count Select */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-sm border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-400 outline-none text-sm text-slate-900 bg-white"
                  >
                    <option value="কতজন যাবেন?">কতজন যাবেন?</option>
                    <option value="১ - ২ জন">১ - ২ জন</option>
                    <option value="২ - ৪ জন">২ - ৪ জন</option>
                    <option value="৫ - ৮ জন">৫ - ৮ জন</option>
                    <option value="৮+ জন (গ্রুপ)">৮+ জন (গ্রুপ)</option>
                  </select>
                </div>

                {/* Yellow Amber Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#EAB308] hover:bg-[#CA8A04] text-slate-950 font-bold py-3.5 px-4 rounded-sm shadow-md hover:shadow-lg transition-colors duration-200 flex items-center justify-center gap-2 text-base cursor-pointer mt-2"
                >
                  <span>{isSubmitting ? "পাঠানো হচ্ছে..." : "বুকিং করুন ➔"}</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DurgaPujaHero;
