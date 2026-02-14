import { Suspense } from 'react';
import { Metadata } from 'next';
import UniversityFinder from '@/components/UniversityFinder';

export const metadata: Metadata = {
  title: 'Find Your Perfect University | Shabuj Global Education',
  description:
    'Explore 200+ global university partners across UK, USA, Canada, Australia. Filter by country, tuition, ranking, IELTS requirements and more. Find your ideal study abroad destination.',
  openGraph: {
    title: 'Find Your Perfect University | Shabuj Global Education',
    description:
      'Explore 200+ global university partners. Filter by country, tuition, ranking and more.',
  },
};

export default function UniversitiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative min-h-[280px] overflow-hidden bg-slate-100">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/bannar.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/70" aria-hidden />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-2 inline-block rounded-full bg-[#e0f2fe] px-4 py-1.5 text-sm font-medium text-[#1e3a5f]">
              200+ Global University Partners | UK, USA, Canada, Australia
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find Your <span className="text-[#1e3a5f]">Perfect University</span>
            </h1>
            <p className="max-w-2xl text-slate-600">
              Shabuj Global Education is a British Council-approved consultancy. Since 2010, we have
              supported over 145,000 students with undergraduate, postgraduate, foundation, and
              advanced degrees across UK, Canada, USA, Australia and more. Use the filters below to
              discover universities that match your goals.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#1e3a5f]" />
              </div>
            }
          >
            <UniversityFinder />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
