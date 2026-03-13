import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.risingroof.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    /* ── 1. Homepage — highest priority ── */
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    /* ── 2. Properties listing — crawled daily (new listings) ── */
    {
      url: `${BASE_URL}/public-properties`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },

    /* ── 3. Blog listing ── */
    {
      url: `${BASE_URL}/public-blogs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];
}
