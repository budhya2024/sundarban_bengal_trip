"use client";

import { useEffect, useState, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { BlogType } from "@/db/schema";
import { Button } from "../ui/button";

const ITEMS_PER_PAGE = 9;

const Blog = ({
  blogs,
  featureBlog,
}: {
  blogs: BlogType[];
  featureBlog: BlogType | null;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    if (blogListRef.current) {
      const topOffset =
        blogListRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const getPaginationNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

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
        <section className="py-10 md:py-16 bg-background">
          <div className="container">
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
                      <span className="px-3 py-1 rounded-[4px] bg-secondary text-secondary-foreground text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="font-display text-lg md:text-xl xl:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
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
                        {new Date(featureBlog.createdAt).toDateString()}
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

            {/* Blog Grid anchor */}
            <div ref={blogListRef} className="scroll-mt-28">
              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 100}
                    className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <img
                        src={post.image || "/assets/hero-sundarban.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.createdAt).toDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.description
                            ? `${Math.ceil((post.description.split(" ").length + post.content.split(" ").length) / 200)} min`
                            : "0 min"}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-secondary font-medium group-hover:gap-3 transition-all mt-auto">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  data-aos="fade-up"
                  className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className="text-sm text-muted-foreground order-2 sm:order-1">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-foreground">
                      {Math.min(startIndex + ITEMS_PER_PAGE, blogs.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {blogs.length}
                    </span>{" "}
                    articles
                  </p>

                  <div className="flex items-center gap-1.5 order-1 sm:order-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous Page"
                      className="inline-flex items-center justify-center gap-1 h-10 px-3 text-sm font-medium border border-border bg-card text-foreground rounded-[4px] hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    {getPaginationNumbers().map((item, idx) =>
                      item === "..." ? (
                        <span
                          key={`ellipsis-${idx}`}
                          className="w-10 h-10 flex items-center justify-center text-muted-foreground select-none"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={`page-${item}`}
                          onClick={() => handlePageChange(item as number)}
                          className={`w-10 h-10 text-sm font-semibold rounded-[4px] transition-all ${
                            currentPage === item
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "border border-border bg-card text-foreground hover:bg-muted"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next Page"
                      className="inline-flex items-center justify-center gap-1 h-10 px-3 text-sm font-medium border border-border bg-card text-foreground rounded-[4px] hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
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
        <Button variant="secondary" asChild className="rounded-[4px] px-8">
          <Link href="/packages">Explore Tour Packages</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="rounded-[4px] px-8 gap-2 group"
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
