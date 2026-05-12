import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="bg-brand-charcoal command-border overflow-hidden rounded-2xl">
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-answer-${index}`}
            className="w-full p-6 text-left flex items-center justify-between group focus:outline-none focus:bg-white/5"
          >
            <span className="text-sm uppercase tracking-wider text-white group-hover:text-brand-blue transition-colors">
              {item.question}
            </span>
            <ChevronDown 
              className={`w-5 h-5 text-brand-blue transition-transform duration-500 ease-in-out ${
                activeIndex === index ? "rotate-180" : ""
              }`} 
            />
          </button>
          
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                initial={{ height: 0, opacity: 0, scale: 0.98, y: -4 }}
                animate={{ height: "auto", opacity: 1, scale: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, scale: 0.98, y: -4 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-6 pb-6 text-white/70 leading-relaxed text-sm border-t border-white/5 pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
