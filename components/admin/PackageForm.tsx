"use client";

import React, { useTransition, useState } from "react";
import { useFieldArray, useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Save,
  Layout,
  Info,
  Clock,
  CheckCircle,
  XCircle,
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
import { upsertPackage } from "@/app/admin/actions/package.actions";
import Image from "next/image";
import { SidebarTrigger } from "./SidebarTrigger";

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
                <FormLabel className="text-[9px] font-bold uppercase">
                  Time
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-8 text-xs bg-slate-50/50"
                    {...field}
                    placeholder="08:00 AM"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`timeline.${dayIndex}.events.${index}.title`}
            render={({ field }) => (
              <FormItem className="md:col-span-3">
                <FormLabel className="text-[9px] font-bold uppercase">
                  Activity Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-8 text-xs bg-slate-50/50"
                    {...field}
                    placeholder="Morning Boat Safari"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`timeline.${dayIndex}.events.${index}.description`}
            render={({ field }) => (
              <FormItem className="md:col-span-4">
                <FormLabel className="text-[9px] font-bold uppercase">
                  Activity Detail
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="text-xs min-h-[60px] bg-slate-50/50"
                    {...field}
                  />
                </FormControl>
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

  // Separate previews for Hero and Package images
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
        <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-display font-bold text-slate-800">
              Package Editor
            </h1>
            {Object.keys(form.formState.errors).length > 0 && (
              <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-0.5 rounded text-[10px] font-bold">
                <AlertCircle size={12} /> ERRORS IN FORM
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
            {isPending ? "Saving..." : "Save Package"}
          </Button>
        </div>

        <div className="mx-auto max-w-7xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* --- 1. HERO SECTION --- */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 font-bold text-emerald-800 border-b pb-2">
                <Layout size={18} /> Hero Section
              </div>
              <FormField
                control={form.control}
                name="heroImage"
                render={({ fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Hero Background Image
                    </FormLabel>
                    <div
                      className={`relative h-48  w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all ${fieldState.error ? "border-red-300 bg-red-50/20" : "bg-slate-50/50 border-slate-200 hover:border-emerald-200"}`}
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
                          <Upload
                            className={`mx-auto mb-2 transition-transform group-hover:-translate-y-1 ${fieldState.error ? "text-red-400" : "text-slate-400"}`}
                          />
                          <span className="text-xs font-medium text-slate-500 group-hover:text-emerald-600">
                            Click to upload Hero Image
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setHeroPreview(reader.result as string);
                                  form.setValue(
                                    "heroImage",
                                    reader.result as string,
                                  );
                                };
                                reader.readAsDataURL(file);
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
                        <Input placeholder="Adventure Awaits..." {...field} />
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
                        <Textarea
                          rows={2}
                          placeholder="Catchy summary..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* --- 2. PRICING & PACKAGE IMAGE --- */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
              <div className="flex items-center gap-2 font-bold text-amber-600 border-b pb-2">
                <Info size={18} /> Pricing & Package Image
              </div>

              {/* Package Image Upload */}
              <FormField
                control={form.control}
                name="packageImage"
                render={({ fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase text-slate-400">
                      Secondary Package Image
                    </FormLabel>
                    <div
                      className={`relative h-48 w-full rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center transition-all ${fieldState.error ? "border-red-300 bg-red-50/20" : "bg-slate-50/50 border-slate-200 hover:border-emerald-200"}`}
                    >
                      {packagePreview ? (
                        <>
                          <Image
                            src={packagePreview}
                            alt="Package"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                            onClick={() => {
                              setPackagePreview(null);
                              form.setValue("packageImage", "");
                            }}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      ) : (
                        <label className="cursor-pointer text-center p-6 w-full group">
                          <ImageIcon
                            className={`mx-auto mb-2 transition-transform group-hover:-translate-y-1 ${fieldState.error ? "text-red-400" : "text-slate-400"}`}
                          />
                          <span className="text-xs font-medium text-slate-500 group-hover:text-emerald-600">
                            Click to upload Package Image
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setPackagePreview(reader.result as string);
                                  form.setValue(
                                    "packageImage",
                                    reader.result as string,
                                  );
                                };
                                reader.readAsDataURL(file);
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

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="packageName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold uppercase text-slate-400 italic tracking-widest">
                        Full Package Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sundarban 2 Days 1 Night Deluxe Tour"
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
                      <Input placeholder="e.g. *Conditions Apply" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* --- 3. TIMELINE --- */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
              <div className="flex items-center gap-2 font-bold text-blue-600 border-b pb-2">
                <CalendarDays size={18} /> Tour Itinerary
              </div>
              <div className="space-y-8">
                {tFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-6 border rounded-2xl bg-slate-50/40 relative border-slate-200 group"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <FormField
                        control={form.control}
                        name={`timeline.${index}.dayTitle`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">
                              Day Header
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-white font-bold h-10"
                                {...field}
                                placeholder="e.g. Day 1: Exploring the Mangroves"
                              />
                            </FormControl>
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
                  className="w-full border-dashed h-12 border-slate-300 text-slate-500 hover:text-blue-700 hover:border-blue-300"
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

          {/* --- RIGHT COLUMN --- */}
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
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {[
              {
                title: "Highlights",
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
                className="bg-white p-6 rounded-2xl border shadow-sm space-y-4"
              >
                <div
                  className={`flex items-center gap-2 font-bold text-[13px] border-b pb-2 ${section.color}`}
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
                          <FormControl className="flex-1">
                            <Input
                              className="bg-slate-50/50 h-9 text-sm"
                              {...field}
                            />
                          </FormControl>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-300 hover:text-red-500"
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
