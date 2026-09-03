'use client'

import React from 'react'
import Link from 'next/link'
import Card from '@/components/cards/Card'

export default function DisclaimerPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-espresso text-cream py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-h1 font-serif font-semibold mb-4">Disclaimer</h1>
          <p className="text-body text-cream opacity-90">Last Updated: December 1, 2025</p>
          <p className="text-body text-cream opacity-90 mt-4 max-w-3xl mx-auto">
            Please read this Disclaimer carefully before using JMG Nest (the &quot;Website&quot;).
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-3 xl:col-span-2">
              <Card variant="elevated" className="sticky top-24">
                <h2 className="text-h4 font-serif font-semibold text-forest-green mb-4">Contents</h2>
                <nav className="space-y-2">
                  {[
                    { id: 'general-disclaimer', label: '1. General Disclaimer' },
                    { id: 'no-professional-advice', label: '2. No Professional Advice' },
                    { id: 'content-accuracy', label: '3. Content Accuracy' },
                    { id: 'personal-responsibility', label: '4. Personal Responsibility' },
                    { id: 'third-party-content', label: '5. Third-Party Content' },
                    { id: 'affiliate-disclosure', label: '6. Affiliate Links' },
                    { id: 'sponsored-content', label: '7. Sponsored Content' },
                    { id: 'testimonials', label: '8. Testimonials' },
                    { id: 'errors-omissions', label: '9. Errors & Omissions' },
                    { id: 'website-availability', label: '10. Website Availability' },
                    { id: 'limitation', label: '11. Limitation of Liability' },
                    { id: 'changes', label: '12. Changes to Disclaimer' },
                    { id: 'contact', label: '13. Contact Us' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block text-left text-sm text-text-secondary hover:text-warm-gold transition-colors w-full text-start"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 xl:col-span-10">
              <Card variant="elevated" className="prose max-w-none">
                <section id="general-disclaimer" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>
                        THE INFORMATION ON THIS WEBSITE IS PROVIDED ON AN &quot;AS IS&quot; BASIS. TO THE FULLEST EXTENT
                        PERMITTED BY LAW, JMG NEST DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED.
                      </strong>
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">1. General Disclaimer</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    The content on JMG Nest is provided for general information purposes only. While we strive to provide
                    accurate and up-to-date information, we make no representations or warranties of any kind, express or
                    implied, about the completeness, accuracy, reliability, suitability, or availability of the
                    information, products, services, or related graphics contained on the Website.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Any reliance you place on such information is strictly at your own risk. We will not be liable for any
                    loss or damage, including without limitation, indirect or consequential loss or damage, arising from
                    your use of or reliance on information contained on this Website.
                  </p>
                </section>

                <section id="no-professional-advice" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">2. No Professional Advice</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    The content on this Website is not intended to be a substitute for professional advice, diagnosis, or
                    treatment. Always seek the advice of qualified professionals with any questions you may have regarding:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>
                      <strong>Legal Matters:</strong> Consult with a licensed attorney for legal advice
                    </li>
                    <li>
                      <strong>Medical or Health Issues:</strong> Consult with a qualified healthcare professional for medical advice
                    </li>
                    <li>
                      <strong>Financial Matters:</strong> Consult with a certified financial advisor or accountant for financial advice
                    </li>
                    <li>
                      <strong>Tax Matters:</strong> Consult with a qualified tax professional for tax advice
                    </li>
                    <li>
                      <strong>Business Matters:</strong> Consult with a qualified business advisor for business advice
                    </li>
                  </ul>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Never disregard professional advice or delay seeking it because of something you have read on this Website.
                  </p>
                </section>

                <section id="content-accuracy" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">3. Content Accuracy and Completeness</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    While we make every effort to ensure the accuracy and completeness of the information on this Website, we cannot
                    guarantee that all information is current, accurate, or complete. Information may become outdated, and we are not
                    obligated to update it.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We reserve the right to modify, update, or remove content at any time without notice. You should verify any information
                    before relying on it, especially for important decisions.
                  </p>
                </section>

                <section id="personal-responsibility" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">4. Personal Responsibility</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You acknowledge that you are using the Website and its content at your own risk. You are solely responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>Evaluating the accuracy, completeness, and usefulness of any information on the Website</li>
                    <li>Making your own informed decisions based on the information provided</li>
                    <li>Seeking professional advice when appropriate</li>
                    <li>Verifying any information before taking action</li>
                    <li>Using the information in a manner that complies with applicable laws and regulations</li>
                  </ul>
                </section>

                <section id="third-party-content" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">5. Third-Party Content and Links</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    This Website may contain links to third-party websites, products, or services. We do not endorse, control, or assume
                    responsibility for the content, privacy policies, or practices of third-party websites, or for the accuracy, reliability,
                    or quality of third-party products or services.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We encourage you to review the terms of service and privacy policies of any third-party websites you visit. Your interactions
                    with third parties are solely between you and the third party.
                  </p>
                </section>

                <section id="affiliate-disclosure" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>Affiliate Disclosure:</strong> JMG Nest may contain affiliate links. This means that if you click on an affiliate link
                      and make a purchase, we may receive a commission at no additional cost to you.
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">6. Affiliate Links Disclosure</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We participate in various affiliate marketing programs, which means we may earn commissions on purchases made through our links to
                    retailer sites. Affiliate links are clearly marked or disclosed when present.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Important Points:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>We only recommend products or services that we believe are valuable and relevant to our readers</li>
                    <li>Our editorial content is not influenced by affiliate relationships</li>
                    <li>Affiliate relationships do not affect the price you pay for products or services</li>
                    <li>We are not responsible for the quality, accuracy, or delivery of products or services purchased through affiliate links</li>
                  </ul>
                </section>

                <section id="sponsored-content" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">7. Sponsored Content</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    This Website may contain sponsored content, which is content that has been paid for by advertisers or sponsors. Sponsored content
                    will be clearly disclosed as such.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Even when content is sponsored, we strive to provide honest and accurate information. However, you should evaluate sponsored content
                    critically and make your own informed decisions.
                  </p>
                </section>

                <section id="testimonials" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">8. Testimonials and Reviews</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    This Website may contain testimonials, reviews, or case studies from users, customers, or clients. These testimonials reflect the real
                    experiences and opinions of the individuals who provided them.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Please note:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>Testimonials are individual experiences and results may vary</li>
                    <li>Testimonials are not necessarily representative of all users' experiences</li>
                    <li>We do not guarantee that you will achieve similar results</li>
                    <li>Testimonials may be edited for length, clarity, or grammar</li>
                  </ul>
                </section>

                <section id="errors-omissions" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">9. Errors and Omissions</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Despite our best efforts to ensure accuracy, errors and omissions may occur on this Website. We are not responsible for typographical
                    errors, inaccuracies, or omissions in content, errors in pricing, availability, or product information, or outdated or incorrect
                    information.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
                  </p>
                </section>

                <section id="website-availability" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">10. Website Availability</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We strive to keep this Website available and accessible, but we do not guarantee that the Website will be available at all times, free from
                    interruptions, errors, or technical issues, or secure and free from viruses or other harmful components.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We reserve the right to modify, suspend, or discontinue the Website at any time without notice.
                  </p>
                </section>

                <section id="limitation" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>
                        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, JMG NEST SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                        CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                      </strong>
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">11. Limitation of Liability</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Our total liability to you for all claims arising out of or relating to your use of the Website shall not exceed the amount you paid to us,
                    if any, in the twelve (12) months preceding the event giving rise to the claim, or $100, whichever is greater.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitations may not
                    apply to you.
                  </p>
                </section>

                <section id="changes" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">12. Changes to Disclaimer</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We may update this Disclaimer from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will
                    notify you of any material changes by posting the updated Disclaimer on this page and updating the &quot;Last Updated&quot; date.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Your continued use of the Website after any changes constitutes your acceptance of the updated Disclaimer.
                  </p>
                </section>

                <section id="contact" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 p-6 rounded-lg">
                    <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">13. Contact Information</h2>
                    <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                      If you have any questions about this Disclaimer, please contact us:
                    </p>
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>JMG Nest</strong>
                      <br />
                      Email:{' '}
                      <a href="mailto:info@jmgnest.com" className="text-warm-gold hover:underline">
                        info@jmgnest.com
                      </a>
                    </p>
                    <p className="text-body text-text-primary font-sans leading-relaxed mt-4">
                      For more information, please review our{' '}
                      <Link href="/terms-of-service" className="text-warm-gold hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy-policy" className="text-warm-gold hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </section>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


