"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Save,
  RotateCcw,
  Loader2,
  UploadCloud,
  X,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { createBlog, updateBlog } from "@/app/admin/actions/blogs.actions";
import { uploadImage } from "@/app/actions/imagekit.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BlogType, NewBlogType } from "@/db/schema";
import { SidebarTrigger } from "./SidebarTrigger";

// --- Schema ---
const blogSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z.string().min(5, "Description is required"),
  image: z.string().url("Valid URL required").optional().or(z.literal("")),
  content: z.string().min(20, "Content is too short"),
  author: z.string().min(2, "Author is required"),
  published: z.boolean().default(false),
});

// --- Compact Toolbar ---
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;
  return (
    <div className="border-b border-gray-200 bg-gray-50 px-2 py-1 flex gap-1 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black": editor.isActive("bold"),
          "text-gray-500": !editor.isActive("bold"),
        })}
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black": editor.isActive("italic"),
          "text-gray-500": !editor.isActive("italic"),
        })}
      >
        <Italic size={16} />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black": editor.isActive("bulletList"),
          "text-gray-500": !editor.isActive("bulletList"),
        })}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black": editor.isActive("orderedList"),
          "text-gray-500": !editor.isActive("orderedList"),
        })}
      >
        <ListOrdered size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black": editor.isActive("blockquote"),
          "text-gray-500": !editor.isActive("blockquote"),
        })}
      >
        <Quote size={16} />
      </button>
    </div>
  );
};

export default function BlogForm({ initialData }: { initialData?: BlogType }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogType>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
      content: "",
      author: "",
      published: false,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Reset previous errors
    setUploadError(null);

    // 2. Validate Size (2MB = 2 * 1024 * 1024 bytes)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setUploadError("File is too large. Max size is 2MB.");
      return; // Stop execution
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImage(formData);
      console.log({ result });
      if (result.success && result.url) {
        setValue("image", result.url);
      } else {
        setUploadError("Upload failed server-side.");
      }
    } catch (error) {
      console.error(error);
      setUploadError("Network error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: NewBlogType) => {
    setIsSubmitting(true);
    try {
      initialData?.id
        ? await updateBlog(initialData.id, data)
        : await createBlog(data);

      toast({
        title: "Success",
        description: "Blog saved successfully.",
      });
      router.push("/admin/blogs");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save blog.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentImage = watch("image");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[1600px] mx-auto pb-10 p-6"
    >
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-4 sticky top-0">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-2xl font-serif font-bold text-[#1a472a]">
            {initialData ? "Edit Post" : "New Post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/blogs"
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium shadow-sm flex items-center gap-1"
          >
            <RotateCcw size={14} /> Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="px-4 py-1.5 bg-[#4a6741] hover:bg-[#3a5233] text-white rounded-md text-sm font-medium shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Save size={14} />
            )}
            {initialData?.id ? "Update Post" : "Save Post"}
          </button>
        </div>
      </div>

      {/* --- COMPACT GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* --- LEFT COLUMN: MAIN CONTENT (75%) --- */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Row: Title + Author + Status */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Title */}
            <div className="md:col-span-7">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Title
              </label>
              <input
                {...register("title")}
                placeholder="Enter blog title..."
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] focus:border-[#4a6741] outline-none"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Author */}
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Author
              </label>
              <input
                {...register("author")}
                placeholder="Author"
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] focus:border-[#4a6741] outline-none"
              />
              {errors.author && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Status
              </label>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <select
                    value={field.value ? "true" : "false"}
                    onChange={(e) => field.onChange(e.target.value === "true")}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] bg-white outline-none"
                  >
                    <option value="false">Draft</option>
                    <option value="true">Published</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Editor Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-[500px]">
            <Controller
              name="content"
              control={control}
              render={({ field }) => {
                const editor = useEditor({
                  extensions: [StarterKit],
                  immediatelyRender: false,
                  content: field.value,
                  onUpdate: ({ editor }) => field.onChange(editor.getHTML()),
                  editorProps: {
                    attributes: {
                      class:
                        "prose prose-sm max-w-none p-4 focus:outline-none min-h-[450px]",
                    },
                  },
                });
                return (
                  <>
                    <MenuBar editor={editor} />
                    <EditorContent editor={editor} className="flex-1" />
                  </>
                );
              }}
            />
          </div>
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR (25%) --- */}
        <div className="lg:col-span-1 space-y-4">
          {/* Image Upload Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ImageIcon size={12} /> Featured Image
              </span>
              <span className="text-[10px] text-gray-400">Max 2MB</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />

            {!currentImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`
                            border border-dashed bg-gray-50 rounded-md h-[140px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all
                            ${uploadError ? "border-red-300 bg-red-50" : "border-gray-300"} 
                            ${isUploading ? "opacity-50 pointer-events-none" : ""}
                        `}
              >
                {isUploading ? (
                  <Loader2 className="animate-spin text-[#4a6741]" size={20} />
                ) : (
                  <>
                    <UploadCloud
                      className={
                        uploadError ? "text-red-400 mb-1" : "text-gray-400 mb-1"
                      }
                      size={20}
                    />
                    <span
                      className={
                        uploadError
                          ? "text-xs text-red-500 font-medium"
                          : "text-xs text-gray-500 font-medium"
                      }
                    >
                      {uploadError ? "Retry Upload" : "Upload Image"}
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className="relative rounded-md overflow-hidden border border-gray-200 h-[140px] group">
                <Image
                  src={currentImage}
                  alt="Cover"
                  fill
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={() => setValue("image", "")}
                  className="absolute top-1 right-1 bg-white p-1 rounded shadow-sm text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 bg-white px-2 py-0.5 text-xs rounded shadow-sm text-gray-700 hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Change
                </button>
              </div>
            )}

            {/* Detailed Error Message */}
            {uploadError && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 animate-in slide-in-from-top-1">
                <AlertCircle size={12} className="flex-shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>

          {/* Excerpt Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={6}
              placeholder="Short summary for SEO..."
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
