import Link from 'next/link';
import TeamLogo from './TeamLogo';
import MobileMenu from './MobileMenu';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'Latest', href: '/news' },
  { label: '2026', href: '/races' },
  { label: 'Team', href: '/team' },
  { label: 'Sustainability', href: '#' },
  { label: 'Fans', href: '#' },
  { label: 'Partners', href: '/partners' },
  { label: 'Careers', href: '#' },
];

export default function Header() {
  return (
    <header className="bg-black relative z-40">
      <div className="border-b border-neutral-900">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-end gap-4 sm:gap-6 py-2 text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-400">
          <a href="#" className="hover:text-f1-teal transition-colors hidden sm:inline">
            Sign In
          </a>
          <a href="#" className="hover:text-f1-teal transition-colors hidden sm:inline">
            Team Store
          </a>
          <a href="#" className="hover:text-f1-teal transition-colors hidden md:inline">
            Mercedes-AMG
          </a>
          <a href="#" className="hover:text-f1-teal transition-colors hidden md:inline">
            Mercedes-Benz
          </a>
          <button aria-label="Search" className="hover:text-f1-teal transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex items-center justify-between py-4">
        <Link href="/">
          <TeamLogo />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group py-2">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-white hover:text-f1-teal transition-colors"
              >
                {item.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-60 group-hover:rotate-180 transition-transform"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
            </div>
          ))}
        </nav>
        <MobileMenu navItems={navItems} />
      </div>
      <div className="h-[2px] bg-gradient-to-r from-f1-teal via-f1-teal to-transparent" />
    </header>
  );
}