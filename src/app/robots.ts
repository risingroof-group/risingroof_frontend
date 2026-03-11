import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* Allow all bots to crawl all public pages */
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/dashboard',
          '/admin/properties',
          '/admin/blogs',
          '/login',
          '/api/',
          '/_next/',
        ],
      },
      /* Googlebot — full access */
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/login', '/api/'],
      },
      /* Bingbot — full access */
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/login', '/api/'],
      },
    ],
    sitemap: 'https://risingroofgroup.com/sitemap.xml',
    host: 'https://risingroofgroup.com',
  };
}
