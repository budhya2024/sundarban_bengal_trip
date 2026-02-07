"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Save, Clock, Phone, Package } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { updateBookingStatus } from "@/app/actions/home.actions";

const InquiryUpdateSchema = z.object({
  status: z.string(),
  adminNotes: z.string().optional(),
});

type InquiryUpdateValues = z.infer<typeof InquiryUpdateSchema>;

export function InquiryDrawer({ isOpen, onClose, inquiry }: any) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<InquiryUpdateValues>({
    resolver: zodResolver(InquiryUpdateSchema),
    defaultValues: {
      status: inquiry.status || "pending",
      adminNotes: inquiry.adminNotes || "",
    },
  });

  // Re-sync form values if the inquiry prop changes (when clicking a different row)
  React.useEffect(() => {
    form.reset({
      status: inquiry.status,
      adminNotes: inquiry.adminNotes || "",
    });
  }, [inquiry, form]);

  const onSubmit = (values: InquiryUpdateValues) => {
    startTransition(async () => {
      const res = await updateBookingStatus(inquiry.id, {
        status: values.status,
        adminNotes: values.adminNotes || "",
      });
      if (res.success) {
        toast({ title: "Updated", description: res.message });
        onClose(); // Optional: Close drawer on success
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md w-full p-0 flex flex-col border-l">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b bg-slate-50/50">
              <SheetHeader className="text-left">
                <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                  Inquiry Details
                </div>
                <SheetTitle className="text-xl font-bold">
                  {inquiry.name}
                </SheetTitle>
                <SheetDescription className="text-xs">
                  Received on{" "}
                  {format(new Date(inquiry.createdAt), "MMMM dd, hh:mm a")}
                </SheetDescription>
              </SheetHeader>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Quick Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl border bg-white space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Phone size={10} /> Phone
                  </span>
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="text-sm font-bold text-emerald-700 block hover:underline"
                  >
                    {inquiry.phone}
                  </a>
                </div>
                <div className="p-3 rounded-xl border bg-white space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                    <Package size={10} /> Package
                  </span>
                  <span className="text-sm font-bold text-slate-700 block line-clamp-1">
                    {inquiry.package}
                  </span>
                </div>
              </div>

              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-[11px] font-bold uppercase text-slate-500">
                      Current Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-11 rounded-xl bg-white">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending (New)</SelectItem>
                        <SelectItem value="contacted">
                          Contacted (In Talk)
                        </SelectItem>
                        <SelectItem value="confirmed">
                          Confirmed (Booked)
                        </SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Notes Field */}
              <FormField
                control={form.control}
                name="adminNotes"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-[11px] font-bold uppercase text-slate-500">
                      Internal Team Notes
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g. User wants a vegetarian menu. Spoke on WhatsApp."
                        className="min-h-[180px] rounded-xl bg-slate-50/50 border-slate-200 focus:bg-white transition-all text-sm leading-relaxed"
                      />
                    </FormControl>
                    <p className="text-[10px] text-slate-400 italic font-medium">
                      Private: These notes are never shown to the customer.
                    </p>
                  </FormItem>
                )}
              />
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t bg-white">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-700 hover:bg-emerald-800 h-12 rounded-xl font-bold gap-2 transition-all shadow-md"
              >
                {isPending ? (
                  <Clock className="h-4 w-4 animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {isPending ? "Syncing..." : "Sync Updates"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
