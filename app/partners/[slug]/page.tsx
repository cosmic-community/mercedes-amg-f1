// app/partners/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getPartnerBySlug } from '@/lib/cosmic';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PartnerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  const image = partner.metadata?.featured_image;
  const content = partner.metadata?.content || partner.content;

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10 rounded-2xl overflow-hidden bg-neutral-950 flex items-center justify-center h-64">
        {image && (
          <img
            src={`${image.imgix_url}?w=1200&h=700&fit=crop&auto=format,compress`}
            alt={partner.title}
            className="max-h-40 w-auto object-contain"
            width={500}
            height={300}
          />
        )}
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold uppercase mb-8 font-heading">
        {partner.title}
      </h1>
      {partner.metadata?.seo_description && (
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          {partner.metadata.seo_description}
        </p>
      )}
      {content && (
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </article>
  );
}