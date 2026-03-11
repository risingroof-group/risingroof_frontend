import type { Metadata, Viewport } from 'next';
import './globals.css';
import { NextAuthProvider } from '@/components/providers/SessionProvider';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────
   GLOBAL META TEMPLATE — specific pages override title/desc
─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://risingroofgroup.com'),

  title: {
    default: 'Rising Roof Group | #1 Real Estate Channel Partner in Hyderabad',
    template: '%s | Rising Roof Group Hyderabad',
  },

  description:
    'Rising Roof Group — Hyderabad\'s most trusted real estate channel partner. Premium properties in Gachibowli, HITEC City, Kondapur, Banjara Hills & more. Zero brokerage. RERA verified. Expert NRI investment guidance. 1,200+ happy families. Book a free consultation today.',

  keywords: [
    // Primary high-intent keywords
    'properties in Hyderabad',
    'flats for sale in Hyderabad',
    'real estate Hyderabad',
    'buy property Hyderabad',
    'new apartments Hyderabad',
    'residential projects Hyderabad',
    // Locality-specific
    'properties in Gachibowli',
    'flats in HITEC City',
    'apartments in Kondapur',
    'properties in Banjara Hills',
    'flats in Jubilee Hills',
    'apartments in Kompally',
    'properties in Financial District',
    'houses in Narsingi',
    'flats in Tellapur',
    'properties in Shamirpet',
    // Intent-based
    'channel partner Hyderabad',
    'real estate agent Hyderabad',
    'property consultant Hyderabad',
    'best real estate company Hyderabad',
    'RERA approved properties Hyderabad',
    'luxury apartments Hyderabad',
    '3 BHK flats Hyderabad',
    '2 BHK apartments Hyderabad',
    'villas for sale Hyderabad',
    // NRI
    'NRI property investment Hyderabad',
    'NRI real estate India',
    'buy property in India from USA',
    'NRI home loan Hyderabad',
    // Builder
    'Prestige properties Hyderabad',
    'Godrej properties Hyderabad',
    'Brigade properties Hyderabad',
    // Zero-brokerage / trust
    'zero brokerage property Hyderabad',
    'property without brokerage Hyderabad',
    'verified properties Hyderabad',
    // Long-tail
    'affordable flats in Hyderabad under 1 crore',
    'premium villas in Hyderabad above 2 crore',
    'best locality to buy property in Hyderabad 2025',
    'Rising Roof Group',
  ],

  authors: [{ name: 'Rising Roof Group', url: 'https://risingroofgroup.com' }],
  creator: 'Rising Roof Group',
  publisher: 'Rising Roof Group',

  /* Open Graph — Facebook, LinkedIn, WhatsApp previews */
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://risingroofgroup.com',
    siteName: 'Rising Roof Group',
    title: 'Rising Roof Group | #1 Real Estate Channel Partner in Hyderabad',
    description:
      'Find verified properties in Hyderabad — Gachibowli, HITEC City, Kondapur, Banjara Hills & more. Expert NRI guidance, zero brokerage, 1,200+ happy families.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rising Roof Group — Premium Real Estate in Hyderabad',
        type: 'image/jpeg',
      },
    ],
  },

  /* Twitter / X Card */
  twitter: {
    card: 'summary_large_image',
    site: '@risingroofgroup',
    creator: '@risingroofgroup',
    title: 'Rising Roof Group | Premium Real Estate in Hyderabad',
    description:
      'Verified properties. Zero brokerage. Expert guidance for IT professionals, NRIs & first-time buyers in Hyderabad.',
    images: ['/og-image.jpg'],
  },

  /* Robots */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* Canonical */
  alternates: {
    canonical: 'https://risingroofgroup.com',
    languages: {
      'en-IN': 'https://risingroofgroup.com',
    },
  },

  /* Verification — add your actual codes once site is live */
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE',
    // bing: 'REPLACE_WITH_BING_CODE',
  },

  /* App icons */
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  /* Web manifest */
  manifest: '/site.webmanifest',

  /* Category */
  category: 'Real Estate',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3B1F5E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect for performance → faster LCP → better SEO */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external assets */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Telangana, India" />
        <meta name="geo.position" content="17.385044;78.486671" />
        <meta name="ICBM" content="17.385044, 78.486671" />

        {/* Language */}
        <meta httpEquiv="content-language" content="en-IN" />

        {/* Mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rising Roof" />
      </head>
      <body className={cn('antialiased')}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
