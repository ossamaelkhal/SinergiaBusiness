
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sinergia.ai'
  
  const robots = `User-agent: *
Allow: /

# Disallow admin and private pages
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /_next/
Disallow: /profile/

# Allow important pages for SEO
Allow: /
Allow: /sobre
Allow: /servicos
Allow: /casos-de-sucesso
Allow: /blog
Allow: /contato

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  })
}
