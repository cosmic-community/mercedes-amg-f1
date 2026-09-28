import { getNews } from '@/lib/cosmic';
import NewsCard from '@/components/NewsCard';

export const revalidate = 60;

export const metadata = {
  title: 'Latest News | Mercedes-AMG F1',
  description: 'The latest news and stories from the Mercedes-AMG PETRONAS Formula One Team.',
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <span className="text-f1-teal text-xs uppercase tracking-[0.3em]">Latest</span>
        <h1 className="text-4xl sm:text-6xl font-bold uppercase mt-3 font-heading">News</h1>
      </div>
      {news.length === 0 ? (
        <p className="text-gray-500">No news articles available right now. Check back soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}