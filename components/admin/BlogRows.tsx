"use client";

import { BlogType } from "@/db/schema";
import Image from "next/image";
import {
  Edit,
  Eye,
  ImageIcon,
  Trash2,
  AlertTriangle,
  Loader2,
  X,
  MoreVertical,
  StarOff,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  toggleStatus,
  deleteBlog,
  setFeaturedBlog,
} from "@/app/admin/actions/blogs.actions";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const BlogRows = ({ blogs }: { blogs: BlogType[] }) => {
  const router = useRouter();
  const { toast } = useToast();

  // State for Modal
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // State for Dropdown & Modals
  const [activeMenu, setActiveMenu] = useState<{
    id: string;
    style: React.CSSProperties;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<"top" | "bottom">("bottom");

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle Status Handler
  const handleToggle = async (id: string) => {
    const result = await toggleStatus(
      id,
      !blogs.find((b) => b.id === id)?.published,
    );
    if (result.success) {
      toast({ title: "Success", description: "Status updated." });
      router.refresh(); // Refresh to show new state
    } else {
      toast({
        title: "Error",
        description: "Update failed.",
        variant: "destructive",
      });
    }
  };

  // Delete Handler
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const result = await deleteBlog(deleteId);
      if (result.success) {
        toast({
          title: "Deleted",
          description: "Blog post removed successfully.",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not delete post.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null); // Close modal
    }
  };

  const handleFeature = async (id: string, isFeatured: boolean) => {
    const result = await setFeaturedBlog(id, isFeatured);
    if (result.success) {
      toast({
        title: "Featured Updated",
        description: "Hero blog updated successfully.",
      });
      setActiveMenu(null);
    } else {
      toast({
        title: "Error",
        description: "Update failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {blogs.map((blog) => (
        <tr
          key={blog.id}
          className={`
    border-b border-gray-100 last:border-none transition-colors group relative
    ${blog.isFeatured ? "bg-amber-50/40" : "hover:bg-gray-50"}
  `}
        >
          {/* Column 1: Image & Title */}
          {/* 'relative' & 'overflow-hidden' ensure the ribbon stays inside this specific cell */}
          <td className="px-6 py-4 relative overflow-hidden">
            {/* --- THE RIBBON --- */}
            {/* This sits ON TOP of the cell padding. It has 0 impact on height. */}
            {blog.isFeatured && (
              <div className="absolute top-0 left-0 z-10 pointer-events-none">
                {/* The Golden Triangle */}
                <div className="w-0 h-0 border-t-[40px] border-r-[40px] border-t-yellow-500 border-r-transparent shadow-sm" />

                {/* The Star Icon */}
                <div className="absolute top-[6px] left-[6px] text-white -rotate-45 drop-shadow-md">
                  <Star size={12} fill="currentColor" strokeWidth={3} />
                </div>
              </div>
            )}

            {/* Actual Content (Pushed slightly right by pl-2 to breathe) */}
            <div className="flex items-center gap-4 pl-2">
              <div
                className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md border ${blog.isFeatured ? "border-yellow-400" : "border-gray-200"} bg-gray-100`}
              >
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <ImageIcon size={20} />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span
                  className={`font-medium line-clamp-2 max-w-[200px] font-sans ${blog.isFeatured ? "text-gray-900" : "text-gray-900"}`}
                >
                  {blog.title}
                </span>

                {/* Optional: Small text indicator underneath */}
                {blog.isFeatured && (
                  <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider mt-0.5">
                    Hero Highlight
                  </span>
                )}
              </div>
            </div>
          </td>

          <td className="px-6 py-4 text-gray-600 text-sm font-medium">
            {blog.author}
          </td>

          {/* Status Toggle */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggle(blog.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  blog.published ? "bg-[#4a6741]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${blog.published ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
              <span
                className={`text-xs font-medium ${blog.published ? "text-[#4a6741]" : "text-gray-400"}`}
              >
                {blog.published ? "Published" : "Draft"}
              </span>
            </div>
          </td>

          <td className="px-6 py-4 text-gray-500 text-sm">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </td>

          <td className="px-6 py-4 text-gray-500 text-sm text-right">
            {/* --- THE ACTION DROPDOWN --- */}
            <div className="relative inline-block text-left">
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  // Close if clicking the same button
                  if (activeMenu?.id === blog.id) {
                    setActiveMenu(null);
                    return;
                  }

                  // CALCULATE FIXED POSITION
                  const rect = e.currentTarget.getBoundingClientRect();
                  const MENU_WIDTH = 192; // w-48 is approx 192px
                  const MENU_HEIGHT = 220; // Estimated max height
                  const spaceBelow = window.innerHeight - rect.bottom;
                  const isTop = spaceBelow < MENU_HEIGHT;

                  setActiveMenu({
                    id: blog.id,
                    style: {
                      position: "fixed",
                      zIndex: 9999, // Ensure it floats above EVERYTHING
                      // Align Right Edges: Button Right - Menu Width
                      left: `${rect.right - MENU_WIDTH}px`,
                      // Dynamic Vertical Position
                      top: isTop ? "auto" : `${rect.bottom + 6}px`,
                      bottom: isTop
                        ? `${window.innerHeight - rect.top + 6}px`
                        : "auto",
                    },
                  });
                }}
                className={`p-2 rounded-lg transition-colors ${activeMenu?.id === blog.id ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
              >
                <MoreVertical size={20} />
              </button>

              {/* Dropdown Menu (Rendered with Fixed Position) */}
              {activeMenu?.id === blog.id && (
                <div
                  ref={menuRef}
                  style={activeMenu.style} // Apply the calculated fixed position
                  className="w-48 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="py-1 text-left">
                    {/* 1. Feature Action */}
                    <button
                      onClick={() => handleFeature(blog.id, !blog.isFeatured)}
                      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"
                    >
                      {blog.isFeatured ? (
                        <>
                          <StarOff
                            size={16}
                            className="mr-3 text-gray-400 group-hover:text-yellow-600"
                          />
                          Un-Feature
                        </>
                      ) : (
                        <>
                          <Star
                            size={16}
                            className="mr-3 text-gray-400 group-hover:text-yellow-600"
                          />
                          Make Featured
                        </>
                      )}
                    </button>

                    {/* 2. View Public */}
                    {/* <button className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Eye
                        size={16}
                        className="mr-3 text-gray-400 group-hover:text-gray-600"
                      />
                      View Live
                    </button> */}

                    {/* 3. Edit */}
                    <Link
                      href={`/admin/blogs/${blog.id}`}
                      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit
                        size={16}
                        className="mr-3 text-gray-400 group-hover:text-gray-600"
                      />
                      Edit Post
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    {/* 4. Delete */}
                    <button
                      onClick={() => {
                        setDeleteId(blog.id);
                        setActiveMenu(null);
                      }}
                      className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2
                        size={16}
                        className="mr-3 text-red-400 group-hover:text-red-600"
                      />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}

      {/* --- DELETE MODAL --- */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Modal Content */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100 scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 p-3 bg-red-50 rounded-full text-red-600">
                <AlertTriangle size={24} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  Delete Post?
                </h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  Are you sure you want to delete this blog post? This action is
                  permanent and cannot be undone.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
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
                {isDeleting ? "Deleting..." : "Delete Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogRows;
