"use client";

import React from "react";
import Image from "next/image";

export const DurgaPujaHotel = () => {
  return (
    <section
      id="hotel"
      className="relative py-10 md:py-16 text-white font-bengali overflow-hidden min-h-[460px] flex items-center"
    >
      {/* Background Image: Sundar Sonar Bangla Hotel Resort Dusk View */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/sonar-bangla-hotel-bg.jpg"
          alt="Sundar Sonar Bangla Hotel Resort"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft Dark & Forest Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
      </div>

      <div className="container relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-4 text-left" data-aos="fade-right">
            <div className="inline-block bg-[#EAB308] text-slate-950 text-xs sm:text-sm font-bold px-3.5 py-1 rounded-sm shadow-md">

              আপনার থাকার আরামদায়ক ঠিকানা
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFE600] tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Sundarban Sonar Bangla Hotel & Resort

            </h2>

            <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-xl drop-shadow">
              সুন্দরবনের প্রকৃতির কোল, কিন্তু সুবিধার কোনো অভাব নেই!
              পূজোর ছুটিতে পরিবার ও প্রিয়জনদের নিয়ে থাকুন সম্পূর্ণ নিরাপদ, এসি রুম, চমৎকার সুইমিং পুল এবং মনোরম পরিবেশে। সুন্দরবন ঘোরার জন্য এটিই সবচেয়ে সুবিধাজনক এবং প্রিমিয়াম লোকেশন— যা আপনার ছুটিকে করবে স্মরণীয় ও আরামদায়ক।

            </p>
          </div>

          {/* Right Floating Photo Collage (3 crisp white-bordered images) */}
          <div className="lg:col-span-6" data-aos="fade-left">
            <div className="relative max-w-md mx-auto lg:max-w-none">

              {/* Top Row: 2 Images */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                {/* Deluxe Bedroom */}
                <div className="relative h-36 sm:h-44 rounded-sm overflow-hidden border-4 border-white shadow-xl group">
                  <Image
                    src="/assets/hotel-bedroom.jpeg"
                    alt="Sundar Sonar Bangla Hotel Room"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Dining Hall */}
                <div className="relative h-36 sm:h-44 rounded-sm overflow-hidden border-4 border-white shadow-xl group">
                  <Image
                    src="/assets/sonar-bangla-hotel-dining.jpeg"
                    alt="Sundar Sonar Bangla Hotel Restaurant"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bottom Row: Jetty / Pool Image */}
              <div className="relative h-40 sm:h-52 rounded-sm overflow-hidden border-4 border-white shadow-2xl group">
                <Image
                  src="/assets/sonar-bangla-hotel-pool.jpg"
                  alt="Sundar Sonar Bangla Hotel Resort Riverside Deck"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DurgaPujaHotel;
