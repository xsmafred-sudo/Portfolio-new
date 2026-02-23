'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/section-heading';
import { Skills } from '@/components/skills';
import { useDictionary } from '@/hooks/use-dictionary';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const About = () => {
  const { ref } = useSectionInView('About');
  const dict = useDictionary();

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading={dict.about.title} />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          <strong>SUMMARY:</strong> {dict.about.summary}
        </p>
        <p className="mb-4">
          <strong>CORE TECHNOLOGIES:</strong> {dict.about.coreTechnologies}
        </p>
        <p className="mb-4">
          <strong>Cloud & DevOps:</strong> {dict.about.cloudDevOps}
        </p>
        <p className="mb-4">
          <strong>Languages:</strong> Java, TypeScript, JavaScript, Python, PHP
        </p>
        <p className="mb-4">
          <strong>Location:</strong> REMOTE, ONSITE | <strong>Phone:</strong>{' '}
          +237 691-958-707s
        </p>
        <p className="mb-4">
          <strong>Contact:</strong>{' '}
          <a href="mailto:pepis@pepis.world">pepis@pepis.world</a>
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
