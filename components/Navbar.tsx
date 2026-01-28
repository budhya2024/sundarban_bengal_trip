"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, TreePine, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tourPackages = [
  {
    name: "Day Trip Package",
    path: "/packages/day-trip",
    description: "Quick 1-day safari experience",
  },
  {
    name: "Weekend Getaway",
    path: "/packages/weekend",
    description: "2 Days / 1 Night adventure",
  },
  {
    name: "Premium Safari",
    path: "/packages/premium",
    description: "3 Days / 2 Nights luxury tour",
  },
  {
    name: "Adventure Expedition",
    path: "/packages/adventure",
    description: "4 Days / 3 Nights expedition",
  },
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsMobilePackagesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="relative">
              <TreePine
                className={`w-8 h-8 transition-colors duration-300 ${
                  isScrolled || isOpen
                    ? "text-primary"
                    : "text-primary-foreground"
                }`}
              />
            </div>
            <span
              className={`font-display text-xl font-bold transition-colors duration-300 ${
                isScrolled || isOpen
                  ? "text-foreground"
                  : "text-primary-foreground"
              }`}
            >
              Sundarban<span className="text-secondary">Tours</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 font-medium transition-colors duration-300 hover:text-secondary ${
                        isScrolled
                          ? "text-foreground"
                          : "text-primary-foreground"
                      } ${pathname?.startsWith("/packages") ? "text-secondary" : ""}`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 w-64"
                        >
                          <div className="bg-card rounded-xl shadow-elevated border border-border overflow-hidden">
                            {/* View All Packages Link */}
                            <Link
                              href="/packages"
                              className="block px-4 py-3 hover:bg-muted transition-colors border-b border-border"
                            >
                              <span className="font-medium text-foreground">
                                All Packages
                              </span>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                View all tour options
                              </p>
                            </Link>
                            {tourPackages.map((pkg) => (
                              <Link
                                key={pkg.path}
                                href={pkg.path}
                                className="block px-4 py-3 hover:bg-muted transition-colors"
                              >
                                <span className="font-medium text-foreground">
                                  {pkg.name}
                                </span>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {pkg.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.path}
                    className={`relative font-medium transition-colors duration-300 hover:text-secondary ${
                      isScrolled ? "text-foreground" : "text-primary-foreground"
                    } ${pathname === link.path ? "text-secondary" : ""}`}
                  >
                    {link.name}
                    {pathname === link.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full"
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="lg" asChild>
              <Link href="/packages">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors z-50 ${
              isScrolled || isOpen
                ? "text-foreground"
                : "text-primary-foreground"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation - Full Screen from Left */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-background z-40 lg:hidden"
          >
            <div className="flex flex-col justify-center items-center h-full gap-6 px-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full text-center"
                >
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setIsMobilePackagesOpen(!isMobilePackagesOpen)
                        }
                        className={`text-2xl font-display font-semibold transition-colors flex items-center justify-center gap-2 mx-auto ${
                          pathname?.startsWith("/packages")
                            ? "text-secondary"
                            : "text-foreground hover:text-secondary"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${isMobilePackagesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {isMobilePackagesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 space-y-3"
                          >
                            <Link
                              href="/packages"
                              onClick={() => setIsOpen(false)}
                              className="block text-lg text-muted-foreground hover:text-secondary transition-colors"
                            >
                              All Packages
                            </Link>
                            {tourPackages.map((pkg) => (
                              <Link
                                key={pkg.path}
                                href={pkg.path}
                                onClick={() => setIsOpen(false)}
                                className="block text-lg text-muted-foreground hover:text-secondary transition-colors"
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
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-display font-semibold transition-colors ${
                        pathname === link.path
                          ? "text-secondary"
                          : "text-foreground hover:text-secondary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Button variant="hero" size="xl" asChild>
                  <Link href="/packages" onClick={() => setIsOpen(false)}>
                    Book Now
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
