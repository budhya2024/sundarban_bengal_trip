"use client";

import React, { useTransition, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaSpinner,
  FaPaperPlane,
  FaCalendarAlt,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button, ButtonProps } from "@/components/ui/button";

import { BookingSchema, BookingValues } from "@/schemas/booking.schema";
import { useToast } from "@/hooks/use-toast";
import { createBooking } from "@/app/actions/home.actions";

interface BookingModalProps {
  packageName: string;
  triggerLabel?: string;
  triggerVariant?: ButtonProps["variant"];
  triggerClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export const BookingModal = ({
  packageName,
  triggerLabel = "Book Now",
  triggerVariant = "hero",
  triggerClassName = "w-full",
  isOpen,
  onOpenChange,
  hideTrigger = false,
}: BookingModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [internalBookingOpen, setInternalBookingOpen] = useState(false);
  
  const bookingOpen = isOpen !== undefined ? isOpen : internalBookingOpen;
  const [isSuccess, setIsSuccess] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calRef.current && !calRef.current.contains(e.target as Node)) {
        setCalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const form = useForm<BookingValues>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "1",
      package: packageName,
      status: "pending",
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) onOpenChange(open);
    if (isOpen === undefined) setInternalBookingOpen(open);
    if (!open) {
      setIsSuccess(false);
      setCalOpen(false);
      form.reset();
    }
  };

  const onSubmit = (values: BookingValues) => {
    startTransition(async () => {
      const res = await createBooking(values);

      if (res.success) {
        setIsSuccess(true);
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
    <Dialog open={bookingOpen} onOpenChange={handleOpenChange}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button variant={triggerVariant} size="lg" className={triggerClassName}>
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        className={`w-[95%] sm:max-w-[540px]  sm:w-full max-h-[90vh] overflow-y-auto rounded-3xl transition-all duration-300 ${isSuccess ? "pt-10 px-0 pb-0 overflow-hidden shadow-2xl" : "p-6 md:p-8"
          }`}
      >
        {!isSuccess ? (
          <>
            {/* Header */}
            <DialogHeader className="space-y-1.5 mb-4">
              <DialogTitle className="font-display text-2xl text-foreground">
                Book Your Trip
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed">
                You are booking for{" "}
                <span className="font-semibold text-[#064e3b]">{packageName}</span>. Fill in your details and our travel expert will confirm your booking within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className="pl-12 h-12 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="Your email"
                              {...field}
                              className="pl-12 h-12 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Your phone number"
                              {...field}
                              className="pl-12 h-12 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date + Guests — always side by side */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Travel Date — React Calendar */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                          Travel Date
                        </FormLabel>
                        <FormControl>
                          <div className="relative" ref={calRef}>
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />

                            {/* Trigger button */}
                            <button
                              type="button"
                              onClick={() => setCalOpen((o) => !o)}
                              className={`
                                w-full h-12 pl-12 pr-4 text-left
                                border border-input rounded-sm bg-background
                                text-sm focus:outline-none focus:ring-0
                                ${field.value ? "text-foreground" : "text-muted-foreground"}
                              `}
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                                : "travel date"}
                            </button>

                            {/* Calendar popover — opens upward */}
                            {calOpen && (
                              <div className="absolute z-50 bottom-full mb-2 left-0 shadow-xl rounded-xl overflow-hidden border border-border bg-card">
                                <Calendar
                                  minDate={today}
                                  value={field.value ? new Date(field.value) : null}
                                  onChange={(val) => {
                                    if (val instanceof Date) {
                                      const yyyy = val.getFullYear();
                                      const mm = String(val.getMonth() + 1).padStart(2, "0");
                                      const dd = String(val.getDate()).padStart(2, "0");
                                      field.onChange(`${yyyy}-${mm}-${dd}`);
                                    }
                                    setCalOpen(false);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Guests */}
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                          Guests
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="number"
                              min="1"
                              placeholder="Number of guests"
                              {...field}
                              className="pl-12 h-12 rounded-sm focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-emerald-600 w-3 h-3" />
                    No payment required
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-emerald-600 w-3 h-3" />
                    Callback within 24 hours
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCheckCircle className="text-emerald-600 w-3 h-3" />
                    WhatsApp support
                  </span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 rounded-sm text-base text-white font-semibold bg-[#064e3b] hover:bg-[#003c2f] transition-all duration-300"
                >
                  {isPending ? (
                    <>
                      <FaSpinner className="animate-spin w-4 h-4 mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4 mr-2 text-white" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <>
            {/* Success — Green gradient banner */}
            <div className="relative bg-gradient-to-br from-[#064e3b] via-[#0b664a] to-[#047857] px-8 pt-12 pb-16 text-center overflow-hidden">
              {/* Animated check icon */}
              <div className="relative inline-flex items-center justify-center mb-5">
                <span className="absolute inline-flex h-24 w-24 rounded-full bg-white/20 animate-ping" />
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-white/30" />
                <div className="relative z-10 bg-white rounded-full p-4 shadow-xl">
                  <FaCheckCircle className="w-12 h-12 text-[#064e3b]" />
                </div>
              </div>

              <h2 className="text-white text-2xl font-bold mb-1 drop-shadow">
                Booking Confirmed! 🎉
              </h2>
              <p className="text-emerald-100 text-sm">
                Your adventure to the Sundarbans is on its way
              </p>
            </div>

            {/* Body card that overlaps the banner */}
            <div className="relative -mt-8 mx-4 mb-6 bg-white rounded-2xl shadow-lg px-6 py-6 space-y-4">
              {/* Package pill */}
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block bg-[#f0fdf4] text-[#064e3b] text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                  <FaBoxOpen className="inline-block mr-1 mb-0.5" /> {packageName}
                </span>
              </div>

              {/* Info rows */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2.5 text-slate-600">
                  <span className="mt-0.5 text-[#064e3b]">
                    <FaCheckCircle className="w-4 h-4" />
                  </span>
                  <span>
                    A <strong>confirmation email</strong> has been sent to your inbox.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-600">
                  <span className="mt-0.5 text-[#064e3b]">
                    <FaCheckCircle className="w-4 h-4" />
                  </span>
                  <span>
                    Our travel expert will{" "}
                    <strong>call you within 24 hours</strong> to finalise details.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-600">
                  <span className="mt-0.5 text-[#064e3b]">
                    <FaCheckCircle className="w-4 h-4" />
                  </span>
                  <span>
                    You can reach us anytime on <strong>WhatsApp</strong>.
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
