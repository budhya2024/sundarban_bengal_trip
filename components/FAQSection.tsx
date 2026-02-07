"use client";

import { useEffect } from "react";
import AOS from "aos";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = ({
  data,
  loading,
}: {
  data: {
    question: string;
    answer: string;
  }[];
  loading: boolean;
}) => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-10 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Sundarbans tours, travel
            tips, and what to expect during your adventure.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
          className="max-w-3xl mx-auto"
        >
          {loading ? (
            <FAQSkeleton />
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {data.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-6 border border-border shadow-soft"
                >
                  <AccordionTrigger className="text-left font-display text-lg font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export const FAQSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-card rounded-xl px-6 border border-border shadow-soft animate-pulse"
        >
          <div className="flex items-center justify-between py-6">
            {/* Question Line Placeholder */}
            <div className="h-4 w-3/4 bg-slate-200 rounded" />

            {/* Arrow Icon Placeholder */}
            <div className="h-4 w-4 bg-slate-100 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
