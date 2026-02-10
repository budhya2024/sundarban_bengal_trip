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
  Database,
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
  const isBrandNewDb = Object.values(stats).every((v) => v === 0);

  const pages = [
    {
      title: "Home Page",
      description: "Edit hero section, testimonials, and FAQs",
      icon: Home,
      href: "/admin/home",
      lastUpdated: "Active",
    },
    {
      title: "Manage Blogs",
      description: "Create, edit and delete travel stories",
      icon: FileText,
      href: "/admin/blogs",
    },
    {
      title: "Packages",
      description: "Manage tour itineraries, pricing and timelines",
      icon: Package,
      href: "/admin/package",
    },
    {
      title: "Booking Inquiries",
      description: "View and manage customer booking requests",
      icon: ClipboardList,
      href: "/admin/inquiry",
    },
    {
      title: "Newsletter",
      description: "Manage subscriber list and export data",
      icon: Users,
      href: "/admin/newsletter",
    },
    {
      title: "Gallery",
      description: "Upload and manage gallery images",
      icon: ImageIcon,
      href: "/admin/gallery",
    },
    {
      title: "About Page",
      description: "Edit company profile and mission",
      icon: Info,
      href: "/admin/about",
    },
    {
      title: "Contact",
      description: "Update contact info and social links",
      icon: Mail,
      href: "/admin/contact",
    },
  ];

  return (
    <div className="space-y-8 mx-auto pb-12">
      {/* Welcome Section */}
      <div className="bg-emerald-900 pt-12 pb-16 px-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-start gap-6 relative z-10">
          <SidebarTrigger />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-emerald-500/30">
                System Active
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-3">
              Sundarban Dashboard
            </h1>
            <p className="text-emerald-100/80 max-w-md text-lg">
              {stats.totalBookings > 0
                ? `Welcome back! You have ${stats.totalBookings} pending inquiries to check.`
                : "Welcome back! Your system is synchronized and ready."}
            </p>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-[-20%] right-[-5%] w-96 h-96 bg-emerald-800 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-10 relative z-20">
        {/* Real-Time Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            label="Pending Inquiries"
            value={stats.totalBookings}
            icon={ClipboardList}
            color="bg-amber-500"
          />
          <StatCard
            label="Published Blogs"
            value={stats.totalBlogs}
            icon={FileText}
            color="bg-blue-500"
          />
          <StatCard
            label="Subscribers"
            value={stats.totalSubscribers}
            icon={Users}
            color="bg-emerald-500"
          />
          <StatCard
            label="DB Status"
            value="Connected"
            icon={Database}
            color="bg-slate-700"
            isStatus
          />
        </div>

        {/* Empty State Notification */}
        {isBrandNewDb && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4 text-blue-800 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <Info size={18} />
            </div>
            <p className="text-sm font-medium">
              It looks like your Neon database is fresh! Start by creating your
              first blog post or tour package to see your stats grow.
            </p>
          </div>
        )}

        {/* Pages Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-slate-800">
              Content Management
            </h2>
            <div className="h-px flex-1 bg-slate-200 ml-8" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <PageCard key={page.title} {...page} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, isStatus }: any) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ${color} transition-transform group-hover:scale-110`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">
            {value}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 mt-1">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
