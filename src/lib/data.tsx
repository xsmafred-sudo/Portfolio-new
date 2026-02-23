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
      'Crypto payment gateway. Processes BTC, ETH, USDT; integrated 3 exchanges; fraud rate < 0.2 %.',
    technologies: [
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'AWS Lambda',
      'anti-fraud ML',
    ],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&auto=format&fit=crop&q=60',
    themeColor: '270 50% 25%',
  },
  {
    title: 'AI Social Media Manager',
    description:
      'Auto-generates and schedules posts; reduces content-team workload 60 %.',
    technologies: [
      'Python',
      'Node.js',
      'React',
      'OpenAI API',
      'Deepseek',
      'Mistral AI',
      'Cron',
      'Docker',
    ],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&auto=format&fit=crop&q=60',
    themeColor: '180 50% 30%',
  },
  {
    title: 'Bahinlink',
    description:
      'Security-management platform. Manages security operations, agent tracking, and client communications.',
    technologies: ['Next.js', 'TypeScript', 'Supabase'],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&auto=format&fit=crop&q=60',
    themeColor: '200 50% 25%',
  },
  {
    title: 'E-commerce Platform',
    description: 'Custom online-payment integration.',
    technologies: [],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=60',
    themeColor: '340 50% 30%',
  },
  {
    title: 'M0DE',
    description:
      'AI-curated shopping. Conversational storefront + fully automated backend.',
    technologies: [],
    links: {},
    imageUrl:
      'https://images.unsplash.com/photo-1557821552-17105176677c?w=900&auto=format&fit=crop&q=60',
    themeColor: '150 50% 25%',
  },
] as const;

export const experiencesData = [
  {
    title: 'Full-Stack Developer',
    company: 'Stevo Digital',
    description:
      'Shipped 5 major features per 6-week sprint (Spring Boot + Angular/React). Reduced deployment time 35 % by moving GCP workloads to Coolify CI/CD. Built REST micro-services serving 1 M+ monthly calls at 99.9 % uptime. Boosted user-engagement 18 % via Hotjar-driven UI/UX iterations.',
    period: '2023 – 2025',
    technologies: [
      'Spring Boot',
      'Angular',
      'React',
      'GCP',
      'Coolify',
      'Hotjar',
    ],
  },
  {
    title: 'Software Engineer & IT Support',
    company: 'Micro QQ Tech',
    description:
      'Designed Laravel CMS for maternity records; accelerated data retrieval 40 %. Administered Ubuntu VPS & PostgreSQL; zero security incidents. Mentored 4 junior devs on Git flow, code reviews, unit testing. Rolled out campus-wide upgrades for 75+ workstations.',
    period: '2022 – 2023',
    technologies: ['Laravel', 'Ubuntu', 'PostgreSQL', 'Git', 'Unit Testing'],
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
  { label: 'network hardening' },
  { label: 'anti-fraud ML' },
  { label: 'English (Fluent)' },
  { label: 'French (Fluent)' },
] as const;
