"use client";

import { useEffect, useState } from "react";
import { BookingModal } from "./BookingModal";

export const GlobalBookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <BookingModal
      packageName="Sundarban Tour Package"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      hideTrigger={true}
    />
  );
};
