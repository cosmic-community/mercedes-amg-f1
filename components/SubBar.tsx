import Link from 'next/link';
import LiveClock from './LiveClock';
import type { Race } from '@/types';

const tabs = [
  { label: 'Now', href: '/', active: true },
  { label: 'Next', href: '/races' },
  { label: 'Latest', href: '/news' },
  { label: 'Standings', href: '/races' },
];

export default function SubBar({ nextRace }: { nextRace: Race | null }) {
  return (
    <div className="bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-4 sm:gap-6 overflow-x-auto">
        <div className="flex items-center gap-2 flex-shrink-0">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                tab.active
                  ? 'bg-f1-green text-black'
                  : 'bg-neutral-900 text-gray-300 hover:bg-neutral-800'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        {nextRace && (
          <div className="flex-1 min-w-0 text-xs sm:text-sm text-f1-teal font-semibold uppercase tracking-wide truncate">
            Next Race: {nextRace.title}
          </div>
        )}
        <div className="flex-shrink-0 text-xs sm:text-sm text-gray-400 font-medium">
          <LiveClock />
        </div>
      </div>
    </div>
  );
}