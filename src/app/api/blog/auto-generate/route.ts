import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

import {
  generateBlogPost,
  GeneratedPost,
  translateBlogPost,
} from '@/lib/blog-generator';

export const runtime = 'nodejs';

const GENERATED_POSTS_FILE = path.join(
  process.cwd(),
  'src/lib/generated-posts.json'
);
const GENERATION_LOG_FILE = path.join(
  process.cwd(),
  'src/lib/generation-log.json'
);

const BLOG_TOPICS_QUEUE = [
  {
    topic: 'Building REST APIs with Node.js and Express',
    keywords: ['REST API', 'Node.js', 'Express', 'Backend'],
  },
  {
    topic: 'Docker vs Kubernetes: Which Should You Use?',
    keywords: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
  },
  {
    topic: 'React Hooks Deep Dive: useState and useEffect',
    keywords: ['React', 'Hooks', 'useState', 'useEffect'],
  },
  {
    topic: 'Introduction to GraphQL for API Development',
    keywords: ['GraphQL', 'API', 'Backend'],
  },
  {
    topic: 'Securing Your Web Applications: OWASP Top 10',
    keywords: ['Security', 'OWASP', 'Web Security'],
  },
  {
    topic: 'Deploying Next.js Apps to Vercel: Complete Guide',
    keywords: ['Next.js', 'Vercel', 'Deployment'],
  },
  {
    topic: 'State Management in React: Redux vs Context API',
    keywords: ['React', 'Redux', 'State Management'],
  },
  {
    topic: 'Testing React Applications with Jest and React Testing Library',
    keywords: ['Testing', 'Jest', 'React Testing Library'],
  },
  {
    topic: 'Building Progressive Web Apps (PWAs) with Next.js',
    keywords: ['PWA', 'Next.js', 'Web Apps'],
  },
  {
    topic: 'Database Design Best Practices for PostgreSQL',
    keywords: ['PostgreSQL', 'Database', 'SQL'],
  },
  {
    topic: 'Authentication in Next.js: NextAuth.js Tutorial',
    keywords: ['NextAuth', 'Authentication', 'Next.js'],
  },
  {
    topic: 'Optimizing React Performance: Tips and Tricks',
    keywords: ['React', 'Performance', 'Optimization'],
  },
  {
    topic: 'GitHub Actions CI/CD for Node.js Projects',
    keywords: ['GitHub Actions', 'CI/CD', 'Node.js'],
  },
  {
    topic: 'MongoDB vs PostgreSQL: Choosing the Right Database',
    keywords: ['MongoDB', 'PostgreSQL', 'Database'],
  },
  {
    topic: 'Building E-commerce Applications with Shopify',
    keywords: ['Shopify', 'E-commerce', 'React'],
  },
  {
    topic: 'Serverless Architecture with AWS Lambda',
    keywords: ['AWS Lambda', 'Serverless', 'AWS'],
  },
  {
    topic: 'CSS Grid and Flexbox: Modern Layout Techniques',
    keywords: ['CSS', 'Grid', 'Flexbox', 'Layout'],
  },
  {
    topic: 'Web Accessibility (A11y): Building Inclusive Web Apps',
    keywords: ['Accessibility', 'A11y', 'Web Development'],
  },
  {
    topic: 'Real-time Features with Firebase Realtime Database',
    keywords: ['Firebase', 'Real-time', 'Database'],
  },
  {
    topic: 'Building Microservices with NestJS',
    keywords: ['NestJS', 'Microservices', 'Node.js'],
  },
  {
    topic: 'TypeScript Advanced Types and Generics',
    keywords: ['TypeScript', 'Generics', 'Advanced'],
  },
  {
    topic: 'Implementing Search Functionality with Elasticsearch',
    keywords: ['Elasticsearch', 'Search', 'Backend'],
  },
  {
    topic: 'Mobile App Development with React Native',
    keywords: ['React Native', 'Mobile', 'iOS', 'Android'],
  },
  {
    topic: 'Cloud Security Best Practices for AWS',
    keywords: ['AWS', 'Cloud Security', 'Security'],
  },
  {
    topic: 'Building Chatbots with Natural Language Processing',
    keywords: ['NLP', 'Chatbots', 'AI'],
  },
  {
    topic: 'WebSockets vs Server-Sent Events',
    keywords: ['WebSockets', 'SSE', 'Real-time'],
  },
  {
    topic: 'Docker Compose for Development Environments',
    keywords: ['Docker Compose', 'Development'],
  },
  {
    topic: 'API Rate Limiting and Throttling Strategies',
    keywords: ['API', 'Rate Limiting', 'Security'],
  },
  {
    topic: 'Building Admin Dashboards with React Admin',
    keywords: ['React Admin', 'Dashboard', 'UI'],
  },
  {
    topic: 'Continuous Deployment with GitHub Actions',
    keywords: ['GitHub Actions', 'CD', 'DevOps'],
  },
];

