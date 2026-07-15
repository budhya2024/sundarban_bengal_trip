"use client";

import React, { useTransition, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Updated import for @imagekit/next v2.x
import { upload } from "@imagekit/next";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
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
  Trash2,
  Heading1,
  Heading2,
  Heading3,
  Link2,
  Link2Off,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { createBlog, updateBlog } from "@/app/actions/blogs.actions";
import {
  getIKAuthenticationParameters,
  deleteFromImageKit,
} from "@/app/actions/imagekit.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BlogType, NewBlogType } from "@/db/schema";
import { SidebarTrigger } from "./SidebarTrigger";

const blogSchema = z.object({
  title: z.string().min(5, "Minimum 5 characters required"),
  description: z.string().min(5, "Minimum 5 characters required"),
  image: z.string().url("Valid URL required").optional().or(z.literal("")),
  content: z.string().min(20, "Minimum 20 characters required"),
  author: z.string().min(2, "Minimum 2 characters required"),
  published: z.boolean().default(false),
  slug: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
  hashtags: z.string().optional().or(z.literal("")),
  metaTitle: z.string().optional().or(z.literal("")),
  metaDescription: z.string().optional().or(z.literal("")),
  keywords: z.string().optional().or(z.literal("")),
});

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL link address:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="sticky top-[69px] z-20 border-b border-gray-200 bg-gray-50 px-2 py-1 flex flex-wrap gap-1 rounded-t-lg">
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
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black font-bold": editor.isActive("heading", { level: 1 }),
          "text-gray-500": !editor.isActive("heading", { level: 1 }),
        })}
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black font-bold": editor.isActive("heading", { level: 2 }),
          "text-gray-500": !editor.isActive("heading", { level: 2 }),
        })}
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black font-bold": editor.isActive("heading", { level: 3 }),
          "text-gray-500": !editor.isActive("heading", { level: 3 }),
        })}
      >
        <Heading3 size={16} />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1 self-center" />
      <button
        type="button"
        onClick={setLink}
        className={clsx("p-1.5 rounded hover:bg-gray-200 transition-colors", {
          "bg-gray-200 text-black": editor.isActive("link"),
          "text-gray-500": !editor.isActive("link"),
        })}
      >
        <Link2 size={16} />
      </button>
      {editor.isActive("link") && (
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-1.5 rounded hover:bg-gray-200 text-red-500 transition-colors"
        >
          <Link2Off size={16} />
        </button>
      )}
    </div>
  );
};

