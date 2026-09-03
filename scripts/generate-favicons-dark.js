const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');
const fetch = require('node-fetch');

const FAVICON_URL = 'https://res.cloudinary.com/jmg-nest/image/upload/v1764541637/JMGNEST_FAVICON_nvjz2l.png';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Brand colors
const FOREST_GREEN_BACKGROUND = '#1E3D34';

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Favicon sizes and formats to generate (with -dark suffix)
const faviconSizes = [
  { name: 'favicon-16x16-dark.png', size: 16 },
  { name: 'favicon-32x32-dark.png', size: 32 },
  { name: 'apple-touch-icon-dark.png', size: 180 },
  { name: 'android-chrome-192x192-dark.png', size: 192 },
  { name: 'android-chrome-512x512-dark.png', size: 512 },
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

async function generatePNGFavicon(inputBuffer, outputPath, size, backgroundColor) {
  try {
    await sharp(inputBuffer)
      .flatten({ background: backgroundColor })
      .resize(size, size, {
        fit: 'contain',
        kernel: 'lanczos3',
        background: backgroundColor,
      })
      .sharpen()
      .png({ 
        quality: 100, 
        compressionLevel: 9,
        palette: false,
      })
      .toFile(outputPath);
    console.log(`✅ Generated ${path.basename(outputPath)} (${size}x${size}) with ${backgroundColor} background`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating ${outputPath}:`, error.message);
    return false;
  }
}

async function generateICOFavicon(inputBuffer, outputPath, backgroundColor) {
  try {
    const png32Buffer = await sharp(inputBuffer)
      .flatten({ background: backgroundColor })
      .resize(32, 32, {
        fit: 'contain',
        kernel: 'lanczos3',
        background: backgroundColor,
      })
      .sharpen()
      .png({ 
        quality: 100, 
        compressionLevel: 9,
        palette: false,
      })
      .toBuffer();

    const icoBuffer = await toIco([png32Buffer]);
    fs.writeFileSync(outputPath, icoBuffer);
    console.log(`✅ Generated ${path.basename(outputPath)} (32x32 ICO format) with ${backgroundColor} background`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating ${outputPath}:`, error.message);
    return false;
  }
}

async function generateFavicons() {
  console.log(`🚀 Starting dark mode favicon generation with forest green background (#1E3D34)...\n`);

  try {
    const imageBuffer = await downloadImage(FAVICON_URL);
    console.log('');

    const pngResults = await Promise.all(
      faviconSizes.map(({ name, size }) => {
        const outputPath = path.join(PUBLIC_DIR, name);
        return generatePNGFavicon(imageBuffer, outputPath, size, FOREST_GREEN_BACKGROUND);
      })
    );

    const icoPath = path.join(PUBLIC_DIR, 'favicon-dark.ico');
    const icoResult = await generateICOFavicon(imageBuffer, icoPath, FOREST_GREEN_BACKGROUND);

    console.log('\n📊 Generation Summary:');
    const totalFiles = faviconSizes.length + 1;
    const successCount = pngResults.filter(Boolean).length + (icoResult ? 1 : 0);
    
    if (successCount === totalFiles) {
      console.log(`✅ Successfully generated all ${totalFiles} dark mode favicon files!`);
      console.log(`🎨 Background color: ${FOREST_GREEN_BACKGROUND}`);
      console.log('\n📁 Files created in /public directory:');
      faviconSizes.forEach(({ name }) => {
        console.log(`   - ${name}`);
      });
      console.log('   - favicon-dark.ico');
      console.log('\n✨ Dark mode favicon generation complete!');
    } else {
      console.log(`⚠️  Generated ${successCount} out of ${totalFiles} files`);
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Fatal error during favicon generation:', error.message);
    process.exit(1);
  }
}

generateFavicons();

