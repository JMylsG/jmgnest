const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');
const fetch = require('node-fetch');

const FAVICON_URL = 'https://res.cloudinary.com/jmg-nest/image/upload/v1764541637/JMGNEST_FAVICON_nvjz2l.png';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Brand colors
const CREAM_BACKGROUND = '#FAF9F6';
const FOREST_GREEN_BACKGROUND = '#1E3D34';

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Favicon sizes and formats to generate
// Note: 48x48 and 96x96 are required by Google for search result favicons
const faviconSizes = [
  { name: 'favicon-16x16.png', size: 16 }, // Browser tab favicon (small)
  { name: 'favicon-32x32.png', size: 32 }, // Browser tab favicon (standard)
  { name: 'favicon-48x48.png', size: 48 }, // Google search results (minimum)
  { name: 'favicon-96x96.png', size: 96 }, // Google search results (recommended)
  { name: 'apple-touch-icon.png', size: 180 }, // iOS home screen icon
  { name: 'android-chrome-192x192.png', size: 192 }, // Android home screen icon
  { name: 'android-chrome-512x512.png', size: 512 }, // Android splash screen
];

async function downloadImage(url) {
  try {
    console.log('📥 Downloading favicon image from Cloudinary...');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
    }
    const buffer = await response.buffer();
    console.log('✅ Image downloaded successfully');
    return buffer;
  } catch (error) {
    console.error('❌ Error downloading image:', error.message);
    throw error;
  }
}

async function generatePNGFavicon(inputBuffer, outputPath, size) {
  try {
    await sharp(inputBuffer)
      // NO .flatten() - preserve transparency
      .resize(size, size, {
        fit: 'contain', // Preserve aspect ratio, fit within bounds
        kernel: 'lanczos3', // High-quality resampling algorithm
        // NO background parameter - preserve transparency
      })
      .sharpen() // Improve edge clarity for small sizes
      .png({ 
        quality: 100, 
        compressionLevel: 9, // Maximum compression (0-9, 9 = best compression)
        palette: false, // Use true color (not palette-based)
      })
      .toFile(outputPath);
    console.log(`✅ Generated ${path.basename(outputPath)} (${size}x${size}) with transparency preserved`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating ${outputPath}:`, error.message);
    return false;
  }
}

async function generateICOFavicon(inputBuffer, outputPath) {
  try {
    // Generate 32x32 PNG first with transparency preserved and high quality
    const png32Buffer = await sharp(inputBuffer)
      // NO .flatten() - preserve transparency
      .resize(32, 32, {
        fit: 'contain', // Preserve aspect ratio
        kernel: 'lanczos3', // High-quality resampling
        // NO background parameter - preserve transparency
      })
      .sharpen() // Improve edge clarity
      .png({ 
        quality: 100, 
        compressionLevel: 9,
        palette: false,
      })
      .toBuffer();

    // Convert PNG to ICO format
    const icoBuffer = await toIco([png32Buffer]);
    fs.writeFileSync(outputPath, icoBuffer);
    console.log(`✅ Generated ${path.basename(outputPath)} (32x32 ICO format) with transparency preserved`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating ${outputPath}:`, error.message);
    return false;
  }
}

async function generateFavicons() {
  console.log('🚀 Starting favicon generation with transparency preserved...\n');

  try {
    // Download the source image
    const imageBuffer = await downloadImage(FAVICON_URL);
    console.log('');

    // Generate PNG favicons with high quality and transparency preserved
    const pngResults = await Promise.all(
      faviconSizes.map(({ name, size }) => {
        const outputPath = path.join(PUBLIC_DIR, name);
        return generatePNGFavicon(imageBuffer, outputPath, size);
      })
    );

    // Generate ICO favicon with transparency preserved
    const icoPath = path.join(PUBLIC_DIR, 'favicon.ico');
    const icoResult = await generateICOFavicon(imageBuffer, icoPath);

    // Summary
    console.log('\n📊 Generation Summary:');
    const totalFiles = faviconSizes.length + 1; // PNGs + ICO
    const successCount = pngResults.filter(Boolean).length + (icoResult ? 1 : 0);
    
    if (successCount === totalFiles) {
      console.log(`✅ Successfully generated all ${totalFiles} favicon files!`);
      console.log(`🎨 Transparency: Preserved (no background added)`);
      console.log('\n📁 Files created in /public directory:');
      faviconSizes.forEach(({ name }) => {
        console.log(`   - ${name}`);
      });
      console.log('   - favicon.ico');
      console.log('\n✨ Favicon generation complete!');
    } else {
      console.log(`⚠️  Generated ${successCount} out of ${totalFiles} files`);
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Fatal error during favicon generation:', error.message);
    process.exit(1);
  }
}

// Run the script
generateFavicons();
