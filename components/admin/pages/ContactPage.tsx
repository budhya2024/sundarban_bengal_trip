"use client";

import React, { useTransition, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Save,
  Layout,
  MessageSquare,
  Smartphone,
  Upload,
  X,
  ImageIcon,
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
import { upsertContactSettings } from "@/app/admin/actions/contact-settings.actions";
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

  // Handle Image to Base64 Conversion
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit for Base64 (JSONB storage)
        toast({
          title: "Error",
          description: "Image size should be less than 2MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        form.setValue("heroImage", base64String);
      };
      reader.readAsDataURL(file);
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
                <p className="hidden text-xs text-slate-500 md:block">
                  Real-time update for Sundarban Bengal Trip contact page
                </p>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-emerald-700 hover:bg-emerald-800 h-10 px-6 shadow-sm"
            >
              {isPending ? (
                "Syncing..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
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

                {/* Image Upload Feature */}
                <div className="mb-6 space-y-4">
                  <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                    Hero Background Image
                  </FormLabel>
                  <div className="flex flex-col items-center justify-center w-full">
                    {preview ? (
                      <div className="relative w-full h-48 rounded-xl overflow-hidden border">
                        <Image
                          src={preview}
                          alt="Hero Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            form.setValue("heroImage", "");
                          }}
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
                            Click to upload hero image
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            PNG, JPG or WEBP (Max 2MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

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

              {/* Sidebar Help Settings */}
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

            {/* --- RIGHT COLUMN: CONTACT DETAILS (4 COLS) --- */}
            <div className="space-y-8 lg:col-span-4">
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-2 font-bold text-blue-900 border-b pb-3">
                  <Smartphone className="h-5 w-5" /> 3. Contact Details
                </div>
                <div className="space-y-8">
                  {/* Schedules */}
                  <div className="space-y-3">
                    <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                      Time Schedules
                    </FormLabel>
                    {scheduleFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 group">
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
