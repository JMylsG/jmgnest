import Image from 'next/image'

interface PlaceholderImageProps {
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
}

// Simple SVG placeholder
const placeholderSvg = (width: number = 800, height: number = 600) => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#D9C7B8"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#8A9A93" text-anchor="middle" dominant-baseline="middle">Image Coming Soon</text>
</svg>`.trim()

export default function PlaceholderImage({ alt, width = 800, height = 600, className, fill }: PlaceholderImageProps) {
  const svgDataUri = `data:image/svg+xml;base64,${Buffer.from(placeholderSvg(width, height)).toString('base64')}`
  
  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={svgDataUri}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    )
  }
  
  return (
    <Image
      src={svgDataUri}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}

