"use client";

import React, { useTransition, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Loader2 } from "lucide-react";
import { subscribeAction } from "@/app/actions/newsletter.actions";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await subscribeAction(formData);

      if (result.success) {
        toast({ title: "Success", description: result.message });
        formRef.current?.reset();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div
      className="bg-primary rounded-2xl p-6 shadow-soft"
      data-aos="fade-left"
      data-aos-delay="300"
    >
      <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">
        Newsletter
      </h3>
      <p className="text-primary-foreground/80 text-sm mb-4">
        Subscribe to get the latest travel tips and tour updates.
      </p>

      <form ref={formRef} action={handleAction} className="space-y-3">
        <Input
          name="email"
          type="email"
          required
          placeholder="Your email address"
          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
        />
        <Button variant="hero" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Send className="w-4 h-4 mr-2" />
          )}
          {isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default Newsletter;
