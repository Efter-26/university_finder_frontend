'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  fetchUniversities,
  fetchFilterOptions,
  type University,
  type UniversityFilters as FiltersType,
  type FilterOptions,
} from '@/lib/api';
import UniversityFilters from './UniversityFilters';
import UniversityCard from './UniversityCard';
import CompareModal from './CompareModal';

const DEBOUNCE_MS = 300;
const RESULTS_PER_PAGE = 3;

export default function UniversityFinder() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<FiltersType>({});
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadUniversities = useCallback(async (f: FiltersType) => {
    setLoading(true);
    setCurrentPage(1);
    try {
      const res = await fetchUniversities(f);
      setUniversities(res.universities);
      setTotal(res.total);
    } catch {
      setUniversities([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => loadUniversities(filters), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [filters, loadUniversities]);

  useEffect(() => {
    fetchFilterOptions()
      .then(setFilterOptions)
      .catch(() => setFilterOptions(null));
  }, []);

  const handleCompareAdd = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  }, []);

  const handleOpenCompare = useCallback(() => {
    if (compareIds.length === 2) setShowCompare(true);
  }, [compareIds.length]);

  const handleCloseCompare = useCallback(() => setShowCompare(false), []);

  const compareUniversities = universities.filter((u) => compareIds.includes(u.id));

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const paginatedUniversities = universities.slice(startIndex, startIndex + RESULTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-8">
      <UniversityFilters
        filters={filters}
        onFiltersChange={setFilters}
        filterOptions={filterOptions}
        isLoading={loading}
      />

      {compareIds.length === 2 && (
        <div className="flex items-center justify-between rounded-lg bg-[#1e3a5f]/10 px-4 py-3">
          <span className="text-sm font-medium text-slate-700">
            {compareIds.length} universities selected for comparison
          </span>
          <button
            type="button"
            onClick={handleOpenCompare}
            className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d4a6f]"
          >
            View Comparison
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-xl bg-linear-to-r from-[#1e3a5f] to-[#2d4a6f] px-5 py-3 text-white shadow-lg">
          <p className="text-sm font-medium">
            Showing {total === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + RESULTS_PER_PAGE, total)} of {total}{' '}
            {total === 1 ? 'result' : 'results'}
          </p>
        </div>
      </div>

      {loading && universities.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#1e3a5f]" />
        </div>
      ) : universities.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-600">No universities match your filters. Try adjusting them.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedUniversities.map((u) => (
              <UniversityCard
                key={u.id}
                university={u}
                onCompareAdd={handleCompareAdd}
                compareSelected={compareIds.includes(u.id)}
                compareDisabled={compareIds.length >= 2 && !compareIds.includes(u.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
              aria-label="Pagination"
            >
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
                aria-label="Previous page"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`h-10 min-w-10 rounded-lg px-3 font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-[#1e3a5f] text-white shadow-md'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
                aria-label="Next page"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          )}
        </>
      )}

      {showCompare && compareUniversities.length === 2 && (
        <CompareModal universities={compareUniversities} onClose={handleCloseCompare} />
      )}
    </div>
  );
}
