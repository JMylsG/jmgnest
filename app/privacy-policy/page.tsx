'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Card from '@/components/cards/Card'

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-forest-green text-cream py-16 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-h1 font-serif font-semibold mb-4">Privacy Policy</h1>
          <p className="text-body text-cream opacity-90">Last Updated: December 1, 2025</p>
          <p className="text-body text-cream opacity-90 mt-4 max-w-3xl mx-auto">
            This Privacy Policy describes how JMG Nest collects, uses, and shares your personal information when you visit our website.
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
                    { id: 'introduction', label: '1. Introduction' },
                    { id: 'information-we-collect', label: '2. Information We Collect' },
                    { id: 'how-we-use', label: '3. How We Use Information' },
                    { id: 'cookies', label: '4. Cookies & Tracking' },
                    { id: 'google-adsense', label: '5. Google AdSense' },
                    { id: 'google-analytics', label: '6. Google Analytics' },
                    { id: 'third-party', label: '7. Third-Party Services' },
                    { id: 'data-sharing', label: '8. Data Sharing' },
                    { id: 'data-security', label: '9. Data Security' },
                    { id: 'your-rights', label: '10. Your Rights' },
                    { id: 'children', label: "11. Children's Privacy" },
                    { id: 'changes', label: '12. Changes to Policy' },
                    { id: 'contact', label: '13. Contact Us' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block text-left text-sm transition-colors w-full text-start ${
                        activeSection === item.id
                          ? 'text-forest-green font-medium'
                          : 'text-text-secondary hover:text-warm-gold'
                      }`}
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
                <section id="introduction" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">1. Introduction</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Welcome to JMG Nest (the &quot;Website&quot;). We are committed to protecting your privacy and ensuring you have a positive
                    experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                    you visit our website.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Website.
                  </p>
                </section>

                <section id="information-we-collect" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">2. Information We Collect</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We collect information that you provide directly to us and information that is automatically collected when you visit our Website.
                  </p>
                  <h3 className="text-h4 font-serif font-semibold text-forest-green mb-3 mt-6">2.1 Information You Provide to Us</h3>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We may collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>Contact Information:</strong> Name, email address, and mailing address when you contact us or subscribe to our newsletter</li>
                    <li><strong>Account Information:</strong> Username, password, and profile information if you create an account</li>
                    <li><strong>Communication Data:</strong> Information you provide when you contact us, leave comments, or interact with our content</li>
                    <li><strong>Payment Information:</strong> If you make purchases through our Website, we may collect billing information (processed securely through third-party payment processors)</li>
                  </ul>
                  <h3 className="text-h4 font-serif font-semibold text-forest-green mb-3 mt-6">2.2 Automatically Collected Information</h3>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    When you visit our Website, we automatically collect certain information about your device and browsing activities, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent on pages, clickstream data, referring website addresses</li>
                    <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> Information collected through cookies, web beacons, and similar technologies</li>
                  </ul>
                </section>

                <section id="how-we-use" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">3. How We Use Your Information</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>To provide, maintain, and improve our Website and services</li>
                    <li>To process transactions and send related information, including confirmations and invoices</li>
                    <li>To send you technical notices, updates, security alerts, and support messages</li>
                    <li>To respond to your comments, questions, and requests</li>
                    <li>To send you newsletters, marketing communications, and other information that may be of interest to you (you may opt out at any time)</li>
                    <li>To monitor and analyze trends, usage, and activities in connection with our Website</li>
                    <li>To detect, prevent, and address technical issues and security threats</li>
                    <li>To personalize your experience and deliver content and product offerings relevant to your interests</li>
                    <li>To comply with legal obligations and enforce our terms and conditions</li>
                  </ul>
                </section>

                <section id="cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">4. Cookies and Tracking Technologies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We use cookies, web beacons, and similar tracking technologies to collect and store information about your interactions with our Website. Cookies are small data files stored on your device that help us improve your experience.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    For more information about cookies and how to manage them, please visit our{' '}
                    <Link href="/cookie-policy" className="text-warm-gold hover:underline">Cookie Policy</Link>.
                  </p>
                </section>

                <section id="google-adsense" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>Advertising Disclosure:</strong> We use Google AdSense to display advertisements on our Website. Google AdSense uses cookies and other tracking technologies to serve personalized ads based on your interests and browsing history.
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">5. Google AdSense</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Google AdSense is an advertising service provided by Google LLC that allows us to display third-party advertisements on our Website. When you visit our Website, Google AdSense may place cookies on your device to track your browsing behavior and show you personalized advertisements.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You can opt out of personalized advertising by visiting{' '}
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google&apos;s Ad Settings</a>{' '}
                    or by visiting the{' '}
                    <a href="https://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Network Advertising Initiative&apos;s opt-out page</a>.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    For more information about how Google uses your data, please review{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google&apos;s Privacy Policy</a>.
                  </p>
                </section>

                <section id="google-analytics" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">6. Google Analytics</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We use Google Analytics, a web analytics service provided by Google LLC, to analyze how visitors use our Website. Google Analytics uses cookies and other tracking technologies to collect information about your use of our Website.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You can opt out of Google Analytics tracking by installing the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google Analytics Opt-out Browser Add-on</a>.
                  </p>
                </section>

                <section id="third-party" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">7. Third-Party Services</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Our Website may contain links to third-party websites, services, or applications that are not owned or controlled by us. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you access.
                  </p>
                </section>

                <section id="data-sharing" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">8. Data Sharing and Disclosure</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>Service Providers:</strong> With third-party service providers who perform services on our behalf</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                    <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users or others</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>With Your Consent:</strong> When you have given us explicit consent to share your information</li>
                  </ul>
                </section>

                <section id="data-security" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">9. Data Security</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section id="your-rights" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">10. Your Rights</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding your personal information, including:
                  </p>
                  <h3 className="text-h4 font-serif font-semibold text-forest-green mb-3 mt-6">10.1 GDPR Rights (EU Residents)</h3>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    If you are located in the European Economic Area (EEA) or United Kingdom, you have rights under the General Data Protection Regulation (GDPR), including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>Right of Access - Request access to your personal data</li>
                    <li>Right to Rectification - Request correction of inaccurate data</li>
                    <li>Right to Erasure - Request deletion of your personal data</li>
                    <li>Right to Restrict Processing - Request restriction of processing</li>
                    <li>Right to Data Portability - Receive your data in a portable format</li>
                    <li>Right to Object - Object to processing of your personal data</li>
                    <li>Right to Withdraw Consent - Withdraw consent at any time</li>
                  </ul>
                  <h3 className="text-h4 font-serif font-semibold text-forest-green mb-3 mt-6">10.2 CCPA Rights (California Residents)</h3>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including the right to know, the right to delete, and the right to opt-out of the sale of personal information.
                  </p>
                </section>

                <section id="children" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">11. Children&apos;s Privacy</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Our Website is not intended for children under the age of 13 (or 16 in the EEA). We do not knowingly collect personal information from children under 13 (or 16 in the EEA). If we become aware that we have collected personal information from a child under 13 (or 16 in the EEA), we will take steps to delete such information promptly.
                  </p>
                </section>

                <section id="changes" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">12. Changes to This Privacy Policy</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                  </p>
                </section>

                <section id="contact" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 p-6 rounded-lg">
                    <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">13. Contact Us</h2>
                    <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
                      For GDPR-related inquiries, you may also contact your local data protection authority.
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


