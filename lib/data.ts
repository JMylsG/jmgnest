import { Property, Amenity, GalleryImage, Review, Attraction, Availability, Unit } from './types'

// Simulated delay for mock API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getProperty(): Promise<Property> {
  await delay(300)
  return {
    id: 'jmg-nest-001',
    name: 'JMG Nest',
    tagline: 'Your Cozy Mountain Retreat in Baguio',
    description: 'Experience the perfect mountain getaway at JMG Nest, a beautifully designed vacation rental in the heart of Baguio City. Our property offers stunning views, modern amenities, and warm hospitality in a serene mountain setting. Perfect for families, couples, and groups seeking a memorable stay in the Summer Capital of the Philippines.',
    location: {
      address: 'Baguio City, Philippines',
      coordinates: { lat: 16.4023, lng: 120.5960 },
    },
    capacity: {
      maxGuests: 8,
      bedrooms: 3,
      bathrooms: 2,
    },
    pricing: {
      baseRate: 5000,
      currency: 'PHP',
      cleaningFee: 1000,
      weeklyDiscount: 0.1,
      minNights: 2,
    },
  }
}

export async function getAmenities(): Promise<Amenity[]> {
  await delay(300)
  return [
    {
      id: 'am-001',
      name: 'High-Speed WiFi',
      category: 'other',
      icon: 'wifi',
      description: 'Stay connected throughout your stay.',
      featured: false,
      allUnits: true,
    },
    {
      id: 'am-002',
      name: 'Free Parking',
      category: 'outdoor',
      icon: 'parking',
      description: 'Large private parking.',
      featured: false,
      allUnits: true,
    },
    {
      id: 'am-003',
      name: 'Full Kitchen',
      category: 'kitchen',
      icon: 'kitchen',
      description: 'Cook your favorite meals at home.',
      featured: false,
      allUnits: true,
    },
    {
      id: 'am-004',
      name: 'Smart TV',
      category: 'entertainment',
      icon: 'tv',
      description: 'Netflix and streaming ready.',
      featured: false,
      allUnits: true,
    },
    {
      id: 'am-005',
      name: 'Coffee & Tea',
      category: 'kitchen',
      icon: 'coffee',
      description: 'Complimentary coffee essentials.',
      featured: false,
      allUnits: true,
    },
    {
      id: 'am-007',
      name: 'Hot Shower',
      category: 'indoor',
      icon: 'shower',
      description: 'Instant hot water 24/7.',
      featured: false,
      allUnits: true,
    },
    {
      id: 'am-006',
      name: 'Mountain View Balcony',
      category: 'outdoor',
      icon: 'balcony',
      description: 'Stunning Baguio scenery.',
      featured: false,
      allUnits: false,
      exclusiveTo: 'Main Unit',
    },
  ]
}

