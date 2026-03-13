import type { Metadata } from 'next';

/* ─── Page-level SEO override for the public homepage ─── */
export const metadata: Metadata = {
  title: 'Rising Roof Group | Buy Property in Hyderabad | Channel Partner',
  description:
    'Rising Roof Group is Hyderabad\'s trusted real estate channel partner. Buy verified flats, villas & plots in Gachibowli, HITEC City, Kondapur, Banjara Hills. Zero brokerage · NRI services · Free consultation. 📞 +91 84593 21228',

  keywords: [
    'buy property Hyderabad 2025',
    'real estate Hyderabad',
    'flats for sale Hyderabad',
    'properties in Gachibowli',
    'flats in HITEC City',
    'apartments Kondapur',
    'channel partner Hyderabad',
    'NRI property Hyderabad',
    'RERA verified properties Hyderabad',
    'zero brokerage Hyderabad',
    'Rising Roof Group',
  ],

  alternates: { canonical: 'https://risingroofgroup.com' },

  openGraph: {
    type: 'website',
    url: 'https://risingroofgroup.com',
    title: 'Rising Roof Group | Buy Property in Hyderabad | Zero Brokerage',
    description:
      'Search 500+ verified properties across Hyderabad. Luxury villas, 2/3 BHK flats with RERA approval. Zero brokerage. Book a free consultation today!',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Rising Roof Group Hyderabad' }],
  },
};

/* ─── Structured Data Schemas ─── */
function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      /* 1. Organization */
      {
        '@type': 'Organization',
        '@id': 'https://risingroofgroup.com/#organization',
        name: 'Rising Roof Group',
        url: 'https://risingroofgroup.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://risingroofgroup.com/logo.png',
          width: 240,
          height: 60,
        },
        description:
          'Rising Roof Group is a premier real estate channel partner in Hyderabad, Telangana, offering verified residential properties, NRI investment services, and expert property guidance.',
        foundingDate: '2018',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-84593-21228',
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Telugu'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-84593-21228',
            contactType: 'customer service',
            contactOption: 'TollFree',
            areaServed: ['IN', 'US', 'GB', 'AE'],
          },
        ],
        email: 'hellorisingroof@gmail.com',
        sameAs: [
          'https://www.facebook.com/risingroofgroup',
          'https://www.instagram.com/risingroofgroup',
          'https://www.linkedin.com/company/risingroofgroup',
          'https://twitter.com/risingroofgroup',
          'https://www.youtube.com/@risingroofgroup',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gachibowli',
          addressLocality: 'Hyderabad',
          addressRegion: 'Telangana',
          postalCode: '500032',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 17.4399,
          longitude: 78.3489,
        },
        areaServed: [
          { '@type': 'City', name: 'Hyderabad' },
          { '@type': 'State', name: 'Telangana' },
        ],
      },

      /* 2. Local Business (Real Estate Agent) */
      {
        '@type': ['LocalBusiness', 'RealEstateAgent'],
        '@id': 'https://risingroofgroup.com/#localbusiness',
        name: 'Rising Roof Group',
        image: 'https://risingroofgroup.com/og-image.jpg',
        url: 'https://risingroofgroup.com',
        telephone: '+91-84593-21228',
        priceRange: '₹₹₹',
        currenciesAccepted: 'INR',
        paymentAccepted: 'Bank Transfer, Cheque',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gachibowli',
          addressLocality: 'Hyderabad',
          addressRegion: 'Telangana',
          postalCode: '500032',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 17.4399,
          longitude: 78.3489,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '320',
          bestRating: '5',
          worstRating: '1',
        },
        description:
          'Hyderabad\'s #1 real estate channel partner. RERA-verified properties in Gachibowli, HITEC City, Kondapur, Banjara Hills. Zero brokerage. NRI desk available.',
        hasMap: 'https://maps.google.com/?q=17.4399,78.3489',
        servesCuisine: null,
        branchOf: { '@id': 'https://risingroofgroup.com/#organization' },
      },

      /* 3. Website + Search action (Google Sitelinks Searchbox) */
      {
        '@type': 'WebSite',
        '@id': 'https://risingroofgroup.com/#website',
        url: 'https://risingroofgroup.com',
        name: 'Rising Roof Group',
        description: 'Find property in Hyderabad — Rising Roof Group',
        publisher: { '@id': 'https://risingroofgroup.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://risingroofgroup.com/public-properties?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },

      /* 4. Breadcrumb for homepage */
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://risingroofgroup.com/#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://risingroofgroup.com' },
          { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://risingroofgroup.com/public-properties' },
          { '@type': 'ListItem', position: 3, name: 'Blog', item: 'https://risingroofgroup.com/public-blogs' },
        ],
      },

      /* 5. FAQPage schema — boosts Google rich snippets */
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Rising Roof Group?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rising Roof Group is a premier real estate channel partner in Hyderabad, Telangana. We help IT professionals, NRIs, and first-time buyers find verified, RERA-approved residential properties across Hyderabad with zero brokerage.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which areas does Rising Roof Group cover in Hyderabad?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rising Roof Group covers all major Hyderabad localities including Gachibowli, HITEC City, Financial District, Kondapur, Banjara Hills, Jubilee Hills, Kompally, Narsingi, Tellapur, Shadnagar, Uppal, and LB Nagar.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Rising Roof Group charge brokerage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No! Rising Roof Group offers zero brokerage to buyers. As a channel partner of top builders like Prestige, Godrej, and Brigade, we are compensated by builders directly, so buyers pay nothing extra.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Rising Roof Group help NRI buyers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we have a dedicated NRI Desk offering live video property walkthroughs, FEMA & RBI compliance support, NRI home loan assistance from SBI/HDFC/ICICI, Power of Attorney support, and rental management services. Available on WhatsApp and Zoom.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are all properties listed by Rising Roof Group RERA verified?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every property listed by Rising Roof Group is 100% RERA verified under RERA Telangana (rera.telangana.gov.in). We also provide free legal opinion on every purchase.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the best area to invest in Hyderabad in 2025?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Top investment areas in Hyderabad for 2025 include Tellapur (20-25% appreciation), Financial District (18-22%), Kompally (12-18%), and Shadnagar (15-22% near RRR). Hyderabad has seen 64% overall appreciation since 2019.',
            },
          },
        ],
      },

      /* 6. Service offerings */
      {
        '@type': 'Service',
        name: 'NRI Property Investment Services',
        serviceType: 'Real Estate Investment Advisory',
        provider: { '@id': 'https://risingroofgroup.com/#organization' },
        areaServed: ['IN', 'US', 'GB', 'AE', 'AU', 'SG'],
        description:
          'Complete NRI real estate investment services including virtual property tours, FEMA compliance, NRI home loans, and property management in Hyderabad.',
        url: 'https://risingroofgroup.com/#nri',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export { LocalBusinessSchema as generateStructuredData };

// Re-export as named export for the page to use
export function StructuredData() {
  return <LocalBusinessSchema />;
}
