'use client';

import { motion } from 'framer-motion';

import { skillsData } from '@/lib/data';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export const Skills = () => {
  // Resume skills and languages
  const skillsList = [
    'Java', 'TypeScript', 'JavaScript', 'Python', 'PHP',
    'Spring Boot', 'Hibernate', 'Angular', 'React', 'Next.js', 'Node.js', 'Laravel',
    'AWS', 'GCP', 'Docker', 'Vercel', 'Coolify', 'GitHub Actions', 'Terraform',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase',
    'REST', 'JSON', 'JWT', 'OAuth2', 'WebSocket', 'gRPC', 'GraphQL',
    'OWASP Top-10', 'SSL/TLS', 'network hardening', 'anti-fraud ML',
    'English (Fluent)', 'French (Fluent)'
  ];

  return (
    <div className="mt-10 flex w-full flex-wrap justify-between gap-4 px-5 sm:justify-center sm:px-0 md:mt-14 lg:justify-between">
      {skillsList.map((label, index) => (
        <motion.div
          key={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={index}
        >
          <span className="inline-block rounded border px-3 py-1 text-sm bg-background/80">{label}</span>
        </motion.div>
      ))}
    </div>
  );
};
