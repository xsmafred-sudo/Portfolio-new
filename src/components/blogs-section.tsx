import { FullWidthDivider } from '@/components/ui/full-width-divider';
import { GridFiller } from '@/components/ui/grid-filler';
import type { BlogPost } from '@/lib/blog-posts';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  title: string;
  date: string;
  description: string;
  category: string;
  author: string;
  slug: string;
  readTime?: string;
  className?: string;
}

export function BlogCard({
  title,
  date,
  description,
  category,
  author,
  slug,
  readTime,
  className,
}: BlogCardProps) {
  return (
    <a
      href={`/blog/${slug}`}
      className={cn(
        'bg-background text-muted-foreground hover:text-foreground active:bg-accent active:dark:bg-accent/50 group w-full px-6 py-12 hover:cursor-pointer md:px-8',
        className
      )}
    >
      <h3 className="text-foreground mb-3 line-clamp-2 text-lg font-medium md:text-xl">
        {title}
      </h3>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground group-hover:text-foreground text-xs">
          {category}
        </span>
        <div className="bg-muted-foreground inline-flex size-1 rounded-full" />
        <span className="text-muted-foreground group-hover:text-foreground text-xs">
          {date}
        </span>
        {readTime && (
          <>
            <div className="bg-muted-foreground inline-flex size-1 rounded-full" />
            <span className="text-muted-foreground group-hover:text-foreground text-xs">
              {readTime}
            </span>
          </>
        )}
      </div>
      <p className="text-muted-foreground group-hover:text-foreground mb-8 line-clamp-3 text-sm tracking-wide">
        {description}
      </p>
      <div className="flex items-center gap-1.5">
        by
        <span className="text-foreground/80 group-hover:text-foreground font-mono text-xs font-medium md:text-sm">
          {author}
        </span>
      </div>
    </a>
  );
}

interface BlogsSectionProps {
  posts: BlogPost[];
  showTitle?: boolean;
  showDescription?: boolean;
  title?: string;
  description?: string;
  limit?: number;
}

export function BlogsSection({
  posts,
  showTitle = true,
  showDescription = true,
  title,
  description,
  limit,
}: BlogsSectionProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="mx-auto w-full max-w-5xl py-4 lg:border-x">
      {showTitle && (
        <div className="space-y-2 px-4 py-8 md:py-12">
          <h1 className="text-2xl font-semibold tracking-wide md:text-4xl">
            {title || 'Latest Blogs'}
          </h1>
          {showDescription && (
            <p className="text-muted-foreground text-sm">
              {description ||
                'Insights on full-stack development, cloud architecture, and tech trends'}
            </p>
          )}
        </div>
      )}
      <FullWidthDivider contained={true} />
      <div className="bg-border grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3">
        {displayPosts.map((post) => (
          <BlogCard
            key={post.slug}
            title={post.title}
            date={new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            description={post.excerpt}
            category={post.category}
            author={post.author}
            slug={post.slug}
            readTime={post.readTime}
          />
        ))}
        <GridFiller
          className="bg-background"
          mdColumns={3}
          smColumns={4}
          totalItems={displayPosts.length}
        />
      </div>
      <FullWidthDivider contained={true} />
    </div>
  );
}
