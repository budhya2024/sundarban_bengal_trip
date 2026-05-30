"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  Loader2,
  Send,
  Calendar as CalendarIcon,
  Users,
  User,
  Mail,
  Phone,
} from "lucide-react";

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

  const onSubmit = (values: BookingValues) => {
    startTransition(async () => {
      const res = await createBooking(values);

      if (res.success) {
        toast({
          title: "Booking Inquiry Sent",
          description: "Our travel expert will contact you shortly.",
        });

        form.reset();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size="lg" className={triggerClassName}>
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 border-none">
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
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

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
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

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
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

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
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />

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
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

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
                w-full h-12 rounded-sm text-base font-semibold
                bg-primary hover:bg-primary/90
                transition-all duration-300
              "
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-1" />
                  Confirm Booking 
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
