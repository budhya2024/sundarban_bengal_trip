"use client";

import { use, useEffect } from "react";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { FacebookIcon, TwitterIcon } from "@/components/icons/SocialIcons";
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
    AOS.refresh();
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
        <div className="container mx-auto px-4">
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
                className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6"
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
                        {post.createdAt.toDateString()}
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

              {/* Content */}
              <div
                data-aos="fade-up"
                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
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