// Cloudinary helper function
const CLOUDINARY_CLOUD_NAME = 'jmg-nest'
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`

const cloudinaryUrl = (path: string, options: { width?: number } = {}) => {
  const transformations: string[] = []
  
  if (options.width) {
    transformations.push(`w_${options.width}`)
  }
  
  transformations.push('q_auto')
  transformations.push('f_auto')
  
  const transformString = transformations.join(',')
  return `${CLOUDINARY_BASE_URL}${transformString}/${path}`
}

export function getImagesByUnit(unitId: string, allImages: GalleryImage[]): GalleryImage[] {
  if (unitId === 'all') return allImages
  return allImages.filter(img => img.unit === unitId || img.unit === 'shared')
}

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  await delay(300)
  const allImages: GalleryImage[] = [
    // MAIN UNIT (7 images) - Order: 9-16
    {
      id: 'main-balcony-001',
      url: cloudinaryUrl('main-patio-1.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('main-patio-1.jpg', { width: 400 }),
      caption: 'Private porch with outdoor seating and mountain views',
      alt: 'Main Unit porch with comfortable seating and mountain views',
      category: 'balcony',
      unit: 'main-unit',
      tags: ['balcony', 'porch', 'outdoor', 'seating', 'mountain views', 'main unit'],
      featured: true,
      order: 10,
    },
    {
      id: 'main-bathroom-001',
      url: cloudinaryUrl('main-bathroom-1.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('main-bathroom-1.jpg', { width: 400 }),
      caption: 'Modern master bathroom with shower and contemporary fixtures',
      alt: 'Main Unit modern bathroom with shower',
      category: 'bathroom',
      unit: 'main-unit',
      tags: ['bathroom', 'modern', 'shower', 'main unit'],
      featured: true,
      order: 11,
    },
    {
      id: 'main-living-001',
      url: cloudinaryUrl('SDB_9291_bobgxm.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9291_bobgxm.jpg', { width: 400 }),
      caption: 'Spacious living room with comfortable seating and mountain views',
      alt: 'Main Unit spacious living room with comfortable seating and mountain views',
      category: 'living-room',
      unit: 'main-unit',
      tags: ['living-room', 'seating', 'spacious', 'mountain-views', 'comfortable', 'main unit'],
      featured: false,
      order: 12,
    },
    {
      id: 'main-kitchen-001',
      url: cloudinaryUrl('SDB_9259_ndkkk0.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9259_ndkkk0.jpg', { width: 400 }),
      caption: 'Fully equipped kitchen with dining area, perfect for family meals',
      alt: 'Main Unit fully equipped kitchen with dining area',
      category: 'kitchen',
      unit: 'main-unit',
      tags: ['kitchen', 'dining', 'equipped', 'family', 'meals', 'main unit'],
      featured: false,
      order: 13,
    },
    {
      id: 'main-bedroom-002',
      url: cloudinaryUrl('SDB_9430_kiorbe.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9430_kiorbe.jpg', { width: 400 }),
      caption: 'Comfortable second bedroom with cozy bedding and natural light',
      alt: 'Main Unit second bedroom with cozy bedding and natural light',
      category: 'bedroom',
      unit: 'main-unit',
      tags: ['bedroom', 'cozy', 'bedding', 'natural-light', 'comfortable', 'second bedroom', 'main unit'],
      featured: false,
      order: 14,
    },
    {
      id: 'main-bedroom-003',
      url: cloudinaryUrl('SDB_9428_qqyayv.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9428_qqyayv.jpg', { width: 400 }),
      caption: 'Inviting third bedroom with comfortable sleeping arrangements',
      alt: 'Main Unit third bedroom with comfortable sleeping arrangements',
      category: 'bedroom',
      unit: 'main-unit',
      tags: ['bedroom', 'inviting', 'comfortable', 'sleeping', 'third bedroom', 'main unit'],
      featured: false,
      order: 15,
    },
    {
      id: 'main-bedroom-004',
      url: cloudinaryUrl('SDB_9404_xhkcaa.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9404_xhkcaa.jpg', { width: 400 }),
      caption: 'Cozy fourth bedroom, ideal for additional guests',
      alt: 'Main Unit fourth bedroom ideal for additional guests',
      category: 'bedroom',
      unit: 'main-unit',
      tags: ['bedroom', 'cozy', 'fourth bedroom', 'guests', 'additional', 'main unit'],
      featured: false,
      order: 16,
    },
    {
      id: 'main-bedroom-master-001',
      url: cloudinaryUrl('SDB_9356_o608aw.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9356_o608aw.jpg', { width: 400 }),
      caption: 'Spacious master bedroom with elegant furnishings and comfortable sleeping arrangements',
      alt: 'Main Unit master bedroom with elegant furnishings',
      category: 'bedroom',
      unit: 'main-unit',
      tags: ['bedroom', 'master', 'spacious', 'elegant', 'comfortable', 'main unit'],
      featured: false,
      order: 9,
    },

    // UNIT B (6 images) - Order: 20-25
    {
      id: 'unitb-kitchen-001',
      url: cloudinaryUrl('SDB_9576_lvigsb.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9576_lvigsb.jpg', { width: 400 }),
      caption: 'Spacious kitchen with modern appliances and ample counter space',
      alt: 'Unit B spacious kitchen with modern appliances and ample counter space',
      category: 'kitchen',
      unit: 'unit-b',
      tags: ['kitchen', 'spacious', 'modern', 'appliances', 'counter-space', 'unit b'],
      featured: true,
      order: 20,
    },
    {
      id: 'unitb-living-001',
      url: cloudinaryUrl('SDB_9575_dhw1e4.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9575_dhw1e4.jpg', { width: 400 }),
      caption: 'Large living area perfect for groups and families',
      alt: 'Unit B large living area perfect for groups and families',
      category: 'living-room',
      unit: 'unit-b',
      tags: ['living-room', 'large', 'groups', 'families', 'spacious', 'unit b'],
      featured: true,
      order: 21,
    },
    {
      id: 'unitb-bathroom-001',
      url: cloudinaryUrl('SDB_9568_ken7kd.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9568_ken7kd.jpg', { width: 400 }),
      caption: 'Well-appointed bathroom with modern amenities',
      alt: 'Unit B well-appointed bathroom with modern amenities',
      category: 'bathroom',
      unit: 'unit-b',
      tags: ['bathroom', 'modern', 'amenities', 'well-appointed', 'unit b'],
      featured: false,
      order: 22,
    },
    {
      id: 'unitb-bedroom-001',
      url: cloudinaryUrl('ARC_9818_im6ish.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('ARC_9818_im6ish.jpg', { width: 400 }),
      caption: 'Master bedroom with comfortable furnishings',
      alt: 'Unit B master bedroom with comfortable furnishings',
      category: 'bedroom',
      unit: 'unit-b',
      tags: ['bedroom', 'master', 'comfortable', 'furnishings', 'unit b'],
      featured: false,
      order: 23,
    },
    {
      id: 'unitb-bedroom-002',
      url: cloudinaryUrl('SDB_9610_rp2cr6.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9610_rp2cr6.jpg', { width: 400 }),
      caption: 'Second bedroom with quality bedding and storage',
      alt: 'Unit B second bedroom with quality bedding and storage',
      category: 'bedroom',
      unit: 'unit-b',
      tags: ['bedroom', 'second bedroom', 'quality', 'bedding', 'storage', 'unit b'],
      featured: false,
      order: 24,
    },
    {
      id: 'unitb-bedroom-003',
      url: cloudinaryUrl('SDB_9596_jkgp37.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9596_jkgp37.jpg', { width: 400 }),
      caption: 'Third bedroom offering comfortable accommodations',
      alt: 'Unit B third bedroom with comfortable furnishings',
      category: 'bedroom',
      unit: 'unit-b',
      tags: ['bedroom', 'comfortable', 'unit b', 'third bedroom'],
      featured: false,
      order: 25,
    },

    // UNIT A (5 images) - Order: 30-34
    {
      id: 'unita-bedroom-001',
      url: cloudinaryUrl('SDB_9506_u8atd5.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9506_u8atd5.jpg', { width: 400 }),
      caption: 'Peaceful bedroom with comfortable bed and serene atmosphere',
      alt: 'Unit A peaceful bedroom with comfortable bed and serene atmosphere',
      category: 'bedroom',
      unit: 'unit-a',
      tags: ['bedroom', 'peaceful', 'comfortable', 'serene', 'atmosphere', 'unit a'],
      featured: true,
      order: 30,
    },
    {
      id: 'unita-bedroom-002',
      url: cloudinaryUrl('SDB_9500_trnbz3.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9500_trnbz3.jpg', { width: 400 }),
      caption: 'Second bedroom perfect for couples or small families',
      alt: 'Unit A second bedroom perfect for couples or small families',
      category: 'bedroom',
      unit: 'unit-a',
      tags: ['bedroom', 'second bedroom', 'couples', 'small-families', 'intimate', 'unit a'],
      featured: true,
      order: 31,
    },
    {
      id: 'unita-living-001',
      url: cloudinaryUrl('SDB_9518_yv3b2v.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9518_yv3b2v.jpg', { width: 400 }),
      caption: 'Cozy living space with comfortable seating, ideal for relaxing',
      alt: 'Unit A cozy living space with comfortable seating',
      category: 'living-room',
      unit: 'unit-a',
      tags: ['living-room', 'cozy', 'comfortable', 'seating', 'relaxing', 'unit a'],
      featured: false,
      order: 32,
    },
    {
      id: 'unita-bathroom-001',
      url: cloudinaryUrl('SDB_9484_tu7bbv.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9484_tu7bbv.jpg', { width: 400 }),
      caption: 'Clean, modern bathroom with all essential amenities',
      alt: 'Unit A clean modern bathroom with all essential amenities',
      category: 'bathroom',
      unit: 'unit-a',
      tags: ['bathroom', 'clean', 'modern', 'amenities', 'essential', 'unit a'],
      featured: false,
      order: 33,
    },
    {
      id: 'unita-kitchen-001',
      url: cloudinaryUrl('SDB_9475_qor51f.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9475_qor51f.jpg', { width: 400 }),
      caption: 'Compact kitchenette with everything needed for meal preparation',
      alt: 'Unit A compact kitchenette with everything needed for meal preparation',
      category: 'kitchen',
      unit: 'unit-a',
      tags: ['kitchen', 'kitchenette', 'compact', 'meal-preparation', 'equipped', 'unit a'],
      featured: false,
      order: 34,
    },
  ]
  
  if (category && category !== 'all') {
    return allImages.filter(img => img.category === category)
  }
  
  return allImages
}

export const unitLabels: Record<string, string> = {
  'shared': 'Shared Spaces',
  'main-unit': 'Main Unit',
  'unit-b': 'Unit B',
  'unit-a': 'Unit A',
}

/**
 * Get featured images, optionally filtered by unit
 * @param limit - Maximum number of images to return (null for all)
 * @param unitId - Optional unit filter
 * @returns Array of featured images sorted by order
 */
export function getFeaturedImages(limit: number | null = 6, unitId: string | null = null): GalleryImage[] {
  try {
    const allImages = [
    // Featured images from getGalleryImages
    {
      id: 'main-balcony-001',
      url: cloudinaryUrl('main-patio-1.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('main-patio-1.jpg', { width: 400 }),
      caption: 'Private porch with outdoor seating and mountain views',
      alt: 'Main Unit porch with comfortable seating and mountain views',
      category: 'balcony' as const,
      unit: 'main-unit' as const,
      tags: ['balcony', 'porch', 'outdoor', 'seating', 'mountain views', 'main unit'],
      featured: true,
      order: 10,
    },
    {
      id: 'main-bathroom-001',
      url: cloudinaryUrl('main-bathroom-1.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('main-bathroom-1.jpg', { width: 400 }),
      caption: 'Modern master bathroom with shower and contemporary fixtures',
      alt: 'Main Unit modern bathroom with shower',
      category: 'bathroom' as const,
      unit: 'main-unit' as const,
      tags: ['bathroom', 'modern', 'shower', 'main unit'],
      featured: true,
      order: 11,
    },
    {
      id: 'unitb-kitchen-001',
      url: cloudinaryUrl('SDB_9576_lvigsb.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9576_lvigsb.jpg', { width: 400 }),
      caption: 'Spacious kitchen with modern appliances and ample counter space',
      alt: 'Unit B spacious kitchen with modern appliances and ample counter space',
      category: 'kitchen' as const,
      unit: 'unit-b' as const,
      tags: ['kitchen', 'spacious', 'modern', 'appliances', 'counter-space', 'unit b'],
      featured: true,
      order: 20,
    },
    {
      id: 'unitb-living-001',
      url: cloudinaryUrl('SDB_9575_dhw1e4.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9575_dhw1e4.jpg', { width: 400 }),
      caption: 'Large living area perfect for groups and families',
      alt: 'Unit B large living area perfect for groups and families',
      category: 'living-room' as const,
      unit: 'unit-b' as const,
      tags: ['living-room', 'large', 'groups', 'families', 'spacious', 'unit b'],
      featured: true,
      order: 21,
    },
    {
      id: 'unita-bedroom-001',
      url: cloudinaryUrl('SDB_9506_u8atd5.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9506_u8atd5.jpg', { width: 400 }),
      caption: 'Peaceful bedroom with comfortable bed and serene atmosphere',
      alt: 'Unit A peaceful bedroom with comfortable bed and serene atmosphere',
      category: 'bedroom' as const,
      unit: 'unit-a' as const,
      tags: ['bedroom', 'peaceful', 'comfortable', 'serene', 'atmosphere', 'unit a'],
      featured: true,
      order: 30,
    },
    {
      id: 'unita-bedroom-002',
      url: cloudinaryUrl('SDB_9500_trnbz3.jpg', { width: 1200 }),
      thumbnail: cloudinaryUrl('SDB_9500_trnbz3.jpg', { width: 400 }),
      caption: 'Second bedroom perfect for couples or small families',
      alt: 'Unit A second bedroom perfect for couples or small families',
      category: 'bedroom' as const,
      unit: 'unit-a' as const,
      tags: ['bedroom', 'second bedroom', 'couples', 'small-families', 'intimate', 'unit a'],
      featured: true,
      order: 31,
    },
  ]

  let filtered = allImages
    .filter(img => img.featured === true)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  if (unitId && unitId !== 'all') {
    const targetUnit = unitId as 'main-unit' | 'unit-a' | 'unit-b' | 'shared'
    filtered = filtered.filter(img => {
      const imgUnit = img.unit
      if (!imgUnit) return false
      // Show images that are shared or match the target unit
      return (imgUnit as string) === 'shared' || imgUnit === targetUnit
    })
  }

  return limit ? filtered.slice(0, limit) : filtered
  } catch (error) {
    console.error('Error in getFeaturedImages:', error)
    // Return empty array instead of throwing to prevent crashes
    return []
  }
}

export async function getReviews(limit = 10, offset = 0): Promise<{ reviews: Review[]; total: number }> {
  await delay(300)
  const allReviews: Review[] = [
    {
      id: 'rev-001',
      guestName: 'Maria Santos',
      guestPhoto: '/images/guests/maria.jpg',
      rating: 5,
      date: '2025-10-15',
      comment: 'Amazing stay! The views were breathtaking and the property was immaculate. Perfect location for exploring Baguio. Will definitely return!',
      photos: ['/images/reviews/rev-001-1.jpg'],
      verified: true,
      hostResponse: {
        date: '2025-10-16',
        comment: 'Thank you for the wonderful review! We\'re so happy you enjoyed your stay.',
      },
    },
    {
      id: 'rev-002',
      guestName: 'John Chen',
      guestPhoto: '/images/guests/john.jpg',
      rating: 5,
      date: '2025-09-20',
      comment: 'Beautiful property with all the amenities we needed. The kitchen was well-stocked and the beds were very comfortable.',
      photos: [],
      verified: true,
    },
    {
      id: 'rev-003',
      guestName: 'Sarah Johnson',
      guestPhoto: '/images/guests/sarah.jpg',
      rating: 5,
      date: '2025-08-10',
      comment: 'Great location, clean, and spacious. Perfect for our family vacation. The host was very responsive and helpful.',
      photos: [],
      verified: true,
    },
  ]
  
  const paginatedReviews = allReviews.slice(offset, offset + limit)
  
  return {
    reviews: paginatedReviews,
    total: allReviews.length,
  }
}

export async function getAttractions(): Promise<Attraction[]> {
  await delay(300)
  return [
    {
      id: 'attr-001',
      slug: 'igorot-stone-kingdom',
      name: 'Igorot Stone Kingdom',
      description: 'Cultural heritage site showcasing the rich traditions and history of the Igorot people.',
      distance: '5.2 km',
      travelTime: '15 minutes',
      category: 'culture',
      images: ['/images/attractions/stone-kingdom-001.jpg'],
      coordinates: { lat: 16.3988, lng: 120.6114 },
      content: `The Igorot Stone Kingdom is a must-visit cultural attraction in Baguio City. This heritage site beautifully showcases the rich traditions, architecture, and history of the Igorot people, one of the indigenous groups in the Cordilleras.

