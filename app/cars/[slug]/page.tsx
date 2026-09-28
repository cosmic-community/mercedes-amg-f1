// app/cars/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getCarBySlug } from '@/lib/cosmic';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const image = car.metadata?.featured_image;
  const content = car.metadata?.content || car.content;

  return (
    <article>
      <div className="relative h-[45vh] sm:h-[55vh] w-full overflow-hidden">
        {image && (
          <img
            src={`${image.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={car.title}
            className="w-full h-full object-cover"
            width={1000}
            height={600}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-10">
          <span className="text-f1-teal text-sm uppercase tracking-widest mb-3 block">
            Technology
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase leading-tight font-heading">
            {car.title}
          </h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {car.metadata?.seo_description && (
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {car.metadata.seo_description}
          </p>
        )}
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