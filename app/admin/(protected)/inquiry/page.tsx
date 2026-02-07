// app/admin/inquiries/page.tsx
import { getInquiryRows } from "@/app/actions/home.actions";
import InquiryRow from "@/components/admin/InquiryRow";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarTrigger } from "@/components/admin/SidebarTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const InquiriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const currentPage = Number((await searchParams).page) || 1;
  const { success, data, totalPages } = await getInquiryRows(currentPage, 20);

  if (!success || !data) {
    return (
      <div className="p-8 text-center text-slate-500">
        Failed to load inquiries.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-bold text-slate-800">
              Customer Inquiries
            </h1>
            <p className="text-[11px] text-slate-500">
              Manage your leads and track connection status
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-200">
                <TableHead className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Customer Details
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Contact Phone
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Tour Interest
                </TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Connection Status
                </TableHead>
                <TableHead className="text-right px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-20 text-slate-400"
                  >
                    No inquiries found yet.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((inquiry) => (
                  <InquiryRow key={inquiry.id} inquiry={inquiry} />
                ))
              )}
            </TableBody>
          </Table>

          {/* --- COMPACT PAGINATION BAR --- */}
          <div className="px-6 py-4 border-t bg-slate-50/30 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={`?page=${currentPage - 1}`}
                className={`p-2 rounded-lg border bg-white transition-all ${
                  currentPage <= 1
                    ? "pointer-events-none opacity-30"
                    : "hover:border-emerald-200 text-emerald-600"
                }`}
              >
                <ChevronLeft size={16} />
              </Link>
              <Link
                href={`?page=${currentPage + 1}`}
                className={`p-2 rounded-lg border bg-white transition-all ${
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-30"
                    : "hover:border-emerald-200 text-emerald-600"
                }`}
              >
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiriesPage;
