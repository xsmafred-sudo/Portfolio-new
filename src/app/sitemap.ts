import { promises as fs } from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';

import { getAllSlugs } from '@/lib/blog-posts';
import { siteConfig } from '@/lib/site-config';

const GENERATED_POSTS_FILE = path.join(
  process.cwd(),
  'src/lib/generated-posts.json'
);

interface GeneratedPost {
  slug: string;
  title: string;
  date: string;
}

async function getGeneratedPostSlugs(): Promise<string[]> {
  try {
    const data = await fs.readFile(GENERATED_POSTS_FILE, 'utf-8');
    const posts: GeneratedPost[] = JSON.parse(data);
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticSlugs = getAllSlugs();
  const generatedSlugs = await getGeneratedPostSlugs();
  const allSlugs = Array.from(new Set([...staticSlugs, ...generatedSlugs]));

  const routes = [
    '',
    '/blog',
    '/#about',
    '/#experience',
    '/#projects',
    '/#contact',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === '/blog' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }));

  const blogRoutes = allSlugs.map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
