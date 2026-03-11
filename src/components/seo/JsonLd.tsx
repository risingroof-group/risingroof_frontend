/* ─────────────────────────────────────────────────────────────────
   JSON-LD Structured Data — Rising Roof Group
   Works in both Server and Client components (no 'use client' needed).
   Inject inside <body> — Google reads JSON-LD anywhere in the document.
───────────────────────────────────────────────────────────────── */

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    /* 1 ── Organization */
    {
      '@type': 'Organization',
      '@id': 'https://risingroofgroup.com/#organization',
      name: 'Rising Roof Group',
      alternateName: ['RisingRoof', 'Rising Roof', 'Rising Roof Hyderabad'],
      url: 'https://risingroofgroup.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://risingroofgroup.com/logo.png',
        width: 240,
        height: 60,
        caption: 'Rising Roof Group Logo',
      },
      description:
        "Rising Roof Group is Hyderabad's #1 real estate channel partner offering RERA-verified properties, zero brokerage, and dedicated NRI investment services.",
      foundingDate: '2018',
      foundingLocation: { '@type': 'Place', name: 'Hyderabad, Telangana, India' },
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
      email: 'hellorisingroof@gmail.com',
      telephone: '+91-84593-21228',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-84593-21228',
          contactType: 'sales',
          areaServed: ['IN', 'US', 'GB', 'AE', 'AU', 'SG', 'CA'],
          availableLanguage: ['en', 'hi', 'te'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            opens: '09:00',
            closes: '19:00',
          },
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
      sameAs: [
        'https://www.facebook.com/risingroofgroup',
        'https://www.instagram.com/risingroofgroup',
        'https://www.linkedin.com/company/risingroofgroup',
        'https://twitter.com/risingroofgroup',
        'https://www.youtube.com/@risingroofgroup',
        'https://wa.me/918459321228',
      ],
    },

    /* 2 ── LocalBusiness / RealEstateAgent */
    {
      '@type': ['LocalBusiness', 'RealEstateAgent'],
      '@id': 'https://risingroofgroup.com/#localbusiness',
      name: 'Rising Roof Group',
      image: [
        'https://risingroofgroup.com/og-image.jpg',
        'https://risingroofgroup.com/office.jpg',
      ],
      url: 'https://risingroofgroup.com',
      telephone: '+91-84593-21228',
      priceRange: '₹₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Bank Transfer, Cheque, Online Transfer',
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
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '320',
        bestRating: '5',
        worstRating: '1',
      },
      hasMap: 'https://maps.google.com/?q=Gachibowli,Hyderabad',
      servesCuisine: null,
      description:
        "Hyderabad's #1 real estate channel partner. RERA-verified properties in Gachibowli, HITEC City, Kondapur, Banjara Hills. Zero brokerage. NRI desk available.",
    },

    /* 3 ── WebSite + Sitelinks Searchbox */
    {
      '@type': 'WebSite',
      '@id': 'https://risingroofgroup.com/#website',
      url: 'https://risingroofgroup.com',
      name: 'Rising Roof Group',
      description: 'Find property in Hyderabad — Rising Roof Group',
      inLanguage: 'en-IN',
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

    /* 4 ── BreadcrumbList */
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://risingroofgroup.com' },
        { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://risingroofgroup.com/public-properties' },
        { '@type': 'ListItem', position: 3, name: 'Blog', item: 'https://risingroofgroup.com/public-blogs' },
        { '@type': 'ListItem', position: 4, name: 'Contact', item: 'https://risingroofgroup.com#contact' },
      ],
    },

    /* 5 ── FAQPage — enables rich snippet "People also ask" boxes */
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Rising Roof Group?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rising Roof Group is a premier real estate channel partner in Hyderabad, Telangana. We connect buyers with RERA-verified residential properties across Gachibowli, HITEC City, Kondapur, and 15+ localities. Zero brokerage. 1,200+ families served since 2018.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which areas does Rising Roof Group cover in Hyderabad?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rising Roof Group covers Gachibowli, HITEC City, Financial District, Kondapur, Narsingi, Banjara Hills, Jubilee Hills, Kompally, Tellapur, Shadnagar, Uppal, and LB Nagar.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Rising Roof Group charge brokerage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No! Rising Roof Group charges zero brokerage to buyers. As an authorized channel partner of Prestige, Godrej, Brigade, and 20+ builders, we are compensated directly by the builder, so you pay nothing extra.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Rising Roof Group have NRI property services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our NRI Desk offers live video walkthroughs, FEMA & RBI compliance, NRI home loans (SBI/HDFC/ICICI), Power of Attorney support, and post-purchase rental management. Available on WhatsApp and Zoom 9am–7pm IST.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are Rising Roof Group properties RERA verified?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every listing is 100% RERA-verified under RERA Telangana (rera.telangana.gov.in). We also provide free legal opinion with every purchase.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best area to invest in Hyderabad in 2025?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Top Hyderabad investment zones for 2025: Tellapur (20–25% appreciation p.a.), Financial District (18–22%), Kompally (12–18%), Shadnagar near RRR (15–22%). Hyderabad saw 64% appreciation since 2019 — highest in India.',
          },
        },
        {
          '@type': 'Question',
          name: 'How to book a free consultation with Rising Roof Group?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Call or WhatsApp: +91 84593 21228. Email: hellorisingroof@gmail.com. Or fill the Contact form on risingroofgroup.com. We respond within 2 hours on business days.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the price range of properties listed by Rising Roof Group?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Properties range from ₹25 lakhs (1BHK in Kompally/Uppal) to ₹8 crore+ (villas in Banjara Hills). 2BHK starts ₹50L in Kondapur; 3BHK from ₹85L in HITEC City. Plots from ₹15L in Shadnagar.',
          },
        },
      ],
    },

    /* 6 ── Services */
    {
      '@type': 'Service',
      name: 'Residential Property Buying Services — Hyderabad',
      serviceType: 'Real Estate Brokerage',
      provider: { '@id': 'https://risingroofgroup.com/#organization' },
      areaServed: 'Hyderabad, Telangana, India',
      description: 'Find and buy RERA-verified flats, villas, and plots in Hyderabad with zero brokerage.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: 'Free consultation and zero brokerage for buyers',
      },
    },
    {
      '@type': 'Service',
      name: 'NRI Real Estate Investment Services — Hyderabad',
      serviceType: 'Real Estate Investment Advisory',
      provider: { '@id': 'https://risingroofgroup.com/#organization' },
      areaServed: ['IN', 'US', 'GB', 'AE', 'AU', 'SG', 'CA'],
      description: 'Complete NRI property services: virtual tours, FEMA compliance, NRI loans, POA support, rental management.',
    },
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
    />
  );
}
