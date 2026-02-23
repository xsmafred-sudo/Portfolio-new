import { About } from '@/components/about';
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

const HomePage = async () => {
  return (
    <>
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
      </div>
      <div className="fixed bottom-8 right-8 z-50 hidden sm:flex gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </>
  );
};

export default HomePage;
