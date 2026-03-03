// --- Resume Data for Mouil Prosper ---
export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'Services', hash: '#services' },
  { name: 'About', hash: '#about' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Contact', hash: '#contact' },
] as const;

export const projectsData = [
  {
    title: 'Tasky',
    description:
      'Multi-tenant task manager. Dockerised containers deployed to VPS with auto-SSL.',
    technologies: [
      'Java',
      'Spring Boot',
      'Angular',
      'JWT',
      'Docker',
      'GitHub Actions',
      'VPS',
    ],
    links: {
      github: 'https://github.com/yourhandle/tasky',
      preview: '',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60',
    themeColor: '210 50% 30%',
  },
  {
    title: 'Prellia',
    description:
      'Full-stack payment platform built as a microservices system. Combines REST API gateway, high-performance financial ledger, React frontend, and cloud-ready infrastructure.',
    technologies: [
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'React',
      'AWS',
      'Docker',
    ],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&auto=format&fit=crop&q=60',
    themeColor: '270 50% 25%',
  },
  {
    title: 'Opsear (Postiz Fork)',
    description:
      'AI-powered social media scheduling tool. Integrated advanced AI capabilities (Deepseek, Mistral AI, Gemini API) to reduce content-team workload by 60%.',
    technologies: [
      'TypeScript',
      'JavaScript',
      'Docker',
      'Cron',
      'Deepseek',
      'Mistral AI',
      'Gemini API',
    ],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&auto=format&fit=crop&q=60',
    themeColor: '180 50% 30%',
  },
  {
    title: 'COSUMAF',
    description:
      "Migrated official website of Commission de Surveillance du Marché Financier de l'Afrique Centrale from WordPress to React.js + Laravel. Improved scalability, maintainability, and performance.",
    technologies: ['React', 'Laravel', 'RESTful APIs', 'PHP'],
    links: {
      preview: 'https://webcosumaf.org/',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&auto=format&fit=crop&q=60',
    themeColor: '200 50% 25%',
  },
  {
    title: 'M0DE',
    description:
      'AI-curated shopping experience with conversational storefront and fully automated backend.',
    technologies: [],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=900&auto=format&fit=crop&q=60',
    themeColor: '150 50% 25%',
  },
  {
    title: 'Antho-multiservice',
    description:
      'Air conditioning installation, repair, and maintenance services. Cold storage/refrigeration chamber installation and commercial refrigerator sales and repair.',
    technologies: ['React', 'Next.js', 'TypeScript'],
    links: {
      preview: 'https://antho-multiservice.vercel.app/',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=60',
    themeColor: '340 50% 30%',
  },
] as const;

export const experiencesData = [
  {
    title: 'Full-Stack Developer',
    company: 'DIGITWACE SARL',
    description:
      'Migrated COSUMAF website from WordPress to React.js + Laravel. Developed WordPress pages for SOTRABUS. Fully rebuilt Nufi SMS website using NestJS + Angular. Coordinated with stakeholders, managed product backlogs, and applied modern development workflows with Git, code reviews, and iterative testing.',
    period: 'Dec 2025 – Feb 2026',
    technologies: [
      'React.js',
      'Laravel',
      'NestJS',
      'Angular',
      'WordPress',
      'Git',
    ],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Stevo Digital',
    description:
      'Spearheaded end-to-end development of web and mobile applications using Spring Boot and Angular/React. Delivered 5 major features per 6-week sprint. Optimized cloud infrastructure on GCP and Vercel, achieving 35% reduction in deployment time through Coolify CI/CD. Engineered RESTful microservices processing 1M+ monthly calls with 99.9% uptime. Collaborated with UI/UX teams to increase user engagement by 18%.',
    period: 'Jan 2023 – Apr 2025',
    technologies: [
      'Spring Boot',
      'Angular',
      'React',
      'GCP',
      'Vercel',
      'Coolify',
      'Hotjar',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Micro QQ Tech',
    description:
      'Designed and deployed PHP/Laravel CMS for maternity and newborn records, accelerating data retrieval by 40%. Administered PostgreSQL and LAN/WAN security with zero-breach record. Mentored 4 junior developers in Git flow, code reviews, and unit testing. Orchestrated campus-wide software and network upgrades for 75+ students.',
    period: 'Sep 2022 – Oct 2023',
    technologies: [
      'PHP',
      'Laravel',
      'PostgreSQL',
      'Git',
      'Unit Testing',
      'Network Security',
    ],
  },
] as const;

export const skillsData = [
  { label: 'Java' },
  { label: 'TypeScript' },
  { label: 'JavaScript' },
  { label: 'Python' },
  { label: 'PHP' },
  { label: 'Spring Boot' },
  { label: 'Hibernate' },
  { label: 'Angular' },
  { label: 'React' },
  { label: 'Next.js' },
  { label: 'Node.js' },
  { label: 'NestJS' },
  { label: 'Laravel' },
  { label: 'AWS' },
  { label: 'GCP' },
  { label: 'Docker' },
  { label: 'Vercel' },
  { label: 'Coolify' },
  { label: 'GitHub Actions' },
  { label: 'Terraform' },
  { label: 'PostgreSQL' },
  { label: 'MySQL' },
  { label: 'MongoDB' },
  { label: 'Supabase' },
  { label: 'REST' },
  { label: 'JSON' },
  { label: 'JWT' },
  { label: 'OAuth2' },
  { label: 'WebSocket' },
  { label: 'gRPC' },
  { label: 'GraphQL' },
  { label: 'OWASP Top-10' },
  { label: 'SSL/TLS' },
  { label: 'Network Hardening' },
  { label: 'Anti-Fraud Detection' },
  { label: 'English (Fluent)' },
  { label: 'French (Fluent)' },
] as const;
