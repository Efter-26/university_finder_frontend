import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative min-h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="mb-4 inline-block rounded-full bg-[#e0f2fe]/90 px-4 py-1.5 text-sm font-medium text-[#1e3a5f]">
            200+ Global University Partners | UK, USA, Canada, Australia
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your <span className="text-[#7dd3fc]">Perfect University</span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-slate-200">
            Shabuj Global Education is a British Council-approved consultancy. Since 2010, we have
            supported over 145,000 students with undergraduate, postgraduate, foundation, and
            advanced degrees across UK, Canada, USA, Australia and more. Explore our global
            university network and take the next step toward your academic future.
          </p>
          <Link
            href="/universities"
            className="rounded-lg bg-[#1e3a5f] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#2d4a6f]"
          >
            Find University
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
            Our Students are Our Reference
          </h2>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-slate-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a5f] text-white">
                <svg
                  className="h-6 w-6"
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
                <p className="font-semibold text-slate-900">Shabuj Global Education</p>
                <p className="text-sm">Worldwide University Admission</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