The stone structures and displays provide visitors with an immersive experience into the Igorot way of life, their customs, and their connection to the mountains. The site offers panoramic views of the surrounding area and is a great place to learn about local culture and history.

Located just 15 minutes from JMG Nest, it's an easy day trip that provides valuable cultural insights and stunning photo opportunities.`,
    },
    {
      id: 'attr-002',
      slug: 'burnham-park',
      name: 'Burnham Park',
      description: 'Historic central park featuring a lake, gardens, and recreational facilities.',
      distance: '3.8 km',
      travelTime: '20 minutes',
      category: 'nature',
      images: ['/images/attractions/burnham-001.jpg'],
      coordinates: { lat: 16.4030, lng: 120.5956 },
      content: `Burnham Park is Baguio's central park and one of its most beloved landmarks. Designed by American architect Daniel Burnham, the park spans over 32 hectares and features a man-made lake where visitors can rent boats.

The park includes beautiful gardens, walking paths, playgrounds, and various recreational facilities. It's a perfect place for families, joggers, and anyone looking to enjoy nature in the heart of the city.`,
    },
    {
      id: 'attr-003',
      slug: 'session-road',
      name: 'Session Road',
      description: 'Baguio\'s main commercial street with shops, restaurants, and cafes.',
      distance: '4.1 km',
      travelTime: '25 minutes',
      category: 'shopping',
      images: ['/images/attractions/session-001.jpg'],
      coordinates: { lat: 16.4031, lng: 120.5934 },
      content: `Session Road is Baguio's main commercial thoroughfare, bustling with shops, restaurants, cafes, and local vendors. It's the perfect place to experience the city's vibrant atmosphere and find unique souvenirs.

From local handicrafts to international brands, Session Road offers something for everyone. Don't forget to try the local delicacies at the street food vendors!`,
    },
  ]
}

