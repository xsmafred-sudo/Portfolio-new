import { About } from '@/components/about';
import { AmbientAI } from '@/components/ambient-ai';
import { BookingSection } from '@/components/booking-section';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
import { GitHubSection } from '@/components/github-section';
import { Header } from '@/components/header';
import { Intro } from '@/components/intro';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Projects } from '@/components/projects';
import { SectionDivider } from '@/components/section-divider';
import { Services } from '@/components/services';
import { ThemeToggle } from '@/components/theme-toggle';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { projectsData } from '@/lib/data';

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <div className="fixed inset-0 -z-10">
        <FlickeringGrid
          className="size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.3}
          flickerChance={0.1}
        />
      </div>
      <div className="container flex flex-col items-center">
        <Header />
        <Intro />
        <SectionDivider />
        <Services />
        <About />
        <Experience />
        <Projects />
        <GitHubSection />
        <BookingSection />
        <FlickeringFooter />
        <AmbientAI />
      </div>
      <div className="fixed bottom-8 right-8 z-50 hidden sm:flex gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </>
  );
};

export default HomePage;
