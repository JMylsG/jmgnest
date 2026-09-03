'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQItem[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (faqs.length === 0) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className={`
              bg-white rounded-xl overflow-hidden transition-all duration-300
              ${isOpen 
                ? 'border-2 border-warm-gold shadow-lg' 
                : 'border-2 border-transparent hover:border-warm-gold shadow-sm hover:shadow-md'
              }
              focus-within:ring-2 focus-within:ring-warm-gold focus-within:ring-offset-2
            `}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-5 md:p-6 flex items-start justify-between gap-4 text-left group focus:outline-none"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              aria-label={`${isOpen ? 'Collapse' : 'Expand'} question: ${faq.question}`}
            >
              {/* Question */}
              <h3 
                id={`faq-question-${index}`}
                className={`
                  font-sans font-semibold text-base md:text-lg flex-1 transition-colors
                  ${isOpen ? 'text-warm-gold' : 'text-forest-green group-hover:text-warm-gold'}
                `}
              >
                {faq.question}
              </h3>

              {/* Icon */}
              <div 
                className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${isOpen 
                    ? 'bg-warm-gold bg-opacity-10' 
                    : 'bg-forest-green bg-opacity-5 group-hover:bg-warm-gold group-hover:bg-opacity-10'
                  }
                `}
              >
                <ChevronDown 
                  className={`
                    w-5 h-5 transition-all duration-300
                    ${isOpen 
                      ? 'text-warm-gold rotate-180' 
                      : 'text-forest-green group-hover:text-warm-gold'
                    }
                  `}
                />
              </div>
            </button>

            {/* Answer */}
            <div
              id={`faq-answer-${index}`}
              className={`
                grid transition-all duration-300 ease-out
                ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
              `}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

