"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookingModal } from "./BookingModal";

export const GlobalBookingModal = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Only show popup on public pages — never on /admin routes
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminPage) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isAdminPage]);

  if (isAdminPage) return null;

  return (
    <BookingModal
      packageName="Sundarban Tour Package"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      hideTrigger={true}
    />
  );
};
