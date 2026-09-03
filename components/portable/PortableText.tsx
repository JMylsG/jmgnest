'use client'

import React from 'react'
import { PortableText as PT, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // Sanity image value will be an asset ref. If using Sanity assets, replace with your SafeImage integration
      return (
        <img
          src={value?.asset?._ref ? `/api/sanity-image/${value.asset._ref}` : ''}
          alt={value?.alt || ''}
          className="rounded-lg my-4"
        />
      )
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-h2 font-serif font-semibold text-forest-green mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-h3 font-serif font-semibold text-forest-green mb-3">{children}</h3>,
    normal: ({ children }) => <p className="text-body text-text-primary font-sans leading-relaxed mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
  },
}

export default function PortableText({ value }: { value: any }) {
  return <PT value={value} components={components} />
}


