import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { ActiveSectionProvider } from '@/components/active-section-provider';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/toaster';
import { fonts } from '@/lib/fonts';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: siteConfig.url,
    },
  },
  category: 'technology',
  classification: "Developer's Portfolio",
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  verification: {
    google: siteConfig.googleSiteVerificationId,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mouil Prosper',
    jobTitle: 'Front-end Developer',
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      'https://github.com/yourhandle',
      'https://linkedin.com/in/mouil-prosper',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Angular',
      'Java',
      'Spring Boot',
      'Node.js',
      'HTML5',
      'CSS3',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('min-h-screen font-sans', fonts)}>
        <Providers>
          <ActiveSectionProvider>
            {children}
            <Toaster position="bottom-left" />
          </ActiveSectionProvider>
        </Providers>
      </body>
    </html>
  );
}