export default function BlogForm({ initialData }: { initialData?: BlogType }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [deletingStatus, setDeletingStatus] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogType>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData
      ? {
          title: initialData.title || "",
          description: initialData.description || "",
          image: initialData.image || "",
          content: initialData.content || "",
          author: initialData.author || "",
          published: initialData.published ?? false,
          slug: initialData.slug || "",
          category: initialData.category || "",
          hashtags: initialData.hashtags || "",
          metaTitle: initialData.metaTitle || "",
          metaDescription: initialData.metaDescription || "",
          keywords: initialData.keywords || "",
        }
      : {
          title: "",
          description: "",
          image: "",
          content: "",
          author: "",
          published: false,
          slug: "",
          category: "",
          hashtags: "",
          metaTitle: "",
          metaDescription: "",
          keywords: "",
        },
  });

  const currentImage = watch("image");

  // Manual Upload Handler for @imagekit/next v2.x
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingStatus(true);

    try {
      const auth = await getIKAuthenticationParameters();
      if (!auth) throw new Error("Authentication failed");

      // Direct browser-to-cloud upload (Bypasses Vercel 4.5MB limit)
      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
        folder: "/blogs",
      });

      const smartUrl = `${res.url}?ikid=${res.fileId}`;
      setValue("image", smartUrl, { shouldValidate: true, shouldDirty: true });
      toast({ title: "Success", description: "Cover image uploaded." });
    } catch (error) {
      console.error("Upload Error:", error);
      toast({ variant: "destructive", title: "Upload failed" });
    } finally {
      setUploadingStatus(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImage) return;

    try {
      const urlObj = new URL(currentImage.replace(/['"]+/g, "").trim());
      const fileId = urlObj.searchParams.get("ikid");

      if (fileId) {
        setDeletingStatus(true);
        const res = await deleteFromImageKit(fileId);
        if (!res.success) console.log("Cloud deletion failed");
      }

      setValue("image", "");
      toast({ title: "Removed", description: "Cloud storage cleaned." });
    } catch (error) {
      setValue("image", "");
    } finally {
      setDeletingStatus(false);
    }
  };

  const onSubmit = async (data: NewBlogType) => {
    startTransition(async () => {
      try {
        initialData?.id
          ? await updateBlog(initialData.id, data)
          : await createBlog(data);
        toast({ title: "Success", description: "Blog saved successfully." });
        router.push("/admin/blogs");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save blog.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[1600px] mx-auto pb-10 p-6"
    >
      <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-4 sticky top-0 bg-white/80 backdrop-blur-sm z-30">
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
            disabled={isPending || uploadingStatus || deletingStatus}
            className="px-4 py-1.5 bg-[#4a6741] hover:bg-[#3a5233] text-white rounded-md text-sm font-medium shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={14} />
            ) : (
              <Save size={14} />
            )}
            {initialData?.id ? "Update Post" : "Save Post"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Title
              </label>
              <input
                {...register("title")}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Author
              </label>
              <input
                {...register("author")}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none"
              />
              {errors.author && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.author.message}
                </p>
              )}
            </div>
            <div className="md:col-span-3">
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
            <div className="md:col-span-12">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Permalink (Custom URL Slug)
              </label>
              <input
                {...register("slug")}
                placeholder="e.g. travel-tips-for-sundarban-trip (leave blank to auto-generate)"
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none"
              />
              {initialData?.slug && (
                <div className="mt-1.5 flex items-center gap-1 text-xs text-gray-500">
                  <span className="font-semibold">Live URL:</span>
                  <a
                    href={`/blog/${initialData.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4a6741] hover:underline font-mono"
                  >
                    /blog/{initialData.slug}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-[500px]">
            <Controller
              name="content"
              control={control}
              render={({ field }) => {
                const editor = useEditor({
                  extensions: [
                    StarterKit,
                    LinkExtension.configure({
                      openOnClick: false,
                      HTMLAttributes: {
                        class: "text-primary underline cursor-pointer",
                      },
                    }),
                  ],
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
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <ImageIcon size={12} /> Featured Image
            </label>

            {/* Manual file input triggers functional upload */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />

            {!currentImage ? (
              <div
                onClick={() =>
                  !uploadingStatus && fileInputRef.current?.click()
                }
                className="border border-dashed bg-gray-50 rounded-md h-[140px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all border-gray-300"
              >
                {uploadingStatus ? (
                  <Loader2 className="animate-spin text-[#4a6741]" size={20} />
                ) : (
                  <>
                    <UploadCloud className="text-gray-400 mb-1" size={20} />
                    <span className="text-xs text-gray-500 font-medium">
                      Upload Image
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className="relative rounded-md overflow-hidden border border-gray-200 h-[140px] group bg-slate-50">
                {deletingStatus ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                    <Loader2 className="animate-spin text-red-500" size={20} />
                  </div>
                ) : null}
                <Image
                  src={currentImage}
                  alt="Cover"
                  fill
                  unoptimized
                  className="object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-white p-1 rounded shadow-sm text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={6}
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none resize-none"
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold text-[#1a472a] uppercase tracking-wider border-b pb-1.5">
              SEO & Metadata Settings
            </h3>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Category
              </label>
              <input
                {...register("category")}
                placeholder="e.g. Tour Guide"
                className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Hashtags / Tags
              </label>
              <input
                {...register("hashtags")}
                placeholder="e.g. sundarban, travel, adventure"
                className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none"
              />
            </div>
            <div className="border-t pt-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                SEO Title
              </label>
              <input
                {...register("metaTitle")}
                placeholder="Meta title for Google"
                className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                SEO Description
              </label>
              <textarea
                {...register("metaDescription")}
                placeholder="Meta description for search results"
                rows={3}
                className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none resize-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                SEO Keywords
              </label>
              <input
                {...register("keywords")}
                placeholder="sundarban tour, travel tips"
                className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:ring-1 focus:ring-[#4a6741] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
