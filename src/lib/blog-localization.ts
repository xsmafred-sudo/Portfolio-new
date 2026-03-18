import type { BlogPost, BlogTranslations } from './blog-generator';

export function getLocalizedContent(
  post: BlogPost,
  locale: string
): { title: string; excerpt: string; content: string } {
  if ('translations' in post && post.translations) {
    const translations = post.translations as BlogTranslations;
    const localeKey = locale as keyof BlogTranslations;
    const translation = translations[localeKey];
    if (translation) {
      return translation;
    }
  }
  return {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
  };
}

export function getLocalizedPost(post: BlogPost, locale: string): BlogPost {
  const localized = getLocalizedContent(post, locale);
  return {
    ...post,
    title: localized.title,
    excerpt: localized.excerpt,
    content: localized.content,
  };
}

export function getLocalizedPosts(
  posts: BlogPost[],
  locale: string
): BlogPost[] {
  return posts.map((post) => getLocalizedPost(post, locale));
}
