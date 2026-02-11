"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import {
  MoreVertical,
  Edit,
  Trash2,
  Layout,
  Star,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { deletePackage } from "@/app/actions/package.actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createPortal } from "react-dom";

export function PackageRow({ pkg }: { pkg: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePackage(pkg.key);
      if (result.success) {
        toast({
          title: "Success",
          description: "Package deleted successfully",
        });
        setShowDeleteModal(false);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete package",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TableRow className="group hover:bg-slate-50/40 transition-colors border-b last:border-0 relative">
        <TableCell className="py-5 px-8 relative">
          {pkg.isPopular && (
            <div className="absolute top-0 left-0 z-10">
              <div
                className="h-9 w-9 bg-amber-500 flex items-start justify-start p-1 shadow-sm"
                style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              >
                <Star className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="relative h-14 w-20 rounded-lg overflow-hidden border bg-slate-100 flex-shrink-0 shadow-sm">
              {pkg.heroImage ? (
                <Image
                  src={pkg.heroImage}
                  alt={pkg.packageName}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200">
                  <Layout className="w-4 h-4 text-slate-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 text-[14px] leading-tight group-hover:text-emerald-700 transition-colors">
                  {pkg.heroTitle}
                </span>
                {pkg.isPopular && (
                  <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-1.5 py-0.5 rounded-lg uppercase tracking-tighter border">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  {pkg.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium">
                  <MapPin size={10} /> {pkg.location}
                </span>
              </div>
            </div>
          </div>
        </TableCell>

        <TableCell className="py-5">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-600">
              ₹{pkg.price}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock size={10} /> {pkg.duration}
            </span>
          </div>
        </TableCell>

        <TableCell className="py-5 hidden md:table-cell">
          <div className="flex flex-col gap-1 text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-tight flex items-center gap-1.5">
              <Calendar size={12} className="text-slate-400" />
              Last Updated
            </span>
            <span className="text-xs">
              {pkg.updatedAt
                ? format(new Date(pkg.updatedAt), "MMM dd, yyyy")
                : "N/A"}
            </span>
          </div>
        </TableCell>

        <TableCell className="py-5 text-right px-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-white border-transparent hover:border-slate-100"
              >
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 p-1 rounded-xl shadow-xl border-slate-200"
            >
              <DropdownMenuItem asChild>
                <Link
                  href={`/admin/package/${pkg.key}`}
                  className="cursor-pointer flex items-center py-2 px-3 text-sm text-slate-600"
                >
                  <Edit className="mr-3 h-4 w-4 text-slate-400" /> Edit Package
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-slate-100 my-1" />
              <DropdownMenuItem
                onClick={() => setShowDeleteModal(true)}
                className="cursor-pointer flex items-center py-2 px-3 text-sm text-red-600 focus:bg-red-50 focus:text-red-700"
              >
                <Trash2 className="mr-3 h-4 w-4" /> Delete Permanently
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* --- DELETE MODAL --- */}
      {showDeleteModal &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100 scale-100 animate-in zoom-in-95 duration-200 text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-red-50 rounded-full text-red-600">
                  <AlertTriangle size={24} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-sans font-bold text-gray-900">
                    Delete Package?
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-700">
                      "{pkg.heroTitle}"
                    </span>
                    ? This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
                >
                  {isDeleting ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  {isDeleting ? "Deleting..." : "Delete Package"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
