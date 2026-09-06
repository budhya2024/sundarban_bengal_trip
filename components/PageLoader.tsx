"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0d1f17] text-white select-none pointer-events-auto"
        >
          {/* Centered Ring Spinner */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-5">
            {/* Base White Circle */}
            <div className="w-full h-full rounded-full border-4 border-white" />

            {/* Spinning Brand Accent Arc */}
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-emerald-500 animate-spin"
              style={{ animationDuration: "1s" }}
            />
          </div>

          {/* Elegant Loading Text */}
          <h2 className="text-xl sm:text-2xl font-serif text-primary">
            Loading
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
