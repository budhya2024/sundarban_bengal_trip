"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Image, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Home Page", href: "/admin/home", icon: Home },
  { name: "Manage Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Gallery", href: "/admin/gallery", icon: Image },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary border-r border-primary-foreground/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-primary-foreground/10">
        <h1 className="font-display text-2xl font-bold text-secondary">
          Sundarban CMS
        </h1>
        <p className="text-primary-foreground/70 text-sm mt-1">
          Content Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-secondary text-primary font-semibold shadow-lg"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-foreground/10">
        <div className="text-primary-foreground/60 text-xs">
          <p>Admin Panel v1.0</p>
          <p className="mt-1">© 2026 Sundarban Bengal Trips</p>
        </div>
      </div>
    </aside>
  );
}
