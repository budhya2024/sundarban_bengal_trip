"use client";

import React, { useTransition, useState, useRef, useEffect } from "react";
import Image from "next/image";
// Modular upload and provider for transformation props only
import { upload, ImageKitProvider } from "@imagekit/next";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryType } from "@/db/schema";
import * as z from "zod";
import { addGallery, deleteGalleryItem } from "@/app/actions/gallery.actions";
import {
  getIKAuthenticationParameters,
  deleteFromImageKit,
} from "@/app/actions/imagekit.actions";
import { Button } from "../ui/button";
import { SidebarTrigger } from "./SidebarTrigger";
import { useToast } from "@/hooks/use-toast";

// --- VALIDATION SCHEMA ---
const gallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  url: z.string().min(1, "Image is required"),
});

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

export default function GalleryManager({
  initialImages = [],
  categoryData = [],
}: {
  initialImages?: GalleryType[];
  categoryData: string[];
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [images, setImages] = useState<GalleryType[]>(initialImages || []);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [previewTarget, setPreviewTarget] = useState<GalleryType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryType | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const availableCategories = [
    ...new Set([...["wildlife", "landscape", "sunset"], ...categoryData]),
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: { title: "", category: "", url: "" },
  });

  const category = watch("category");
  const previewUrl = watch("url");

  // --- MODERN UPLOAD HANDLER ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingStatus(true);

    try {
      // 1. Get auth params from your server action
      const auth = await getIKAuthenticationParameters();
      if (!auth) throw new Error("Auth failed");

      // 2. Perform direct browser-to-cloud upload
      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
        folder: "/gallery",
      });

      // 3. Smart URL Strategy
      const smartUrl = `${res.url}?ikid=${res.fileId}`;
      setValue("url", smartUrl, { shouldValidate: true });
      toast({ title: "Success", description: "Image synced to cloud." });
    } catch (error) {
      console.error("Upload Error:", error);
      toast({ variant: "destructive", title: "Upload Failed" });
    } finally {
      setUploadingStatus(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUploadSubmit = async (values: z.infer<typeof gallerySchema>) => {
    startTransition(async () => {
      const { success, data } = await addGallery(values);
      if (success && data) {
        setImages((prev) => [data, ...prev]);
        setIsUploadOpen(false);
        reset();
        toast({ title: "Published", description: "Added to gallery." });
      }
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const urlObj = new URL(deleteTarget.url.replace(/['"]+/g, "").trim());
      const fileId = urlObj.searchParams.get("ikid");

      if (fileId) {
        const cloudRes = await deleteFromImageKit(fileId);
        if (!cloudRes.success) console.log("Cloud deletion failed");
      }

      const { success } = await deleteGalleryItem(deleteTarget.id);
      if (success) {
        setImages((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        setDeleteTarget(null);
        toast({ title: "Deleted", description: "Asset removed" });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Delete Error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md px-4 py-3 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Media Gallery</h1>
          </div>
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="bg-emerald-700 hover:bg-emerald-800"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Image
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Filters and Grid remain exactly as your design ... */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => setActiveFilter("All")}
            className={clsx(
              "px-4 py-1.5 rounded-full text-sm font-medium border",
              activeFilter === "All"
                ? "bg-[#1a472a] text-white"
                : "bg-white text-gray-600 border-gray-200",
            )}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-medium border capitalize",
                activeFilter === cat
                  ? "bg-[#4a6741] text-white"
                  : "bg-white text-gray-600 border-gray-200",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group relative bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPreviewTarget(img)}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(img)}
                    className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3 border-t text-sm font-medium truncate">
                {img.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-bold">Upload New Asset</h3>
              <button onClick={() => setIsUploadOpen(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleUploadSubmit)}
              className="p-6 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Asset File
                </label>

                {/* MANUAL INPUT triggers FUNCTIONAL UPLOAD */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />

                {!previewUrl ? (
                  <div
                    onClick={() =>
                      !uploadingStatus && fileInputRef.current?.click()
                    }
                    className={clsx(
                      "border-2 border-dashed rounded-xl h-44 flex flex-col items-center justify-center cursor-pointer",
                      errors.url
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50",
                    )}
                  >
                    {uploadingStatus ? (
                      <Loader2
                        className="text-[#4a6741] animate-spin"
                        size={32}
                      />
                    ) : (
                      <>
                        <UploadCloud className="text-gray-400 mb-2" size={32} />
                        <span className="text-sm font-medium">
                          Click to select image
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden ring-4 ring-green-50">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setValue("url", "")}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 shadow-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Title & Category inputs remain exactly the same ... */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Image Title
                </label>
                <input
                  {...register("title")}
                  placeholder="Title..."
                  className="w-full px-4 py-2.5 rounded-lg border outline-none text-sm focus:border-[#4a6741]"
                />
                {errors.title && (
                  <p className="text-red-500 text-[10px]">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">
                  Category
                </label>
                <CreatableSelect
                  options={availableCategories}
                  value={category}
                  onChange={(val) =>
                    setValue("category", val, { shouldValidate: true })
                  }
                  placeholder="Category..."
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-5 py-2 text-sm font-bold text-gray-500"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={uploadingStatus || isPending}
                  className="h-11 px-8 rounded-full font-bold bg-[#4a6741] hover:bg-[#3a5233]"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Check className="mr-2" />
                  )}
                  Publish Image
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal & Delete Confirmation remain exactly the same ... */}
      {previewTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setPreviewTarget(null)}
        >
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image
              src={previewTarget.url}
              alt={previewTarget.title}
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-600" /> Delete Asset?
            </h3>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
