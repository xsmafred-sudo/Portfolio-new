'use client';

import { motion } from 'framer-motion';

import { Calendar } from '@/components/ui/calendar';
import { SectionHeading } from '@/components/section-heading';
import { useDictionary } from '@/hooks/use-dictionary';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const BookingSection = () => {
  const dict = useDictionary();
  const { ref } = useSectionInView('Booking');

  return (
    <section
      ref={ref}
      id="booking"
      className="my-10 scroll-mt-28 md:mb-20 w-full max-w-4xl mx-auto px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        viewport={{ once: true }}
      >
        <SectionHeading
          heading={dict.booking?.title || 'Book a Meeting'}
          content={dict.booking?.subtitle || "Let's discuss your project"}
        />
      </motion.div>

      <div className="mt-8">
        <Calendar />
      </div>
    </section>
  );
};
