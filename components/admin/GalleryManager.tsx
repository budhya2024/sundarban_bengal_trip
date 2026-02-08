"use client";

import { useState, useRef, useMemo, useEffect, useTransition } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Trash2,
  Plus,
  X,
  Loader2,
  ImageIcon,
  Check,
  ChevronDown,
  Search,
  Eye,
  AlertTriangle,
} from "lucide-react";
import clsx from "clsx";
import { uploadImage } from "@/app/actions/imagekit.actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryType } from "@/db/schema";
import * as z from "zod";
import { addGallery, deleteGalleryItem } from "@/app/actions/gallery.actions";
import convertToBase64 from "@/lib/convertToBase64";
import { Button } from "../ui/button";
import { SidebarTrigger } from "./SidebarTrigger";
import { useToast } from "@/hooks/use-toast";

// --- CUSTOM COMPONENT: Dynamic Creatable Select ---
const CreatableSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState<"bottom" | "top">("bottom");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle Click Outside & Dynamic Position
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // Check space on open
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setPosition(spaceBelow < 250 ? "top" : "bottom");
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Input Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full px-4 py-2 rounded-lg border flex items-center justify-between cursor-pointer bg-white transition-all",
          isOpen
            ? "border-[#4a6741] ring-2 ring-[#4a6741]/20"
            : "border-gray-300 hover:border-gray-400",
        )}
      >
        <span className={clsx("text-sm capitalize", !value && "text-gray-400")}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={clsx(
            "text-gray-400 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={clsx(
            "absolute left-0 z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100",
            position === "bottom" ? "top-full mt-1" : "bottom-full mb-1",
          )}
        >
          {/* Sticky Search Header */}
          <div className="sticky top-0 bg-white p-2 border-b border-gray-100 z-10">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-2.5 text-gray-400"
              />
              <input
                autoFocus
                placeholder="Type to search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#4a6741] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="p-1">
            {filteredOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => handleSelect(opt)}
                className={clsx(
                  "px-3 py-2 text-sm rounded-md cursor-pointer flex items-center justify-between group transition-colors capitalize",
                  value === opt
                    ? "bg-green-50 text-[#4a6741]"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                {opt}
                {value === opt && <Check size={14} />}
              </div>
            ))}

            {/* Create New Option */}
            {search && !filteredOptions.includes(search) && (
              <div
                onClick={() => handleSelect(search)}
                className="px-3 py-2 text-sm text-[#4a6741] font-medium rounded-md cursor-pointer hover:bg-green-50 flex items-center gap-2 border-t border-gray-100 mt-1 capitalize"
              >
                <Plus size={14} /> Create "{search}"
              </div>
            )}

            {!search && filteredOptions.length === 0 && (
              <div className="px-3 py-4 text-center text-xs text-gray-400">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const DEFAULT_CATEGORIES = ["wildlife", "landscape", "activities", "sunset"];

const gallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  url: z.string().min(1, "Image is required"),
});

