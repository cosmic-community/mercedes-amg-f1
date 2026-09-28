import Link from 'next/link';
import { getRaces, getRaceDate, formatDate } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata = {
  title: 'Race Calendar | Mercedes-AMG F1',
  description: 'Full Formula One race calendar and schedule.',
};

export default async function RacesPage() {
  const races = await getRaces();

  const sorted = [...races].sort((a, b) => {
    const dateA = getRaceDate(a);
    const dateB = getRaceDate(b);
    if (dateA && dateB) return dateA.getTime() - dateB.getTime();
    if (dateA) return -1;
    if (dateB) return 1;
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">Season</span>
        <h1 className="text-4xl sm:text-6xl font-bold uppercase mt-3 font-heading">
          Race Calendar
        </h1>
      </div>
      {sorted.length === 0 ? (
        <p className="text-gray-500">No races scheduled yet.</p>
      ) : (
        <div className="divide-y divide-neutral-900 border-t border-b border-neutral-900">
          {sorted.map((race, i) => {
            const date = getRaceDate(race);
            return (
              <Link
                key={race.id}
                href={`/races/${race.slug}`}
                className="group flex items-center gap-4 sm:gap-6 py-6 hover:bg-neutral-950 transition-colors px-2 -mx-2 rounded-lg"
              >
                <span className="text-2xl sm:text-3xl font-bold text-neutral-700 w-10 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {race.metadata?.featured_image && (
                  <img
                    src={`${race.metadata.featured_image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                    alt={race.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    width={64}
                    height={64}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold uppercase group-hover:text-f1-teal transition-colors truncate">
                    {race.title}
                  </h2>
                  {date ? (
                    <p className="text-gray-500 text-sm mt-1">{formatDate(date.toISOString())}</p>
                  ) : (
                    <p className="text-gray-600 text-sm mt-1 uppercase tracking-wide">TBA</p>
                  )}
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-neutral-700 group-hover:text-f1-teal transition-colors flex-shrink-0"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}