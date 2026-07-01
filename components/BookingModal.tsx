"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
}

export const BookingModal = ({
  packageName,
  triggerLabel = "Book Now",
  triggerVariant = "hero",
  triggerClassName = "w-full",
}: BookingModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

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
    setBookingOpen(open);
    if (!open) {
      // Reset success state and form when closed
      setIsSuccess(false);
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
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size="lg" className={triggerClassName}>
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className={`w-[95%] sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-3xl  transition-all duration-300 ${isSuccess ? "p-0 overflow-hidden shadow-2xl" : "p-6 md:p-8"}`}>
        {!isSuccess ? (
          <>
            {/* Header */}
            <DialogHeader className="space-y-3">
              <DialogTitle className="font-display text-2xl text-foreground">
                Secure Your Slot
              </DialogTitle>

              <DialogDescription className="text-muted-foreground leading-relaxed">
                You are booking for{" "}
                <span className="font-semibold text-primary">{packageName}</span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                            className="
                              pl-12 h-12 rounded-sm
                              focus-visible:ring-0
                              focus-visible:ring-offset-0
                              shadow-none
                            "
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
                              placeholder="Enter your email"
                              {...field}
                              className="
                                pl-12 h-12 rounded-sm
                                focus-visible:ring-0
                                focus-visible:ring-offset-0
                                shadow-none
                              "
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
                              placeholder="Enter your phone number"
                              {...field}
                              className="
                                pl-12 h-12 rounded-sm
                                focus-visible:ring-0
                                focus-visible:ring-offset-0
                                shadow-none
                              "
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date + Guests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Travel Date */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase text-muted-foreground">
                          Travel Date
                        </FormLabel>

                        <FormControl>
                          <div className="relative">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />

                            <Input
                              type="date"
                              {...field}
                              className="
                                pl-12 pr-4 h-12 rounded-sm
                                focus-visible:ring-0
                                focus-visible:ring-offset-0
                                shadow-none
                                appearance-none
                                [&::-webkit-calendar-picker-indicator]:opacity-0
                                [&::-webkit-calendar-picker-indicator]:absolute
                                [&::-webkit-calendar-picker-indicator]:right-0
                                [&::-webkit-calendar-picker-indicator]:w-full
                                [&::-webkit-calendar-picker-indicator]:h-full
                                [&::-webkit-calendar-picker-indicator]:cursor-pointer
                              "
                            />
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
                              className="
                                pl-12 h-12 rounded-sm
                                focus-visible:ring-0
                                focus-visible:ring-offset-0
                                shadow-none
                              "
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="
                    w-full h-12 rounded-sm text-base text-white font-semibold
                    bg-[#064e3b] hover:bg-[#003c2f]
                    transition-all duration-300
                  "
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
            {/* Green gradient banner using website colors */}
            <div className="relative bg-gradient-to-br from-[#064e3b] via-[#0b664a] to-[#047857] px-8 pt-12 pb-16 text-center overflow-hidden">
              {/* Decorative rings */}
              {/* <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-white/15" />
              </div> */}

              {/* Animated check icon */}
              <div className="relative inline-flex items-center justify-center mb-5">
                {/* Pulse ring */}
                <span className="absolute inline-flex h-24 w-24 rounded-full bg-white/20 animate-ping" />
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-white/30" />
                <div className="relative z-10 bg-white rounded-full p-4 shadow-xl">
                  <FaCheckCircle className="w-12 h-12 text-[#064e3b] animate-[scale-in_0.4s_ease-out]" />
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
                  <span className="mt-0.5 text-[#064e3b]"><FaCheckCircle className="w-4 h-4" /></span>
                  <span>Our travel expert will <strong>call you within 24 hours</strong> to finalise details.</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-600">
                  <span className="mt-0.5 text-[#064e3b]"><FaCheckCircle className="w-4 h-4" /></span>
                  <span>You can reach us anytime on <strong>WhatsApp</strong>.</span>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
