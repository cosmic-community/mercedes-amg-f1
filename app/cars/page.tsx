import Link from 'next/link';
import { getCars } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata = {
  title: 'Our Car | Mercedes-AMG F1',
  description: 'Explore the Mercedes-AMG F1 car technology and specifications.',
};

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">Technology</span>
        <h1 className="text-4xl sm:text-6xl font-bold uppercase mt-3 font-heading">Our Cars</h1>
      </div>
      {cars.length === 0 ? (
        <p className="text-gray-500">No car information available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-8">
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.slug}`}
              className="group block rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-f1-teal/50 transition-colors"
            >
              <div className="relative h-72 overflow-hidden">
                {car.metadata?.featured_image && (
                  <img
                    src={`${car.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold uppercase group-hover:text-f1-teal transition-colors mb-2">
                  {car.title}
                </h2>
                {car.metadata?.seo_description && (
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {car.metadata.seo_description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}