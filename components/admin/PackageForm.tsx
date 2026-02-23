"use client";

import React, { useTransition, useState, useRef } from "react";
import { useFieldArray, useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Updated import for @imagekit/next v2.x
import { upload } from "@imagekit/next";
import {
  Plus,
  Trash2,
  Save,
  Layout,
  Info,
  Clock,
  CheckCircle,
  Upload,
  X,
  Star,
  AlertCircle,
  CalendarDays,
  Image as ImageIcon,
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { PackageSchema, PackageValues } from "@/schemas/package.schema";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { SidebarTrigger } from "./SidebarTrigger";
import { upsertPackage } from "@/app/actions/package.actions";
import {
  getIKAuthenticationParameters,
  deleteFromImageKit,
} from "@/app/actions/imagekit.actions";

// ... (DayActivities and emptyState remain exactly the same as your original)
function DayActivities({
  dayIndex,
  control,
}: {
  dayIndex: number;
  control: Control<PackageValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `timeline.${dayIndex}.events`,
  });

  return (
    <div className="mt-4 space-y-4 pl-6 border-l-2 border-slate-100 ml-2">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
        <Clock size={12} /> Daily Schedule
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-white rounded-xl border border-slate-100 group/event hover:border-emerald-100 transition-colors shadow-sm"
        >
          <FormField
            control={control}
            name={`timeline.${dayIndex}.events.${index}.time`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[9px] font-bold uppercase text-slate-500">
                  Time
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-8 text-xs bg-slate-50/50"
                    {...field}
                    placeholder="08:00 AM"
                  />
                </FormControl>
                <FormMessage className="text-[9px] font-bold" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`timeline.${dayIndex}.events.${index}.title`}
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel className="text-[9px] font-bold uppercase text-slate-500">
                  Activity Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-8 text-xs bg-slate-50/50"
                    {...field}
                    placeholder="Morning Boat Safari"
                  />
                </FormControl>
                <FormMessage className="text-[9px] font-bold" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`timeline.${dayIndex}.events.${index}.description`}
            render={({ field }) => (
              <FormItem className="md:col-span-4">
                <FormLabel className="text-[9px] font-bold uppercase text-slate-500">
                  Activity Detail
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="text-xs min-h-[60px] bg-slate-50/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[9px] font-bold" />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white border border-red-100 text-red-500 opacity-0 group-hover/event:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
            onClick={() => remove(index)}
          >
            <Trash2 size={12} />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-[10px] text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold h-8"
        onClick={() => append({ time: "", title: "", description: "" })}
      >
        <Plus size={14} className="mr-1" /> Add Activity
      </Button>
    </div>
  );
}

const emptyState: PackageValues = {
  isPopular: false,
  heroTitle: "",
  heroSubtitle: "",
  heroImage: "",
  packageName: "",
  packageImage: "",
  description: "",
  note: "",
  originalPrice: "",
  price: "",
  duration: "",
  groupSize: "",
  location: "",
  rating: "4.6/5",
  availability: "Daily departures",
  highlights: [{ value: "" }],
  timeline: [
    { dayTitle: "Day 1", events: [{ time: "", title: "", description: "" }] },
  ],
  inclusions: [{ value: "" }],
  exclusions: [{ value: "" }],
};

export default function PackageForm({
  initialData,
}: {
  initialData: PackageValues | null;
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [uploadingField, setUploadingField] = useState<
    "hero" | "package" | null
  >(null);
  const [deletingField, setDeletingField] = useState<"hero" | "package" | null>(
    null,
  );

  const heroInputRef = useRef<HTMLInputElement>(null);
  const packageInputRef = useRef<HTMLInputElement>(null);

  const [heroPreview, setHeroPreview] = useState<string | null>(
    initialData?.heroImage || null,
  );
  const [packagePreview, setPackagePreview] = useState<string | null>(
    initialData?.packageImage || null,
  );

  const form = useForm<PackageValues>({
    resolver: zodResolver(PackageSchema),
    defaultValues: initialData || emptyState,
    mode: "onTouched",
  });

  const {
    fields: hFields,
    append: hAppend,
    remove: hRemove,
  } = useFieldArray({ control: form.control, name: "highlights" });
  const {
    fields: tFields,
    append: tAppend,
    remove: tRemove,
  } = useFieldArray({ control: form.control, name: "timeline" });
  const {
    fields: iFields,
    append: iAppend,
    remove: iRemove,
  } = useFieldArray({ control: form.control, name: "inclusions" });
  const {
    fields: eFields,
    append: eAppend,
    remove: eRemove,
  } = useFieldArray({ control: form.control, name: "exclusions" });

  // --- MODERN FUNCTIONAL UPLOAD ---
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "heroImage" | "packageImage",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName === "heroImage" ? "hero" : "package");

    try {
      const auth = await getIKAuthenticationParameters();
      if (!auth) throw new Error("Auth failed");

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
        folder:
          fieldName === "heroImage" ? "/packages/hero" : "/packages/cards",
      });

      const smartUrl = `${res.url}?ikid=${res.fileId}`;
      if (fieldName === "heroImage") setHeroPreview(smartUrl);
      else setPackagePreview(smartUrl);

      form.setValue(fieldName, smartUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
      toast({ title: "Success", description: "Image synced to cloud." });
    } catch (error) {
      console.error("Upload Error:", error);
      toast({ variant: "destructive", title: "Upload Failed" });
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleRemoveImage = async (fieldName: "heroImage" | "packageImage") => {
    const currentUrl = form.getValues(fieldName);
    if (!currentUrl) return;

    try {
      const urlObj = new URL(currentUrl.replace(/['"]+/g, "").trim());
      const fileId = urlObj.searchParams.get("ikid");

      if (fileId) {
        setDeletingField(fieldName === "heroImage" ? "hero" : "package");
        const res = await deleteFromImageKit(fileId);
        if (!res.success) console.log("Cloud deletion failed");
      }

      if (fieldName === "heroImage") setHeroPreview(null);
      else setPackagePreview(null);

      form.setValue(fieldName, "", { shouldDirty: true });
      toast({ title: "Removed", description: "Storage cleaned." });
    } catch (error) {
      if (fieldName === "heroImage") setHeroPreview(null);
      else setPackagePreview(null);
      form.setValue(fieldName, "");
    } finally {
      setDeletingField(null);
    }
  };

  const onSubmit = async (values: PackageValues) => {
    startTransition(async () => {
      const res = await upsertPackage(values);
      if (res.success) {
        toast({ title: "Success", description: "Package saved successfully!" });
        if (!initialData) {
          setHeroPreview(null);
          setPackagePreview(null);
          form.reset(emptyState);
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to save",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-screen bg-slate-50/30 pb-20"
      >
        {/* --- STICKY HEADER --- */}
        <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-display font-bold text-slate-800">
              Package Editor
            </h1>
          </div>
          <Button
            disabled={isPending || !!uploadingField}
            className="bg-emerald-700 hover:bg-emerald-800 shadow-lg px-8 transition-all"
          >
            {isPending ? (
              <Clock className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Saving..." : "Save Package"}
          </Button>
        </div>

        <div className="mx-auto max-w-7xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* --- HERO SECTION --- */}
            <div
              className={cn(
                "bg-white p-6 rounded-2xl border shadow-sm space-y-4 transition-all hover:shadow-md",
                form.formState.errors.heroImage && "border-red-200",
              )}
            >
              <div className="flex items-center gap-2 font-bold text-emerald-800 border-b pb-2">
                <Layout size={18} /> Hero Section
              </div>
              <FormField
                control={form.control}
                name="heroImage"
                render={() => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Hero Background
                    </FormLabel>
                    <div className="relative h-48 w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center bg-slate-50">
                      {uploadingField === "hero" ? (
                        <div className="text-center animate-pulse">
                          <Clock className="mx-auto mb-1 text-emerald-600" />{" "}
                          Uploading...
                        </div>
                      ) : deletingField === "hero" ? (
                        <div className="text-center animate-pulse">
                          <Trash2 className="mx-auto mb-1 text-red-600" />{" "}
                          Deleting...
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
                        <label className="cursor-pointer text-center p-10 group w-full">
                          <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                          <span className="text-xs font-medium text-slate-500">
                            Click to Upload Hero
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "heroImage")}
                          />
                        </label>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Headline & Subtext remain identical ... */}
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
                        <Input placeholder="Adventure Awaits..." {...field} />
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
                          placeholder="Catchy summary..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* --- PRICING SECTION --- */}
            <div
              className={cn(
                "bg-white p-6 rounded-2xl border shadow-sm space-y-6",
                form.formState.errors.packageImage && "border-red-200",
              )}
            >
              <div className="flex items-center gap-2 font-bold text-amber-600 border-b pb-2">
                <Info size={18} /> Pricing & Image
              </div>
              <FormField
                control={form.control}
                name="packageImage"
                render={() => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Card Image
                    </FormLabel>
                    <div className="relative h-48 w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center bg-slate-50">
                      {uploadingField === "package" ? (
                        <div className="text-center animate-pulse">
                          <Clock className="mx-auto mb-1 text-amber-600" />{" "}
                          Uploading...
                        </div>
                      ) : deletingField === "package" ? (
                        <div className="text-center animate-pulse">
                          <Trash2 className="mx-auto mb-1 text-red-600" />{" "}
                          Deleting...
                        </div>
                      ) : packagePreview ? (
                        <>
                          <Image
                            src={packagePreview}
                            alt="Package"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => handleRemoveImage("packageImage")}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      ) : (
                        <label className="cursor-pointer text-center p-6 group w-full">
                          <ImageIcon className="mx-auto mb-2 text-slate-400 group-hover:text-amber-600 transition-colors" />
                          <span className="text-xs font-medium text-slate-500">
                            Upload Package Image
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(e, "packageImage")
                            }
                          />
                        </label>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Rest of Pricing fields (Name, Price, etc.) remain identical ... */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="packageName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400 tracking-widest italic">
                        Full Package Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sundarban Deluxe Tour"
                          {...field}
                          className="bg-slate-50/50 font-bold text-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                          Sale Price (₹)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="2500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                          Original Price (₹)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="3500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Main Description
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Important Note
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="*Conditions Apply" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tour Itinerary remains exactly the same logic, just design-wrapped ... */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
              <div className="flex items-center gap-2 font-bold text-blue-600 border-b pb-2">
                <CalendarDays size={18} /> Tour Itinerary
              </div>
              <div className="space-y-8">
                {tFields.map((field, index) => (
                  <div
                    key={field.id}
                    className={cn(
                      "p-6 border rounded-2xl bg-slate-50/40 relative group transition-colors",
                      form.formState.errors.timeline?.[index]
                        ? "border-red-200"
                        : "border-slate-200",
                    )}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <FormField
                        control={form.control}
                        name={`timeline.${index}.dayTitle`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-[9px] font-black uppercase text-slate-400 italic">
                              Day Header
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white font-bold h-10"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-5 text-red-500 hover:bg-red-50"
                        onClick={() => tRemove(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <DayActivities dayIndex={index} control={form.control} />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed h-12 border-slate-300 text-slate-500"
                  onClick={() =>
                    tAppend({
                      dayTitle: `Day ${tFields.length + 1}`,
                      events: [{ time: "", title: "", description: "" }],
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Next Day
                </Button>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Stats, Highlights, Inclusions, etc.) remain identical ... */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <Star size={18} className="fill-amber-400 text-amber-400" />{" "}
                  Quick Stats
                </div>
                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0 bg-slate-50 px-2.5 py-1 rounded-full border">
                      <FormLabel className="text-[9px] font-black uppercase tracking-tighter">
                        {field.value ? "Popular" : "Standard"}
                      </FormLabel>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="scale-75 data-[state=checked]:bg-emerald-600"
                      />
                    </FormItem>
                  )}
                />
              </div>
              {[
                "duration",
                "groupSize",
                "location",
                "availability",
                "rating",
              ].map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as any}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                        {name}
                      </FormLabel>
                      <FormControl>
                        <Input className="bg-slate-50/50 h-9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Highlights, Inclusions, Exclusions sections follow the same UI ... */}
            {[
              {
                title: "Menu",
                color: "text-emerald-700",
                name: "highlights",
                fields: hFields,
                append: hAppend,
                remove: hRemove,
              },
              {
                title: "Inclusions",
                color: "text-blue-700",
                name: "inclusions",
                fields: iFields,
                append: iAppend,
                remove: iRemove,
              },
              {
                title: "Exclusions",
                color: "text-red-700",
                name: "exclusions",
                fields: eFields,
                append: eAppend,
                remove: eRemove,
              },
            ].map((section) => (
              <div
                key={section.title}
                className={cn(
                  "bg-white p-6 rounded-2xl border shadow-sm space-y-4",
                  form.formState.errors[section.name as keyof PackageValues] &&
                    "border-red-200",
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 font-bold text-[13px] border-b pb-2",
                    section.color,
                  )}
                >
                  <CheckCircle size={16} /> {section.title}
                </div>
                <div className="space-y-3">
                  {section.fields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`${section.name}.${idx}.value` as any}
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-0">
                            <FormControl>
                              <Input
                                className="bg-slate-50/50 h-9 text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-300 hover:text-red-500 shrink-0"
                        onClick={() => section.remove(idx)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full border-dashed h-8 text-[11px]"
                    onClick={() => section.append({ value: "" })}
                  >
                    <Plus size={14} className="mr-1" /> Add Item
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}
