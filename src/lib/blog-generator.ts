import Groq from 'groq-sdk';

let groq: Groq | null = null;

function getGroq(): Groq | null {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  image?: string;
}

export interface BlogTranslations {
  fr?: { title: string; excerpt: string; content: string };
  zh?: { title: string; excerpt: string; content: string };
  ja?: { title: string; excerpt: string; content: string };
}

export interface GeneratedPost extends BlogPost {
  translations: BlogTranslations;
  generatedAt: string;
}

const BLOG_SYSTEM_PROMPT = `You are a professional tech blogger for a full-stack developer portfolio.
Generate SEO-optimized blog posts in JSON format with the following structure:
{
  "title": "Catchy, keyword-rich title (50-60 chars)",
  "excerpt": "Compelling description (150-160 chars for SEO meta)",
  "content": "Full blog post in markdown with proper headings (H2, H3), code snippets, and structured sections",
  "category": "One of: Engineering, DevOps, AI/ML, Architecture, Security, Tutorial",
  "tags": ["array", "of", "relevant", "tags"],
  "readTime": "X min read"
}

Content requirements:
- Use proper markdown formatting with ## for H2, ### for H3
- Include code blocks with language specification when relevant
- Add practical tips and real examples
- Clear introduction, body, and conclusion sections
- End with a CTA section including contact info

Developer profile context:
- Full-Stack Developer with 4+ years experience
- Skills: Java, Spring Boot, React, Next.js, TypeScript, Angular, Node.js
- Cloud: AWS, GCP, Docker, CI/CD pipelines
- Security: OWASP Top 10, OAuth2, JWT
- Contact: xsmafred@gmail.com, +237691958707, linkedin.com/in/prosper-merimee

Respond with ONLY valid JSON, no explanation.`;

const BLOG_TOPICS = [
  {
    topic: 'Building Scalable SaaS with Spring Boot & React',
    keywords: ['Spring Boot', 'React', 'microservices', 'SaaS architecture'],
  },
  {
    topic: 'CI/CD Pipeline Setup with Docker & GitHub Actions',
    keywords: ['Docker', 'GitHub Actions', 'CI/CD', 'DevOps'],
  },
  {
    topic: 'Implementing AI-Powered Fraud Detection in Payment Gateways',
    keywords: ['AI', 'fraud detection', 'machine learning', 'payment security'],
  },
  {
    topic: 'Microservices Architecture: Lessons from Production',
    keywords: ['microservices', 'REST API', 'GCP', 'production'],
  },
  {
    topic: 'Angular vs React: Choosing the Right Framework in 2026',
    keywords: ['Angular', 'React', 'framework comparison', '2026'],
  },
  {
    topic: 'Securing REST APIs with OAuth2 and JWT',
    keywords: ['OAuth2', 'JWT', 'API security', 'authentication'],
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

export async function generateBlogPost(
  topic: string,
  keywords: string[]
): Promise<BlogPost | null> {
  const groqClient = getGroq();
  if (!groqClient) {
    console.warn('GROQ_API_KEY not configured');
    return null;
  }

  const userPrompt = `Generate a complete blog post about: ${topic}
Keywords to naturally integrate: ${keywords.join(', ')}

Make it informative, SEO-friendly, and valuable for developers.`;

  try {
    const completion = await groqClient.chat.completions.create({
      messages: [
        { role: 'system', content: BLOG_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 4096,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) return null;

    const parsed = JSON.parse(response);

    return {
      slug: slugify(parsed.title || topic),
      title: parsed.title || topic,
      excerpt: parsed.excerpt || '',
      content: parsed.content || '',
      author: 'Mouil Prosper',
      authorTitle: 'Full-Stack Developer',
      date: new Date().toISOString().split('T')[0],
      category: parsed.category || 'Engineering',
      tags: parsed.tags || keywords,
      readTime: parsed.readTime || '5 min read',
      featured: false,
    };
  } catch (error) {
    console.error('Blog generation error:', error);
    return null;
  }
}

const TRANSLATION_SYSTEM_PROMPT = `You are a professional translator specializing in technical blog posts.
Translate the following blog post to the target language while:
- Preserving all code blocks unchanged
- Maintaining SEO-friendly title length (50-60 chars)
- Keeping excerpt at 150-160 characters
- Using appropriate technical terminology in the target language
- Ending with a localized CTA section

Respond with ONLY valid JSON in this format:
{
  "title": "translated title",
  "excerpt": "translated excerpt (150-160 chars)",
  "content": "translated full content with markdown"
}`;

const TRANSLATION_PROMPTS = {
  fr: {
    system: TRANSLATION_SYSTEM_PROMPT,
    targetLang: 'French',
    categoryMap: {
      Engineering: 'Ingénierie',
      DevOps: 'DevOps',
      'AI/ML': 'IA/ML',
      Architecture: 'Architecture',
      Security: 'Sécurité',
      Tutorial: 'Tutoriel',
    },
  },
  zh: {
    system: TRANSLATION_SYSTEM_PROMPT,
    targetLang: 'Chinese (Simplified)',
    categoryMap: {
      Engineering: '工程',
      DevOps: 'DevOps',
      'AI/ML': 'AI/ML',
      Architecture: '架构',
      Security: '安全',
      Tutorial: '教程',
    },
  },
  ja: {
    system: TRANSLATION_SYSTEM_PROMPT,
    targetLang: 'Japanese',
    categoryMap: {
      Engineering: 'エンジニアリング',
      DevOps: 'DevOps',
      'AI/ML': 'AI/ML',
      Architecture: 'アーキテクチャ',
      Security: 'セキュリティ',
      Tutorial: 'チュートリアル',
    },
  },
};

type LocaleKey = 'fr' | 'zh' | 'ja';

export async function translateBlogPost(
  post: BlogPost,
  targetLocale: LocaleKey
): Promise<{ title: string; excerpt: string; content: string } | null> {
  const groqClient = getGroq();
  if (!groqClient) {
    return null;
  }

  const localeConfig = TRANSLATION_PROMPTS[targetLocale];

  const userPrompt = `Translate this blog post to ${localeConfig.targetLang}:

Original Title: ${post.title}
Original Excerpt: ${post.excerpt}
Original Content: ${post.content}

Original Category: ${post.category}
Translate category to: ${localeConfig.categoryMap[post.category as keyof typeof localeConfig.categoryMap] || post.category}`;

  try {
    const completion = await groqClient.chat.completions.create({
      messages: [
        { role: 'system', content: localeConfig.system },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 3500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) return null;

    return JSON.parse(response);
  } catch (error) {
    console.error(`Translation error (${targetLocale}):`, error);
    return null;
  }
}

export async function generateAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(
    BLOG_TOPICS.map(({ topic, keywords }) => generateBlogPost(topic, keywords))
  );

  return posts.filter((post): post is BlogPost => post !== null);
}
