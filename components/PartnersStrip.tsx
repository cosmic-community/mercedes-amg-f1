import Link from 'next/link';
import type { Partner } from '@/types';

interface PartnersStripProps {
  partners: Partner[];
}

export default function PartnersStrip({ partners }: PartnersStripProps) {
  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">
          Our Partners
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => {
            const logo = partner.metadata?.featured_image;
            return (
              <Link
                key={partner.id}
                href={`/partners/${partner.slug}`}
                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                {logo?.imgix_url ? (
                  <img
                    src={`${logo.imgix_url}?w=300&h=150&fit=crop&auto=format,compress`}
                    alt={partner.title}
                    width={150}
                    height={75}
                    className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200"
                  />
                ) : (
                  <span className="text-white text-sm font-medium">{partner.title}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}