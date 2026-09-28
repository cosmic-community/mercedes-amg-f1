import Link from 'next/link';
import { getPartners } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata = {
  title: 'Partners | Mercedes-AMG F1',
  description: 'Official partners of the Mercedes-AMG PETRONAS Formula One Team.',
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">Alliances</span>
        <h1 className="text-4xl sm:text-6xl font-bold uppercase mt-3 font-heading">
          Our Partners
        </h1>
      </div>
      {partners.length === 0 ? (
        <p className="text-gray-500">No partners available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Link
              key={partner.id}
              href={`/partners/${partner.slug}`}
              className="group block rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-f1-teal/50 transition-colors"
            >
              <div className="relative h-48 flex items-center justify-center bg-neutral-950 overflow-hidden">
                {partner.metadata?.featured_image && (
                  <img
                    src={`${partner.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                    alt={partner.title}
                    className="max-h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    width={300}
                    height={150}
                  />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold uppercase group-hover:text-f1-teal transition-colors">
                  {partner.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}