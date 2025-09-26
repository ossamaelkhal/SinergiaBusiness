
import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  keywords?: string[]
}

export function SEOHead({
  title,
  description,
  image = '/og-image.jpg',
  url = 'https://sinergia.ai',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  keywords = []
}: SEOHeadProps) {
  const fullTitle = title.includes('SinergIA') ? title : `${title} | SinergIA`
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="SinergIA" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@sinergia_ai" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SinergIA",
            "description": "Plataforma Premium de IA Multiagente para PMEs",
            "url": "https://sinergia.ai",
            "logo": "https://sinergia.ai/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-11-99999-9999",
              "contactType": "customer service",
              "availableLanguage": "Portuguese"
            },
            "sameAs": [
              "https://linkedin.com/company/sinergia-ai",
              "https://twitter.com/sinergia_ai"
            ]
          })
        }}
      />
    </Head>
  )
}
