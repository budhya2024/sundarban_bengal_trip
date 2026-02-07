"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Save,
  Layout,
  BookOpen,
  Target,
  Eye,
  Upload,
  X,
  Clock,
  AlertCircle,
  Info,
  History,
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

export default function AboutAdminForm({
  initialData,
}: {
  initialData: AboutValues | null;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

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

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-screen bg-slate-50/30 pb-20"
      >
        {/* --- STICKY ACTION BAR (Identical to Package Form) --- */}
        <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-display font-bold text-slate-800">
              About Management
            </h1>
            {hasErrors && (
              <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                <AlertCircle size={12} /> ERRORS DETECTED
              </div>
            )}
          </div>
          <Button
            disabled={isPending}
            className="bg-emerald-700 hover:bg-emerald-800 shadow-lg px-8"
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
          {/* --- LEFT COLUMN: CORE CONTENT (8 COLS) --- */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Hero Section */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-emerald-800 border-b pb-2">
                <Layout size={18} /> Hero Section
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
                      className={`relative h-60 w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all ${fieldState.error ? "border-red-300 bg-red-50/30" : "bg-slate-50 border-slate-200"}`}
                    >
                      {heroPreview ? (
                        <>
                          <Image
                            src={heroPreview}
                            alt="Hero"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => {
                              setHeroPreview(null);
                              form.setValue("heroImage", "");
                            }}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      ) : (
                        <label className="cursor-pointer text-center p-10 w-full group">
                          <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                          <span className="text-xs font-medium text-slate-500">
                            Click to upload cover image
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const r = new FileReader();
                                r.onloadend = () => {
                                  setHeroPreview(r.result as string);
                                  form.setValue(
                                    "heroImage",
                                    r.result as string,
                                  );
                                };
                                r.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <FormMessage className="text-[10px]" />
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
                        <Input placeholder="Who we are..." {...field} />
                      </FormControl>
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
                        <Textarea rows={2} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 2. Our Story Section */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
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
                      className={`relative h-56 w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all ${fieldState.error ? "border-red-300 bg-red-50/20" : "bg-slate-50 border-slate-200"}`}
                    >
                      {storyPreview ? (
                        <>
                          <Image
                            src={storyPreview}
                            alt="Story"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => {
                              setStoryPreview(null);
                              form.setValue("storyImage", "");
                            }}
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
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const r = new FileReader();
                                r.onloadend = () => {
                                  setStoryPreview(r.result as string);
                                  form.setValue(
                                    "storyImage",
                                    r.result as string,
                                  );
                                };
                                r.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
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
                        <Input {...field} />
                      </FormControl>
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
                        <Textarea rows={8} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: QUICK INFO STYLE (4 COLS) --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6 sticky top-24">
              <div className="flex items-center gap-2 font-bold text-slate-700 border-b pb-3">
                <History size={18} className="text-slate-400" />
                <span className="text-sm tracking-tight">Objectives</span>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[10px] text-blue-700 uppercase tracking-widest">
                    <Target size={14} /> Our Mission
                  </div>
                  <FormField
                    control={form.control}
                    name="ourMissionContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={6}
                            className="bg-slate-50/50 border-slate-200 text-xs leading-relaxed"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[10px] text-emerald-700 uppercase tracking-widest">
                    <Eye size={14} /> Our Vision
                  </div>
                  <FormField
                    control={form.control}
                    name="ourVisionContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            rows={6}
                            className="bg-slate-50/50 border-slate-200 text-xs leading-relaxed"
                            {...field}
                          />
                        </FormControl>
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
