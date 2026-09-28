import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import SubBar from '@/components/SubBar';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';
import { getRaces, getNextRace } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Mercedes-AMG F1 | Official Team Website',
  description:
    'The official home of the Mercedes-AMG PETRONAS Formula One Team. Latest news, race calendar, car technology, drivers and partners.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;
  const races = await getRaces();
  const nextRace = getNextRace(races);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Titillium+Web:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏎️</text></svg>"
        />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className="bg-black text-white font-sans antialiased">
        <Header />
        <SubBar nextRace={nextRace} />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}