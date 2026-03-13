import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* ── Default: allow all search bots on public pages ── */
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/login',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      /* ── Googlebot: explicit full access ── */
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/login', '/api/'],
      },
      /* ── Bingbot: explicit full access ── */
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/login', '/api/'],
      },
      /* ── Block AI scrapers that don't contribute to rankings ── */
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'CCBot'],
        disallow: '/',
      },
    ],
    sitemap: [
      'https://www.risingroof.in/sitemap.xml',
      'https://risingroof.in/sitemap.xml',
    ],
    host: 'https://www.risingroof.in',
  };
}
