import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Send } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import Link from "next/link";
import { BlogType } from "@/db/schema";

interface BlogSidebarProps {
  latestPosts: BlogType[];
}

const tags = [
  "Tiger Safari",
  "Bird Watching",
  "Boat Tour",
  "Photography",
  "Wildlife",
  "Mangrove",
  "Adventure",
  "Nature",
];

export const BlogSidebar = ({ latestPosts }: BlogSidebarProps) => {
  return (
    <aside className="space-y-8">
      {/* Latest Posts */}
      <div className="bg-card rounded-2xl p-6 shadow-soft" data-aos="fade-left">
        <h3 className="font-display text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
          Latest Posts
        </h3>
        <div className="space-y-4">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex gap-4 group"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.image || "/assets/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Calendar className="w-3 h-3" />
                  {post.createdAt.toDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div
        className="bg-card rounded-2xl p-6 shadow-soft"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        <h3 className="font-display text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href="/blog"
              className="px-3 py-1.5 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Follow Us */}
      <div
        className="bg-card rounded-2xl p-6 shadow-soft"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <h3 className="font-display text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
          Follow Us
        </h3>
        <div className="flex gap-3">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-[hsl(221,44%,41%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(280,100%,44%)] via-[hsl(350,100%,55%)] to-[hsl(28,95%,59%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-[hsl(0,0%,0%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-[hsl(0,100%,50%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <YoutubeIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Newsletter */}
      <div
        className="bg-primary rounded-2xl p-6 shadow-soft"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">
          Newsletter
        </h3>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Subscribe to get the latest travel tips and tour updates.
        </p>
        <form className="space-y-3">
          <Input
            type="email"
            placeholder="Your email address"
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button variant="hero" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Subscribe
          </Button>
        </form>
      </div>
    </aside>
  );
};
