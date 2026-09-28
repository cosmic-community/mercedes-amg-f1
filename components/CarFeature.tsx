import Link from 'next/link';
import type { Car } from '@/types';

interface CarFeatureProps {
  car: Car;
}

export default function CarFeature({ car }: CarFeatureProps) {
  const image = car.metadata?.featured_image;

  return (
    <section className="py-20 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">Our Car</span>
          <h2 className="text-3xl sm:text-5xl font-bold uppercase mt-3 mb-6 font-heading">
            {car.title}
          </h2>
          {car.metadata?.seo_description && (
            <p className="text-gray-400 mb-8 leading-relaxed">{car.metadata.seo_description}</p>
          )}
          <Link
            href={`/cars/${car.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-f1-teal text-black font-bold uppercase text-sm tracking-wider rounded-full hover:bg-f1-teal-dark transition-colors"
          >
            Explore the Car
          </Link>
        </div>
        <div className="order-1 md:order-2 rounded-2xl overflow-hidden">
          {image && (
            <img
              src={`${image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={car.title}
              className="w-full h-auto object-cover"
              width={600}
              height={400}
            />
          )}
        </div>
      </div>
    </section>
  );
}