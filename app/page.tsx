import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import CountdownTimer from '@/components/CountdownTimer';
import NewsCard from '@/components/NewsCard';
import CarFeature from '@/components/CarFeature';
import DriverCard from '@/components/DriverCard';
import PartnersStrip from '@/components/PartnersStrip';
import {
  getNews,
  getRaces,
  getCars,
  getTeamMembers,
  getPartners,
  getNextRace,
  getRaceDate,
} from '@/lib/cosmic';

export const revalidate = 60;

export default async function HomePage() {
  const [news, races, cars, team, partners] = await Promise.all([
    getNews(),
    getRaces(),
    getCars(),
    getTeamMembers(),
    getPartners(),
  ]);

  const heroItems = news.slice(0, 5);
  const latestNews = news.slice(0, 6);
  const nextRace = getNextRace(races);
  const nextRaceDate = nextRace ? getRaceDate(nextRace) : null;
  const featuredCar = cars[0];
  const drivers = team.slice(0, 4);

  return (
    <div>
      <section className="pt-8 pb-16 px-4 sm:px-6 max-w-[1600px] mx-auto">
        {heroItems.length > 0 && <HeroCarousel items={heroItems} />}
      </section>

      {nextRace && (
        <section className="py-16 border-t border-neutral-900 bg-gradient-to-b from-neutral-950 to-black">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">Next Race</span>
            <h2 className="text-3xl sm:text-5xl font-bold uppercase mt-3 mb-10 font-heading">
              {nextRace.title}
            </h2>
            <div className="flex justify-center">
              <CountdownTimer targetDate={nextRaceDate ? nextRaceDate.toISOString() : null} />
            </div>
            <Link
              href={`/races/${nextRace.slug}`}
              className="inline-block mt-10 px-6 py-3 border border-f1-teal text-f1-teal uppercase text-sm font-semibold tracking-wider rounded-full hover:bg-f1-teal hover:text-black transition-colors"
            >
              Race Details
            </Link>
          </div>
        </section>
      )}

      {latestNews.length > 0 && (
        <section className="py-20 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase font-heading">
                Latest Stories
              </h2>
              <Link
                href="/news"
                className="text-f1-teal uppercase text-sm font-semibold tracking-wider hover:text-f1-teal-dark transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredCar && <CarFeature car={featuredCar} />}

      {drivers.length > 0 && (
        <section className="py-20 border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase font-heading">
                Our Drivers
              </h2>
              <Link
                href="/team"
                className="text-f1-teal uppercase text-sm font-semibold tracking-wider hover:text-f1-teal-dark transition-colors"
              >
                Meet the Team
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {drivers.map((member) => (
                <DriverCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PartnersStrip partners={partners} />
    </div>
  );
}