export async function getAttractionBySlug(slug: string): Promise<Attraction | null> {
  const attractions = await getAttractions()
  return attractions.find(a => a.slug === slug) || null
}

export async function getAvailability(startDate: string, endDate: string): Promise<Availability> {
  await delay(300)
  // Return mock availability data
  return {
    available: true,
    price: 5000,
    dates: [startDate, endDate],
  }
}

export async function getUnits(): Promise<Unit[]> {
  try {
    await delay(300)
    return [
    {
      id: 'main-unit',
      name: 'JMG Nest Main Unit - Spacious Mountain Retreat',
      shortDescription: 'Beautiful 4-bedroom unit with stunning mountain views, perfect for families and groups up to 12 guests. Features modern amenities and a cozy atmosphere.',
      fullDescription: `Experience the perfect mountain getaway at JMG Nest Main Unit. This spacious 4-bedroom, 2-bathroom unit comfortably accommodates up to 12 guests, making it ideal for families, groups of friends, or extended stays.



The unit features a fully equipped modern kitchen where you can prepare your favorite meals, a cozy living area with comfortable seating and entertainment options, and a private balcony that offers breathtaking panoramic views of the Cordillera mountains.



Each bedroom is thoughtfully designed with comfortable beds and quality linens to ensure a restful night's sleep. The master bedroom includes an ensuite bathroom, while the additional bedrooms share a well-appointed second bathroom.



Located in the beautiful La Trinidad Valley, just 15 minutes away from Baguio City, you'll be close to popular attractions, restaurants, and shopping areas while enjoying a peaceful, less crowded setting. Whether you're visiting for a weekend escape or an extended vacation, this unit provides the perfect home base for your Baguio adventure.



The property includes high-speed WiFi, hot water, and secure parking. Our dedicated host team is available to assist with any questions or recommendations during your stay.`,
      images: [
        'https://res.cloudinary.com/jmg-nest/image/upload/v1762618437/SDB_9291_bobgxm.jpg',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920',
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920'
      ],
      capacity: {
        guests: 12,
        bedrooms: 4,
        bathrooms: 2
      },
      pricing: {
        baseRate: 12500,
        currency: '₱',
        cleaningFee: 1000,
        weeklyDiscount: 0.1,
        minNights: 2
      },
      amenities: [
        'Fully Equipped Kitchen',
        'High-Speed WiFi',
        'Hot Water',
        'Parking Space',
        'Smart TV',
        'Hair Dryer',
        'Coffee Maker',
        'Microwave',
        'Refrigerator',
        'Dining Area',
        'Living Room',
        'Mountain View Balcony'
      ],
      houseRules: [
        'Check-in after 3:00 PM',
        'Check-out before 11:00 AM',
        'Minimum stay: 2 nights',
        'No smoking inside the unit',
        'No parties or events',
        'Maximum occupancy: 12 guests',
        'Pets not allowed'
      ],
      airbnbUrl: 'https://www.airbnb.com/rooms/1318250624522250354?source_impression_id=p3_1762735085_P3gXwY3Eo2LV0gOz',
      vrboUrl: 'https://www.vrbo.com/4930072?expediaPropertyId=122342228&rm1=a2&regionId=6173623&destType=MARKET&sort=RECOMMENDED',
      fbPageUsername: 'jmgnest',
      icalUrls: {
        airbnb: '__FILL_ME__',
        vrbo: '__FILL_ME__'
      },
      calendarId: process.env.NEXT_PUBLIC_MAIN_UNIT_CALENDAR_ID || 'c_0f01c83b800403808c0f437e7762e83c58c8cc68313f40f4bb2ad671f47a0f02@group.calendar.google.com',
      featured: true,
      rating: 5.0,
      reviews: [
        {
          id: 'main-review-1',
          guestName: 'Michael',
          guestPhoto: 'https://i.pravatar.cc/150?img=12',
          rating: 5,
          date: 'February 2025',
          comment: 'The place is jaw dropping, great furniture and a very relaxing environment. Very spacious, huge balcony with a great view. Thank you for accommodating us despite the very short notice. Wish we could stay longer next time. Will definitely be back!',
          photos: [],
          verified: true
        },
        {
          id: 'main-review-2',
          guestName: 'Guest from Port St. Lucie',
          guestPhoto: 'https://i.pravatar.cc/150?img=13',
          rating: 5,
          date: 'February 2025',
          comment: 'A+++ beautiful spacious home with a spectacular view in the back terrace. Further up the mountain so a lot less traffic and pretty private, but still close enough to easily get to attractions/Baguio city. Beds and pillows are comfortable and had plenty of blankets to stay warm. Bathrooms are clean and water pressure is excellent. Hosts are the friendliest people and quickly respond to questions and concerns. Easy to find and checkin process was a breeze. Will stay here anytime we\'re in Baguio. Thank you for an excellent stay!',
          photos: [],
          verified: true
        },
        {
          id: 'main-review-3',
          guestName: 'Mercedes',
          guestPhoto: 'https://i.pravatar.cc/150?img=14',
          rating: 5,
          date: 'January 2025',
          comment: 'We will definitely go back this March for my daughter\'s bday celebration. The host and his aunties are warm to their clients. They provided what we needed during our stay. They are happy having us as their first guests. We like Ma\'am Divina and Ma\'am Ellen ❤️ Thank you so much!',
          photos: [],
          verified: true
        },
        {
          id: 'main-review-4',
          guestName: 'Jenny Rose',
          guestPhoto: 'https://i.pravatar.cc/150?img=15',
          rating: 5,
          date: 'April 2025',
          comment: 'It\'s a very nice place.',
          photos: [],
          verified: true
        }
      ]
    },
    {
      id: 'unit-a',
      name: 'JMG Nest Unit A - Intimate Mountain Escape',
      shortDescription: 'Charming 2-bedroom unit ideal for couples, families, or groups. Modern amenities in La Trinidad Valley, just 15 minutes from Baguio City.',
      fullDescription: `Discover JMG Nest Unit A, a charming and comfortable 2-bedroom, 1-bathroom unit perfect for couples, families, or groups up to 8 guests seeking a peaceful mountain retreat. This cozy space combines comfort, style, and convenience in the beautiful La Trinidad Valley, just 15 minutes away from Baguio City.



The unit features comfortable bedrooms with quality beds and linens, a well-equipped kitchenette for light meal preparation, and a cozy living area with seating and entertainment options. The modern bathroom includes all essential amenities.



This unit offers a perfect balance of comfort and style. Large windows allow natural light to fill the space, creating a bright and welcoming atmosphere.



Perfectly located in La Trinidad Valley, just 15 minutes from Baguio City, you'll have easy access to popular destinations, restaurants, and shopping areas. This unit is ideal for those who want a comfortable, affordable base for their Baguio adventure while enjoying a quieter, more peaceful setting.



The unit includes high-speed WiFi, hot water, and access to secure parking. Our attentive host team is available to provide recommendations and assistance throughout your stay.`,
      capacity: {
        guests: 8,
        bedrooms: 2,
        bathrooms: 1
      },
      pricing: {
        baseRate: 5250,
        currency: '₱',
        cleaningFee: 500,
        weeklyDiscount: 0.1,
        minNights: 2
      },
      images: [
        'https://res.cloudinary.com/jmg-nest/image/upload/v1762620016/SDB_9518_yv3b2v.jpg',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920',
        'https://images.unsplash.com/photo-1560448075-cbc16bb4af33?w=1920',
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1920'
      ],
      amenities: [
        'Kitchenette',
        'High-Speed WiFi',
        'Hot Water',
        'Parking Space',
        'Smart TV',
        'Coffee Maker',
        'Microwave',
        'Refrigerator',
        'Dining Area',
        'Living Area',
        'Hair Dryer'
      ],
      houseRules: [
        'Check-in after 3:00 PM',
        'Check-out before 11:00 AM',
        'No smoking inside the unit',
        'No parties or events',
        'Maximum occupancy: 8 guests',
        'Pets not allowed'
      ],
      airbnbUrl: 'https://www.airbnb.com/rooms/1318333157071110017?source_impression_id=p3_1762735085_P3e7I7VRXfZV6gtM',
      vrboUrl: '__FILL_ME__',
      fbPageUsername: 'jmgnest',
      icalUrls: {
        airbnb: '__FILL_ME__',
        vrbo: '__FILL_ME__'
      },
      calendarId: process.env.NEXT_PUBLIC_UNIT_A_CALENDAR_ID || 'c_169c05a073398c9d09acf5a2b165a548b3504914fd153fbab3d907073c3890ff@group.calendar.google.com',
      featured: false,
      rating: 5.0,
      reviews: [
        {
          id: 'unita-review-1',
          guestName: 'Len',
          guestPhoto: 'https://i.pravatar.cc/150?img=18',
          rating: 5,
          date: 'December 2024',
          comment: 'Jason, the host, is so responsive and very accommodating. He gave us a good deal upon knowing that we are all seniors. The property is located away from the traffic and is just few minutes away from Baguio city proper. Divina and Ellen, who welcomed us in the place, made us felt so at home and mababait. We will definitely recommend this place to our friends. Thank you for making our stay so comfortable and relaxing. Overall, the rating is EXCELLENT.',
          photos: [],
          verified: true
        },
        {
          id: 'unita-review-2',
          guestName: 'Gwen',
          guestPhoto: 'https://i.pravatar.cc/150?img=19',
          rating: 5,
          date: 'February 2025',
          comment: 'The place was beyond my expectations and the host was very responsive. Manang Devina is friendly and gave us local recommendations. Overall, we had a great time staying there.',
          photos: [],
          verified: true
        }
      ]
    },
    {
      id: 'unit-b',
      name: 'JMG Nest Unit B - Cozy Family Haven',
      shortDescription: 'Comfortable 3-bedroom unit perfect for families or groups. Features modern amenities and easy access to Baguio attractions.',
      fullDescription: `Welcome to JMG Nest Unit B, a cozy and comfortable 3-bedroom, 2-bathroom unit designed for families or groups of up to 10 guests. This well-appointed space offers all the comforts of home in the beautiful La Trinidad Valley, just 15 minutes away from Baguio City.



The unit features a bright and airy living space with comfortable seating, a fully equipped kitchen with modern appliances, and a dining area perfect for family meals. The three bedrooms are tastefully furnished with quality beds and linens to ensure a comfortable stay.



The bathrooms are modern and well-maintained. The unit also includes a small balcony where you can enjoy your morning coffee while taking in the fresh mountain air.



Located in La Trinidad Valley, just 15 minutes from Baguio City, you'll have easy access to local markets, restaurants, and popular tourist attractions. The unit is perfect for those seeking a comfortable, affordable option without compromising on quality, while enjoying a peaceful setting away from the city center.



Amenities include high-speed WiFi, hot water, and access to secure parking. Our friendly host team is always ready to help make your stay memorable.`,
      capacity: {
        guests: 10,
        bedrooms: 3,
        bathrooms: 2
      },
      pricing: {
        baseRate: 6250,
        currency: '₱',
        cleaningFee: 800,
        weeklyDiscount: 0.1,
        minNights: 2
      },
      images: [
        'https://res.cloudinary.com/jmg-nest/image/upload/v1762620665/SDB_9610_rp2cr6.jpg',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1920',
        'https://images.unsplash.com/photo-1560448075-cbc16bb4af33?w=1920',
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920'
      ],
      amenities: [
        'Fully Equipped Kitchen',
        'High-Speed WiFi',
        'Hot Water',
        'Parking Space',
        'Smart TV',
        'Coffee Maker',
        'Microwave',
        'Refrigerator',
        'Dining Area',
        'Living Room',
        'Balcony',
        'Hair Dryer'
      ],
      houseRules: [
        'Check-in after 3:00 PM',
        'Check-out before 11:00 AM',
        'No smoking inside the unit',
        'No parties or events',
        'Maximum occupancy: 10 guests',
        'Pets not allowed'
      ],
      airbnbUrl: 'https://www.airbnb.com/rooms/1318338566291278964?source_impression_id=p3_1762735085_P3AxFcI2Guz5m9Md',
      vrboUrl: '__FILL_ME__',
      fbPageUsername: 'jmgnest',
      icalUrls: {
        airbnb: '__FILL_ME__',
        vrbo: '__FILL_ME__'
      },
      calendarId: process.env.NEXT_PUBLIC_UNIT_B_CALENDAR_ID || 'c_9dd14670fa7078070a6bef04a0155f8de5d6a56be0cd9595078a31bc89bc7886@group.calendar.google.com',
      featured: false,
      rating: 5.0,
      reviews: [
        {
          id: 'unitb-review-1',
          guestName: 'Jonas Ian',
          guestPhoto: 'https://i.pravatar.cc/150?img=16',
          rating: 5,
          date: 'March 2025',
          comment: 'I don\'t even know where to begin because this stay was PERFECTION! From the moment we walked in, we were greeted by a beautifully designed space that felt like a home away from home—clean, cozy, and filled with thoughtful touches. But what really blew me away was the incredible hospitality of our hosts! First, they upgraded our accommodation without hesitation after spotting a small leak in the living room. I mean, who does that?! Absolute legends. Then, when the WiFi had a slight hiccup, they didn\'t just apologize and leave us hanging—they sent a technician IMMEDIATELY to fix it. Talk about top-tier service! I\'d give this place 100 stars if I could!',
          photos: [],
          verified: true
        },
        {
          id: 'unitb-review-2',
          guestName: 'Oana',
          guestPhoto: 'https://i.pravatar.cc/150?img=17',
          rating: 5,
          date: 'April 2025',
          comment: 'The seniors have had an amazing time at this Airbnb! The place was spotless, stylish, and exactly as described. Very kind and accommodating personnel. Huge parking space is a plus plus! Great place to stay! Thank you!',
          photos: [],
          verified: true
        }
      ]
    }
  ]
  } catch (error) {
    console.error('Error in getUnits:', error)
    // Return empty array instead of throwing to prevent crashes
    return []
  }
}

export async function getUnitById(unitId: string): Promise<Unit | null> {
  const units = await getUnits()
  return units.find(u => u.id === unitId) || null
}

export async function getUnitBySlug(slug: string): Promise<Unit | null> {
  const units = await getUnits()
  // Since slug is derived from id in the new structure, we'll match by id
  return units.find(u => u.id === slug) || null
}

export function getFeaturedUnits(): Promise<Unit[]> {
  return getUnits().then(units => units.filter(unit => unit.featured))
}

