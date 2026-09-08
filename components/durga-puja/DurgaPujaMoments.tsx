"use client";

import React from "react";
import Image from "next/image";

export const DurgaPujaMoments = () => {
  const gallery = [
    {
      title: "রয়্যাল বেঙ্গল টাইগার",
      image: "/assets/gallery-tiger.jpg",
    },
    {
      title: "বোট সাফারি",
      image: "/assets/sundarban-river-boating-with-mangrove-forest-.jpg",
    },
    {
      title: "সুন্দরবনের পাখি",
      image: "/assets/gallery-bird.jpg",
    },
    {
      title: "নদীর সূর্যাস্ত",
      image: "/assets/gallery-sunset.jpg",
    },
    {
      title: "শারদীয় পুজো",
      image: "/assets/durga-idol-puja.jpg",
    },
  ];

  return (
    <section id="moments" className="py-8 sm:py-12 bg-white font-bengali">
      <div className="container">

        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8" data-aos="fade-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D3B22] tracking-tight">
            আমাদের সাথে সুন্দরবন ভ্রমণের কিছু সুন্দর মুহূর্ত

          </h2>
          <p className="text-sm sm:text-base text-[#1E5136] font-medium mt-1.5">
            প্রকৃতির রহস্য, রোমাঞ্চ আর ছুটির আনন্দ— একনজরে আমাদের আগের ট্রিপগুলোর কিছু ছবি

          </p>
        </div>

        {/* 5-Photo Grid (Single Row on lg screen) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="100">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="relative h-56 sm:h-64 lg:h-72 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DurgaPujaMoments;
