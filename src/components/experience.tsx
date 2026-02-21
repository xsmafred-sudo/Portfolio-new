'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { Icons } from '@/components/icons';
import { SectionHeading } from '@/components/section-heading';
import { useSectionInView } from '@/hooks/use-section-in-view';
import { experiencesData } from '@/lib/data';
import { cn } from '@/lib/utils';

export const Experience = () => {
  const { ref: sectionRef } = useSectionInView('Experience');

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="my-10 scroll-mt-28 md:mb-20"
    >
      <SectionHeading
        heading="Experience"
        content="Professional experience from Mouil Prosper's resume."
      />
      <div className="relative max-w-screen-md">
        {[
          {
            title: 'Full-Stack Developer',
            company: 'Stevo Digital',
            period: '2023 – 2025',
            description: 'Shipped 5 major features per 6-week sprint (Spring Boot + Angular/React). Reduced deployment time 35 % by moving GCP workloads to Coolify CI/CD. Built REST micro-services serving 1 M+ monthly calls at 99.9 % uptime. Boosted user-engagement 18 % via Hotjar-driven UI/UX iterations.',
            technologies: ['Spring Boot', 'Angular', 'React', 'GCP', 'Coolify', 'Hotjar'],
          },
          {
            title: 'Software Engineer & IT Support',
            company: 'Micro QQ Tech',
            period: '2022 – 2023',
            description: 'Designed Laravel CMS for maternity records; accelerated data retrieval 40 %. Administered Ubuntu VPS & PostgreSQL; zero security incidents. Mentored 4 junior devs on Git flow, code reviews, unit testing. Rolled out campus-wide upgrades for 75+ workstations.',
            technologies: ['Laravel', 'Ubuntu', 'PostgreSQL', 'Git', 'Unit Testing'],
          },
        ].map(({ title, description, company, period, technologies }) => (
          <div
            key={company}
            className="not-last:pb-12 relative pl-8 [&:not(:last-child)]:pb-10"
          >
            <div className="bg-muted absolute left-0 top-2.5 h-full w-[2px] group-first:top-6 group-first:h-[calc(100%-24px)]">
              <div className="border-primary bg-background absolute left-[-5px] top-0 size-3 rounded-full border-2" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.175 }}
              viewport={{ once: true }}
              className={cn('space-y-3 opacity-0')}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border">
                  <Icons.building className="size-5" />
                </div>
                <span className="text-lg font-semibold">{company}</span>
              </div>
              <div>
                <h3 className="text-xl font-medium">{title}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <Icons.calendar className="size-4" />
                  <span>{period}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{description}</p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="rounded-full border px-3 py-1 text-sm "
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
