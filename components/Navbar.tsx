"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getNavbarPackageKeys } from "@/app/actions/package.actions";
import { Skeleton } from "./ui/skeleton";
import { FaPhoneAlt } from "react-icons/fa";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Tour Packages", path: "/packages", hasDropdown: true },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [packageList, setPackageList] = useState<
    { key: string; name: string }[]
  >([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobilePackagesOpen, setIsMobilePackagesOpen] = useState(false);

  useEffect(() => {
    getNavbarPackageKeys()
      .then(({ data, success }) => {
        if (success) {
          setPackageList(data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  /* Body scroll lock */
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link href="/" className="z-50">
            <Image
              src="/assets/logo.png"
              width={200}
              height={200}
              alt="Logo"
              className="w-[120px] md:w-40 h-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 font-medium transition ${
                      isScrolled
                        ? "text-foreground hover:text-secondary"
                        : "text-white hover:text-white/80"
                    }`}
                  >
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
                        className="absolute top-full left-0 mt-2 w-64"
                      >
                        <div className="bg-card rounded-xl shadow-elevated overflow-hidden">
                          {loading ? (
                            <>
                              {[...Array(5)].map((_, index) => (
                                <div key={index} className="px-4 py-3">
                                  <Skeleton className="h-4 w-full" />
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              {packageList.map((pkg) => (
                                <Link
                                  key={pkg.key}
                                  href={`/packages/${pkg.key}`}
                                  className="block px-4 py-3 hover:bg-muted transition"
                                >
                                  {pkg.name}
                                </Link>
                              ))}
                              <Link
                                href={`/contact`}
                                className="block px-4 py-3 hover:bg-muted transition"
                              >
                                Plan Your Custom Trip
                              </Link>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`font-medium transition ${
                    isScrolled
                      ? "text-foreground hover:text-secondary"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* DESKTOP CTA */}
        {/* DESKTOP CTA */}
<div className="hidden lg:block">
  <a
    href="tel:+917074432628"
    className="relative inline-flex items-center justify-center overflow-hidden bg-primary
    
    px-7 py-3 rounded-sm text-white font-medium 
    transition-all duration-300"
  >
    {/* Shine Effect */}
    <span
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
      style={{
        animation: "shine 2s linear infinite",
        transform: "skewX(-25deg)",
        width: "50%",
      }}
    />

    <span className="relative z-10 flex flex-col">
      <span className="flex gap-2 items-center ">
       <FaPhoneAlt  />7074432628
      </span>
    </span>
  </a>
</div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-50 h-10 w-10 rounded-full bg-white flex justify-center items-center"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-80 bg-background w-full lg:hidden  h-screen  overflow-y-auto"
          >
            <div className="flex flex-col justify-start pt-28 pb-10 px-4 gap-6">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.path}>
                    <button
                      onClick={() =>
                        setIsMobilePackagesOpen(!isMobilePackagesOpen)
                      }
                      className="w-full flex items-center justify-between text-base font-semibold"
                    >
                      {link.name}
                      <ChevronDown
                        className={`transition ${
                          isMobilePackagesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMobilePackagesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-4  space-y-3"
                        >
                          {loading ? (
                            <>
                              {[...Array(5)].map((_, index) => (
                                <div key={index} className="px-4 py-3">
                                  <Skeleton className="h-4 w-full" />
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              {packageList.map((pkg) => (
                                <Link
                                  key={pkg.key}
                                  href={`/packages/${pkg.key}`}
                                  className="block hover:bg-muted transition"
                                >
                                  {pkg.name}
                                </Link>
                              ))}
                              <Link
                                href={`/contact`}
                                onClick={() => setIsOpen(false)}
                                className="block text-base text-muted-foreground"
                              >
                                Plan Your Custom Trip
                              </Link>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold"
                  >
                    {link.name}
                  </Link>
                ),
              )}

           
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
