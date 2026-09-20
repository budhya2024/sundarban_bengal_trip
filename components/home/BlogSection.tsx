"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogType } from "@/db/schema";
import { getLimitedBlogs } from "@/app/actions/blogs.actions";
import { format } from "date-fns";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data, success } = await getLimitedBlogs(5);
        if (success && data) {
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-10 md:py-16 bg-muted overflow-hidden">
      <div className="container">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Blog
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
            Travel Stories &amp; Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get inspired with travel stories, insider tips, and wildlife
            insights from our expert guides and fellow travelers.
          </p>
        </div>

        {/* Blog Slider (5 Articles, Smooth Autoplay, No Dots, No Arrows) */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogSkeleton />
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            spaceBetween={24}
            className="items-stretch"
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogs.map((post, index) => (
              <SwiperSlide key={post.id || post.slug || index} className="!h-auto pb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="bg-card rounded-2xl overflow-hidden  transition-all duration-300 group flex flex-col h-full border border-border/40"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <Image
                      src={post.image || "/assets/sundarban-tiger.jpeg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={100}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(post.createdAt), "MMM dd, yyyy")}
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        className="text-muted-foreground text-sm mb-4 line-clamp-2"
                      />
                    </div>
                    <span className="inline-flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all mt-auto pt-2">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* View All CTA */}
        <div
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="300"
          className="text-center mt-8 md:mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export const BlogSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card rounded-2xl overflow-hidden shadow-soft border border-slate-100 animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="relative h-48 bg-slate-300/70" />

          {/* Content Placeholder */}
          <div className="p-6">
            {/* Date Row */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-slate-200" />
              <div className="h-3 w-24 bg-slate-200 rounded" />
            </div>

            {/* Title Placeholder */}
            <div className="space-y-2 mb-4">
              <div className="h-5 w-full bg-slate-300/50 rounded" />
              <div className="h-5 w-2/3 bg-slate-300/50 rounded" />
            </div>

            {/* Excerpt/Content Placeholder */}
            <div className="space-y-2 mb-6">
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-3 w-5/6 bg-slate-200 rounded" />
            </div>

            {/* Read More Link Placeholder */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-3 w-4 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
