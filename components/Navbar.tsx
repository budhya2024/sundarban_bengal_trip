"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const tourPackages = [
  { name: "Day Trip Package", path: "/packages/day-trip" },
  { name: "Weekend Getaway", path: "/packages/weekend" },
  { name: "Premium Safari", path: "/packages/premium" },
  { name: "Adventure Expedition", path: "/packages/adventure" },
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Tour Packages", path: "/packages", hasDropdown: true },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobilePackagesOpen, setIsMobilePackagesOpen] = useState(false);
  const pathname = usePathname();

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsMobilePackagesOpen(false);
  }, [pathname]);

  /* 🔒 BODY SCROLL LOCK (FIXED) */
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="z-50">
            <Image
              src="/assets/logo.png"
              width={200}
              height={200}
              alt="Logo"
              className="w-[120px] md:w-40 h-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 font-medium hover:text-secondary">
                    {link.name}
                    <ChevronDown
                      className={`w-4 h-4 transition ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-60"
                      >
                        <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
                          {tourPackages.map((pkg) => (
                            <Link
                              key={pkg.path}
                              href={pkg.path}
                              className="block px-4 py-3 hover:bg-muted"
                            >
                              {pkg.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className="font-medium hover:text-secondary"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="hero" asChild>
              <Link href="/packages">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-40 lg:hidden"
          >
            <div className="flex flex-col justify-center h-full px-8 gap-6">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.path}>
                    <button
                      onClick={() =>
                        setIsMobilePackagesOpen(!isMobilePackagesOpen)
                      }
                      className="w-full flex items-center justify-between text-2xl font-semibold"
                    >
                      {link.name}
                      <ChevronDown
                        className={`transition ${
                          isMobilePackagesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* ⬇️ DROPDOWN OPENS DOWNWARD */}
                    <AnimatePresence>
                      {isMobilePackagesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4 ml-4 space-y-3"
                        >
                          {tourPackages.map((pkg) => (
                            <Link
                              key={pkg.path}
                              href={pkg.path}
                              onClick={() => setIsOpen(false)}
                              className="block text-lg text-muted-foreground"
                            >
                              {pkg.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-semibold"
                  >
                    {link.name}
                  </Link>
                )
              )}

              <Button variant="hero" size="xl" asChild className="mt-8">
                <Link href="/packages" onClick={() => setIsOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
