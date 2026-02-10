"use client";

import React, { useTransition, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
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
  Trash2,
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
});

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
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // State for ImageKit management
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [deletingStatus, setDeletingStatus] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);
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
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
      content: "",
      author: "",
      published: false,
    },
  });

  const currentImage = watch("image");

  const onUploadSuccess = (res: any) => {
    const smartUrl = `${res.url}?ikid=${res.fileId}`
      .replace(/['"]+/g, "")
      .trim();
    setValue("image", smartUrl, { shouldValidate: true, shouldDirty: true });
    setUploadingStatus(false);
    toast({ title: "Success", description: "Cover image uploaded." });
  };

  const handleRemoveImage = async () => {
    if (!currentImage) return;

    try {
      const urlObj = new URL(currentImage.replace(/['"]+/g, "").trim());
      const fileId = urlObj.searchParams.get("ikid");

      if (fileId) {
        setDeletingStatus(true);
        const res = await deleteFromImageKit(fileId);
        if (!res.success) throw new Error();
      }

      setValue("image", "");
      setUploadKey((prev) => prev + 1);
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
          {/* Title / Author / Status Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7">
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

          {/* Tiptap Editor */}
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
        </div>

        <div className="lg:col-span-1 space-y-4">
          {/* Sidebar: Image Upload */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <ImageIcon size={12} /> Featured Image
            </label>

            <IKUpload
              key={`blog-up-${uploadKey}`}
              ref={fileInputRef}
              className="hidden"
              folder="/blogs"
              onUploadStart={() => setUploadingStatus(true)}
              onSuccess={onUploadSuccess}
              onError={() => {
                setUploadingStatus(false);
                setUploadKey((k) => k + 1);
              }}
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
        </div>
      </div>
    </form>
  );
}
