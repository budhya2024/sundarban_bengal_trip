import { TreePine, Phone, Mail, MapPin, PhoneIcon, Handshake, ExternalLink } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 md:py-16">
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/assets/logo.png"
                alt="logo"
                height={200}
                width={200}
                className="w-28 md:w-36 h-auto"
              />
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed mb-4 max-w-sm">
              Experience the magic of the world's largest mangrove forest.
              Witness the Royal Bengal Tiger in its natural habitat and explore
              the breathtaking biodiversity of the Sundarbans.
            </p>

            {/* Google Review Button */}
            <a
              href="https://maps.app.goo.gl/BmREXPxvGBPRn7eT8?g_st=awb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-4 py-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors mb-4"
            >
              <GoogleIcon className="w-5 h-5" />
              <span className="font-medium text-sm">Review us on Google</span>
            </a>

            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61588168291064"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-blue-600 transition-colors"
              >
                <FacebookIcon className="w-5 h-5 fill-current" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/sundarbanbengaltrip/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-pink-600 transition-colors"
              >
                <InstagramIcon className="w-5 h-5 fill-current" />
              </a>

              {/* Call Button */}
              <a
                href="tel:+917074432628"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-green-600 transition-colors"
              >
                <PhoneIcon className="w-5 h-5 fill-current" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917074432628"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-green-500 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className=" text-lg font-semibold mb-6">
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
            <h4 className=" text-lg font-semibold mb-6">
              Popular Tours
            </h4>

            <ul className="space-y-3">
              {[
                {
                  name: "1 Day Sundarban Tour",
                  link: "/packages/1-day-in-sundarban",
                },
                {
                  name: "Sundarban 1 Night 2 Days Tour",
                  link: "/packages/sundarban-1-night-2-days-tour",
                },
                {
                  name: "Sundarban 2 Night 3 Days Tour",
                  link: "/packages/sundarban-2-night-3-days-tour",
                },
                {
                  name: "Customised Tour Package",
                  link: "/contact",
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className=" text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  5R82+296, Nath Para, Gosaba, Arampur, West Bengal 743370
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="tel:+917074432628"
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
        <div className="mt-12 border-t border-primary-foreground/20 pt-8 flex flex-wrap  gap-2 text-sm">
          <Link
            href="/kolkata-to-sundarban-tour-package"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Kolkata to Sundarban Tour Package
          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/cheap-sundarban-tour-package-from-kolkata"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Cheap Sundarban Tour Package From Kolkata
          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/sundarban-tour-cost-from-kolkata"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Sundarban Tour Cost From Kolkata
          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/sundarban-tour-package-from-kolkata"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Sundarban Tour Package From Kolkata
          </Link>

          <span className="text-primary-foreground/40">|</span>
          <Link
            href="/sundarban-1-night-2-days-package-from-kolkata"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Sundarban 1 Night 2 Days Package from Kolkata

          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/sundarban-tour-from-kolkata"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Sundarban Tour from Kolkata
          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/sundarban-west-bengal-tourism"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Sundarban West Bengal Tourism
          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/places-to-visit-in-sundarban"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Places to Visit in Sundarban
          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/sundarban-national-park-tour"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Sundarban National Park Tour
          </Link>

          <span className="text-primary-foreground/40">|</span>

          <Link
            href="/best-sundarban-tour-in-2026"
            className="text-primary-foreground/80 hover:text-secondary transition-colors"
          >
            Best Sundarban Tour in 2026
          </Link>
        </div>

        {/* Our Partner Section */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 p-5 sm:p-6 bg-primary-foreground/5 border border-primary-foreground/15 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Partner Logo */}
              <div className="bg-white/95 p-2 sm:p-2.5 border border-white/20 shrink-0 flex items-center justify-center shadow-sm">
                <Image
                  src="/assets/sundarban-bengal-tourism-logo.png"
                  alt="Sundarban Bengal Tourism Logo"
                  width={150}
                  height={50}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-secondary font-semibold text-xs md:text-sm uppercase tracking-widest">
                  <Handshake className="w-4 h-4" />
                  <span>Our Partner</span>
                </div>
                <h4 className="text-base md:text-lg font-semibold text-primary-foreground">
                  Sundarban Bengal Tourism
                </h4>
                <p className="text-xs md:text-sm text-primary-foreground/75 leading-relaxed">
                  Our trusted travel &amp; hospitality partner for premium Sundarban tours, hotel stays &amp; river boat safaris.
                </p>
              </div>
            </div>

            <a
              href="https://www.sundarbanbengaltourism.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-foreground/10 hover:bg-secondary hover:text-secondary-foreground text-primary-foreground font-semibold text-sm transition-all duration-300 border border-primary-foreground/20 hover:border-transparent group shrink-0 w-full sm:w-auto justify-center"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8  pt-6 md:pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-primary-foreground/60 text-sm">
                © {new Date().getFullYear()}, Sundarban Bengal Trips. All rights
                reserved.
              </p>

            </div>

            <p className="text-primary-foreground/60 text-sm">
              ISO 9001:2015 Certified Company
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-6 text-sm ">
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
                href="/payment-policy"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Payment Policy
              </Link>
              <Link
                href="/sitemap"
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
