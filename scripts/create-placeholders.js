const fs = require('fs');
const path = require('path');

// Create SVG placeholder function
function createPlaceholderSVG(width, height, text, bgColor = '#D9C7B8', textColor = '#8A9A93') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 10}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

// Image paths to create
const images = [
  // Hero images
  { path: 'public/images/hero-bg.jpg', width: 1920, height: 1080, text: 'Hero Image' },
  { path: 'public/images/about-hero.jpg', width: 1920, height: 1080, text: 'About' },
  { path: 'public/images/amenities-hero.jpg', width: 1920, height: 1080, text: 'Amenities' },
  { path: 'public/images/gallery-hero.jpg', width: 1920, height: 1080, text: 'Gallery' },
  { path: 'public/images/booking-hero.jpg', width: 1920, height: 1080, text: 'Booking' },
  { path: 'public/images/reviews-hero.jpg', width: 1920, height: 1080, text: 'Reviews' },
  { path: 'public/images/contact-hero.jpg', width: 1920, height: 1080, text: 'Contact' },
  { path: 'public/images/things-to-do-hero.jpg', width: 1920, height: 1080, text: 'Things to Do' },
  
  // Gallery images
  { path: 'public/images/gallery/exterior-001.jpg', width: 1200, height: 800, text: 'Exterior' },
  { path: 'public/images/gallery/thumbs/exterior-001.jpg', width: 400, height: 300, text: 'Exterior' },
  { path: 'public/images/gallery/interior-001.jpg', width: 1200, height: 800, text: 'Interior' },
  { path: 'public/images/gallery/thumbs/interior-001.jpg', width: 400, height: 300, text: 'Interior' },
  { path: 'public/images/gallery/bedroom-001.jpg', width: 1200, height: 800, text: 'Bedroom' },
  { path: 'public/images/gallery/thumbs/bedroom-001.jpg', width: 400, height: 300, text: 'Bedroom' },
  { path: 'public/images/gallery/kitchen-001.jpg', width: 1200, height: 800, text: 'Kitchen' },
  { path: 'public/images/gallery/thumbs/kitchen-001.jpg', width: 400, height: 300, text: 'Kitchen' },
  { path: 'public/images/gallery/balcony-001.jpg', width: 1200, height: 800, text: 'Balcony' },
  { path: 'public/images/gallery/thumbs/balcony-001.jpg', width: 400, height: 300, text: 'Balcony' },
  { path: 'public/images/gallery/views-001.jpg', width: 1200, height: 800, text: 'Views' },
  { path: 'public/images/gallery/thumbs/views-001.jpg', width: 400, height: 300, text: 'Views' },
  
  // Guest photos
  { path: 'public/images/guests/maria.jpg', width: 200, height: 200, text: 'MS', bgColor: '#C49863', textColor: '#FAF9F6' },
  { path: 'public/images/guests/john.jpg', width: 200, height: 200, text: 'JC', bgColor: '#C49863', textColor: '#FAF9F6' },
  { path: 'public/images/guests/sarah.jpg', width: 200, height: 200, text: 'SJ', bgColor: '#C49863', textColor: '#FAF9F6' },
  
  // Amenities
  { path: 'public/images/amenities/am-001.jpg', width: 800, height: 600, text: 'Mountain View' },
  { path: 'public/images/amenities/am-002.jpg', width: 800, height: 600, text: 'Kitchen' },
  
  // Attractions
  { path: 'public/images/attractions/stone-kingdom-001.jpg', width: 1200, height: 800, text: 'Igorot Stone Kingdom' },
  { path: 'public/images/attractions/burnham-001.jpg', width: 1200, height: 800, text: 'Burnham Park' },
  { path: 'public/images/attractions/session-001.jpg', width: 1200, height: 800, text: 'Session Road' },
  
  // Reviews
  { path: 'public/images/reviews/rev-001-1.jpg', width: 800, height: 600, text: 'Review Photo' },
  
  // Other
  { path: 'public/images/host.jpg', width: 800, height: 600, text: 'Host' },
  { path: 'public/images/placeholder.jpg', width: 800, height: 600, text: 'Placeholder' },
  { path: 'public/images/og-image.jpg', width: 1200, height: 630, text: 'JMG Nest', bgColor: '#1E3D34', textColor: '#FAF9F6' },
];

// Create all placeholder images
images.forEach(({ path: filePath, width, height, text, bgColor, textColor }) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const svg = createPlaceholderSVG(width, height, text, bgColor, textColor);
  fs.writeFileSync(filePath, svg);
  console.log(`Created: ${filePath}`);
});

console.log(`\n✅ Created ${images.length} placeholder images!`);

