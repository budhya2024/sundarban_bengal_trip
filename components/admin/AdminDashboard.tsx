"use client";

import { PageCard } from "@/components/admin/PageCard";
import {
  Home,
  FileText,
  Image as ImageIcon,
  Mail,
  Package,
  Info,
  ClipboardList,
  Users,
} from "lucide-react";
import { SidebarTrigger } from "./SidebarTrigger";

interface AdminDashboardProps {
  stats: {
    totalBlogs: number;
    totalBookings: number;
    totalSubscribers: number;
  };
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const pages = [
    {
      title: "Home Page",
      description: "Edit hero section, testimonials, and FAQs",
      icon: Home,
      href: "/admin/home",
      lastUpdated: "Just now",
    },
    {
      title: "Manage Blogs",
      description: "Create, edit and delete travel stories",
      icon: FileText,
      href: "/admin/blogs",
      lastUpdated: "2 days ago",
    },
    {
      title: "Packages",
      description: "Manage tour itineraries, pricing and timelines",
      icon: Package,
      href: "/admin/package",
      lastUpdated: "Today",
    },
    {
      title: "Booking Inquiries",
      description: "View and manage customer booking requests",
      icon: ClipboardList,
      href: "/admin/inquiry",
      lastUpdated: "1 hour ago",
    },
    {
      title: "Newsletter",
      description: "Manage subscriber list and export data",
      icon: Users,
      href: "/admin/newsletter",
      lastUpdated: "New subscriber today",
    },
    {
      title: "Gallery",
      description: "Upload and manage gallery images",
      icon: ImageIcon,
      href: "/admin/gallery",
      lastUpdated: "1 week ago",
    },
    {
      title: "About Page",
      description: "Edit company profile and mission",
      icon: Info,
      href: "/admin/about",
      lastUpdated: "Dec 2025",
    },
    {
      title: "Contact",
      description: "Update contact info and social links",
      icon: Mail,
      href: "/admin/contact",
      lastUpdated: "3 days ago",
    },
  ];

  return (
    <div className="space-y-8 mx-auto">
      {/* Welcome Section */}
      <div className="bg-emerald-900 py-2 px-8 text-white shadow-xl relative overflow-hidden flex items-center gap-2">
        <SidebarTrigger />
        <div className="relative z-10">
          <h1 className="font-display text-4xl font-bold mb-3">
            Sundarban Dashboard
          </h1>
          <p className="text-emerald-100/80 max-w-md">
            Welcome back, You have {stats.totalBookings} new inquiries to review
            today.
          </p>
        </div>
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Real-Time Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 max-w-7xl">
        <StatCard
          label="Booking Inquiries"
          value={stats.totalBookings}
          icon={ClipboardList}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Active Blogs"
          value={stats.totalBlogs}
          icon={FileText}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Subscribers"
          value={stats.totalSubscribers}
          icon={Users}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="Site Status"
          value="Active"
          icon={Home}
          color="bg-slate-50 text-slate-600"
        />
      </div>

      {/* Pages Grid */}
      <div className="p-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-slate-800">
            Content Management
          </h2>
          <div className="h-px flex-1 bg-slate-200 ml-6 hidden md:block" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <PageCard key={page.title} {...page} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 leading-none mt-1">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
