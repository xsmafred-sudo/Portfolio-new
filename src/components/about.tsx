'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/section-heading';
import { Skills } from '@/components/skills';
import { useSectionInView } from '@/hooks/use-section-in-view';

export const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      id="about"
      className="my-10 flex w-full scroll-mt-28 flex-col items-center md:mb-20"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading heading="About Me" />
      <div className="-mt-5 max-w-2xl text-center leading-7">
        <p className="mb-4">
          <strong>SUMMARY:</strong> 4+ years building secure, cloud-native SaaS. Cut PostgreSQL latency 40% for 3M-row dataset; built crypto gateway ($2M monthly, {'<'}0.2% fraud); lead 4-engineer Agile squad.
        </p>
        <p className="mb-4">
          <strong>CORE TECHNOLOGIES:</strong> Java 17, Spring Boot, Angular, React, TypeScript, AWS, GCP, Docker, CI/CD, PostgreSQL, MySQL, MongoDB, Supabase, REST, JSON, JWT, OAuth2, WebSocket, gRPC, GraphQL, OWASP Top-10, SSL/TLS, network hardening, anti-fraud ML
        </p>
        <p className="mb-4">
          <strong>Cloud & DevOps:</strong> AWS, GCP, Docker, Vercel, Coolify, GitHub Actions, Terraform
        </p>
        <p className="mb-4">
          <strong>Languages:</strong> Java, TypeScript, JavaScript, Python, PHP
        </p>
        <p className="mb-4">
          <strong>Location:</strong> Yaoundé, Cameroon | <strong>Phone:</strong> +237 691-958-707
        </p>
        <p className="mb-4">
          <strong>Contact:</strong> <a href="mailto:pepis@pepis.world">pepis@pepis.world</a>
        </p>
      </div>
      <Skills />
    </motion.section>
  );
};
