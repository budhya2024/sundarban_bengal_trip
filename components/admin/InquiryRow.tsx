"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import {
  User,
  Phone,
  Calendar,
  Package,
  MoreVertical,
  MessageSquare,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { InquiryDrawer } from "@/components/admin/InquiryDrawer";
import { BookingValues } from "@/schemas/booking.schema";
import { format, parseISO } from "date-fns";

export default function InquiryRow({ inquiry }: { inquiry: BookingValues }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Status Badge Logic
  const statusStyles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    contacted: "bg-blue-100 text-blue-700 border-blue-200",
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <>
      <TableRow
        className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
        onClick={() => setIsDrawerOpen(true)}
      >
        <TableCell className="py-4 px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
              <User size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-700 text-sm">
                {inquiry.name}
              </span>
              <span className="text-[11px] text-slate-400">
                {inquiry.email}
              </span>
            </div>
          </div>
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
            <Phone size={14} className="text-slate-400" />
            {inquiry.phone}
          </div>
        </TableCell>

        <TableCell>
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase text-emerald-600 tracking-tighter">
              {inquiry.package}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar size={12} />{" "}
              {format(parseISO(inquiry.date), "MMM dd, yyyy")}
            </span>
          </div>
        </TableCell>

        <TableCell>
          <Badge
            variant="outline"
            className={`capitalize font-bold text-[10px] px-2 py-0 ${statusStyles[inquiry.status]}`}
          >
            {inquiry.status}
          </Badge>
        </TableCell>

        <TableCell className="text-right px-6">
          <button className="p-2 text-slate-400 hover:text-slate-600">
            <MoreVertical size={18} />
          </button>
        </TableCell>
      </TableRow>

      <InquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        inquiry={inquiry}
      />
    </>
  );
}
