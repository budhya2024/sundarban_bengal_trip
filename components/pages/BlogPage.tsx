"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Calendar, ArrowRight, User, Clock } from "lucide-react";
import Link from "next/link";
import { BlogType } from "@/db/schema";

const blogPosts = [
  {
    id: 1,
    slug: "best-time-to-visit-sundarbans",
    title: "Best Time to Visit Sundarbans: A Complete Guide",
    excerpt:
      "Discover the ideal seasons for tiger spotting, bird watching, and exploring the mangrove forests. Learn about weather patterns and what to expect each month.",
    image: "/assets/gallery-tiger.jpg",
    date: "Jan 15, 2024",
    author: "Rajiv Banerjee",
    readTime: "8 min read",
  },
  {
    id: 2,
    slug: "traditional-boat-safari",
    title: "Traditional Boat Safari: What to Expect",
    excerpt:
      "Everything you need to know about the iconic wooden boat safaris through the winding waterways of the Sundarbans delta.",
    image: "/assets/gallery-boat.jpg",
    date: "Jan 10, 2024",
    author: "Priya Mukherjee",
    readTime: "6 min read",
  },
  {
    id: 3,
    slug: "bird-watching-sundarbans",
    title: "Bird Watching in Sundarbans: Species to Spot",
    excerpt:
      "From Kingfishers to White-bellied Sea Eagles, discover the diverse avian life of the Sundarbans and tips for spotting them.",
    image: "/assets/gallery-bird.jpg",
    date: "Jan 5, 2024",
    author: "Arun Das",
    readTime: "10 min read",
  },
  {
    id: 4,
    slug: "royal-bengal-tiger-behavior",
    title: "The Royal Bengal Tiger: Behavior and Habitat",
    excerpt:
      "Learn about the magnificent tigers of Sundarbans, their unique adaptations to the mangrove environment, and conservation efforts.",
    image: "/assets/hero-sundarban.jpg",
    date: "Dec 28, 2023",
    author: "Rajiv Banerjee",
    readTime: "12 min read",
  },
  {
    id: 5,
    slug: "wildlife-photography-tips",
    title: "Wildlife Photography Tips for Sundarbans",
    excerpt:
      "Expert tips for capturing stunning wildlife photos in challenging mangrove conditions, from equipment to techniques.",
    image: "/assets/gallery-deer.jpg",
    date: "Dec 20, 2023",
    author: "Arun Das",
    readTime: "15 min read",
  },
  {
    id: 6,
    slug: "sunset-cruises-experience",
    title: "Sunset Cruises: A Magical Experience",
    excerpt:
      "Why sunset cruises are the most romantic way to experience the Sundarbans and what makes them so special.",
    image: "/assets/gallery-sunset.jpg",
    date: "Dec 15, 2023",
    author: "Priya Mukherjee",
    readTime: "5 min read",
  },
];

const Blog = ({
  blogs,
  featureBlog,
}: {
  blogs: BlogType[];
  featureBlog: BlogType | null;
}) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Travel Blog"
        subtitle="Stories, tips, and insights from our expert guides and fellow travelers to help you make the most of your Sundarban adventure."
        backgroundImage="/assets/gallery-boat.jpg"
      />

      {/* Blog Posts */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          {featureBlog && (
            <div data-aos="fade-up" className="mb-8 md:mb-16">
              <Link
                href={`/blog/${featureBlog.slug}`}
                className="grid lg:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featureBlog.image || "/assets/hero-sundarban.jpg"}
                    alt={featureBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featureBlog.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featureBlog.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featureBlog.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featureBlog.createdAt.toDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featureBlog.description
                        ? `${Math.ceil((featureBlog.description.split(" ").length + featureBlog.content.split(" ").length) / 200)} min`
                        : "0 min"}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/assets/hero-sundarban.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.createdAt.toDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.description
                        ? `${Math.ceil((post.description.split(" ").length + post.content.split(" ").length) / 200)} min`
                        : "0 min"}
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;
