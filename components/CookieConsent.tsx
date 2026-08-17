"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "sbt_cookie_consent";

export const CookieConsent = () => {
  const pathname = usePathname();
  const router = useRouter();
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
        setTimeout(() => setEntering(true), 50);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [isAdmin]);

  const handleAcceptAll = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accepted: true, rejected: false, timestamp: Date.now() })
    );
    setEntering(false);
    setTimeout(() => setVisible(false), 400);
  };

  const handleRejectAll = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ accepted: false, rejected: true, timestamp: Date.now() })
    );
    setEntering(false);
    setTimeout(() => setVisible(false), 400);
  };

  const handleCustomize = () => {
    router.push("/privacy-policy");
  };

  if (isAdmin || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie privacy notice"
      className={`
        fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9999]
        max-w-[480px] w-[calc(100%-2rem)]
        transition-all duration-500 ease-out
        ${entering ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"}
      `}
    >
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_15px_50px_rgba(0,0,0,0.18)] border border-gray-100">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2.5 tracking-tight font-sans">
          We value your privacy
        </h2>

        {/* Description */}
        <p className="text-[#4a4a4a] text-sm sm:text-[0.92rem] leading-relaxed mb-6 font-normal">
          We use cookies to enhance your browsing experience, serve personalized
          ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;,
          you consent to our use of cookies.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleCustomize}
            className="w-full border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white font-semibold text-xs sm:text-sm py-2.5 px-2 sm:px-3 rounded-sm transition-all duration-200 active:scale-[0.98] text-center"
          >
            Customize
          </button>
          <button
            type="button"
            onClick={handleRejectAll}
            className="w-full border-2 border-primary bg-white text-primary hover:bg-gray-100 font-semibold text-xs sm:text-sm py-2.5 px-2 sm:px-3 rounded-sm transition-all duration-200 active:scale-[0.98] text-center"
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full border-2 border-primary hover:border-secondary bg-primary text-white hover:bg-secondary font-semibold text-xs sm:text-sm py-2.5 px-2 sm:px-3 rounded-sm transition-all duration-200 active:scale-[0.98] text-center shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

