import { NextResponse } from 'next/server';

import { generateAllBlogPosts, generateBlogPost } from '@/lib/blog-generator';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 400 }
      );
    }

    const { topic, keywords } = await request.json().catch(() => ({}));

    let posts;
    if (topic && keywords) {
      const post = await generateBlogPost(topic, keywords);
      posts = post ? [post] : [];
    } else {
      posts = await generateAllBlogPosts();
    }

    return NextResponse.json({
      success: true,
      postsGenerated: posts.length,
      posts: posts,
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog posts', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    info: 'POST to this endpoint to generate AI blog posts',
    generateAll: 'POST /api/blog/generate with empty body',
    generateOne: 'POST /api/blog/generate with { topic, keywords }',
    required: 'GROQ_API_KEY environment variable',
  });
}
