// app/news/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getNewsBySlug, formatDate } from '@/lib/cosmic';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const image = article.metadata?.featured_image;
  const date = article.metadata?.published_at;
  const content = article.metadata?.content || article.content;

  return (
    <article>
      <div className="relative h-[50vh] sm:h-[65vh] w-full overflow-hidden">
        {image && (
          <img
            src={`${image.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={article.title}
            className="w-full h-full object-cover"
            width={1000}
            height={600}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-10">
          {date && (
            <p className="text-f1-teal text-sm uppercase tracking-widest mb-3">
              {formatDate(date)}
            </p>
          )}
          <h1 className="text-3xl sm:text-5xl font-bold uppercase leading-tight font-heading">
            {article.title}
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {content && (
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </article>
  );
}