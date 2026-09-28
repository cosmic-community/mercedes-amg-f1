import Link from 'next/link';
import type { News } from '@/types';
import { formatDate } from '@/lib/cosmic';

interface NewsCardProps {
  article: News;
}

export default function NewsCard({ article }: NewsCardProps) {
  const image = article.metadata?.featured_image;
  const date = article.metadata?.published_at;

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-f1-teal/50 transition-colors"
    >
      <div className="relative h-56 overflow-hidden">
        {image && (
          <img
            src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={250}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="p-5">
        {date && (
          <p className="text-f1-teal text-xs uppercase tracking-widest mb-2">
            {formatDate(date)}
          </p>
        )}
        <h3 className="text-lg font-bold uppercase leading-snug mb-3 group-hover:text-f1-teal transition-colors">
          {article.title}
        </h3>
        <span className="inline-flex items-center gap-1 text-sm uppercase tracking-wider text-white/80 group-hover:text-f1-teal">
          Read More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}