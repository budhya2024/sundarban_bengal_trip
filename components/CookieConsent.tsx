"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "sbt_cookie_consent";

export const CookieConsent = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [entering, setEntering] = useState(false);

  // Never show on admin pages
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const t = setTimeout(() => {
        setVisible(true);
        setTimeout(() => setEntering(true), 10);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [isAdmin]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, timestamp: Date.now() }));
    setEntering(false);
    setTimeout(() => setVisible(false), 400);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, timestamp: Date.now() }));
    setEntering(false);
    setTimeout(() => setVisible(false), 400);
  };

  if (isAdmin || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className={`
        fixed bottom-0 left-0 right-0 z-[999]
        transition-transform duration-500 ease-out
        ${entering ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div
        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
        style={{ background: "hsl(150 45% 18%)" }}
      >
        {/* Text */}
        <p className="text-white/80 text-sm leading-relaxed flex-1">
          🍪 We use cookies to improve your experience on our site. By continuing to browse, you agree to our{" "}
          <a
            href="/privacy-policy"
            className="text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* Actions — plain text links, no buttons */}
        <div className="flex items-center gap-5 shrink-0">
          <button
            onClick={decline}
            className="text-white/50 hover:text-white/80 text-sm transition-colors"
          >
            Decline
          </button>
          <button
            onClick={dismiss}
            className="text-amber-300 hover:text-amber-200 text-sm font-semibold transition-colors"
          >
            Got it, Accept
          </button>
        </div>
      </div>
    </div>
  );
};
