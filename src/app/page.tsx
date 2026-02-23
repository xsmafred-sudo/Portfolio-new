import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
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
        <Contact />
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
