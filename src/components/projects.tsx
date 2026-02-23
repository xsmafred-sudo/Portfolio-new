'use client';

import { motion } from 'framer-motion';

import { Project } from '@/components/project';
import { SectionHeading } from '@/components/section-heading';
import { useDictionary } from '@/hooks/use-dictionary';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { projectsData } from '@/lib/data';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {projectsData.map((project, index) => (
          <Project key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};