async function getGeneratedPosts(): Promise<GeneratedPost[]> {
  try {
    const data = await fs.readFile(GENERATED_POSTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveGeneratedPosts(posts: GeneratedPost[]): Promise<void> {
  await fs.writeFile(GENERATED_POSTS_FILE, JSON.stringify(posts, null, 2));
}

interface GenerationLog {
  lastGeneratedAt: string | null;
  postsGeneratedToday: number;
  lastGenerationDate: string;
  cronBatchSize: number;
}

async function getGenerationLog(): Promise<GenerationLog> {
  try {
    const data = await fs.readFile(GENERATION_LOG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      lastGeneratedAt: null,
      postsGeneratedToday: 0,
      lastGenerationDate: '',
      cronBatchSize: 2,
    };
  }
}

async function saveGenerationLog(log: GenerationLog): Promise<void> {
  await fs.writeFile(GENERATION_LOG_FILE, JSON.stringify(log, null, 2));
}

function shouldGeneratePosts(log: GenerationLog): {
  shouldGenerate: boolean;
  postsToGenerate: number;
} {
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  if (log.lastGenerationDate !== today) {
    return { shouldGenerate: true, postsToGenerate: log.cronBatchSize };
  }

  if (log.postsGeneratedToday >= log.cronBatchSize) {
    return { shouldGenerate: false, postsToGenerate: 0 };
  }

  return {
    shouldGenerate: true,
    postsToGenerate: log.cronBatchSize - log.postsGeneratedToday,
  };
}

function getNextTopicIndex(generatedPosts: GeneratedPost[]): number {
  const existingTopics = generatedPosts.map((p) => p.title.toLowerCase());
  for (let i = 0; i < BLOG_TOPICS_QUEUE.length; i++) {
    const topicTitle = BLOG_TOPICS_QUEUE[i].topic.toLowerCase();
    if (!existingTopics.some((t) => t.includes(topicTitle.substring(0, 20)))) {
      return i;
    }
  }
  return Math.floor(Math.random() * BLOG_TOPICS_QUEUE.length);
}

export async function POST() {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 400 }
      );
    }

    const log = await getGenerationLog();
    const { shouldGenerate, postsToGenerate } = shouldGeneratePosts(log);

    if (!shouldGenerate) {
      return NextResponse.json({
        success: true,
        message: `Already generated ${log.postsGeneratedToday}/${log.cronBatchSize} posts today. Next generation tomorrow.`,
        postsGeneratedToday: log.postsGeneratedToday,
        lastGeneratedAt: log.lastGeneratedAt,
      });
    }

    const generatedPosts = await getGeneratedPosts();
    const newPosts: GeneratedPost[] = [];

    for (let i = 0; i < postsToGenerate; i++) {
      const topicIndex = getNextTopicIndex([...generatedPosts, ...newPosts]);
      const { topic, keywords } = BLOG_TOPICS_QUEUE[topicIndex];

      console.log(`Generating blog post ${i + 1}/${postsToGenerate}: ${topic}`);

      const post = await generateBlogPost(topic, keywords);

      if (!post) {
        console.error(`Failed to generate post: ${topic}`);
        continue;
      }

      console.log(`Translating to FR, ZH, JA...`);

      const [frTranslation, zhTranslation, jaTranslation] = await Promise.all([
        translateBlogPost(post, 'fr'),
        translateBlogPost(post, 'zh'),
        translateBlogPost(post, 'ja'),
      ]);

      const translations = {
        fr: frTranslation || undefined,
        zh: zhTranslation || undefined,
        ja: jaTranslation || undefined,
      };

      const newPost: GeneratedPost = {
        ...post,
        translations,
        generatedAt: new Date().toISOString(),
      };

      newPosts.push(newPost);
    }

    if (newPosts.length > 0) {
      const allPosts = [...newPosts, ...generatedPosts];
      await saveGeneratedPosts(allPosts);
    }

    const today = new Date().toISOString().split('T')[0];
    const newLog: GenerationLog = {
      lastGeneratedAt: new Date().toISOString(),
      postsGeneratedToday:
        log.lastGenerationDate === today
          ? log.postsGeneratedToday + newPosts.length
          : newPosts.length,
      lastGenerationDate: today,
      cronBatchSize: log.cronBatchSize,
    };
    await saveGenerationLog(newLog);

    return NextResponse.json({
      success: true,
      message: `Generated ${newPosts.length} blog post(s) with translations!`,
      postsGenerated: newPosts.map((p) => ({
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        tags: p.tags,
        readTime: p.readTime,
        slug: p.slug,
        languages: {
          en: true,
          fr: !!p.translations?.fr,
          zh: !!p.translations?.zh,
          ja: !!p.translations?.ja,
        },
      })),
      stats: {
        totalPosts: generatedPosts.length + newPosts.length,
        postsGeneratedToday: newLog.postsGeneratedToday,
        nextGenerationIn: 'tomorrow',
      },
    });
  } catch (err) {
    console.error('Blog generation error:', err);
    return NextResponse.json(
      { error: 'Failed to generate blog post', details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const generatedPosts = await getGeneratedPosts();
    const log = await getGenerationLog();

    return NextResponse.json({
      totalGeneratedPosts: generatedPosts.length,
      postsGeneratedToday: log.postsGeneratedToday,
      lastGeneratedAt: log.lastGeneratedAt,
      nextGenerationIn:
        log.postsGeneratedToday >= log.cronBatchSize ? 'tomorrow' : 'now',
      posts: generatedPosts.slice(0, 5).map((p) => ({
        title: p.title,
        slug: p.slug,
        languages: {
          en: true,
          fr: !!p.translations?.fr,
          zh: !!p.translations?.zh,
          ja: !!p.translations?.ja,
        },
        generatedAt: p.generatedAt,
      })),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to get posts' }, { status: 500 });
  }
}
