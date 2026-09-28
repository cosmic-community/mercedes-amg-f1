import Link from 'next/link';
import TeamLogo from './TeamLogo';

const footerNav = [
  {
    title: 'Team',
    links: [
      { label: 'Latest News', href: '/news' },
      { label: 'Race Calendar', href: '/races' },
      { label: 'Our Car', href: '/cars' },
      { label: 'Drivers & Team', href: '/team' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Partners', href: '/partners' },
      { label: 'Team Store', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Sustainability', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <TeamLogo />
          <p className="text-gray-500 text-sm mt-6 leading-relaxed">
            The home of the Mercedes-AMG PETRONAS Formula One Team. Follow every race, driver
            story, and team update.
          </p>
        </div>
        {footerNav.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-f1-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
            Follow Us
          </h4>
          <div className="flex gap-3">
            {['X', 'IG', 'FB', 'YT'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center text-xs font-bold text-gray-400 hover:border-f1-teal hover:text-f1-teal transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600 uppercase tracking-wide">
          <p>&copy; {new Date().getFullYear()} Mercedes-AMG Petronas F1 Team. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}