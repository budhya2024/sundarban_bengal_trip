"use client";

import { useState, useRef, useMemo, useEffect } from "react";
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
import {
  addGallery,
  deleteGalleryItem,
} from "@/app/admin/actions/gallery.actions";
import convertToBase64 from "@/lib/convertToBase64";

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
      if (!availableCategories.includes(formdata.category)) {
        setAvailableCategories((prev) => [...prev, formdata.category]);
      }
      setIsUploadOpen(false);
      setPreviewUrl(null);
      reset();
      setActiveFilter("All");
    }
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
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1a472a]">
            Media Gallery
          </h1>
          <p className="text-gray-500 mt-1">
            Manage gallery images and categories
          </p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 bg-[#4a6741] hover:bg-[#3a5233] text-white px-5 py-2.5 rounded-lg transition-all font-medium shadow-sm"
        >
          <Plus size={18} /> Add New Image
        </button>
      </div>

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

      {/* --- UPLOAD MODAL (Existing) --- */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-serif font-bold text-gray-900">
                Upload Image
              </h3>
              <button onClick={() => setIsUploadOpen(false)}>
                <X size={20} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleUploadSubmit)}
              className="p-6 space-y-5"
            >
              {/* ... Upload Form Inputs Same as Before ... */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
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
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-[#4a6741] transition-colors"
                  >
                    {isUploading ? (
                      <>
                        <Loader2
                          className="text-gray-400 mb-2 animate-spin"
                          size={28}
                        />
                        <span className="text-sm text-gray-600 font-medium">
                          Uploading...
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="text-gray-400 mb-2" size={28} />
                        <span className="text-sm text-gray-600 font-medium">
                          Click to upload
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative h-40 w-full rounded-lg overflow-hidden border border-gray-200 group">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewUrl(null)}
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:text-red-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                {errors.url && (
                  <p className="text-red-500 text-sm">{errors.url.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  required
                  {...register("title")}
                  placeholder="Image Caption"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4a6741] outline-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <CreatableSelect
                  options={availableCategories}
                  value={category}
                  onChange={(val) => setValue("category", val)}
                  placeholder="Select or Create Category..."
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 text-sm font-medium text-white bg-[#4a6741] hover:bg-[#3a5233] rounded-lg shadow-sm flex items-center gap-2 disabled:opacity-70"
                >
                  {isUploading && (
                    <Loader2 className="animate-spin" size={16} />
                  )}
                  {isUploading ? "Saving..." : "Save Image"}
                </button>
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
