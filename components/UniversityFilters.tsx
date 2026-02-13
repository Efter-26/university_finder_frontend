'use client';

import { useCallback, useEffect, useState } from 'react';
import type { UniversityFilters as Filters, FilterOptions } from '@/lib/api';

interface UniversityFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  filterOptions: FilterOptions | null;
  isLoading: boolean;
}

const SearchIcon = () => (
  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MapIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AcademicIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const FilterInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  listId,
  options,
  className = '',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  listId?: string;
  options?: string[] | number[];
  className?: string;
}) => (
  <div className={className}>
    <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </label>
    {type === 'select' ? (
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#1e3a5f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
      >
        <option value="">Any</option>
        {options?.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        list={listId}
        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm transition-all placeholder:text-slate-400 focus:border-[#1e3a5f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
      />
    )}
    {listId && options && type !== 'select' && (
      <datalist id={listId}>
        {options.map((o) => (
          <option key={o} value={o} />
        ))}
      </datalist>
    )}
  </div>
);

export default function UniversityFilters({
  filters,
  onFiltersChange,
  filterOptions,
  isLoading,
}: UniversityFiltersProps) {
  const [local, setLocal] = useState<Filters>(filters);

  const update = useCallback(
    (key: keyof Filters, value: string) => {
      const next = { ...filters, [key]: value.trim() || undefined };
      setLocal(next);
      onFiltersChange(next);
    },
    [filters, onFiltersChange]
  );

  const reset = useCallback(() => {
    const empty: Filters = {};
    setLocal(empty);
    onFiltersChange(empty);
  }, [onFiltersChange]);

  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  const activeFilterCount = Object.values(filters).filter((v) => v !== undefined && v !== '').length;

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200/60">
      {/* Header */}
      <div className="border-b border-slate-100 bg-linear-to-br from-slate-50 to-white px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#1e3a5f] to-[#2d4a6f] text-white shadow-lg">
              <SearchIcon />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Find Your University</h2>
              <p className="text-sm text-slate-500">Refine your search with filters</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
              </span>
            )}
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200 hover:text-slate-900"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Main search */}
        <div className="rounded-2xl bg-linear-to-r from-[#1e3a5f]/5 to-transparent p-4 ring-1 ring-[#1e3a5f]/10">
          <div className="mb-2 flex items-center gap-2">
            <SearchIcon />
            <span className="text-sm font-bold uppercase tracking-wide text-[#1e3a5f]">
              Search by name
            </span>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              id="filter-name"
              type="text"
              placeholder="e.g., Oxford, Harvard, Toronto..."
              value={local.name ?? ''}
              onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm transition-all placeholder:text-slate-400 focus:border-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            />
          </div>
        </div>

        {/* Location, Tuition & Academic - categories stacked vertically, fields horizontal */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-100 p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1e3a5f]">
              <MapIcon />
              <span className="text-xs font-bold uppercase tracking-wide">Location</span>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <FilterInput
                id="filter-country"
                label="Country"
                value={local.country ?? ''}
                onChange={(v) => update('country', v)}
                placeholder="UK, USA, Canada..."
                listId="country-list"
                options={filterOptions?.countries}
                className="min-w-[140px] flex-1"
              />
              <FilterInput
                id="filter-location"
                label="City / State"
                value={local.location ?? ''}
                onChange={(v) => update('location', v)}
                placeholder="London, New York..."
                className="min-w-[140px] flex-1"
              />
              <FilterInput
                id="filter-course"
                label="Course"
                value={local.course ?? ''}
                onChange={(v) => update('course', v)}
                placeholder="MBA, Engineering..."
                listId="course-list"
                options={filterOptions?.courses}
                className="min-w-[140px] flex-1"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1e3a5f]">
              <CurrencyIcon />
              <span className="text-xs font-bold uppercase tracking-wide">Tuition & Costs</span>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <FilterInput
                id="filter-tuition-min"
                label="Min tuition (USD/year)"
                value={local.tuitionMin ?? ''}
                onChange={(v) => update('tuitionMin', v)}
                placeholder="0, 10000..."
                type="number"
                className="min-w-[140px] flex-1"
              />
              <FilterInput
                id="filter-tuition-max"
                label="Max tuition (USD/year)"
                value={local.tuitionMax ?? ''}
                onChange={(v) => update('tuitionMax', v)}
                placeholder="50000, 100000..."
                type="number"
                className="min-w-[140px] flex-1"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4">
            <div className="mb-3 flex items-center gap-2 text-[#1e3a5f]">
              <AcademicIcon />
              <span className="text-xs font-bold uppercase tracking-wide">Academic</span>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              <FilterInput
                id="filter-ranking-min"
                label="World rank (min)"
                value={local.rankingMin ?? ''}
                onChange={(v) => update('rankingMin', v)}
                placeholder="1, 50..."
                type="number"
                className="min-w-[100px] flex-1"
              />
              <FilterInput
                id="filter-ranking-max"
                label="World rank (max)"
                value={local.rankingMax ?? ''}
                onChange={(v) => update('rankingMax', v)}
                placeholder="100, 500..."
                type="number"
                className="min-w-[100px] flex-1"
              />
              <FilterInput
                id="filter-established-min"
                label="Est. year (from)"
                value={local.establishedMin ?? ''}
                onChange={(v) => update('establishedMin', v)}
                placeholder="1800, 1900..."
                type="number"
                className="min-w-[100px] flex-1"
              />
              <FilterInput
                id="filter-established-max"
                label="Est. year (to)"
                value={local.establishedMax ?? ''}
                onChange={(v) => update('establishedMax', v)}
                placeholder="1950, 2000..."
                type="number"
                className="min-w-[100px] flex-1"
              />
              <FilterInput
                id="filter-ielts"
                label="Your max IELTS"
                value={local.minIelts ?? ''}
                onChange={(v) => update('minIelts', v)}
                type="select"
                options={filterOptions?.ieltsScores}
                className="min-w-[100px] flex-1"
              />
              <div className="min-w-[120px] flex-1">
                <label
                  htmlFor="filter-scholarships"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Scholarships only
                </label>
                <select
                  id="filter-scholarships"
                  value={local.scholarships ?? ''}
                  onChange={(e) => update('scholarships', e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm transition-all focus:border-[#1e3a5f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
                >
                  <option value="">Any</option>
                  <option value="true">Yes — with scholarships</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="border-t border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-[#1e3a5f]" />
            <span className="text-sm font-medium text-slate-600">Updating results...</span>
          </div>
        </div>
      )}
    </div>
  );
}
