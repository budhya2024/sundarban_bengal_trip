"use client";

import React, { useTransition, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Updated import for @imagekit/next v2.x
import { upload } from "@imagekit/next";
import {
  Plus,
  Trash2,
  Save,
  Layout,
  MessageSquare,
  Smartphone,
  Upload,
  X,
  Clock,
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
import { upsertContactSettings } from "@/app/actions/contact-settings.actions";
import {
  getIKAuthenticationParameters,
  deleteFromImageKit,
} from "@/app/actions/imagekit.actions";
import { useToast } from "@/hooks/use-toast";
import {
  ContactPageSchema,
  ContactPageValues,
} from "@/schemas/adminContact.schema";
import Image from "next/image";
import { SidebarTrigger } from "../SidebarTrigger";

interface ContactAdminProps {
  initialData: ContactPageValues | null;
}

export default function ContactAdminForm({ initialData }: ContactAdminProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // ImageKit specific states
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [preview, setPreview] = useState<string | null>(
    initialData?.heroImage || null,
  );

  const form = useForm<ContactPageValues>({
    resolver: zodResolver(ContactPageSchema),
    defaultValues: {
      heroTitle: initialData?.heroTitle || "",
      heroSubtitle: initialData?.heroSubtitle || "",
      heroImage: initialData?.heroImage || "",
      address: initialData?.address || "",
      whatsappNumber: initialData?.whatsappNumber || "",
      sidebarHeadline: initialData?.sidebarHeadline || "",
      sidebarDescription: initialData?.sidebarDescription || "",
      phones: initialData?.phones?.length
        ? initialData.phones
        : [{ value: "" }],
      emails: initialData?.emails?.length
        ? initialData.emails
        : [{ value: "" }],
      schedules: initialData?.schedules?.length
        ? initialData.schedules
        : [{ value: "" }],
    },
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control: form.control, name: "phones" });
  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control: form.control, name: "emails" });
  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({ control: form.control, name: "schedules" });

  // Modern Functional Upload Handler (Bypasses Vercel 4.5MB limit)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Get auth params from your existing server action
      const auth = await getIKAuthenticationParameters();
      if (!auth) throw new Error("Authentication failed");

      // 2. Perform modular upload (Direct browser-to-cloud)
      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
        folder: "/contact-page",
      });

      // 3. Smart URL strategy: append ikid for easy cloud deletion
      const smartUrl = `${res.url}?ikid=${res.fileId}`
        .replace(/['"]+/g, "")
        .trim();

      setPreview(smartUrl);
      form.setValue("heroImage", smartUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
      toast({ title: "Success", description: "Hero image uploaded to cloud." });
    } catch (error) {
      console.error("Upload Error:", error);
      toast({ variant: "destructive", title: "Upload failed" });
    } finally {
      setIsUploading(false);
      e.target.value = ""; // Clear input for same-file re-uploads
    }
  };

  const handleRemoveImage = async () => {
    const currentUrl = form.getValues("heroImage");
    if (!currentUrl) return;

    try {
      const urlObj = new URL(currentUrl.replace(/['"]+/g, "").trim());
      const fileId = urlObj.searchParams.get("ikid");

      if (fileId) {
        setIsDeleting(true);
        const res = await deleteFromImageKit(fileId);
        if (!res.success) {
          console.log("Cloud deletion failed");
          //   toast({
          //     variant: "destructive",
          //     title: "Error",
          //     description: "Failed to delete from cloud.",
          //   });
          //   setIsDeleting(false);
          //   return;
        }
      }

      setPreview(null);
      form.setValue("heroImage", "", { shouldDirty: true });
      toast({ title: "Removed", description: "Cloud storage cleaned." });
    } catch (error) {
      setPreview(null);
      form.setValue("heroImage", "");
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (values: ContactPageValues) => {
    startTransition(async () => {
      const result = await upsertContactSettings(values);
      if (result.success) {
        toast({
          title: "Success",
          description: "Contact settings updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save changes",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-screen bg-slate-50/30"
      >
        <div className="sticky top-0 z-30 w-full border-b bg-background px-4 py-3 sm:px-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Contact Management
                </h1>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending || isUploading || isDeleting}
              className="bg-emerald-700 hover:bg-emerald-800 h-10 px-6 shadow-sm"
            >
              {isPending ? (
                <Clock className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isPending ? "Syncing..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="mx-auto sm:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              {/* Hero Settings */}
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 font-bold text-emerald-900 border-b pb-3">
                  <Layout className="h-5 w-5" /> 1. Hero Section
                </div>

                <div className="mb-6 space-y-4">
                  <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                    Hero Background Image
                  </FormLabel>

                  <div className="flex flex-col items-center justify-center w-full">
                    {isUploading ? (
                      <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl bg-slate-50 border-emerald-300">
                        <Clock className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
                        <p className="text-sm font-bold text-emerald-700">
                          Uploading to Cloud...
                        </p>
                      </div>
                    ) : isDeleting ? (
                      <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl bg-slate-50 border-red-300">
                        <Trash2 className="w-8 h-8 text-red-600 animate-pulse mb-2" />
                        <p className="text-sm font-bold text-red-700">
                          Cleaning Storage...
                        </p>
                      </div>
                    ) : preview ? (
                      <div className="relative w-full h-48 rounded-xl overflow-hidden border">
                        <Image
                          src={preview}
                          alt="Hero Preview"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors border-slate-300">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-slate-400 mb-2" />
                          <p className="text-sm text-slate-500 font-medium">
                            Click to upload via SDK
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Direct to ImageKit (Max 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Rest of Hero Fields */}
                <div className="space-y-5">
                  <FormField
                    control={form.control}
                    name="heroTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                          Headline
                        </FormLabel>
                        <FormControl>
                          <Input className="bg-slate-50/50" {...field} />
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
                        <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                          Subtext
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-slate-50/50"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Sidebar Section */}
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 font-bold text-amber-700 border-b pb-3">
                  <MessageSquare className="h-5 w-5" /> 2. Help Sidebar
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="sidebarHeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                          Sidebar Title
                        </FormLabel>
                        <FormControl>
                          <Input className="bg-slate-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                          WhatsApp (10 Digits)
                        </FormLabel>
                        <FormControl>
                          <Input className="bg-slate-50/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="sidebarDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                            Description Text
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="bg-slate-50/50"
                              rows={2}
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

            {/* Right Column Details */}
            <div className="space-y-8 lg:col-span-4">
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 font-bold text-blue-900 border-b pb-3">
                  <Smartphone className="h-5 w-5" /> 3. Contact Details
                </div>
                <div className="space-y-8">
                  {/* Time Schedules */}
                  <div className="space-y-3">
                    <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                      Time Schedules
                    </FormLabel>
                    {scheduleFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`schedules.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  className="h-9 bg-slate-50/50 text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-slate-300 hover:text-red-500"
                          onClick={() => removeSchedule(index)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full text-[11px] h-8 border-dashed"
                      onClick={() => appendSchedule({ value: "" })}
                    >
                      <Plus size={12} className="mr-1" /> Add Slot
                    </Button>
                  </div>

                  {/* Phones */}
                  <div className="space-y-3">
                    <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                      Phone Contacts
                    </FormLabel>
                    {phoneFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`phones.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  className="h-9 bg-slate-50/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-slate-300"
                          onClick={() => removePhone(index)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full text-[11px] h-8 border-dashed"
                      onClick={() => appendPhone({ value: "" })}
                    >
                      <Plus size={12} className="mr-1" /> Add Phone
                    </Button>
                  </div>

                  {/* Emails */}
                  <div className="space-y-3">
                    <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                      Email Addresses
                    </FormLabel>
                    {emailFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`emails.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  className="h-9 bg-slate-50/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-slate-300"
                          onClick={() => removeEmail(index)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full text-[11px] h-8 border-dashed"
                      onClick={() => appendEmail({ value: "" })}
                    >
                      <Plus size={12} className="mr-1" /> Add Email
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                          Physical Address
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="bg-slate-50/50 text-sm"
                            rows={2}
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
