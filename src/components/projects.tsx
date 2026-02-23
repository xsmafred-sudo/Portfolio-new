'use client';

import { motion } from 'framer-motion';

import { Project } from '@/components/project';
import { SectionHeading } from '@/components/section-heading';
import { useDictionary } from '@/hooks/use-dictionary';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { projectsData } from '@/lib/data';

const projectKeys = [
  'tasky',
  'prellia',
  'aiSocialMedia',
  'bahinlink',
  'ecommerce',
  'mode',
] as const;

export const Projects = () => {
  const dict = useDictionary();
  const { ref } = useSectionInView('Projects');

  return (
    <section ref={ref} id="projects" className="my-10 scroll-mt-28 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading={dict.projects.title}
          content={dict.projects.subtitle}
        />
      </motion.div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Portfolio projects"
      >
        {projectsData.map((project, index) => (
          <Project
            key={project.title}
            project={project}
            index={index}
            translatedContent={dict.projects[projectKeys[index]]}
          />
        ))}
      </div>
    </section>
  );
};
