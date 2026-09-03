export interface Property {
  id: string
  name: string
  tagline: string
  description: string
  location: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  capacity: {
    maxGuests: number
    bedrooms: number
    bathrooms: number
  }
  pricing: {
    baseRate: number
    currency: string
    cleaningFee: number
    weeklyDiscount: number
    minNights: number
  }
}

export interface Amenity {
  id: string
  name: string
  category: 'indoor' | 'outdoor' | 'kitchen' | 'entertainment' | 'other'
  icon: string
  description: string
  featured: boolean
  allUnits?: boolean // If true, available in all units
  exclusiveTo?: string // e.g., 'Main Unit' for unit-specific amenities
}

export interface GalleryImage {
  id: string
  url: string
  thumbnail: string
  category: 'exterior' | 'interior' | 'bedroom' | 'kitchen' | 'balcony' | 'views' | 'bathroom' | 'living-room'
  caption: string
  alt: string
  featured: boolean
  unit?: 'main-unit' | 'unit-a' | 'unit-b' | 'shared'
  tags?: string[]
  order?: number
}

export interface Review {
  id: string
  guestName: string
  guestPhoto: string
  rating: number
  date: string
  comment: string
  photos: string[]
  verified: boolean
  hostResponse?: {
    date: string
    comment: string
  }
}

export interface Attraction {
  id: string
  slug: string
  name: string
  description: string
  distance: string
  travelTime: string
  category: 'culture' | 'nature' | 'adventure' | 'food' | 'shopping'
  images: string[]
  coordinates: {
    lat: number
    lng: number
  }
  content: string
}

export interface Availability {
  available: boolean
  price: number
  dates: string[]
}

export interface Unit {
  id: string
  name: string
  shortDescription?: string
  fullDescription: string
  images: string[]
  capacity: {
    guests: number
    bedrooms: number
    bathrooms: number
  }
  pricing: {
    currency: string
    baseRate: number
    cleaningFee: number
    weeklyDiscount: number
    minNights: number
  }
  amenities: string[]
  houseRules?: string[]
  reviews?: Review[]
  airbnbUrl?: string
  vrboUrl?: string
  fbPageUsername?: string
  icalUrls?: {
    airbnb?: string
    vrbo?: string
  }
  calendarId?: string
  featured?: boolean
  rating?: number
}

