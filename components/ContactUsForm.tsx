"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageCircle, Send, Loader2 } from "lucide-react";

import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { sendContactInquiry } from "@/app/actions/sendmail.action";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (val) => {
        const allowedDomains = [
          "gmail.com",
          "outlook.com",
          "hotmail.com",
          "yahoo.com",
          "icloud.com",
          "live.com",
        ];
        const domain = val.split("@")[1]?.toLowerCase();
        return allowedDomains.includes(domain);
      },
      {
        message: "Please use a standard provider (Gmail, Outlook, Yahoo, etc.)",
      },
    ),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject is too long"),
  message: z
    .string()
    .min(20, "Please provide more detail (minimum 20 characters)")
    .max(1000, "Message is too long"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactUsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    const response = await sendContactInquiry(data);

    if (response.success) {
      toast({
        title: "Message Sent Successfully!",
        description: "Our team will get back to you within 24 hours.",
      });
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Please try again later.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div
      data-aos="fade-right"
      className="lg:col-span-3 bg-card rounded-3xl p-8 md:p-10 shadow-elevated"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Send Us a Message
          </h2>
          <p className="text-muted-foreground text-sm">
            We'll respond as quickly as possible
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name *</label>
            <Input
              {...register("name")}
              placeholder="Enter your name"
              className={`h-12 ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address *</label>
            <Input
              {...register("email")}
              type="email"
              placeholder="your@gmail.com"
              className={`h-12 ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number *</label>
            <Input
              {...register("phone")}
              placeholder="9876543210"
              className={`h-12 ${errors.phone ? "border-destructive" : ""}`}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject *</label>
            <Input
              {...register("subject")}
              placeholder="What's this about?"
              className={`h-12 ${errors.subject ? "border-destructive" : ""}`}
            />
            {errors.subject && (
              <p className="text-xs text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Message *</label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your travel plans..."
            rows={6}
            className={`resize-none ${errors.message ? "border-destructive" : ""}`}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Send className="w-5 h-5 mr-2" />
          )}
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactUsForm;