export default function GalleryManager({
  initialImages = [],
  categoryData = [],
}: {
  initialImages?: GalleryType[];
  categoryData: string[];
}) {
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<GalleryType[]>(initialImages || []);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([
    ...DEFAULT_CATEGORIES,
    ...categoryData,
  ]);

  // --- NEW STATES for Preview and Delete ---
  const [previewTarget, setPreviewTarget] = useState<GalleryType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<GalleryType>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      category: "",
      url: "",
    },
  });

  const category = watch("category");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError("File is too large. Max size is 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const base64 = await convertToBase64(file);
      if (base64) {
        setValue("url", base64);
        setPreviewUrl(base64);
      } else {
        setUploadError("Upload failed server-side.");
      }
    } catch (error) {
      console.error(error);
      setUploadError("Network error occurred.");
    } finally {
      setIsUploading(false);
      if (fileInputRef?.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadSubmit = async (formdata: {
    title: string;
    category: string;
    url: string;
  }) => {
    // Use startTransition to track the server-side work
    startTransition(async () => {
      const { success, data } = await addGallery(formdata);

      if (success && data) {
        setImages((prev) => [
          {
            id: data.id,
            title: data.title,
            url: data.url,
            fileId: data.fileId,
            category: data.category.toLowerCase(),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
          ...prev,
        ]);

        // Cleanup UI
        setIsUploadOpen(false);
        setPreviewUrl(null);
        reset();
        toast({ title: "Success", description: "Image added to gallery" });
      }
    });
  };

  // --- DELETE HANDLER ---
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const { success, error } = await deleteGalleryItem(deleteTarget.id);
      if (!success) throw error;

      setImages((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md px-4 py-3 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Media Gallery
              </h1>
              <p className="hidden text-xs text-slate-500 md:block">
                Manage your visual assets across the platform
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="bg-emerald-700 hover:bg-emerald-800 h-10 px-6 shadow-sm"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Image
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setActiveFilter("All")}
            className={clsx(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap border",
              activeFilter === "All"
                ? "bg-[#1a472a] text-white border-[#1a472a]"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
            )}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap border capitalize",
                activeFilter === cat
                  ? "bg-[#4a6741] text-white border-[#4a6741]"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] w-full bg-gray-100">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* --- Hover Actions (Preview & Delete) --- */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    {/* Preview Button */}
                    <button
                      onClick={() => setPreviewTarget(img)}
                      className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 shadow-sm transition-transform hover:scale-110"
                      title="Preview Image"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => setDeleteTarget(img)}
                      className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-sm transition-transform hover:scale-110"
                      title="Delete Image"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded font-medium uppercase tracking-wider">
                    {img.category}
                  </span>
                </div>
                <div className="p-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-500">
            <ImageIcon className="text-gray-300 mb-3" size={32} />
            <p>No images found</p>
          </div>
        )}
      </div>

      {/* --- UPLOAD MODAL (Existing) --- */}

      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Upload New Asset
                </h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  Media Library
                </p>
              </div>
              <button
                onClick={() => {
                  setIsUploadOpen(false);
                  setUploadError(null);
                  reset();
                }}
              >
                <X size={20} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleUploadSubmit)}
              className="p-6 space-y-6"
            >
              {/* 1. IMAGE UPLOAD FIELD */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Image File
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*"
                />
                {!previewUrl ? (
                  <div
                    onClick={() =>
                      !isUploading && fileInputRef.current?.click()
                    }
                    className={clsx(
                      "border-2 border-dashed rounded-xl h-44 flex flex-col items-center justify-center cursor-pointer transition-all",
                      errors.url || uploadError
                        ? "border-red-300 bg-red-50/30"
                        : "border-gray-300 bg-gray-50 hover:border-[#4a6741] hover:bg-gray-100/50",
                    )}
                  >
                    {isUploading ? (
                      <>
                        <Loader2
                          className="text-[#4a6741] mb-2 animate-spin"
                          size={32}
                        />
                        <span className="text-sm text-[#4a6741] font-bold">
                          Processing Image...
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud
                          className={clsx(
                            "mb-2",
                            errors.url ? "text-red-400" : "text-gray-400",
                          )}
                          size={32}
                        />
                        <span className="text-sm text-gray-600 font-medium">
                          Click to select image
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1">
                          PNG, JPG or WebP (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-gray-200 group ring-4 ring-green-50">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setValue("url", "");
                      }}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 hover:bg-red-50 shadow-md transition-all active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                {(errors.url || uploadError) && (
                  <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1">
                    <AlertTriangle size={12} />{" "}
                    {errors.url?.message || uploadError}
                  </p>
                )}
              </div>

              {/* 2. TITLE FIELD */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Image Title
                </label>
                <input
                  {...register("title")}
                  placeholder="e.g., Royal Bengal Tiger at Sunrise"
                  className={clsx(
                    "w-full px-4 py-2.5 rounded-lg border outline-none text-sm transition-all",
                    errors.title
                      ? "border-red-300 bg-red-50/20 focus:border-red-500"
                      : "border-gray-300 focus:border-[#4a6741] focus:ring-2 focus:ring-[#4a6741]/10",
                  )}
                />
                {errors.title && (
                  <p className="text-red-500 text-[10px] font-bold uppercase">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* 3. CATEGORY FIELD */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category
                </label>
                <CreatableSelect
                  options={availableCategories}
                  value={category}
                  onChange={(val) =>
                    setValue("category", val, { shouldValidate: true })
                  }
                  placeholder="Choose or type new category..."
                />
                {errors.category && (
                  <p className="text-red-500 text-[10px] font-bold uppercase">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* FORM ACTIONS */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadOpen(false);
                    reset();
                  }}
                  className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={isUploading || isPending}
                  className={clsx(
                    "h-11 px-8 rounded-full font-bold shadow-lg transition-all active:scale-95",
                    "bg-[#4a6741] hover:bg-[#3a5233] disabled:bg-gray-200 disabled:text-gray-400",
                  )}
                >
                  {isUploading || isPending ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <Check className="mr-2 h-5 w-5" />
                  )}
                  {isUploading
                    ? "Processing..."
                    : isPending
                      ? "Saving..."
                      : "Publish Image"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PREVIEW MODAL --- */}
      {previewTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 p-4"
          onClick={() => setPreviewTarget(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewTarget(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
            >
              <X size={24} />
            </button>

            {/* Large Image */}
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={previewTarget.url}
                alt={previewTarget.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium">
              {previewTarget.title}
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl p-6 scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Image?
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Are you sure you want to delete this image? This action cannot
                  be undone.
                </p>
              </div>
            </div>

            {/* Optional: Small thumbnail of what's being deleted */}
            <div className="relative h-32 w-full rounded-lg overflow-hidden border border-gray-100 mb-6 bg-gray-50">
              <Image
                src={deleteTarget.url}
                alt={deleteTarget.title}
                fill
                className="object-cover opacity-80"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm flex items-center gap-2 disabled:opacity-70 transition-colors"
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Trash2 size={16} />
                )}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
