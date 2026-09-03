export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "JMG Nest",
    "description": "Premium vacation rental accommodation with three unique units in La Trinidad Valley, near Baguio City. Experience mountain comfort with modern amenities and stunning views.",
    "image": "https://jmgnest.com/images/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "La Trinidad",
      "addressRegion": "Benguet",
      "addressCountry": "Philippines"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "16.4023",
      "longitude": "120.5960"
    },
    "url": "https://jmgnest.com",
    "priceRange": "₱₱",
    "priceCurrency": "PHP",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Mountain View",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free WiFi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Free Parking",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Full Kitchen",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Smart TV",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Hot Shower",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Coffee & Tea",
        "value": true
      }
    ],
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "telephone": "+63-XXX-XXX-XXXX",
    "email": "info@jmgnest.com",
    "checkinTime": "14:00",
    "checkoutTime": "11:00",
    "numberOfRooms": "3",
    "numberOfUnits": "3"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

