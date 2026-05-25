"use client";

import { useEffect, useState, useTransition } from "react";
import AOS from "aos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Calendar,
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

export const BookingForm = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [packages, setPackages] = useState<
    { key: string; name: string }[]
  >([]);

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data, success } = await getPackageKeys();

      if (success) {
        setPackages(data);
      }
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
    <section className="relative z-20 -mt-24">
      <div className="container">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="bg-card rounded-2xl shadow-elevated p-5 md:p-10"
        >
          {/* Heading */}
          <div className="text-center mb-5 md:mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
              Plan Your Adventure
            </h3>

            <p className="text-muted-foreground mt-3">
              Fill up the form and our travel expert will contact you shortly.
            </p>
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
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />

                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="
                              pl-12 h-12
                              focus-visible:ring-0
                              focus-visible:ring-offset-0
                              shadow-none
                            "
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
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />

                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="
                              pl-12 h-12
                              focus-visible:ring-0
                              focus-visible:ring-offset-0
                              shadow-none
                            "
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
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />

                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            className="
                              pl-12 h-12
                              focus-visible:ring-0
                              focus-visible:ring-offset-0
                              shadow-none
                            "
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
                        
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />

                        <FormControl>
                          <Input
                            type="date"
                            className="
                              pl-12 pr-4 h-12
                              focus-visible:ring-0
                              focus-visible:ring-offset-0
                              shadow-none
                              appearance-none
                              [&::-webkit-calendar-picker-indicator]:opacity-0
                              [&::-webkit-calendar-picker-indicator]:absolute
                              [&::-webkit-calendar-picker-indicator]:inset-0
                              [&::-webkit-calendar-picker-indicator]:w-full
                              [&::-webkit-calendar-picker-indicator]:h-full
                              [&::-webkit-calendar-picker-indicator]:cursor-pointer
                            "
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
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />

                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Number of guests"
                            className="
                              pl-12 h-12
                              focus-visible:ring-0
                              focus-visible:ring-offset-0
                              shadow-none
                            "
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
                        
                        <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-20" />

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="
                                pl-12 h-12
                                focus:ring-0
                                focus:ring-offset-0
                                shadow-none
                              "
                            >
                              <SelectValue placeholder="Select tour package" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {packages?.map((pkg) => (
                              <SelectItem
                                key={pkg.key}
                                value={pkg.name}
                              >
                                {pkg.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
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

      {/* Success Modal */}
      <Dialog
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
      >
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
                Thank you for choosing us for your Sundarban journey.
                Our travel expert will contact you shortly.
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