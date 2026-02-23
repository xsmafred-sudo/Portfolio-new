'use client';

import { motion } from 'framer-motion';

import { DestinationCard } from '@/components/ui/destination-card';
import { projectsData } from '@/lib/data';

type TProject = (typeof projectsData)[number];

type TTranslatedContent = {
  title: string;
  description: string;
};

type TProps = {
  project: TProject;
  index: number;
  translatedContent: TTranslatedContent;
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
};

export const Project = ({ project, index, translatedContent }: TProps) => {
  const title = translatedContent?.title ?? project.title;
  const description = translatedContent?.description ?? project.description;
  const stats =
    project.technologies.length > 0
      ? project.technologies.slice(0, 4).join(' • ') +
        (project.technologies.length > 4
          ? ` +${project.technologies.length - 4}`
          : '')
      : 'View Project';

  const href =
    'github' in project.links && project.links.github
      ? project.links.github
      : '#';

  return (
    <motion.article
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
      className="w-full h-[300px] sm:h-[380px] md:h-[420px] lg:h-[460px]"
      aria-labelledby={`project-title-${index}`}
      role="listitem"
    >
      <DestinationCard
        imageUrl={project.imageUrl}
        location={title}
        flag=""
        stats={stats}
        href={href}
        themeColor={project.themeColor}
        description={description}
        headingId={`project-title-${index}`}
      />
    </motion.article>
  );
};
