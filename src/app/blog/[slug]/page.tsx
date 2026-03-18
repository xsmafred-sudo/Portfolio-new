import { promises as fs } from 'fs';
import path from 'path';
import { ArrowLeft, ArrowRight, Linkedin, Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Header } from '@/components/header';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { BlogPost, blogPosts, getAllSlugs } from '@/lib/blog-posts';
import { siteConfig } from '@/lib/site-config';

const GENERATED_POSTS_FILE = path.join(
  process.cwd(),
  'src/lib/generated-posts.json'
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getGeneratedPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(GENERATED_POSTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const generatedPosts = await getGeneratedPosts();
  const generatedSlugs = generatedPosts.map((p) => p.slug);
  const staticSlugs = getAllSlugs();
  const allSlugs = Array.from(new Set([...staticSlugs, ...generatedSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const generatedPosts = await getGeneratedPosts();
  const allPosts = [...generatedPosts, ...blogPosts];
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: `${siteConfig.url}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`,
    },
  };
}

function ContactCTA() {
  return (
    <div className="bg-muted/50 my-8 rounded-lg border p-6">
      <h3 className="mb-3 text-xl font-bold">Got Questions?</h3>
      <p className="text-muted-foreground mb-4">
        I&apos;m always happy to help! Here&apos;s how you can reach me:
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="mailto:xsmafred@gmail.com"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
        >
          <Mail className="size-4" />
          xsmafred@gmail.com
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
          +237 691-958-707
        </a>
      </div>
    </div>
  );
}

function BlogContent({ content }: { content: string }) {
  const paragraphs = content.split('\n\n');

  return (
    <div className="prose prose-stone dark:prose-invert max-w-none">
      {paragraphs.map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="mb-4 mt-8 text-2xl font-bold">
              {paragraph.replace('## ', '')}
            </h2>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className="mb-3 mt-6 text-xl font-semibold">
              {paragraph.replace('### ', '')}
            </h3>
          );
        }
        if (paragraph.startsWith('```')) {
          const codeContent = paragraph.replace(/```\w*\n?/g, '');
          return (
            <pre
              key={index}
              className="bg-muted my-4 overflow-x-auto rounded-lg p-4"
            >
              <code className="text-sm">{codeContent}</code>
            </pre>
          );
        }
        if (paragraph.startsWith('- ')) {
          const items = paragraph
            .split('\n')
            .filter((line) => line.startsWith('- '));
          return (
            <ul key={index} className="my-4 list-disc pl-6">
              {items.map((item, i) => (
                <li key={i} className="mb-2">
                  {item.replace('- ', '')}
                </li>
              ))}
            </ul>
          );
        }
        if (paragraph.startsWith('|')) {
          const rows = paragraph
            .split('\n')
            .filter((row) => row.startsWith('|'));
          const headerRow = rows[1] || '';
          const bodyRows = rows.slice(3);

          return (
            <div key={index} className="my-4 overflow-x-auto">
              <table className="border-border w-full border-collapse border">
                <thead>
                  <tr className="bg-muted">
                    {headerRow
                      .split('|')
                      .filter((cell) => cell.trim())
                      .map((cell, i) => (
                        <th
                          key={i}
                          className="border-border border px-4 py-2 text-left font-semibold"
                        >
                          {cell.trim()}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row
                        .split('|')
                        .filter((cell) => cell.trim())
                        .map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border-border border px-4 py-2"
                          >
                            {cell.trim()}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return (
            <p key={index} className="my-4 font-semibold">
              {paragraph.replace(/\*\*/g, '')}
            </p>
          );
        }
        if (paragraph.startsWith('---')) {
          return <hr key={index} className="my-8" />;
        }
        if (paragraph.trim()) {
          return (
            <p key={index} className="my-4 leading-relaxed">
              {paragraph}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const generatedPosts = await getGeneratedPosts();
  const allPosts = [...generatedPosts, ...blogPosts];
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorTitle,
      url: siteConfig.url,
    },
    datePublished: post.date,
    publisher: {
      '@type': 'Person',
      name: post.author,
    },
    keywords: post.tags.join(', '),
    url: `${siteConfig.url}/blog/${slug}`,
  };

  return (
    <>
      <div className="container flex flex-col items-center">
        <Header />
        <main className="w-full">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <div className="container mx-auto px-4 py-8">
            <article className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm transition-colors"
              >
                <ArrowLeft className="size-4" />
                Back to Blog
              </Link>

              <header className="mb-8">
                <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-muted-foreground/50">|</span>
                  <span>{post.readTime}</span>
                  <span className="text-muted-foreground/50">|</span>
                  <span>{post.category}</span>
                </div>

                <h1 className="font-heading mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
                  {post.title}
                </h1>

                <p className="text-muted-foreground text-lg">{post.excerpt}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <BlogContent content={post.content} />

              <ContactCTA />

              <div className="mt-12 border-t pt-8">
                <h3 className="mb-4 text-xl font-bold">About the Author</h3>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full text-lg font-bold">
                    MP
                  </div>
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-muted-foreground text-sm">
                      {post.authorTitle}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Results-driven Full-Stack Engineer with 4+ years of
                      experience building scalable, cloud-native applications.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {relatedPosts.length > 0 && (
              <section className="mx-auto mt-16 max-w-5xl">
                <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="hover:bg-muted/50 group rounded-lg border p-6"
                    >
                      <span className="text-muted-foreground text-xs">
                        {new Date(relatedPost.date).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                      <h3 className="group-hover:text-primary mt-2 font-semibold">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                        {relatedPost.excerpt}
                      </p>
                      <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm">
                        Read more <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h3 className="mb-4 text-xl font-bold">
                Ready to Start Your Project?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let&apos;s discuss how I can help bring your ideas to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:xsmafred@gmail.com"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-6 py-3 font-medium"
                >
                  <Mail className="size-4" />
                  Get in Touch
                </a>
                <Link
                  href="/#booking"
                  className="bg-background hover:bg-accent inline-flex items-center gap-2 rounded-md border px-6 py-3 font-medium"
                >
                  Book a Call
                </Link>
              </div>
            </div>
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
