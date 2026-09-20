"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Compass,
  Flame,
  Hotel,
  Star,
  CheckCircle2,
  ChevronRight,
  Building2,
  Waves,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPackages } from "@/app/actions/package.actions";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const POPULAR_KEYWORDS = [
  { label: "1 Night 2 Days", icon: Clock },
  { label: "Hotel Sonar Bangla", icon: Hotel, highlight: true },
  { label: "2 Night 3 Days", icon: Clock },
  { label: "1 Day Tour", icon: Clock },
  { label: "Durga Puja Special", icon: Sparkles },
  { label: "Boat Safari", icon: Waves },
  { label: "From Kolkata", icon: MapPin },
];

const ANIMATED_PLACEHOLDERS = [
  "Search packages & hotels...",
  "Search 'Hotel Sonar Bangla'...",
  "Search '1 Night 2 Days Tour'...",
  "Search 'Durga Puja Special'...",
  "Search '2 Night 3 Days Safari'...",
  "Search '1 Day Boat Safari'...",
  "Search 'Kolkata to Sundarban'...",
];

const SONAR_BANGLA_HOTEL_INFO = {
  name: "Hotel Sonar Bangla Resort",
  tagline: "Luxury 5-Star Experience in Sundarban",
  location: "Gosaba, Sundarban, West Bengal",
  rating: "4.9",
  reviews: "1,200+ Reviews",
  image: "/assets/sonarbanglahotel.jpg",
  features: [
    "Luxury AC Rooms & Cottages",
    "Riverfront Balcony View",
    "Swimming Pool & Greenery",
  ],
};

interface HeaderSearchProps {
  isScrolled?: boolean;
  isHome?: boolean;
}

