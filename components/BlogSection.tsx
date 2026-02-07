"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogType } from "@/db/schema";
import { getAllBlogs, getLimitedBlogs } from "@/app/actions/blogs.actions";
import { format } from "date-fns";

const blogPosts = [
  {
    slug: "best-time-to-visit-sundarbans",
    title: "Best Time to Visit Sundarbans: A Complete Guide",
    excerpt:
      "Discover the ideal seasons for tiger spotting, bird watching, and exploring the mangrove forests...",
    image: "/assets/gallery-tiger.jpg",
    date: "Jan 15, 2024",
  },
  {
    slug: "traditional-boat-safari",
    title: "Traditional Boat Safari: What to Expect",
    excerpt:
      "Everything you need to know about the iconic wooden boat safaris through the winding waterways...",
    image: "/assets/gallery-boat.jpg",
    date: "Jan 10, 2024",
  },
  {
    slug: "bird-watching-sundarbans",
    title: "Bird Watching in Sundarbans: Species to Spot",
    excerpt:
      "From Kingfishers to White-bellied Sea Eagles, discover the diverse avian life of the Sundarbans...",
    image: "/assets/gallery-bird.jpg",
    date: "Jan 5, 2024",
  },
];

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data, success } = await getLimitedBlogs(3);
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
    <section className="py-10 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            Blog
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Travel Stories & Tips
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get inspired with travel stories, insider tips, and wildlife
            insights from our expert guides and fellow travelers.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <BlogSkeleton />
          ) : (
            blogs.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-delay={index * 100}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/assets/gallery-tiger.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {format(post.createdAt, "MMM dd, yyyy")}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="text-muted-foreground text-sm mb-4 line-clamp-2"
                  />
                  <span className="inline-flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* View All CTA */}
        <div
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="300"
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
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
