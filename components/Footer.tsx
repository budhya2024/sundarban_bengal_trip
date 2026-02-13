import { TreePine, Phone, Mail, MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/assets/logo.png"
                alt="logo"
                height={200}
                width={200}
                className="w-30 h-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed mb-4">
              Experience the magic of the world's largest mangrove forest.
              Witness the Royal Bengal Tiger in its natural habitat and explore
              the breathtaking biodiversity of the Sundarbans.
            </p>

            {/* Google Review Button */}
            <a
              href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors mb-4"
            >
              <GoogleIcon className="w-5 h-5" />
              <span className="font-medium text-sm">Review us on Google</span>
            </a>

            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <FacebookIcon className="w-5 h-5 fill-current" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <InstagramIcon className="w-5 h-5 fill-current" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <TwitterIcon className="w-5 h-5 fill-current" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <YoutubeIcon className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Home",
                "About Us",
                "Tour Packages",
                "Gallery",
                "Blog",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-").replace("tour-", "")}`
                    }
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Packages */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Popular Tours
            </h4>
            <ul className="space-y-3">
              {[
                "Day Trip Package",
                "Weekend Getaway",
                "Premium Safari",
                "Photography Tour",
                "Adventure Expedition",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/packages"
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  Dulki Purbo Para Road, Village & Post: Dulki, South 24
                  Parganas, West Bengal – 743370, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  +917074432628
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="mailto:sundarbanbengaltrip@gmail.com"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  sundarbanbengaltrip@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Sundarban Bengal Trips. All rights reserved.
            </p>
            <div className="flex  gap-2 md:gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cancellation-policy"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
