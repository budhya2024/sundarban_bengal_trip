import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SocialSidebar } from "@/components/SocialSidebar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import TanstackProvider from "@/components/TanstackProvider";

export const metadata: Metadata = {
  title: "Sundarban Bengal Trip",
  description: "Sundarban Bengal Trip",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TanstackProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <SocialSidebar />
            <ScrollToTopButton />
            {children}
          </TooltipProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
