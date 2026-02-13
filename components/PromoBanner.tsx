import Link from 'next/link';

export default function PromoBanner() {
  return (
    <div className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 px-4 py-2.5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
        <div className="flex items-center gap-2 text-white">
          <span className="text-lg" aria-hidden>
            🔥
          </span>
          <span className="text-sm font-medium sm:text-base">
            UK May 2026 Intake is Now Open! Apply to 79+ Top Universities.
          </span>
        </div>
        <Link
          href="/events"
          className="shrink-0 rounded-md bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
