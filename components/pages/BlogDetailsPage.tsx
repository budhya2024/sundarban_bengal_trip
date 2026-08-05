"use client";

import { use, useEffect, useState } from "react";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, } from "lucide-react";
import Link from "next/link";
import { BlogType } from "@/db/schema";
import dynamic from "next/dynamic";
const ShareButtons = dynamic(() => import("@/components/ShareButtons"), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-48 bg-slate-100 rounded-full animate-pulse" />
  ),
});

const BlogDetails = ({
  post,
  latestPosts,
}: {
  post?: BlogType;
  latestPosts?: BlogType[];
}) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 150); // Give DOM a brief window to parse dynamic html content
    return () => clearTimeout(timer);
  }, [post?.id]);

  if (!post) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">
            Post Not Found
          </h1>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const toc: { id: string; text: string; level: string }[] = [];
  if (post.content) {
    const headingRegex = /<h([1-3])[^>]*>(.*?)<\/h\1>/gi;
    const matches = Array.from(post.content.matchAll(headingRegex));
    matches.forEach((match, index) => {
      const level = `h${match[1]}`;
      const text = match[2].replace(/<\/?[^>]+(>|$)/g, "").trim();
      toc.push({ id: `heading-${index}`, text, level });
    });
  }

  const injectHeadingIds = (html: string | null | undefined) => {
    if (!html) return "";
    let index = 0;
    return html.replace(/<h([1-3])([^>]*)>/gi, (match, level, attrs) => {
      if (/id=/i.test(attrs)) {
        return match;
      }
      const injected = `<h${level}${attrs} id="heading-${index}">`;
      index++;
      return injected;
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <PageHeader
        title="Travel Blog"
        subtitle="Stories, tips, and insights from our Sundarban adventures"
        backgroundImage={post.image || "/assets/placeholder.svg"}
      />

      {/* Article Content with Sidebar */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Back Link */}
              <Link
                href="/blog"
                data-aos="fade-right"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Blog Title */}
              <h1
                data-aos="fade-up"
                className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6"
              >
                {post.title}
              </h1>

              {/* Author Info */}
              <div
                data-aos="fade-up"
                className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {post.author}
                    </span>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.description
                          ? `${Math.ceil((post.description.split(" ").length + post.content.split(" ").length) / 200)} min`
                          : "0 min"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category & Tags */}
              {(post.category || post.hashtags) && (
                <div
                  data-aos="fade-up"
                  className="flex flex-wrap gap-2 items-center mb-6 -mt-4"
                >
                  {post.category && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm tracking-wide font-normal rounded-sm">
                      {post.category}
                    </span>
                  )}
                  {post.hashtags &&
                    post.hashtags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag.length > 0)
                      .map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-primary text-primary-foreground text-sm tracking-wide font-normal rounded-sm"
                        >
                          #{tag.startsWith("#") ? tag.slice(1) : tag}
                        </span>
                      ))}
                </div>
              )}

              {/* Featured Image */}
              <div
                data-aos="fade-up"
                className="relative mb-10 rounded-2xl overflow-hidden shadow-elevated"
              >
                <img
                  src={post.image || "/assets/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Excerpt */}
              <p
                data-aos="fade-up"
                className="text-lg text-muted-foreground mb-8 italic border-l-4 border-secondary pl-4"
              >
                {post.description}
              </p>

              {/* Table of Contents */}
              {toc.length > 0 && (
                <div
                  data-aos="fade-up"
                  className="bg-white border border-slate-200/60  p-6 mb-8"
                >
                  <h3 className="font-display text-xl md:text-2xl md: font-bold text-foreground mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(item.id);
                          if (el) {
                            const offset = 100; // Account for height of sticky navbar
                            const elementPosition =
                              el.getBoundingClientRect().top;
                            const offsetPosition =
                              elementPosition + window.scrollY - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                        className={`block text-sm transition-colors hover:text-[#4a6741] ${item.level === "h1"
                          ? "font-bold text-foreground pl-0"
                          : item.level === "h2"
                            ? "font-semibold text-foreground/80 pl-4"
                            : "text-muted-foreground pl-8"
                          }`}
                      >
                        • {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Content */}
              <div
                id="blog-content"
                data-aos="fade-up"
                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-slate-800 prose-headings:text-xl md:prose-headings:text-[24px] prose-headings:font-semibold prose-headings:mt-8 prose-headings:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-strong:font-semibold prose-ul:text-slate-600 prose-li:marker:text-primary prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-700"
                dangerouslySetInnerHTML={{
                  __html: injectHeadingIds(post.content),
                }}
              />

              {/* Share */}
              <div
                data-aos="fade-up"
                className="mt-12 pt-8 border-t border-border"
              >
                <ShareButtons title={post.title} />
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <BlogSidebar latestPosts={latestPosts || []} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogDetails;
