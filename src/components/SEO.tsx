import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
}

export default function SEO({ title, description, keywords, ogImage, ogUrl }: SEOProps) {
  const siteName = 'Loakim Integrated Services'
  const fullTitle = `${title} | ${siteName}`
  const defaultImage = 'https://loakim.base44.app/og-image.jpg'
  const defaultUrl = 'https://loakim.base44.app'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Loakim Integrated Services" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content={ogUrl || defaultUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      <link rel="canonical" href={ogUrl || defaultUrl} />
    </Helmet>
  )
}
