'use client'

import React from 'react'
import Link from 'next/link'
import Card from '@/components/cards/Card'

export default function CookiePolicyPage() {
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
          <h1 className="text-h1 font-serif font-semibold mb-4">Cookie Policy</h1>
          <p className="text-body text-cream opacity-90">Last Updated: December 1, 2025</p>
          <p className="text-body text-cream opacity-90 mt-4 max-w-3xl mx-auto">
            This Cookie Policy explains how JMG Nest uses cookies and similar tracking technologies when you visit our website.
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
                    { id: 'what-are-cookies', label: '1. What Are Cookies?' },
                    { id: 'how-we-use', label: '2. How We Use Cookies' },
                    { id: 'types-of-cookies', label: '3. Types of Cookies' },
                    { id: 'essential-cookies', label: '4. Essential Cookies' },
                    { id: 'analytics-cookies', label: '5. Analytics Cookies' },
                    { id: 'advertising-cookies', label: '6. Advertising Cookies' },
                    { id: 'functionality-cookies', label: '7. Functionality Cookies' },
                    { id: 'third-party-cookies', label: '8. Third-Party Cookies' },
                    { id: 'google-adsense', label: '9. Google AdSense' },
                    { id: 'google-analytics', label: '10. Google Analytics' },
                    { id: 'managing-cookies', label: '11. Managing Cookies' },
                    { id: 'browser-settings', label: '12. Browser Settings' },
                    { id: 'opt-out', label: '13. Opt-Out Links' },
                    { id: 'cookie-duration', label: '14. Cookie Duration' },
                    { id: 'changes', label: '15. Updates' },
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
                <section id="what-are-cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">1. What Are Cookies?</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work more efficiently and to provide information to website owners.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps improve your browsing experience and allows websites to provide personalized content and advertisements.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Cookies can be:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
                    <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you delete them</li>
                    <li><strong>First-Party Cookies:</strong> Cookies set by the website you are visiting</li>
                    <li><strong>Third-Party Cookies:</strong> Cookies set by other websites or services (like advertising networks)</li>
                  </ul>
                </section>

                <section id="how-we-use" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">2. How We Use Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We use cookies and similar tracking technologies for the following purposes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li>To enable essential website functionality</li>
                    <li>To analyze how visitors use our website</li>
                    <li>To display personalized advertisements</li>
                    <li>To remember your preferences and settings</li>
                    <li>To improve website performance and user experience</li>
                    <li>To measure the effectiveness of our content and marketing</li>
                  </ul>
                </section>

                <section id="types-of-cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">3. Types of Cookies We Use</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We use the following categories of cookies on our website:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                    <li><strong>Advertising Cookies:</strong> Used to deliver personalized advertisements</li>
                    <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  </ul>
                </section>

                <section id="essential-cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">4. Essential Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Essential cookies are necessary for the website to function properly. These cookies enable core functionality such as security, network management, and accessibility. You cannot opt out of essential cookies, as they are required for the website to work.
                  </p>
                </section>

                <section id="analytics-cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">5. Analytics Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. These cookies allow us to count visits, track traffic sources, and understand which pages are most popular.
                  </p>
                </section>

                <section id="advertising-cookies" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>Advertising Disclosure:</strong> We use advertising cookies to deliver personalized advertisements based on your interests and browsing history. These cookies are used by advertising networks like Google AdSense to show you relevant ads.
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">6. Advertising Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Advertising cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same advertisement from continuously reappearing and helping us measure the effectiveness of advertising campaigns.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You can opt out of advertising cookies by adjusting your browser settings or using opt-out tools (see Section 13).
                  </p>
                </section>

                <section id="functionality-cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">7. Functionality Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Functionality cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, more personalized features.
                  </p>
                </section>

                <section id="third-party-cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">8. Third-Party Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements, and provide other services.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Third-Party Services We Use:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>Google AdSense:</strong> For advertising (see Section 9)</li>
                    <li><strong>Google Analytics:</strong> For website analytics (see Section 10)</li>
                    <li><strong>Social Media Platforms:</strong> For social sharing and login features</li>
                    <li><strong>Content Delivery Networks:</strong> For efficient content delivery</li>
                  </ul>
                </section>

                <section id="google-adsense" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 border-l-4 border-warm-gold p-4 mb-4">
                    <p className="text-body text-text-primary font-sans leading-relaxed">
                      <strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve personalized ads based on your interests and browsing history.
                    </p>
                  </div>
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">9. Google AdSense Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Google AdSense is an advertising service provided by Google LLC. When you visit our website, Google AdSense may place cookies on your device to track your browsing behavior, build a profile of your interests, show you personalized advertisements, and measure the effectiveness of advertisements.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Opt-Out:</strong> You can opt out of Google AdSense cookies by visiting{' '}
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google&apos;s Ad Settings</a> or by using the{' '}
                    <a href="https://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Network Advertising Initiative&apos;s opt-out page</a>.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    For more information about Google AdSense cookies, please review{' '}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google&apos;s Privacy Policy</a>.
                  </p>
                </section>

                <section id="google-analytics" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">10. Google Analytics Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We use Google Analytics, a web analytics service provided by Google LLC, to analyze how visitors use our website. Google Analytics uses cookies to collect information about your use of our website.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Google Analytics Cookies We Use:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>_ga:</strong> Used to distinguish users (expires after 2 years)</li>
                    <li><strong>_gid:</strong> Used to distinguish users (expires after 24 hours)</li>
                    <li><strong>_gat:</strong> Used to throttle request rate (expires after 1 minute)</li>
                  </ul>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Opt-Out:</strong> You can opt out of Google Analytics tracking by installing the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google Analytics Opt-out Browser Add-on</a>.
                  </p>
                </section>

                <section id="managing-cookies" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">11. How to Manage Cookies</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
                  </p>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Please note:</strong> If you choose to disable cookies, some features of our website may not function properly, and your user experience may be affected.
                  </p>
                </section>

                <section id="browser-settings" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">12. Browser Settings</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You can control cookies through your browser settings. Here are links to instructions for managing cookies in popular browsers:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Mozilla Firefox</a></li>
                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Microsoft Edge</a></li>
                  </ul>
                </section>

                <section id="opt-out" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">13. Opt-Out Links</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    You can opt out of personalized advertising and analytics tracking using the following tools:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google Ad Settings</a></li>
                    <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Google Analytics Opt-Out</a></li>
                    <li><a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Network Advertising Initiative</a></li>
                    <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-warm-gold hover:underline">Digital Advertising Alliance</a></li>
                  </ul>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    <strong>Please note:</strong> Opting out of personalized advertising does not mean you will not see advertisements. You will still see advertisements, but they may be less relevant to your interests.
                  </p>
                </section>

                <section id="cookie-duration" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">14. Cookie Duration</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    Cookies can be either session cookies or persistent cookies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-body text-text-primary font-sans">
                    <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
                    <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period (ranging from days to years) or until you delete them</li>
                  </ul>
                </section>

                <section id="changes" className="mb-12 scroll-mt-24">
                  <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">15. Updates to This Cookie Policy</h2>
                  <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Cookie Policy on this page and updating the &quot;Last Updated&quot; date.
                  </p>
                </section>

                <section id="contact" className="mb-12 scroll-mt-24">
                  <div className="bg-warm-sage bg-opacity-20 p-6 rounded-lg">
                    <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">16. Contact Us</h2>
                    <p className="text-body text-text-primary font-sans leading-relaxed mb-4">
                      If you have any questions about this Cookie Policy or our use of cookies, please contact us:
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
                      For more information about how we collect, use, and protect your personal information, please review our{' '}
                      <Link href="/privacy-policy" className="text-warm-gold hover:underline">Privacy Policy</Link>.
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