export const HeaderSearch = ({ isScrolled, isHome }: HeaderSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Placeholder text animation timer (cycles every 2.8s)
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ANIMATED_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Fetch packages on mount
  useEffect(() => {
    let isMounted = true;
    const loadPackages = async () => {
      setLoading(true);
      try {
        const res = await getPackages();
        if (res.success && res.data && isMounted) {
          setPackages(res.data);
        }
      } catch (err) {
        console.error("Failed to load packages for search:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open & clear state on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
      setActiveKeyword(null);
    }
  }, [isOpen]);

  const isSearching = Boolean(query.trim().length > 0 || activeKeyword);

  // Exactly 3 featured / popular packages for suggestions
  const suggestionPackages = useMemo(() => {
    const populars = packages.filter((pkg) => pkg.isPopular);
    if (populars.length >= 3) {
      return populars.slice(0, 3);
    }
    return packages.slice(0, 3);
  }, [packages]);

  // Check if Hotel Sonar Bangla matches current search
  const isHotelMatch = useMemo(() => {
    if (!isSearching) return true;
    const term = (query || activeKeyword || "").toLowerCase().trim();
    const hotelKeywords = [
      "sonar",
      "bangla",
      "hotel",
      "resort",
      "stay",
      "accommodation",
      "luxury",
      "ac",
      "room",
      "pool",
      "gosaba",
    ];
    return hotelKeywords.some((kw) => term.includes(kw) || kw.includes(term));
  }, [query, activeKeyword, isSearching]);

  // Real-time package search filter
  const searchResults = useMemo(() => {
    if (!isSearching) return [];

    const searchTerm = query.toLowerCase().trim();

    return packages.filter((pkg) => {
      const name = (pkg.packageName || "").toLowerCase();
      const location = (pkg.location || "").toLowerCase();
      const duration = (pkg.duration || "").toLowerCase();
      const desc = (pkg.description || pkg.heroSubtitle || "").toLowerCase();
      const price = (pkg.price || "").toLowerCase();
      const key = (pkg.key || "").toLowerCase();
      const highlights = Array.isArray(pkg.highlights)
        ? pkg.highlights.map((h: any) => (h.value || "").toLowerCase()).join(" ")
        : "";

      // Handle active keyword chip
      if (activeKeyword) {
        const kw = activeKeyword.toLowerCase();
        if (kw === "hotel sonar bangla") {
          return (
            name.includes("sonar") ||
            name.includes("hotel") ||
            desc.includes("hotel") ||
            desc.includes("sonar") ||
            highlights.includes("hotel") ||
            pkg.isPopular
          );
        } else if (
          !name.includes(kw) &&
          !duration.includes(kw) &&
          !location.includes(kw) &&
          !desc.includes(kw) &&
          !highlights.includes(kw)
        ) {
          return false;
        }
      }

      if (!searchTerm) return true;

      return (
        name.includes(searchTerm) ||
        location.includes(searchTerm) ||
        duration.includes(searchTerm) ||
        desc.includes(searchTerm) ||
        price.includes(searchTerm) ||
        key.includes(searchTerm) ||
        highlights.includes(searchTerm)
      );
    });
  }, [packages, query, activeKeyword, isSearching]);

  const handleSelectKeyword = (keyword: string) => {
    if (activeKeyword === keyword) {
      setActiveKeyword(null);
      setQuery("");
    } else {
      setActiveKeyword(keyword);
      setQuery(keyword);
    }
    inputRef.current?.focus();
  };

  const handlePackageClick = (slug: string) => {
    setIsOpen(false);
    router.push(`/packages/${slug}`);
  };

  const handleHotelClick = () => {
    setIsOpen(false);
    router.push("/contact?topic=hotel-sonar-bangla");
  };

  return (
    <>
      {/* PROFESSIONAL HEADER SEARCH TRIGGER WITH ANIMATED PLACEHOLDER */}
      <div className="flex items-center">
        {/* Desktop Search Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Search tour packages and hotels"
          className="group hidden sm:flex items-center gap-2.5 px-3.5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-xs hover:shadow-md active:scale-98 border border-slate-200/90 hover:border-emerald-500/40 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-emerald-600 transition-transform group-hover:scale-110 shrink-0" />

          <div className="h-4 overflow-hidden relative flex items-center min-w-[200px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={placeholderIndex}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="font-medium tracking-wide absolute whitespace-nowrap text-slate-600"
              >
                {ANIMATED_PLACEHOLDERS[placeholderIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </button>

        {/* Mobile Search Icon Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Search tour packages and hotels"
          className="sm:hidden h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-amber-500/30 cursor-pointer"
        >
          <Search className="w-4 h-4 text-secondary-foreground" />
        </button>
      </div>

      {/* ULTRA-PROFESSIONAL SEARCH MODAL (4PX ROUNDED BOXES & PHOTOS) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl w-[94vw] sm:w-full p-0 gap-0 overflow-hidden bg-white text-slate-900 border border-slate-200 shadow-2xl rounded-[4px] max-h-[82vh] sm:max-h-[88vh] flex flex-col">
          <DialogTitle className="sr-only">
            Search Tour Packages and Sonar Bangla Hotels
          </DialogTitle>

          {/* Search Header Bar with Smooth Animated Placeholder (Compact on mobile, spacious on desktop) */}
          <div className="relative flex items-center px-3.5 sm:px-6 py-2.5 sm:py-4 bg-slate-50/80 border-b border-slate-100 shrink-0 pr-12 sm:pr-16">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 mr-2.5 sm:mr-3.5 shadow-2xs">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>

            <div className="relative w-full flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (activeKeyword && e.target.value !== activeKeyword) {
                    setActiveKeyword(null);
                  }
                }}
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 focus:outline-none font-medium z-10 py-1"
              />

              {/* Animated Floating Placeholder when query is empty */}
              {!query && (
                <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="text-sm sm:text-base text-slate-400 font-medium truncate"
                    >
                      {ANIMATED_PLACEHOLDERS[placeholderIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setActiveKeyword(null);
                  inputRef.current?.focus();
                }}
                className="p-1 sm:p-1.5 rounded-[4px] text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition z-20 mr-1"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>

          {/* Quick Keyword Filter Chips (Smooth horizontal scroll with full rounded pills) */}
          <div className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-slate-50/40 border-b border-slate-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-0.5">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" /> Suggestions:
            </span>

            {POPULAR_KEYWORDS.map((item) => {
              const isSelected =
                activeKeyword === item.label ||
                query.toLowerCase() === item.label.toLowerCase();
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => handleSelectKeyword(item.label)}
                  className={`inline-flex items-center gap-1 text-[11px] sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full whitespace-nowrap transition-all duration-200 border font-medium active:scale-95 ${isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                    : item.highlight
                      ? "bg-amber-50 text-amber-900 border-amber-200/90 hover:bg-amber-100/80 hover:border-amber-300"
                      : "bg-white text-slate-700 hover:text-emerald-700 hover:border-emerald-300 border-slate-200/90 shadow-2xs"
                    }`}
                >
                  <Icon
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSelected
                      ? "text-white"
                      : item.highlight
                        ? "text-amber-600"
                        : "text-slate-400"
                      }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Body: Live Results or 3-Package + Sonar Bangla Suggestion */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 overscroll-contain">
            {loading ? (
              <div className="py-10 flex flex-col items-center justify-center text-slate-400 gap-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 border-2 border-emerald-600 border-t-transparent rounded-[4px] animate-spin" />
                <p className="text-xs sm:text-sm font-medium">Finding best options...</p>
              </div>
            ) : isSearching ? (
              /* LIVE SEARCH RESULTS */
              searchResults.length > 0 || isHotelMatch ? (
                <div className="space-y-2.5 sm:space-y-4">
                  {/* Results Count Header */}
                  <div className="flex items-center justify-between pb-0.5 text-xs sm:text-sm">
                    <span className="font-semibold text-emerald-700 flex items-center gap-1.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                      Found {searchResults.length} Tour{" "}
                      {searchResults.length === 1 ? "Package" : "Packages"}
                      {isHotelMatch && " + 1 Hotel Stay"}
                    </span>
                    <button
                      onClick={() => {
                        setQuery("");
                        setActiveKeyword(null);
                      }}
                      className="text-slate-500 hover:text-emerald-600 transition font-medium text-xs sm:text-sm"
                    >
                      Clear search
                    </button>
                  </div>

                  {/* Sonar Bangla Hotel Result Card if matched */}
                  {isHotelMatch && (
                    <div
                      onClick={handleHotelClick}
                      className="group relative flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-[4px] bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-white border border-amber-200 hover:border-amber-400 transition-all cursor-pointer shadow-2xs hover:shadow-md active:scale-98"
                    >
                      <div className="relative w-16 h-16 sm:w-24 sm:h-24 min-w-[64px] min-h-[64px] sm:min-w-[96px] sm:min-h-[96px] rounded-[4px] overflow-hidden shrink-0 bg-slate-100">
                        <Image
                          src={SONAR_BANGLA_HOTEL_INFO.image}
                          alt={SONAR_BANGLA_HOTEL_INFO.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 64px, 96px"
                        />
                        <div className="absolute top-1 left-1 bg-amber-500 text-white text-[8px] sm:text-[9px] font-semibold px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-[4px] shadow-xs uppercase">
                          Hotel
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-base font-semibold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                              {SONAR_BANGLA_HOTEL_INFO.name}
                            </h4>
                            <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-semibold px-1 sm:px-1.5 py-0.2 rounded-[4px] shrink-0">
                              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500 text-amber-500" />
                              {SONAR_BANGLA_HOTEL_INFO.rating}
                            </span>
                          </div>

                          <p className="text-[11px] sm:text-sm text-slate-600 line-clamp-1 mt-0.5 font-medium">
                            {SONAR_BANGLA_HOTEL_INFO.tagline}
                          </p>

                          <div className="flex items-center gap-2 mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-slate-500">
                            <span className="flex items-center gap-1 line-clamp-1">
                              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                              {SONAR_BANGLA_HOTEL_INFO.location}
                            </span>
                            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              AC Deluxe &amp; Pool
                            </span>
                          </div>
                        </div>

                        {/* View Action link at bottom without box */}
                        <div className="mt-1 sm:mt-2 flex items-center">
                          <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-800 group-hover:text-amber-900">
                            Inquire booking <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Matching Packages List */}
                  <div className="space-y-2 sm:space-y-2.5">
                    {searchResults.map((pkg) => (
                      <div
                        key={pkg.key || pkg.id}
                        onClick={() => handlePackageClick(pkg.key)}
                        className="group flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-3 rounded-[4px] bg-white hover:bg-slate-50 transition-all cursor-pointer border border-slate-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-md active:scale-98"
                      >
                        {/* Package Thumbnail (rounded 4px) */}
                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 min-w-[56px] min-h-[56px] sm:min-w-[80px] sm:min-h-[80px] rounded-[4px] overflow-hidden shrink-0 bg-slate-100">
                          <Image
                            src={
                              pkg.packageImage ||
                              pkg.heroImage ||
                              "/assets/bestsundarbantourpackage.jpeg"
                            }
                            alt={pkg.packageName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 56px, 80px"
                          />
                          {pkg.isPopular && (
                            <div className="absolute top-1 left-1 bg-amber-500 text-white text-[8px] sm:text-[9px] font-semibold px-1 py-0.2 rounded-[4px] shadow-xs uppercase">
                              Popular
                            </div>
                          )}
                        </div>

                        {/* Package Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="text-xs sm:text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                              {pkg.packageName}
                            </h4>

                            {pkg.location && (
                              <div className="flex items-center gap-1 mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-slate-500">
                                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                                <span className="line-clamp-1">{pkg.location}</span>
                              </div>
                            )}
                          </div>

                          {/* View Action link at bottom without box */}
                          <div className="mt-1 sm:mt-2 flex items-center">
                            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
                              View details <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* No Results State */
                <div className="py-8 sm:py-10 px-3 text-center">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-[4px] bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                    <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-xs sm:text-base font-semibold text-slate-800 mb-1">
                    No matching tour packages found
                  </h4>
                  <p className="text-[11px] sm:text-sm text-slate-500 max-w-sm mx-auto mb-3">
                    No results for "{query || activeKeyword}". Try checking
                    "Hotel Sonar Bangla", "1 Night 2 Days", or "Durga Puja".
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {POPULAR_KEYWORDS.slice(0, 4).map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleSelectKeyword(item.label)}
                        className="text-xs sm:text-sm px-3 sm:px-3.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-full text-slate-700 font-medium transition border border-slate-200 active:scale-95"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ) : (
              /* INITIAL SUGGESTIONS VIEW: 3 PACKAGES + SONAR BANGLA HOTEL */
              <div className="space-y-3 sm:space-y-5">
                {/* 1. SONAR BANGLA HOTELS SECTION */}
                <div>
                  <div className="flex items-center justify-between pb-1 sm:pb-2">
                    <span className="text-[11px] sm:text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                      Featured Hotel &amp; Resort Stay
                    </span>
                    <button
                      onClick={() => handleSelectKeyword("Hotel Sonar Bangla")}
                      className="text-[11px] sm:text-sm font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
                    >
                      View in search <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                  <div
                    onClick={handleHotelClick}
                    className="group relative flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-[4px] bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-white border border-amber-200 hover:border-amber-400 transition-all cursor-pointer shadow-2xs hover:shadow-md active:scale-98"
                  >
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 min-w-[64px] min-h-[64px] sm:min-w-[96px] sm:min-h-[96px] rounded-[4px] overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={SONAR_BANGLA_HOTEL_INFO.image}
                        alt={SONAR_BANGLA_HOTEL_INFO.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 64px, 96px"
                      />
                      <div className="absolute top-1 left-1 bg-amber-500 text-white text-[8px] sm:text-[9px] font-semibold px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-[4px] shadow-xs uppercase">
                        Luxury
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-base font-semibold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                            {SONAR_BANGLA_HOTEL_INFO.name}
                          </h4>
                          <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-semibold px-1 sm:px-1.5 py-0.2 rounded-[4px] shrink-0">
                            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500 text-amber-500" />
                            {SONAR_BANGLA_HOTEL_INFO.rating}
                          </span>
                        </div>

                        <p className="text-[11px] sm:text-sm text-slate-600 line-clamp-1 mt-0.5 font-medium">
                          {SONAR_BANGLA_HOTEL_INFO.tagline}
                        </p>

                        <div className="flex items-center gap-2 mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-slate-500">
                          <span className="flex items-center gap-1 line-clamp-1">
                            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                            {SONAR_BANGLA_HOTEL_INFO.location}
                          </span>
                          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            AC Deluxe &amp; Pool
                          </span>
                        </div>
                      </div>

                      {/* View Action link at bottom without box */}
                      <div className="mt-1 sm:mt-2 flex items-center">
                        <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-800 group-hover:text-amber-900">
                          Inquire booking <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. ONLY THREE PACKAGES SUGGESTION SECTION */}
                <div>
                  <div className="flex items-center justify-between pb-1 sm:pb-2">
                    <span className="text-[11px] sm:text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                      Popular Tour Packages (Top 3)
                    </span>
                    <Link
                      href="/packages"
                      onClick={() => setIsOpen(false)}
                      className="text-[11px] sm:text-sm font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
                    >
                      Browse all <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-2 sm:space-y-2.5">
                    {suggestionPackages.map((pkg) => (
                      <div
                        key={pkg.key || pkg.id}
                        onClick={() => handlePackageClick(pkg.key)}
                        className="group flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-3 rounded-[4px] bg-white hover:bg-slate-50/90 transition-all cursor-pointer border border-slate-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-md active:scale-98"
                      >
                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 min-w-[56px] min-h-[56px] sm:min-w-[80px] sm:min-h-[80px] rounded-[4px] overflow-hidden shrink-0 bg-slate-100">
                          <Image
                            src={
                              pkg.packageImage ||
                              pkg.heroImage ||
                              "/assets/bestsundarbantourpackage.jpeg"
                            }
                            alt={pkg.packageName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 56px, 80px"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="text-xs sm:text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                              {pkg.packageName}
                            </h4>
                            {pkg.location && (
                              <div className="flex items-center gap-1 mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-slate-500">
                                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0" />
                                <span className="line-clamp-1">{pkg.location}</span>
                              </div>
                            )}
                          </div>

                          {/* View Action link at bottom without box */}
                          <div className="mt-1 sm:mt-2 flex items-center">
                            <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
                              View details <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-50/90 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs text-slate-500 font-medium shrink-0">
            <span className="text-center sm:text-left">
              Need a personalized itinerary or hotel booking?
            </span>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              Plan Your Custom Tour <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
