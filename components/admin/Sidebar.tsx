"use client";

import React, { memo, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Image as ImageIcon,
  Settings,
  LayoutDashboard,
  Mail,
  LogOut,
  ChevronLeft,
  Package,
  Info,
  ClipboardList,
  Loader2,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipPortal,
} from "@/components/ui/tooltip";
import { useSidebarContext } from "@/context/SidebarContext";
import { useToast } from "@/hooks/use-toast";
import { logoutAction } from "@/app/actions/auth.actions";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Home Page",
    href: "/admin/home",
    icon: Home,
  },
  {
    name: "Manage Blogs",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    name: "Contact",
    href: "/admin/contact",
    icon: Mail,
  },
  {
    name: "Package",
    href: "/admin/package",
    icon: Package,
  },
  {
    name: "About",
    href: "/admin/about",
    icon: Info,
  },
  {
    name: "Booking Inquiry",
    href: "/admin/inquiry",
    icon: ClipboardList,
  },
  {
    name: "Newsletter",
    href: "/admin/newsletter",
    icon: Newspaper,
  },
];

const NavContent = memo(({ mobile = false }: { mobile?: boolean }) => {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebarContext();

  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      toast({
        title: "Logged Out",
        description: "You have been securely logged out.",
      });
    });
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "flex flex-col h-full bg-primary",
          !mobile && "border-r border-primary-foreground/10",
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            "p-6 border-b border-primary-foreground/10 flex items-center justify-between",
            isCollapsed && !mobile && "px-4",
          )}
        >
          {(!isCollapsed || mobile) && (
            <div className="animate-in fade-in duration-300">
              <h1 className="font-display text-2xl font-bold text-secondary">
                Sundarban
              </h1>
              <p className="text-primary-foreground/70 text-xs mt-1">
                CMS Panel
              </p>
            </div>
          )}
          {!mobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-primary-foreground/50 hover:text-secondary hover:bg-primary-foreground/10 hidden lg:flex"
            >
              <ChevronLeft
                className={cn(
                  "h-5 w-5 transition-transform",
                  isCollapsed && "rotate-180",
                )}
              />
            </Button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-secondary text-primary font-semibold shadow-lg"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  isCollapsed && !mobile && "justify-center px-2",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-primary" : "group-hover:text-secondary",
                  )}
                />
                {(!isCollapsed || mobile) && (
                  <span className="animate-in fade-in slide-in-from-left-2 duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            );

            // Desktop Tooltips when Collapsed
            if (isCollapsed && !mobile) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipPortal>
                    <TooltipContent
                      side="right"
                      sideOffset={15}
                      className="bg-secondary text-primary font-bold border-none z-[9999] shadow-xl"
                    >
                      {item.name}
                    </TooltipContent>
                  </TooltipPortal>
                </Tooltip>
              );
            }

            return (
              <React.Fragment key={item.name}>{linkContent}</React.Fragment>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-primary-foreground/10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                disabled={isPending}
                className={cn(
                  "w-full justify-start text-primary-foreground/80 hover:bg-destructive hover:text-white gap-3 transition-colors",
                  isCollapsed && !mobile && "justify-center px-0",
                )}
                onClick={handleLogout} // Hooked up the function
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                ) : (
                  <LogOut className="w-5 h-5 shrink-0" />
                )}
                {(!isCollapsed || mobile) && (
                  <span>{isPending ? "Logging out..." : "Logout"}</span>
                )}
              </Button>
            </TooltipTrigger>
            {isCollapsed && !mobile && (
              <TooltipPortal>
                <TooltipContent
                  side="right"
                  sideOffset={15}
                  className="bg-destructive text-white border-none z-[9999] shadow-xl"
                >
                  Logout
                </TooltipContent>
              </TooltipPortal>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
});

export const Sidebar = memo(() => {
  const { isOpen, closeSidebar, isCollapsed } = useSidebarContext();
  return (
    <>
      {/* MOBILE SIDEBAR (Context Controlled) */}
      <Sheet open={isOpen} onOpenChange={closeSidebar}>
        <SheetContent side="left" className="p-0 w-72 border-none z-[10000]">
          <div className="sr-only">
            <SheetHeader>
              <SheetTitle>Admin Navigation</SheetTitle>
              <SheetDescription>
                Access various sections of the Sundarban CMS panel.
              </SheetDescription>
            </SheetHeader>
          </div>
          <NavContent mobile />
        </SheetContent>
      </Sheet>

      {/* DESKTOP SIDEBAR (Sticky) */}
      <aside
        className={cn(
          "hidden lg:flex flex-col transition-all duration-300 ease-in-out h-screen sticky top-0 z-[40]",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <NavContent />
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";
