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
import { Button } from "@/components/ui/button";
import { Loader2, Send, Calendar as CalendarIcon, Users } from "lucide-react";
import { BookingSchema, BookingValues } from "@/schemas/booking.schema";

import { useToast } from "@/hooks/use-toast";
import { createBooking } from "@/app/actions/home.actions";

export const BookingModal = ({ packageName }: { packageName: string }) => {
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
          description: "We'll check availability for your dates!",
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
        <Button variant="hero" size="xl" className="w-full mb-4">
          Book This Package
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-emerald-900">
            Secure Your Slot
          </DialogTitle>
          <DialogDescription>
            Requesting a booking for:{" "}
            <span className="font-bold text-emerald-700">{packageName}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-slate-500">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-slate-500">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="jhon.doe@example.com" {...field} />
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
                    <FormLabel className="text-xs font-bold uppercase text-slate-500">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-slate-500">
                      Travel Date
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="date" {...field} className="pl-10" />
                        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
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
                    <FormLabel className="text-xs font-bold uppercase text-slate-500">
                      No. of Guests
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          className="pl-10"
                        />
                        <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-700 hover:bg-emerald-800 h-12 rounded-xl text-lg font-bold transition-all shadow-md"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              {isPending ? "Submitting..." : "Confirm Booking Inquiry"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
