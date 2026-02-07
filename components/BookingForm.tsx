"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Package,
  ChevronDown,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BookingSchema, BookingValues } from "@/schemas/booking.schema";
import { createBooking } from "@/app/actions/home.actions";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import useSWR from "swr";
import { getPackageKeys } from "@/app/actions/package.actions";

export const BookingForm = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [packages, setPackages] = useState<{ key: string; name: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      startTransition(async () => {
        const { data, success } = await getPackageKeys();
        if (success) {
          setPackages(data);
        }
      });
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
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section className="relative z-20 -mt-24 ">
      <div className="container px-4">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="bg-card rounded-2xl shadow-elevated p-5 md:p-10"
        >
          <div className="text-center mb-5 md:mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              Plan Your Adventure
            </h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder=" Your full name"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-[10px]" />
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
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="email"
                            placeholder=" Your  email"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-[10px]" />
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
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder=" Your phone number"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                {/* Travel Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="date"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                {/* Guests */}
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="2"
                            className="pl-10 h-12"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                {/* Package Dropdown */}
                <FormField
                  control={form.control}
                  name="package"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-12 pl-10 pr-12 rounded-md border border-border bg-background text-foreground appearance-none cursor-pointer"
                          >
                            {isPending ? (
                              <option value="">Loading...</option>
                            ) : packages?.length === 0 ? (
                              <option value="">No packages available</option>
                            ) : (
                              <>
                                <option value="" selected hidden>
                                  Select Package
                                </option>
                                {packages?.map((pkg) => (
                                  <option key={pkg.key} value={pkg.name}>
                                    {pkg.name}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>
                        </FormControl>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      </div>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Plan My Trip"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md border-none rounded-3xl p-8 outline-none">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Animated Icon */}
            <div className="bg-emerald-100 p-3 rounded-full animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>

            <DialogHeader>
              <DialogTitle className="text-2xl font-display font-bold text-slate-900">
                Adventure Awaits!
              </DialogTitle>
              <DialogDescription className="text-slate-500 pt-2 leading-relaxed">
                Thank you for choosing us for your Sundarban journey. We have
                received your request, and our travel expert will contact you
                within the next 24 hours to finalize your itinerary.
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
