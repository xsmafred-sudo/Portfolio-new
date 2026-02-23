'use client';

import { motion } from 'framer-motion';

import { ServiceCarousel, type Service } from '@/components/ui/services-card';
import { Code, Cloud, Database, Shield, Palette, Search } from 'lucide-react';
import { useDictionary } from '@/hooks/use-dictionary';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const Services = () => {
  const { ref } = useSectionInView('Services');
  const dict = useDictionary();

  const servicesData: Service[] = [
    {
      number: '001',
      title: dict.services.fullstack.title,
      description: dict.services.fullstack.description,
      icon: Code,
      gradient:
        'from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50',
    },
    {
      number: '002',
      title: dict.services.cloud.title,
      description: dict.services.cloud.description,
      icon: Cloud,
      gradient:
        'from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50',
    },
    {
      number: '003',
      title: dict.services.api.title,
      description: dict.services.api.description,
      icon: Search,
      gradient:
        'from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50',
    },
    {
      number: '004',
      title: dict.services.database.title,
      description: dict.services.database.description,
      icon: Database,
      gradient:
        'from-orange-100 to-orange-200 dark:from-orange-900/50 dark:to-orange-800/50',
    },
    {
      number: '005',
      title: dict.services.security.title,
      description: dict.services.security.description,
      icon: Shield,
      gradient:
        'from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50',
    },
    {
      number: '006',
      title: dict.services.uiux.title,
      description: dict.services.uiux.description,
      icon: Palette,
      gradient:
        'from-pink-100 to-pink-200 dark:from-pink-900/50 dark:to-pink-800/50',
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="services"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <div className="text-center w-full max-w-6xl mb-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          {dict.services.title}.
        </h1>
      </div>
      <ServiceCarousel services={servicesData} />
    </motion.section>
  );
};
