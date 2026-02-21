
// --- Resume Data for Mouil Prosper ---
export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'About', hash: '#about' },
  { name: 'Experience', hash: '#experience' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Contact', hash: '#contact' },
] as const;

export const projectsData = [
  {
    title: 'Tasky',
    description: 'Multi-tenant task manager. Dockerised containers deployed to VPS with auto-SSL.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'JWT', 'Docker', 'GitHub Actions', 'VPS'],
    links: {
      github: 'https://github.com/yourhandle/tasky',
      preview: '',
    },
  },
  {
    title: 'Prellia',
    description: 'Crypto payment gateway. Processes BTC, ETH, USDT; integrated 3 exchanges; fraud rate < 0.2 %.',
    technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS Lambda', 'anti-fraud ML'],
    links: {},
  },
  {
    title: 'AI Social Media Manager',
    description: 'Auto-generates and schedules posts; reduces content-team workload 60 %.',
    technologies: ['Python', 'Node.js', 'React', 'OpenAI API', 'Deepseek', 'Mistral AI', 'Cron', 'Docker'],
    links: {},
  },
  {
    title: 'Bahinlink',
    description: 'Security-management platform. Manages security operations, agent tracking, and client communications.',
    technologies: ['Next.js', 'TypeScript', 'Supabase'],
    links: {},
  },
  {
    title: 'E-commerce Platform',
    description: 'Custom online-payment integration.',
    technologies: [],
    links: {},
  },
  {
    title: 'M0DE (ongoing)',
    description: 'AI-curated shopping. Conversational storefront + fully automated backend.',
    technologies: [],
    links: {},
  },
] as const;

export const experiencesData = [
  {
    title: 'Full-Stack Developer',
    company: 'Stevo Digital',
    description: 'Shipped 5 major features per 6-week sprint (Spring Boot + Angular/React). Reduced deployment time 35 % by moving GCP workloads to Coolify CI/CD. Built REST micro-services serving 1 M+ monthly calls at 99.9 % uptime. Boosted user-engagement 18 % via Hotjar-driven UI/UX iterations.',
    period: '2023 – 2025',
    technologies: ['Spring Boot', 'Angular', 'React', 'GCP', 'Coolify', 'Hotjar'],
  },
  {
    title: 'Software Engineer & IT Support',
    company: 'Micro QQ Tech',
    description: 'Designed Laravel CMS for maternity records; accelerated data retrieval 40 %. Administered Ubuntu VPS & PostgreSQL; zero security incidents. Mentored 4 junior devs on Git flow, code reviews, unit testing. Rolled out campus-wide upgrades for 75+ workstations.',
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


