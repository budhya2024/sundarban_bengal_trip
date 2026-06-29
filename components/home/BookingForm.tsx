"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import AOS from "aos";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaLock,
  FaPhoneAlt,
  FaWhatsapp,
  FaPercent,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaHeart,
} from "react-icons/fa";
import {
  Calendar as CalendarIcon,
  Users,
  User,
  Phone,
  Mail,
  Package,
  CheckCircle2,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { BookingSchema, BookingValues } from "@/schemas/booking.schema";
import { createBooking } from "@/app/actions/home.actions";
import { getPackageKeys } from "@/app/actions/package.actions";
import { useToast } from "@/hooks/use-toast";

// Shared input className — keeps placeholder color consistent across all fields
const INPUT_CLS = `
  pl-12 h-12  text-sm md:text-base
  focus-visible:ring-0 focus-visible:ring-offset-0
  shadow-none
  
  placeholder:text-muted-foreground
`;

export const BookingForm = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [packages, setPackages] = useState<{ key: string; name: string }[]>([]);
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

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

  useEffect(() => {
    (async () => {
      const { data, success } = await getPackageKeys();
      if (success) setPackages(data);
    })();
  }, []);

  const form = useForm<BookingValues>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "",
      package: "",
    },
  });

  useEffect(() => {
    AOS.refresh();
  }, []);

  const onSubmit = async (values: BookingValues) => {
    startTransition(async () => {
      const { message, success } = await createBooking(values);
      if (success) {
        form.reset();
        setIsSuccessModalOpen(true);
      } else {
        toast({ title: "Error", description: message, variant: "destructive" });
      }
    });
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section className="relative z-20">
      <div className="container">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="bg-card rounded-2xl border border-gray-300 shadow-elevated p-3 sm:p-5 md:p-10"
        >
          {/* Heading */}
          <div className="text-center mb-5 md:mb-10">
            <p className="font-display text-xl md:text-3xl font-bold text-foreground mt-2 mb-2 md:mb-4">
              Sundarban tour package
            </p>
            <p className="text-muted-foreground text-sm md:text-base">
              Fill up the form and our travel expert will contact you shortly.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-4 md:mb-10">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className={INPUT_CLS}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className={INPUT_CLS}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            className={INPUT_CLS}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/*
                  ─── DATE + GUESTS ROW ──────────────────────────────────────────
                  On mobile: these two share one row (grid-cols-2 subgrid).
                  On md+: they fall into the normal 2/3-col parent grid individually.
                  We wrap them in a col-span-full subgrid div only on mobile.
                */}
                <div className="col-span-1 md:contents">
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 md:contents">
                    {/* Travel Date — React Calendar */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="md:col-auto">
                          <div className="relative" ref={calRef}>
                            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />

                            {/* Trigger button — shows placeholder or selected date */}
                            <button
                              type="button"
                              onClick={() => setCalOpen((o) => !o)}
                              className={`
                              w-full h-12 pl-12 pr-4 text-left
                              border border-input rounded-md bg-background
                              text-sm focus:outline-none focus:ring-0
                              ${field.value ? "text-foreground" : "text-muted-foreground"}
                            `}
                            >
                              {field.value
                                ? new Date(field.value).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )
                                : "Select date"}
                            </button>

                            {/* Calendar popover */}
                            {calOpen && (
                              <div className="absolute z-50 mt-1 left-0 shadow-lg rounded-xl overflow-hidden border border-border bg-card">
                                <Calendar
                                  minDate={today}
                                  value={
                                    field.value ? new Date(field.value) : null
                                  }
                                  onChange={(val) => {
                                    if (val instanceof Date) {
                                      // Store as YYYY-MM-DD string (matches BookingSchema)
                                      const yyyy = val.getFullYear();
                                      const mm = String(
                                        val.getMonth() + 1,
                                      ).padStart(2, "0");
                                      const dd = String(val.getDate()).padStart(
                                        2,
                                        "0",
                                      );
                                      field.onChange(`${yyyy}-${mm}-${dd}`);
                                    }
                                    setCalOpen(false);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Guests */}
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem className="md:col-auto">
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                placeholder="No. of guests"
                                className={INPUT_CLS}
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Package Dropdown */}
                <FormField
                  control={form.control}
                  name="package"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-20" />
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="pl-12 h-12 focus:ring-0 focus:ring-offset-0 shadow-none data-[placeholder]:text-muted-foreground">
                              <SelectValue placeholder="Select tour package" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {packages?.map((pkg) => (
                              <SelectItem key={pkg.key} value={pkg.name}>
                                {pkg.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}
              <div className="text-center space-y-5">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Book Your Trip"}
                </Button>

                <div className="flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm sm:gap-4 text-gray-700 font-medium">
                  {/* <div className="flex items-center gap-1 md:gap-2">
                    <FaLock className="text-slate-700" />
                    <span>No Payment Required</span>
                  </div> */}
                  {/* <div className="hidden md:block h-4 w-px bg-gray-300" /> */}
                  <div className="flex items-center gap-1 md:gap-2">
                    <FaPhoneAlt className="text-slate-700" />
                    <span>Callback Within 15 Minutes</span>
                  </div>
                  <div className="hidden md:block h-4 w-px bg-gray-300" />
                  <div className="flex items-center gap-1 md:gap-2">
                    <FaWhatsapp className="text-green-500" />
                    <span>WhatsApp Support</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 text-xs md:text-sm gap-2 sm:gap-4 text-gray-700 font-medium rounded-md bg-[#f7f2d8] p-2 md:p-4">
                  {/* Exclusive Offers */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaPercent className="text-[#003c2f] text-2xl" />
                    <div className="text-left">
                      <p className="font-bold text-xs md:text-base text-[#003c2f]">
                        Exclusive Offers
                      </p>
                      <p className="text-xs md:text-base">For Early Bookings</p>
                    </div>
                  </div>

                  {/* Instant Confirmation */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaClock className="text-[#003c2f] text-2xl" />
                    <div className="text-left">
                      <p className="font-bold text-xs md:text-base text-[#003c2f]">
                        Instant Confirmation
                      </p>
                      <p className="text-xs md:text-base text-gray-600">
                        No Waiting
                      </p>
                    </div>
                  </div>

                  {/* Refund */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaShieldAlt className="text-[#003c2f] text-2xl" />
                    <div className="text-left">
                      <p className="font-bold text-xs md:text-base text-[#003c2f]">
                        100% Refund
                      </p>
                      <p className="text-xs md:text-base text-gray-600">
                        On Cancellation*
                      </p>
                    </div>
                  </div>

                  {/* New Card */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaUsers className="text-[#003c2f] text-2xl" />
                    <div className="text-left">
                      <p className="font-bold text-xs md:text-base text-[#003c2f]">
                        10,000+ Travelers
                      </p>
                      <p className="text-xs md:text-base text-gray-600">
                        Trusted Across India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mx-auto flex w-fit items-center gap-2 md:gap-3 rounded-sm bg-[#003c2f] px-3 md:px-6 py-3 text-white">
                  <FaUsers />
                  <span className="text-xs md:text-sm font-medium">
                    Trusted by Families, Couples & Groups Across India
                  </span>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md border-none rounded-3xl p-8 outline-none">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-emerald-100 p-3 rounded-full animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold text-slate-900">
                Adventure Awaits!
              </DialogTitle>
              <DialogDescription className="text-slate-500 pt-2 leading-relaxed">
                Thank you for choosing us for your Sundarban journey. Our travel
                expert will contact you shortly.
              </DialogDescription>
            </DialogHeader>
          </div>
          <DialogFooter className="sm:justify-center mt-6">
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-8 border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-all font-bold"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Got it, Thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
