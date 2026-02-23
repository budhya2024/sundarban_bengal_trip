"use client";

import React, { useTransition, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upload } from "@imagekit/next";
import {
  Plus,
  Trash2,
  Save,
  Layout,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  Clock,
  AlertCircle,
  Star,
  User,
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
import Image from "next/image";
import { SidebarTrigger } from "./SidebarTrigger";
import {
  HomeSettingsSchema,
  HomeSettingsValues,
} from "@/schemas/homeSettings.schema";
import { updateHomeSettings } from "@/app/actions/home.actions";
import {
  getIKAuthenticationParameters,
  deleteFromImageKit,
} from "@/app/actions/imagekit.actions";
import { cn } from "@/lib/utils";

export default function HomeSettingsForm({
  initialData,
}: {
  initialData: HomeSettingsValues | null;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(
    null,
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Specific loading states for better UX
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const [heroPreview, setHeroPreview] = useState<string | null>(
    initialData?.hero?.image || null,
  );

  const form = useForm<HomeSettingsValues>({
    resolver: zodResolver(HomeSettingsSchema),
    defaultValues: initialData || {
      hero: { title: "", subtitle: "", image: "" },
      testimonials: [],
      faqs: [],
    },
  });

  const {
    fields: tFields,
    append: tAppend,
    remove: tRemove,
  } = useFieldArray({
    control: form.control,
    name: "testimonials",
  });

  const {
    fields: fFields,
    append: fAppend,
    remove: fRemove,
  } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const getAuth = async () => {
    const auth = await getIKAuthenticationParameters();
    if (!auth) throw new Error("Auth failed");
    return auth;
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const auth = await getAuth();
      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
        folder: "/home",
      });
      const smartUrl = `${res.url}?ikid=${res.fileId}`;
      setHeroPreview(smartUrl);
      form.setValue("hero.image", smartUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
      toast({ title: "Success", description: "Hero image uploaded." });
    } catch (error) {
      toast({ variant: "destructive", title: "Upload failed" });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveHero = async () => {
    const currentUrl = form.getValues("hero.image");
    if (!currentUrl) return;
    try {
      const urlObj = new URL(currentUrl.replace(/['"]+/g, "").trim());
      const fileId = urlObj.searchParams.get("ikid");
      if (fileId) await deleteFromImageKit(fileId);
      setHeroPreview(null);
      form.setValue("hero.image", "", { shouldDirty: true });
    } catch (error) {
      setHeroPreview(null);
      form.setValue("hero.image", "");
    }
  };

  const handleTestimonialUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIndex(index);
    try {
      const auth = await getAuth();
      const res = await upload({
        file,
        fileName: `testimonial-${Date.now()}`,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
        folder: "/testimonials",
      });
      const smartUrl = `${res.url}?ikid=${res.fileId}`;
      form.setValue(`testimonials.${index}.image` as any, smartUrl, {
        shouldDirty: true,
      });
      toast({ title: "Avatar Updated" });
    } catch (error) {
      toast({ variant: "destructive", title: "Upload failed" });
    } finally {
      setUploadingIndex(null);
      e.target.value = "";
    }
  };

  const handleRemoveTestimonialImage = async (index: number) => {
    const currentUrl = form.getValues(`testimonials.${index}.image` as any);
    if (!currentUrl) return;
    try {
      const urlObj = new URL(currentUrl.replace(/['"]+/g, "").trim());
      const fileId = urlObj.searchParams.get("ikid");
      if (fileId) await deleteFromImageKit(fileId);
      form.setValue(`testimonials.${index}.image` as any, "", {
        shouldDirty: true,
      });
    } catch (error) {
      form.setValue(`testimonials.${index}.image` as any, "");
    }
  };

  const onSubmit = async (values: HomeSettingsValues) => {
    startTransition(async () => {
      const res = await updateHomeSettings(values);
      if (res.success) {
        toast({ title: "Success", description: "Configuration saved!" });
        form.reset(values);
      } else {
        toast({ title: "Error", variant: "destructive" });
      }
    });
  };

  const onError = (errors: any) => {
    if (errors.testimonials)
      setExpandedTestimonial(parseInt(Object.keys(errors.testimonials)[0]));
    else if (errors.faqs) setExpandedFaq(parseInt(Object.keys(errors.faqs)[0]));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="min-h-screen bg-slate-50/30 pb-20"
      >
        {/* HEADER */}
        <div className="sticky top-0 z-30 w-full border-b bg-white/95 backdrop-blur px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-display font-bold text-slate-800 ml-2">
              Home Editor
            </h1>
            {form.formState.isDirty && (
              <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100 animate-pulse">
                <AlertCircle size={12} /> UNSAVED CHANGES
              </div>
            )}
          </div>
          <Button
            disabled={isPending || isUploading || uploadingIndex !== null}
            className="bg-emerald-700 hover:bg-emerald-800 shadow-lg px-8 rounded-full"
          >
            {isPending ? (
              <Clock className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Syncing..." : "Save Settings"}
          </Button>
        </div>

        <div className="mx-auto max-w-7xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* HERO SECTION */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
              <div className="flex items-center gap-2 font-bold text-emerald-800 border-b pb-2">
                <Layout size={18} /> Hero Presentation
              </div>
              <FormField
                control={form.control}
                name="hero.image"
                render={() => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Hero Background
                    </FormLabel>
                    <div className="relative h-56 w-full rounded-xl overflow-hidden border-2 border-dashed bg-slate-50/50 border-slate-200 flex items-center justify-center transition-all hover:border-emerald-200">
                      {isUploading ? (
                        <div className="text-center animate-pulse">
                          <Clock className="mx-auto mb-1 text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-600">
                            Uploading...
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
                            onClick={handleRemoveHero}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      ) : (
                        <label className="cursor-pointer text-center p-10 w-full group">
                          <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:-translate-y-1" />
                          <span className="text-xs font-medium text-slate-500 text-center block">
                            Upload Homepage Hero
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleHeroUpload}
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
                  name="hero.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                        Headline
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Explore the Sundarbans..."
                          className="font-bold text-lg h-12 bg-slate-50/30"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hero.subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                        Sub-headline
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Experience the wild..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* TESTIMONIALS SECTION */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-blue-700">
                  <MessageSquare size={18} /> Client Testimonials (
                  {tFields.length})
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    tAppend({
                      name: "",
                      review: "",
                      place: "",
                      rating: 5,
                      image: "",
                    });
                    setExpandedTestimonial(tFields.length);
                  }}
                  className="h-8 text-[10px] font-bold uppercase border-blue-200 text-blue-700"
                >
                  <Plus size={14} className="mr-1" /> Add Review
                </Button>
              </div>
              <div className="divide-y divide-slate-100">
                {tFields.map((field, index) => (
                  <div key={field.id} className="bg-white">
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() =>
                        setExpandedTestimonial(
                          expandedTestimonial === index ? null : index,
                        )
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full border bg-slate-100 flex items-center justify-center overflow-hidden relative shadow-inner">
                          {form.watch(`testimonials.${index}.image` as any) ? (
                            <Image
                              src={form.watch(
                                `testimonials.${index}.image` as any,
                              )}
                              alt="User"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <User size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {form.watch(`testimonials.${index}.name`) ||
                              "New Reviewer"}
                          </p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                            {form.watch(`testimonials.${index}.place`) ||
                              "Location"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-amber-400 mr-4">
                          <Star size={12} className="fill-current" />
                          <span className="ml-1 text-xs font-bold">
                            {form.watch(`testimonials.${index}.rating`)}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-300 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            tRemove(index);
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                        {expandedTestimonial === index ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </div>

                    {expandedTestimonial === index && (
                      <div className="p-6 bg-slate-50/50 border-t border-slate-100 space-y-6 animate-in fade-in slide-in-from-top-2">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          {/* PERFECTED AVATAR LAYOUT */}
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-bold uppercase text-slate-400">
                              Guest Photo
                            </span>
                            <div className="relative group">
                              <div className="h-24 w-24 rounded-full border-2 border-dashed border-slate-200 bg-white flex items-center justify-center overflow-hidden transition-all hover:border-emerald-300 shadow-sm">
                                {uploadingIndex === index ? (
                                  <Clock
                                    className="animate-spin text-emerald-600"
                                    size={20}
                                  />
                                ) : form.watch(
                                    `testimonials.${index}.image` as any,
                                  ) ? (
                                  <>
                                    <Image
                                      src={form.watch(
                                        `testimonials.${index}.image` as any,
                                      )}
                                      alt="Preview"
                                      fill
                                      /* Added rounded-full here to fix square corners */
                                      className="object-cover rounded-full"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveTestimonialImage(index)
                                        }
                                        className="p-1.5 bg-white/20 hover:bg-white/40 rounded-full text-white"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-slate-50">
                                    <Upload
                                      size={18}
                                      className="text-slate-300 mb-1"
                                    />
                                    {/* Apply text-[8px] and font-bold to fix the size */}
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                                      Upload
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleTestimonialUpload(e, index)
                                      }
                                    />
                                  </label>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 grid md:grid-cols-3 gap-4 w-full">
                            <FormField
                              control={form.control}
                              name={`testimonials.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[9px] font-bold uppercase text-slate-400">
                                    Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="bg-white h-9"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`testimonials.${index}.place`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[9px] font-bold uppercase text-slate-400">
                                    Place
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="bg-white h-9"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`testimonials.${index}.rating`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-[9px] font-bold uppercase text-slate-400">
                                    Stars
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      className="bg-white h-9"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <FormField
                          control={form.control}
                          name={`testimonials.${index}.review`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[9px] font-bold uppercase text-slate-400">
                                Review Content
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="bg-white min-h-[100px]"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar FAQ column remains exactly as is */}
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-5 border-b bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-slate-700 text-xs uppercase tracking-widest">
                  <HelpCircle size={16} className="text-amber-500" /> FAQs (
                  {fFields.length})
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    fAppend({ question: "", answer: "" });
                    setExpandedFaq(fFields.length);
                  }}
                  className="h-8 w-8 text-emerald-600 border rounded-full"
                >
                  <Plus size={16} />
                </Button>
              </div>
              <div className="divide-y divide-slate-100">
                {fFields.map((field, index) => {
                  const faqErrors = form.formState.errors.faqs?.[index];
                  return (
                    <div
                      key={field.id}
                      className={cn(
                        "transition-colors",
                        faqErrors && "bg-red-50/50 border-l-2 border-red-500",
                      )}
                    >
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                      >
                        <div className="flex flex-col">
                          <span
                            className={cn(
                              "text-xs font-bold truncate mr-4",
                              faqErrors ? "text-red-600" : "text-slate-600",
                            )}
                          >
                            {form.watch(`faqs.${index}.question`) ||
                              "New Question"}
                          </span>
                          {faqErrors && (
                            <span className="text-[9px] font-bold text-red-500 uppercase animate-pulse">
                              Invalid Content
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-slate-300 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              fRemove(index);
                            }}
                          >
                            <Trash2 size={14} />
                          </Button>
                          {expandedFaq === index ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </div>
                      </div>
                      {expandedFaq === index && (
                        <div className="p-4 bg-slate-50/30 border-t space-y-3 animate-in slide-in-from-top-1">
                          <FormField
                            control={form.control}
                            name={`faqs.${index}.question`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[9px] font-black uppercase text-slate-400">
                                  Question
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="h-8 text-xs bg-white"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`faqs.${index}.answer`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[9px] font-black uppercase text-slate-400">
                                  Answer
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    className="text-xs min-h-[80px] bg-white"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
