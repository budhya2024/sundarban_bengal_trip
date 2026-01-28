"use client";

import { PageCard } from "@/components/admin/PageCard";
import { Home, FileText, Image as ImageIcon, Mail } from "lucide-react";

export default function AdminDashboard() {
  const pages = [
    {
      title: "Home Page",
      description: "Edit hero section, stats, and main content",
      icon: Home,
      href: "/admin/pages/home",
      lastUpdated: "Just now",
    },
    {
      title: "About Page",
      description: "Manage about section content",
      icon: FileText,
      href: "/admin/pages/about",
      lastUpdated: "2 days ago",
    },
    {
      title: "Gallery",
      description: "Upload and manage gallery images",
      icon: ImageIcon,
      href: "/admin/pages/gallery",
      lastUpdated: "1 week ago",
    },
    {
      title: "Contact",
      description: "Update contact information",
      icon: Mail,
      href: "/admin/pages/contact",
      lastUpdated: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-forest p-8 rounded-xl text-primary-foreground">
        <h1 className="font-display text-3xl font-bold mb-2">
          Welcome to Admin Panel
        </h1>
        <p className="text-primary-foreground/90">
          Manage your website content from one central location
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                12
              </p>
              <p className="text-sm text-muted-foreground">Total Pages</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber/20 rounded-full flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-amber" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                48
              </p>
              <p className="text-sm text-muted-foreground">Media Files</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-teal" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                Active
              </p>
              <p className="text-sm text-muted-foreground">Site Status</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          Manage Pages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((page) => (
            <PageCard key={page.title} {...page} />
          ))}
        </div>
      </div>
    </div>
  );
}
