"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import {
  Calendar,
  ArrowRight,
  User,
  Clock,
  BookOpen,
  Search,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { BlogType } from "@/db/schema";
import { Button } from "../ui/button";

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
        backgroundImage="/assets/tiger-photo.jpg"
      />

      {/* Blog Posts */}
      {!featureBlog && blogs.length === 0 ? (
        <BlogEmptyState />
      ) : (
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
      )}
      <Footer />
    </main>
  );
};

export const BlogEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Visual Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center animate-pulse">
          <BookOpen className="w-10 h-10 text-emerald-600/40" />
        </div>
        <Search className="absolute -bottom-2 -right-2 w-8 h-8 text-emerald-700 bg-white rounded-full p-1.5 shadow-sm border border-emerald-100" />
      </div>

      {/* Text Content */}
      <h3 className="font-display text-2xl font-bold text-slate-800 mb-3">
        The Journal is Quiet... for now
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        Our explorers are currently deep in the mangroves capturing new stories.
        Check back soon for travel guides, wildlife sightings, and adventure
        tips.
      </p>

      {/* Alternative Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button variant="secondary" asChild className="rounded-full px-8">
          <Link href="/packages">Explore Tour Packages</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="rounded-full px-8 gap-2 group"
        >
          <Link href="/">
            Return Home{" "}
            <MapPin
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Blog;
