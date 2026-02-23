'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { GitHubCalendar } from '@/components/ui/git-hub-calendar';
import { SectionHeading } from '@/components/section-heading';
import { useDictionary } from '@/hooks/use-dictionary';
import { useSectionInView } from '@/hooks/use-section-in-view';

interface ContributionDay {
  date: string;
  count: number;
}

const generateSimulatedData = (): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  const seed = 12345;

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const pseudoRandom = Math.sin(seed + i) * 10000;
    const randomVal = pseudoRandom - Math.floor(pseudoRandom);

    let count: number;
    if (isWeekend) {
      count = randomVal > 0.7 ? Math.floor(randomVal * 4) + 1 : 0;
    } else {
      count =
        randomVal > 0.3
          ? Math.floor(randomVal * 6) + 1
          : Math.floor(randomVal * 3);
    }

    data.push({ date: dateStr, count });
  }

  return data;
};

export const GitHubSection = () => {
  const dict = useDictionary();
  const { ref } = useSectionInView('GitHub');

  const contributionData = useMemo(() => generateSimulatedData(), []);

  return (
    <section
      ref={ref}
      id="github"
      className="my-10 scroll-mt-28 md:mb-20 w-full max-w-4xl mx-auto px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading={dict.github?.title || 'GitHub Contributions'}
          content={
            dict.github?.subtitle || 'My contribution activity on GitHub'
          }
        />
      </motion.div>

      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="w-full overflow-x-auto flex justify-center">
          <GitHubCalendar data={contributionData} />
        </div>
      </div>
    </section>
  );
};
