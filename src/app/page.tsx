import { promises as fs } from 'fs';
import path from 'path';

import { About } from '@/components/about';
import { AmbientAI } from '@/components/ambient-ai';
import { BlogsSection } from '@/components/blogs-section';
import { BookingSection } from '@/components/booking-section';
import { Experience } from '@/components/experience';
import { GitHubSection } from '@/components/github-section';
import { Header } from '@/components/header';
import { Intro } from '@/components/intro';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Projects } from '@/components/projects';
import { SectionDivider } from '@/components/section-divider';
import { Services } from '@/components/services';
import { ThemeToggle } from '@/components/theme-toggle';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { BlogPost, blogPosts } from '@/lib/blog-posts';
import { projectsData } from '@/lib/data';

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

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projectsData.map((project, index) => ({
    '@type': 'SoftwareApplication',
    position: index + 1,
    name: project.title,
    description: project.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  })),
};

const HomePage = async () => {
  const generatedPosts = await getGeneratedPosts();
  const allPosts = [...generatedPosts, ...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <div className="container flex flex-col items-center">
        <Header />
        <Intro />
        <SectionDivider />
        <Services />
        <About />
        <Experience />
        <Projects />
        <SectionDivider />
        <BlogsSection posts={allPosts} limit={6} showTitle={false} />
        <GitHubSection />
        <BookingSection />
        <FlickeringFooter />
        <AmbientAI />
      </div>
      <div className="fixed bottom-8 right-8 z-50 hidden gap-2 sm:flex">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </>
  );
};

export default HomePage;
