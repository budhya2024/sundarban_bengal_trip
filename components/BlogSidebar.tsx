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
import Newsletter from "./Newsletter";

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
    <aside className="space-y-8 sticky top-20">
      {/* Latest Posts */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm" data-aos="fade-left">
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
              <div className="w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src={post.image || "/assets/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.createdAt).toDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Follow Us */}
      <div
        className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm"
        data-aos="fade-left"
        data-aos-delay="200"
      >
        <h3 className="font-display text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
          Follow Us
        </h3>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=61588168291064"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full bg-[hsl(221,44%,41%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/sundarbanbengaltrip/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(280,100%,44%)] via-[hsl(350,100%,55%)] to-[hsl(28,95%,59%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/@sundarbanbengaltrip"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 rounded-full bg-[#FF0000] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <YoutubeIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Newsletter */}
      <Newsletter />
    </aside>
  );
};
