export const en = {
  nav: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    github: 'GitHub',
    booking: 'Booking',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hello, I'm",
    title: 'Full-Stack Developer',
    name: 'Mouil Prosper',
    subtitle:
      '4+ years building secure, cloud-native SaaS. Cut PostgreSQL latency 40% for 3M-row dataset; built crypto gateway (2M monthly, <0.2% fraud); lead 4-engineer Agile squad. Stack: Java 17, Spring Boot, Angular, React, TypeScript, AWS, GCP, Docker, CI/CD.',
    location: 'REMOTE, ONSITE | +237 691-958-707',
    available: 'Available for work!',
  },
  services: {
    title: 'Services',
    fullstack: {
      title: 'Full-Stack Development',
      description:
        'Building secure, scalable applications with Java, Spring Boot, React, Next.js, and TypeScript.',
    },
    cloud: {
      title: 'Cloud & DevOps',
      description:
        'Deploying and managing applications on AWS, GCP, Docker, Vercel, and implementing CI/CD pipelines.',
    },
    api: {
      title: 'API Development',
      description:
        'Designing RESTful APIs, GraphQL endpoints, and microservices with secure authentication.',
    },
    database: {
      title: 'Database Management',
      description:
        'Managing PostgreSQL, MySQL, MongoDB, and Supabase with optimization for performance and security.',
    },
    security: {
      title: 'Security & Anti-Fraud',
      description:
        'Implementing OWASP Top-10 security practices, SSL/TLS, network hardening, and ML-based fraud detection.',
    },
    uiux: {
      title: 'UI/UX Development',
      description:
        'Creating intuitive, responsive interfaces with React, Angular, and modern design principles.',
    },
  },
  about: {
    title: 'About Me',
    summary:
      '4+ years building secure, cloud-native SaaS. Cut PostgreSQL latency 40% for 3M-row dataset; built crypto gateway (2M monthly, <0.2% fraud); lead 4-engineer Agile squad.',
    coreTechnologies:
      'Java 17, Spring Boot, Angular, React, TypeScript, AWS, GCP, Docker, CI/CD, PostgreSQL, MySQL, MongoDB, Supabase, REST, JSON, JWT, OAuth2, WebSocket, gRPC, GraphQL, OWASP Top-10, SSL/TLS, network hardening, anti-fraud ML',
    cloudDevOps: 'AWS, GCP, Docker, Vercel, Coolify, GitHub Actions, Terraform',
  },
  experience: {
    title: 'Experience',
    subtitle: "Professional experience from Mouil Prosper's resume.",
    stevo: {
      role: 'Full-Stack Developer',
      company: 'Stevo Digital',
      period: '2023 – 2025',
      description:
        'Shipped 5 major features per 6-week sprint (Spring Boot + Angular/React). Reduced deployment time 35% by moving GCP workloads to Coolify CI/CD. Built REST micro-services serving 1M+ monthly calls at 99.9% uptime. Boosted user-engagement 18% via Hotjar-driven UI/UX iterations.',
    },
    microqq: {
      role: 'Software Engineer & IT Support',
      company: 'Micro QQ Tech',
      period: '2022 – 2023',
      description:
        'Designed Laravel CMS for maternity records; accelerated data retrieval 40%. Administered Ubuntu VPS & PostgreSQL; zero security incidents. Mentored 4 junior devs on Git flow, code reviews, unit testing. Rolled out campus-wide upgrades for 75+ workstations.',
    },
  },
  projects: {
    title: 'Projects',
    subtitle: "Selected projects from Mouil Prosper's resume.",
    viewCode: 'View Code',
    liveDemo: 'Live Demo',
    tasky: {
      title: 'Tasky',
      description:
        'Multi-tenant task manager. Dockerised containers deployed to VPS with auto-SSL.',
    },
    prellia: {
      title: 'Prellia',
      description:
        'Crypto payment gateway. Processes BTC, ETH, USDT; integrated 3 exchanges; fraud rate < 0.2 %.',
    },
    aiSocialMedia: {
      title: 'AI Social Media Manager',
      description:
        'Auto-generates and schedules posts; reduces content-team workload 60 %.',
    },
    bahinlink: {
      title: 'Bahinlink',
      description:
        'Security-management platform. Manages security operations, agent tracking, and client communications.',
    },
    ecommerce: {
      title: 'E-commerce Platform',
      description: 'Custom online-payment integration.',
    },
    mode: {
      title: 'M0DE (ongoing)',
      description:
        'AI-curated shopping. Conversational storefront + fully automated backend.',
    },
  },
  github: {
    title: 'GitHub Contributions',
    subtitle: 'My contribution activity on GitHub',
  },
  booking: {
    title: 'Book a Meeting',
    subtitle: "Let's discuss your project",
    bookNow: 'Book Now',
    callDuration: '30 min call',
  },
  contact: {
    title: 'Get In Touch',
    subtitle:
      "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    email: 'Email Me',
  },
  footer: {
    rights: 'All rights reserved.',
  },
};

export type Dictionary = typeof en;
