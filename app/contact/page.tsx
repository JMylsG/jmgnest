import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ContactForm from '@/components/forms/ContactForm'
import Card from '@/components/cards/Card'
import { Mail, MapPin, Facebook } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with JMG Nest. Contact us for inquiries, booking assistance, or any questions about your stay.',
}

export default async function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@jmgnest.com',
      href: 'mailto:info@jmgnest.com',
    },
    {
      icon: Facebook,
      title: 'Facebook Messenger',
      content: 'Message us directly',
      href: 'https://m.me/61571078790065',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Baguio City, Philippines',
      href: null,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Hero
        eyebrow="Contact"
        title="Say hello, we'll take it from here"
        subtitle="We're here to help with any questions"
        ctaText=""
        imageUrl="https://res.cloudinary.com/jmg-nest/image/upload/v1763355667/Balcony_View_wdbvpd.jpg"
        imageAlt="Contact JMG Nest"
      />

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <Card variant="elevated">
                <h2 className="heading-h2 mb-6">Send Us a Message</h2>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="heading-h2 mb-6">Get in Touch</h2>
                <p className="text-body text-text-secondary mb-8">
                  Have questions about your stay or need assistance with booking? We're here to help! 
                  Reach out to us through any of the following methods.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <Card key={index} variant="standard">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-accent/10 rounded-lg">
                          <Icon className="w-6 h-6 text-green-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="heading-h3 mb-2">{info.title}</h3>
                          {info.href ? (
                            <a
                              href={info.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-body text-warm-gold hover:underline"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-body text-text-secondary">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* FAQ Section */}
              <Card variant="elevated" className="mt-8">
                <h3 className="heading-h3 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-body font-semibold text-forest-green mb-2">
                      What are your check-in and check-out times?
                    </h4>
                    <p className="text-body text-text-secondary">
                      Check-in is at 3:00 PM and check-out is at 11:00 AM.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-forest-green mb-2">
                      Is parking available?
                    </h4>
                    <p className="text-body text-text-secondary">
                      Yes, free parking is available on-site.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-forest-green mb-2">
                      Do you provide Wi-Fi?
                    </h4>
                    <p className="text-body text-text-secondary">
                      Yes, high-speed Wi-Fi is included free of charge.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

