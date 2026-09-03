'use client'

import React from 'react'
import Link from 'next/link'
import Card from '@/components/cards/Card'

export default function TermsOfServicePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-forest-green text-cream py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-h1 font-serif font-semibold mb-4">Terms of Service</h1>
          <p className="text-body text-cream opacity-90">Last Updated: December 1, 2025</p>
          <p className="text-body text-cream opacity-90 mt-4 max-w-3xl mx-auto">
            Please read these Terms of Service carefully before using JMG Nest (the &quot;Website&quot;).
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
                    { id: 'acceptance', label: '1. Acceptance of Terms' },
                    { id: 'description', label: '2. Description of Service' },
                    { id: 'user-accounts', label: '3. User Accounts' },
                    { id: 'user-responsibilities', label: '4. User Responsibilities' },
                    { id: 'acceptable-use', label: '5. Acceptable Use' },
                    { id: 'intellectual-property', label: '6. Intellectual Property' },
                    { id: 'user-content', label: '7. User-Generated Content' },
                    { id: 'third-party', label: '8. Third-Party Links' },
                    { id: 'advertising', label: '9. Advertising' },
                    { id: 'disclaimers', label: '10. Disclaimers' },
                    { id: 'limitation', label: '11. Limitation of Liability' },
                    { id: 'indemnification', label: '12. Indemnification' },
                    { id: 'termination', label: '13. Termination' },
                    { id: 'governing-law', label: '14. Governing Law' },
                    { id: 'changes', label: '15. Changes to Terms' },
                    { id: 'contact', label: '16. Contact Us' },
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
                <section id="acceptance" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">1. Acceptance of Terms</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    By accessing or using JMG Nest (the &quot;Website&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;).
                    If you do not agree to these Terms, you may not access or use the Website.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    These Terms constitute a legally binding agreement between you and JMG Nest. Your use of the Website is also governed by our{' '}
                    <Link href="/privacy-policy" className="text-warm-gold hover:underline">Privacy Policy</Link> and{' '}
                    <Link href="/cookie-policy" className="text-warm-gold hover:underline">Cookie Policy</Link>, which are incorporated into these Terms by reference.
                  </p>
                </section>

                <section id="description" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">2. Description of Service</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    JMG Nest is a website that provides information about our property, booking services, and related content to users.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We reserve the right to modify, suspend, or discontinue any aspect of the Website at any time, with or without notice. We do not guarantee that
                    the Website will be available at all times or that it will be free from errors, interruptions, or security issues.
                  </p>
                </section>

                <section id="user-accounts" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">3. User Accounts</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Some features of the Website may require you to create an account. When you create an account, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Accept responsibility for all activities that occur under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </section>

                <section id="user-responsibilities" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">4. User Responsibilities</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You are responsible for maintaining the confidentiality of your account credentials, all activities that occur under your account, and ensuring that
                    your use of the Website complies with all applicable laws and regulations.
                  </p>
                </section>

                <section id="acceptable-use" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">5. Acceptable Use Policy</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You agree to use the Website only for lawful purposes and in accordance with these Terms. You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>Use the Website in any way that violates any applicable local, state, national, or international law or regulation</li>
                    <li>Transmit any material that is defamatory, obscene, abusive, harassing, threatening, or otherwise objectionable</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation</li>
                    <li>Interfere with or disrupt the Website or servers or networks connected to the Website</li>
                    <li>Attempt to gain unauthorized access to any portion of the Website</li>
                    <li>Use any robot, spider, scraper, or other automated means to access the Website without our express written permission</li>
                    <li>Transmit any viruses, malware, or other harmful code</li>
                  </ul>
                </section>

                <section id="intellectual-property" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">6. Intellectual Property Rights</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    The Website and its original content, features, and functionality are owned by JMG Nest and are protected by international copyright, trademark,
                    patent, trade secret, and other intellectual property laws.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Website for personal, non-commercial purposes, subject
                    to these Terms.
                  </p>
                </section>

                <section id="user-content" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">7. User-Generated Content</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    If you post, upload, or submit content to the Website, you grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable
                    right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in any media.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You represent and warrant that you own or have the necessary rights to grant the license described above and that your content does not violate any third-party rights.
                  </p>
                </section>

                <section id="third-party" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">8. Third-Party Links and Content</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    The Website may contain links to third-party websites, services, or resources that are not owned or controlled by us. We have no control over, and assume no responsibility
                    for, the content, privacy policies, or practices of any third-party websites or services.
                  </p>
                </section>

                <section id="advertising" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">9. Advertising and Sponsored Content</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    The Website may display advertisements from third parties, including Google AdSense. We are not responsible for the content of advertisements or for any products or services
                    offered by advertisers.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Some content on the Website may be sponsored or contain affiliate links. We will disclose when content is sponsored or contains affiliate links.
                  </p>
                </section>

                <section id="disclaimers" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>THE WEBSITE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">10. Disclaimers</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular
                    purpose, and non-infringement.
                  </p>
                </section>

                <section id="limitation" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</strong>
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">11. Limitation of Liability</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Our total liability to you for all claims arising out of or relating to your use of the Website shall not exceed the amount you paid to us, if any, in the twelve (12) months
                    preceding the event giving rise to the claim, or $100, whichever is greater.
                  </p>
                </section>

                <section id="indemnification" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">12. Indemnification</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You agree to indemnify, defend, and hold harmless JMG Nest, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages,
                    losses, costs, expenses, or fees arising out of or relating to your use of the Website or your violation of these Terms.
                  </p>
                </section>

                <section id="termination" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">13. Termination</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason, including but not limited to your breach of these Terms.
                  </p>
                </section>

                <section id="governing-law" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">14. Governing Law and Jurisdiction</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of the Philippines, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You agree to submit to the exclusive jurisdiction of the courts located in the Philippines for the resolution of any disputes arising out of or relating to these Terms or your use of
                    the Website.
                  </p>
                </section>

                <section id="changes" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">15. Changes to Terms</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this page and updating the &quot;Last Updated&quot; date.
                    Your continued use of the Website after any changes constitutes your acceptance of the updated Terms.
                  </p>
                </section>

                <section id="contact" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 p-6 rounded-lg">
                    <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">16. Contact Information</h2>
                    <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>JMG Nest</strong>
                      <br />
                      Email:{' '}
                      <a href="mailto:info@jmgnest.com" className="text-warm-gold hover:underline">
                        info@jmgnest.com
                      </a>
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


