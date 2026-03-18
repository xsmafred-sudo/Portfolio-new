import { promises as fs } from 'fs';
import path from 'path';
import { ArrowLeft, Linkedin, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { BlogsSection } from '@/components/blogs-section';
import { Header } from '@/components/header';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { BlogPost, blogPosts } from '@/lib/blog-posts';
import { siteConfig } from '@/lib/site-config';

const GENERATED_POSTS_FILE = path.join(
  process.cwd(),
  'src/lib/generated-posts.json'
);

export const revalidate = 3600;

async function getGeneratedPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(GENERATED_POSTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on full-stack development, cloud architecture, AI/ML, and tech trends. Learn from real-world experience building scalable applications.',
  keywords: [
    'developer blog',
    'full-stack development',
    'tech tutorials',
    'software engineering',
    'Spring Boot',
    'React',
    'cloud architecture',
  ],
  openGraph: {
    title: `Blog | ${siteConfig.title}`,
    description:
      'Insights on full-stack development, cloud architecture, AI/ML, and tech trends.',
    type: 'website',
    url: `${siteConfig.url}/blog`,
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default async function BlogPage() {
  const generatedPosts = await getGeneratedPosts();
  const allPosts = [...generatedPosts, ...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <div className="container flex flex-col items-center">
        <Header />
        <main className="w-full">
          <div className="container mx-auto px-4 py-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>

            <header className="mb-12 max-w-3xl">
              <h1 className="font-heading mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                Blog
              </h1>
              <p className="text-muted-foreground text-lg">
                Insights on full-stack development, cloud architecture, AI/ML,
                and the latest tech trends. Written from real-world experience
                building scalable applications.
              </p>
            </header>

            <BlogsSection posts={allPosts} showTitle={false} />

            <section className="bg-card mx-auto mt-16 max-w-3xl rounded-lg border p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Have Questions?</h2>
              <p className="text-muted-foreground mb-6">
                I&apos;m always happy to help! Reach out and let&apos;s discuss
                your project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:xsmafred@gmail.com"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
                >
                  <Mail className="size-4" />
                  Email Me
                </a>
                <a
                  href="https://linkedin.com/in/prosper-merimee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-accent inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
                <a
                  href="https://wa.me/237691958707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background hover:bg-accent inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
                >
                  <Phone className="size-4" />
                  WhatsApp
                </a>
              </div>
            </section>
          </div>
        </main>
        <FlickeringFooter />
      </div>
      <div className="fixed bottom-8 right-8 z-50 hidden gap-2 sm:flex">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </>
  );
}
