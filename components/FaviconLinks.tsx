/**
 * Optional component for dark mode favicon support
 * Add this to your layout if you want to support both light and dark mode favicons
 * 
 * Note: This requires running both generate-favicons and generate-favicons-dark scripts
 */
export default function FaviconLinks() {
  return (
    <>
      {/* Light mode favicons (default) */}
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Dark mode favicons (prefers-color-scheme: dark) */}
      <link 
        rel="icon" 
        type="image/png" 
        sizes="16x16" 
        href="/favicon-16x16-dark.png" 
        media="(prefers-color-scheme: dark)"
      />
      <link 
        rel="icon" 
        type="image/png" 
        sizes="32x32" 
        href="/favicon-32x32-dark.png" 
        media="(prefers-color-scheme: dark)"
      />
      <link 
        rel="icon" 
        href="/favicon-dark.ico" 
        media="(prefers-color-scheme: dark)"
      />
      <link 
        rel="apple-touch-icon" 
        sizes="180x180" 
        href="/apple-touch-icon-dark.png" 
        media="(prefers-color-scheme: dark)"
      />
    </>
  );
}

