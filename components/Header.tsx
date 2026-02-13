'use client';

import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Find University', href: '/universities' },
  { label: 'Events', href: '/events' },
  { label: 'Admission Resources', href: '/admission-resources', hasDropdown: true },
  { label: 'Study Destination', href: '/study-destination', hasDropdown: true },
  { label: 'More', href: '/more', hasDropdown: true },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 0010.5-4.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#1e3a5f]">
              Shabuj Global Education
            </p>
            <p className="text-xs text-slate-600">Worldwide University Admission</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-[#1e3a5f]"
            >
              {item.label}
              {item.hasDropdown && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        <Link
          href="/registration"
          className="rounded-lg bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d4a6f]"
        >
          Registration
        </Link>
      </div>
    </header>
  );
}
