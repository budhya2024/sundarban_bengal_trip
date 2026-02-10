"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upload } from "@imagekit/next";
import {
  Save,
  Layout,
  BookOpen,
  Target,
  Upload,
  X,
  Clock,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AboutSchema, AboutValues } from "@/schemas/about.schema";
import Image from "next/image";
import { upsertAboutPage } from "@/app/actions/about.actions";

import { SidebarTrigger } from "./SidebarTrigger";
import {
  deleteFromImageKit,
  getIKAuthenticationParameters,
} from "@/app/actions/imagekit.actions";

export default function AboutAdminForm({
  initialData,
}: {
  initialData: AboutValues | null;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [uploadingField, setUploadingField] = useState<"hero" | "story" | null>(
    null,
  );
  const [deletingField, setDeletingField] = useState<"hero" | "story" | null>(
    null,
  );

  const [heroPreview, setHeroPreview] = useState<string | null>(
    initialData?.heroImage || null,
  );
  const [storyPreview, setStoryPreview] = useState<string | null>(
    initialData?.storyImage || null,
  );

  const form = useForm<AboutValues>({
    resolver: zodResolver(AboutSchema),
    defaultValues: initialData || {
      heroImage: "",
      heroTitle: "",
      heroSubtitle: "",
      storyTitle: "",
      storyDescription: "",
      storyImage: "",
      ourMissionContent: "",
      ourVisionContent: "",
    },
    mode: "onTouched",
  });

  // Modern Functional Upload Handler (Bypasses Vercel 4.5MB limit)
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "heroImage" | "storyImage",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName === "heroImage" ? "hero" : "story");

    try {
      // 1. Get auth params from your existing server action
      const auth = await getIKAuthenticationParameters();
      if (!auth) throw new Error("Authentication failed");

      // 2. Perform modular upload (No Provider needed)
      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
        folder: "/about",
      });

      // 3. Smart URL strategy: append ikid for easy cloud deletion
      const smartUrl = `${res.url}?ikid=${res.fileId}`;

      if (fieldName === "heroImage") setHeroPreview(smartUrl);
      else setStoryPreview(smartUrl);

      form.setValue(fieldName, smartUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
      toast({ title: "Success", description: "Image synced to cloud." });
    } catch (error) {
      console.error("Upload Error:", error);
      toast({ variant: "destructive", title: "Upload failed" });
    } finally {
      setUploadingField(null);
      e.target.value = ""; // Clear input for same-file re-uploads
    }
  };

  const handleRemoveImage = async (fieldName: "heroImage" | "storyImage") => {
    const currentUrl = form.getValues(fieldName);
    if (!currentUrl) return;

    try {
      const urlObj = new URL(currentUrl);
      const fileId = urlObj.searchParams.get("ikid");

      if (fileId) {
        setDeletingField(fieldName === "heroImage" ? "hero" : "story");
        const res = await deleteFromImageKit(fileId);
        if (!res.success) throw new Error();
      }

      if (fieldName === "heroImage") setHeroPreview(null);
      else setStoryPreview(null);

      form.setValue(fieldName, "", { shouldValidate: true, shouldDirty: true });
      toast({ title: "Removed", description: "Cloud storage cleaned." });
    } catch (error) {
      if (fieldName === "heroImage") setHeroPreview(null);
      else setStoryPreview(null);
      form.setValue(fieldName, "");
    } finally {
      setDeletingField(null);
    }
  };

  const onSubmit = async (values: AboutValues) => {
    startTransition(async () => {
      const res = await upsertAboutPage(values);
      if (res.success) {
        toast({
          title: "Success",
          description: "About page updated successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: "Update failed",
          variant: "destructive",
        });
      }
    });
  };

  const errors = form.formState.errors;
  const hasHeroErrors =
    errors.heroImage || errors.heroTitle || errors.heroSubtitle;
  const hasStoryErrors =
    errors.storyImage || errors.storyTitle || errors.storyDescription;
  const hasObjectiveErrors =
    errors.ourMissionContent || errors.ourVisionContent;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-screen bg-slate-50/30 pb-20"
      >
        {/* Header */}
        <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-display font-bold text-slate-800">
              About Management
            </h1>
            {Object.keys(errors).length > 0 && (
              <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                <AlertCircle size={12} /> {Object.keys(errors).length} ERRORS
                DETECTED
              </div>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending || !!uploadingField || !!deletingField}
            className="bg-emerald-700 hover:bg-emerald-800 shadow-lg px-8 transition-all"
          >
            {isPending ? (
              <Clock className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="mx-auto max-w-7xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Hero Section */}
            <div
              className={`bg-white p-6 rounded-2xl border shadow-sm space-y-4 transition-colors ${hasHeroErrors ? "border-red-200 ring-1 ring-red-50" : "border-slate-200"}`}
            >
              <div className="flex items-center justify-between border-b pb-2">
                <div
                  className={`flex items-center gap-2 font-bold ${hasHeroErrors ? "text-red-600" : "text-emerald-800"}`}
                >
                  <Layout size={18} /> Hero Section
                </div>
              </div>

              <FormField
                control={form.control}
                name="heroImage"
                render={({ fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-500">
                      Background Image
                    </FormLabel>
                    <div
                      className={`relative h-60 w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all ${fieldState.error ? "border-red-400 bg-red-50/50" : "bg-slate-50 border-slate-200"}`}
                    >
                      {uploadingField === "hero" ? (
                        <div className="text-center animate-pulse">
                          <Clock className="mx-auto text-emerald-600 mb-2" />
                          <span className="text-xs font-bold text-slate-500">
                            Uploading to Cloud...
                          </span>
                        </div>
                      ) : deletingField === "hero" ? (
                        <div className="text-center animate-pulse">
                          <Trash2 className="mx-auto text-red-600 mb-2" />
                          <span className="text-xs font-bold text-slate-500">
                            Deleting...
                          </span>
                        </div>
                      ) : heroPreview ? (
                        <>
                          <Image
                            src={heroPreview}
                            alt="Hero"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => handleRemoveImage("heroImage")}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      ) : (
                        <label className="cursor-pointer text-center p-10 w-full group">
                          <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                          <span className="text-xs font-medium text-slate-500">
                            Click to upload (Direct Mode)
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "heroImage")}
                            accept="image/*"
                          />
                        </label>
                      )}
                    </div>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 pt-2">
                <FormField
                  control={form.control}
                  name="heroTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                        Headline
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Discover the wild Sundarbans"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heroSubtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                        Subtext
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={2}
                          placeholder="A short welcoming subtitle..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 2. Our Story Section */}
            <div
              className={`bg-white p-6 rounded-2xl border shadow-sm space-y-4 transition-colors ${hasStoryErrors ? "border-red-200 ring-1 ring-red-50" : "border-slate-200"}`}
            >
              <div className="flex items-center gap-2 font-bold text-amber-600 border-b pb-2">
                <BookOpen size={18} /> Our Story
              </div>
              <FormField
                control={form.control}
                name="storyImage"
                render={({ fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Narrative Image
                    </FormLabel>
                    <div
                      className={`relative h-56 w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all ${fieldState.error ? "border-red-400 bg-red-50/50" : "bg-slate-50 border-slate-200"}`}
                    >
                      {uploadingField === "story" ? (
                        <div className="text-center animate-pulse">
                          <Clock className="mx-auto text-amber-600 mb-2" />
                          <span className="text-xs font-bold text-slate-500">
                            Uploading Story Image...
                          </span>
                        </div>
                      ) : deletingField === "story" ? (
                        <div className="text-center animate-pulse">
                          <Trash2 className="mx-auto text-red-600 mb-2" />
                          <span className="text-xs font-bold text-slate-500">
                            Deleting...
                          </span>
                        </div>
                      ) : storyPreview ? (
                        <>
                          <Image
                            src={storyPreview}
                            alt="Story"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => handleRemoveImage("storyImage")}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      ) : (
                        <label className="cursor-pointer text-center p-10 w-full group">
                          <Upload className="mx-auto mb-2 text-slate-400" />
                          <span className="text-xs font-medium text-slate-500">
                            Upload Story Image
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "storyImage")}
                            accept="image/*"
                          />
                        </label>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="storyTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                        Section Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Our Humble Beginnings"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="storyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                        Story Narrative
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={8}
                          placeholder="Tell your journey..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div
              className={`bg-white p-6 rounded-2xl border shadow-sm space-y-6 sticky top-24 transition-colors ${hasObjectiveErrors ? "border-red-200" : "border-slate-200"}`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-700 border-b pb-3">
                <Target size={18} className="text-slate-400" />
                <span className="text-sm tracking-tight">Objectives</span>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div
                    className={`flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest ${errors.ourMissionContent ? "text-red-600" : "text-blue-700"}`}
                  >
                    Our Mission
                  </div>
                  <FormField
                    control={form.control}
                    name="ourMissionContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={6}
                            className={`bg-slate-50/50 text-xs leading-relaxed ${errors.ourMissionContent ? "border-red-300" : "border-slate-200"}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <div
                    className={`flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest ${errors.ourVisionContent ? "text-red-600" : "text-emerald-700"}`}
                  >
                    Our Vision
                  </div>
                  <FormField
                    control={form.control}
                    name="ourVisionContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={6}
                            className={`bg-slate-50/50 text-xs leading-relaxed ${errors.ourVisionContent ? "border-red-300" : "border-slate-200"}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
