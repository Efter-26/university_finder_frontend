'use client';

import type { University } from '@/lib/api';

function formatCurrency(amount: number): string {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface UniversityCardProps {
  university: University;
  onCompareAdd?: (id: string) => void;
  compareSelected?: boolean;
  compareDisabled?: boolean;
}

export default function UniversityCard({
  university,
  onCompareAdd,
  compareSelected,
  compareDisabled,
}: UniversityCardProps) {
  const {
    name,
    country,
    location,
    tuitionFee,
    ranking,
    establishedYear,
    minIeltsScore,
    courses,
    scholarshipsAvailable,
  } = university;

  return (
    <article className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#1e3a5f]/30 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl font-bold text-[#1e3a5f]">
          {name.charAt(0)}
        </div>
        {onCompareAdd && (
          <button
            type="button"
            onClick={() => onCompareAdd(university.id)}
            disabled={compareDisabled && !compareSelected}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              compareSelected
                ? 'bg-[#1e3a5f] text-white'
                : compareDisabled
                  ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-[#1e3a5f] hover:text-white'
            }`}
          >
            {compareSelected ? 'Added' : 'Compare'}
          </button>
        )}
      </div>

      <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-[#1e3a5f]">{name}</h3>

      <ul className="mb-4 flex-1 space-y-1.5 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <span className="text-slate-400">Country:</span>
          <span>{country}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-slate-400">Location:</span>
          <span>{location}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-slate-400">Tuition:</span>
          <span className="font-medium text-slate-800">{formatCurrency(tuitionFee)}/year</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-slate-400">World Rank:</span>
          <span className="font-medium text-slate-800">#{ranking}</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-slate-400">Established:</span>
          <span>{establishedYear}</span>
        </li>
        {minIeltsScore != null && (
          <li className="flex items-center gap-2">
            <span className="text-slate-400">Min IELTS:</span>
            <span>{minIeltsScore}</span>
          </li>
        )}
        {scholarshipsAvailable && (
          <li>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              Scholarships available
            </span>
          </li>
        )}
      </ul>

      {courses && courses.length > 0 && (
        <div className="border-t border-slate-100 pt-3">
          <p className="mb-1.5 text-xs font-medium text-slate-500">Popular courses</p>
          <p className="text-xs text-slate-600">{courses.slice(0, 4).join(', ')}</p>
        </div>
      )}
    </article>
  );
}
