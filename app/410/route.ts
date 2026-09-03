import { NextResponse } from 'next/server'

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 - Content Removed | JMG Nest</title>
  <meta name="description" content="This page has been permanently removed.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Crimson Text', Georgia, serif;
      background-color: #FAF9F6;
      color: #1E3D34;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .container {
      max-width: 42rem;
      text-align: center;
    }
    h1 {
      font-size: clamp(2.5rem, 5vw, 3.75rem);
      font-weight: 700;
      color: #1E3D34;
      margin-bottom: 1rem;
      font-family: 'Crimson Text', Georgia, serif;
      line-height: 1.1;
    }
    p {
      font-size: clamp(0.938rem, 2vw, 1.125rem);
      color: #5A6B64;
      margin-bottom: 2rem;
      line-height: 1.7;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
    .links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    @media (min-width: 640px) {
      .links {
        flex-direction: row;
        justify-content: center;
      }
    }
    a {
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-block;
    }
    .btn-primary {
      background-color: #1E3D34;
      color: #FAF9F6;
      padding: 0.875rem 2rem;
      border-radius: 9999px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      box-shadow: 0 4px 16px rgba(30, 61, 52, 0.12);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      font-size: 1rem;
    }
    .btn-primary:hover {
      background-color: #2A5447;
      box-shadow: 0 8px 24px rgba(30, 61, 52, 0.16);
      transform: translateY(-2px);
    }
    .btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 4px 16px rgba(30, 61, 52, 0.12);
    }
    .btn-link {
      color: #C49863;
      text-decoration: underline;
      padding: 0.75rem 0;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      font-size: 1rem;
    }
    .btn-link:hover {
      color: #1E3D34;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>410 - Content Removed</h1>
    <p>This page has been permanently removed and is no longer available.</p>
    <div class="links">
      <a href="/things-to-do" class="btn-primary">Browse Travel Guides</a>
      <a href="/" class="btn-link">Return Home</a>
    </div>
  </div>
</body>
</html>`

  return new NextResponse(html, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}
