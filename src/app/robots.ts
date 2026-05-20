import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/company/', '/api/', '/_next/'],
    },
    sitemap: 'https://sinergia.business/sitemap.xml',
  }
}
