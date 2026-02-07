"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  Users,
  Mail,
  Calendar,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  getSubscribersAction,
  toggleSubscriberStatus,
} from "@/app/actions/newsletter.actions";
import { SidebarTrigger } from "@/components/admin/SidebarTrigger";

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const loadData = (page: number) => {
    startTransition(async () => {
      const res = await getSubscribersAction({ page, pageSize: 10 });
      if (res.success) {
        setSubscribers(res.data || []);
        setPagination(res.pagination || { currentPage: 1, totalPages: 1 });
      }
    });
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const handleToggle = async (id: string, status: string) => {
    const res = await toggleSubscriberStatus(id, status);
    if (res.success) {
      toast({ title: "Status Updated" });
      loadData(pagination.currentPage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}

      <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur-md px-4 py-3 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Newsletter Subscribers
              </h1>
              <p className="hidden text-xs text-slate-500 md:block">
                Manage your audience and export email lists.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto p-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-bold uppercase text-slate-400 tracking-wider">
                Subscriber
              </th>
              <th className="p-4 text-xs font-bold uppercase text-slate-400 tracking-wider">
                Status
              </th>
              <th className="p-4 text-xs font-bold uppercase text-slate-400 tracking-wider">
                Joined Date
              </th>
              <th className="p-4 text-xs font-bold uppercase text-slate-400 tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      {sub.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {sub.email}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      sub.status === "subscribed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-500">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggle(sub.id, sub.status)}
                    className="text-xs text-slate-400 hover:text-emerald-600"
                  >
                    <RefreshCcw size={14} className="mr-2" />
                    {sub.status === "subscribed"
                      ? "Unsubscribe"
                      : "Resubscribe"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="p-4 border-t flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              disabled={pagination.currentPage === 1 || isPending}
              variant="outline"
              size="sm"
              onClick={() => loadData(pagination.currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              disabled={
                pagination.currentPage === pagination.totalPages || isPending
              }
              variant="outline"
              size="sm"
              onClick={() => loadData(pagination.currentPage + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
