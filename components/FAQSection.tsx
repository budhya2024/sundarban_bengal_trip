"use client";

import { useEffect } from "react";
import AOS from "aos";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the best time to visit Sundarbans?",
    answer:
      "The best time to visit Sundarbans is from October to March when the weather is pleasant and wildlife sightings are more frequent. During this period, migratory birds also arrive, making it ideal for bird watching.",
  },
  {
    question: "Is it safe to visit Sundarbans?",
    answer:
      "Yes, visiting Sundarbans is safe when you travel with experienced guides and follow safety protocols. Our tours are conducted with trained naturalists who ensure all safety measures are in place during boat safaris and jungle walks.",
  },
  {
    question: "What should I pack for a Sundarbans trip?",
    answer:
      "We recommend packing light cotton clothes, comfortable walking shoes, sunscreen, insect repellent, a hat, sunglasses, binoculars for wildlife spotting, and a camera. During winter months, carry light woolens for early morning safaris.",
  },
  {
    question: "Will I definitely see a Royal Bengal Tiger?",
    answer:
      "Tiger sightings cannot be guaranteed as they are wild animals. However, Sundarbans has one of the highest tiger populations, and our experienced guides take you to the best spots to maximize your chances of spotting one.",
  },
  {
    question: "How do I reach Sundarbans from Kolkata?",
    answer:
      "The most common route is from Kolkata to Godkhali (approximately 4 hours by road), from where you take a boat into the Sundarbans. All our tour packages include comfortable pick-up and drop from Kolkata.",
  },
  {
    question: "Are meals included in the tour packages?",
    answer:
      "Yes, all our packages include traditional Bengali meals prepared with fresh local ingredients. We cater to vegetarian requirements as well. Meals are served on the houseboat or at our forest camps.",
  },
  {
    question: "What types of accommodations are available?",
    answer:
      "We offer a range of accommodations from comfortable houseboats to forest lodges and premium eco-resorts. Our Premium Safari package features luxury houseboat stays with private cabins and attached bathrooms.",
  },
  {
    question: "Can I customize my tour itinerary?",
    answer:
      "Absolutely! We offer customized tour packages based on your interests, whether it's wildlife photography, bird watching, or cultural immersion. Contact our team to design your perfect Sundarbans adventure.",
  },
];

export const FAQSection = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-center mb-16"
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
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
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
        </div>
      </div>
    </section>
  );
};
