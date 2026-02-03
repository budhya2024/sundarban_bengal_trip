"use client";
import { useEffect } from "react";
import AOS from "aos";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

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
          {blogPosts.map((post, index) => (
            <Link
              key={post.title}
              href={`/blog/${post.slug}`}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay={index * 100}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
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
