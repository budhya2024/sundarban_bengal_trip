"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/context/SidebarContext";

export function SidebarTrigger() {
  const { openSidebar } = useSidebarContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden -ml-2 mr-2 text-slate-600 hover:bg-slate-100 transition-colors focus-visible:ring-emerald-500"
      onClick={(e) => {
        e.preventDefault();
        openSidebar();
      }}
      aria-label="Open navigation menu"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}
