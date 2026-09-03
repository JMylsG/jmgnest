# JMG Nest - Vacation Rental Website

A modern, warm, and inviting Next.js 14+ application for JMG Nest, a vacation rental property in Baguio City, Philippines.

## Features

- **Next.js 14+ App Router** - Modern React framework with Server Components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Responsive Design** - Mobile-first approach with breakpoints
- **SEO Optimized** - Metadata API, sitemap, and robots.txt
- **Image Optimization** - Next.js Image component with automatic optimization
- **Server Actions** - Form submissions and data mutations
- **Static Generation** - Pre-rendered pages for optimal performance
- **Incremental Static Regeneration** - Dynamic content with ISR

## Design System

This project follows a comprehensive design system with:
- Color palette (forest green, warm sage, cream, warm gold)
- Typography scale with responsive clamp() values
- Component specifications (buttons, cards, navigation, forms)
- Layout patterns and spacing systems
- Effects (shadows, transitions, animations)

All design tokens are defined in `design.json` and integrated into Tailwind CSS configuration.

## Project Structure

```
/app
  ├── page.tsx              # Home/Landing Page
  ├── layout.tsx            # Root layout with navigation/footer
  ├── globals.css           # Global styles
  ├── about/                # About the Property
  ├── amenities/            # Amenities Page
  ├── gallery/              # Gallery
  ├── things-to-do/         # Attractions List
  │   └── [slug]/          # Individual Attraction Article
  ├── booking/              # Booking/Availability
  ├── reviews/              # Reviews/Testimonials
  ├── contact/              # Contact Page
  ├── error.tsx             # Error Boundary
  ├── not-found.tsx         # 404 Page
  ├── loading.tsx           # Loading State
  ├── sitemap.ts            # Sitemap Generation
  └── robots.ts             # Robots.txt

/components
  ├── layout/               # Navigation, Footer, Breadcrumbs
  ├── ui/                   # Button, Badge, Input, Label, etc.
  ├── cards/                # Card components
  ├── sections/             # Hero, CTASection, GalleryGrid
  ├── modals/               # ImageLightbox, BookingModal, etc.
  └── forms/                # BookingForm, ContactForm, FormField

/lib
  ├── data.ts               # Data fetching functions
  ├── types.ts              # TypeScript types
  └── utils.ts              # Utility functions

/app/actions
  ├── booking.ts            # Booking server actions
  ├── contact.ts            # Contact server actions
  └── newsletter.ts         # Newsletter server actions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jmg-nest-nextjsv2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Calendar API Key (REQUIRED for calendar integration)
# Get your API key from: https://console.cloud.google.com/apis/credentials
# Enable "Calendar API" in Google Cloud Console
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your_google_calendar_api_key_here

# Optional: Override calendar IDs (defaults are in lib/data.ts)
# NEXT_PUBLIC_MAIN_UNIT_CALENDAR_ID=your_calendar_id_here
# NEXT_PUBLIC_UNIT_A_CALENDAR_ID=your_calendar_id_here
# NEXT_PUBLIC_UNIT_B_CALENDAR_ID=your_calendar_id_here

# Google Maps API Key (if using maps)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Resend API Key (REQUIRED for contact form email functionality)
# Get your API key from: https://resend.com/api-keys
# Sign up at https://resend.com and create an API key
RESEND_API_KEY=re_your_resend_api_key_here

# Optional: Custom "from" email address for contact form
# Defaults to onboarding@resend.dev (test domain)
# For production, verify your domain with Resend and use: info@jmgnest.com
# RESEND_FROM_EMAIL=JMG Nest Contact Form <info@jmgnest.com>

# Analytics (if using)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Base URL
NEXT_PUBLIC_BASE_URL=https://jmgnest.com
```

### Setting Up Google Calendar Integration

1. **Create a Google Cloud Project** (if you don't have one):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Calendar API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

3. **Create API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key and add it to `.env.local` as `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY`

4. **Restrict API Key (Recommended)**:
   - Click on the created API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Calendar API"
   - Under "Application restrictions", you can restrict by HTTP referrer for production

5. **Make Calendars Public**:
   - Open Google Calendar
   - Go to Settings > Settings for my calendars
   - Select each calendar (Main Unit, Unit A, Unit B)
   - Under "Access permissions", check "Make available to public"
   - Copy the Calendar ID (found in "Integrate calendar" section)
   - The Calendar ID format is: `c_xxxxxxxxxxxxx@group.calendar.google.com`

6. **Restart Development Server**:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

**Note**: The calendar IDs are already configured in the code, but you can override them using environment variables if needed.

## Building for Production

```bash
npm run build
npm start
```

## Project Dependencies

### Core Dependencies
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM renderer
- `typescript` - TypeScript compiler

### UI Dependencies
- `tailwindcss` - CSS framework
- `lucide-react` - Icon library
- `clsx` - Conditional class names
- `tailwind-merge` - Merge Tailwind classes

### Development Dependencies
- `@types/node` - Node.js types
- `@types/react` - React types
- `@types/react-dom` - React DOM types
- `autoprefixer` - CSS autoprefixer
- `postcss` - CSS post-processor

## Key Features

### Pages

- **Home** - Hero section, property highlights, amenities preview, gallery, testimonials
- **About** - Property story, host introduction, features, house rules
- **Amenities** - Categorized amenities with visual showcase
- **Gallery** - Filterable image gallery with lightbox
- **Things to Do** - Local attractions with individual pages
- **Booking** - Availability calendar and booking form
- **Reviews** - Guest testimonials with ratings
- **Contact** - Contact form and information

### Components

All components follow the design system specifications:
- Buttons (primary, secondary, text variants)
- Cards (standard, elevated, image card)
- Forms (inputs, labels, textareas with validation)
- Navigation (sticky header with mobile menu)
- Footer (multi-column layout with social links)
- Modals (image lightbox, booking modal, contact modal)

## Design System Compliance

- All colors use exact hex values from design system
- Typography follows responsive clamp() specifications
- Components match design system specifications exactly
- DO_NOT_RULES are followed to prevent misapplication
- Context-specific applications are respected

## Performance Optimization

- Static generation for most pages
- Incremental Static Regeneration (ISR) for dynamic content
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Font optimization with next/font

## SEO

- Metadata API for all pages
- Dynamic metadata for attraction pages
- Sitemap generation
- Robots.txt configuration
- Semantic HTML structure
- Open Graph and Twitter Card tags

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management in modals
- Color contrast compliance
- Touch target sizes (44x44px minimum)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team.

