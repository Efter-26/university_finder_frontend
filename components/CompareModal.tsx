'use client';

import { useEffect } from 'react';
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

interface CompareModalProps {
  universities: University[];
  onClose: () => void;
}

export default function CompareModal({ universities, onClose }: CompareModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (universities.length === 0) return null;

  const [a, b] = universities;
  const fields: { label: string; getValue: (u: University) => string | number }[] = [
    { label: 'University Name', getValue: (u) => u.name },
    { label: 'Country', getValue: (u) => u.country },
    { label: 'Location', getValue: (u) => u.location },
    { label: 'Tuition Fee', getValue: (u) => formatCurrency(u.tuitionFee) },
    { label: 'World Ranking', getValue: (u) => `#${u.ranking}` },
    { label: 'Established Year', getValue: (u) => u.establishedYear },
    {
      label: 'Min IELTS',
      getValue: (u) => (u.minIeltsScore != null ? u.minIeltsScore : 'N/A'),
    },
    {
      label: 'Scholarships',
      getValue: (u) => (u.scholarshipsAvailable ? 'Yes' : 'No'),
    },
    {
      label: 'Popular Courses',
      getValue: (u) => (u.courses?.length ? u.courses.slice(0, 4).join(', ') : 'N/A'),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 id="compare-modal-title" className="text-xl font-bold text-slate-900">
            Compare Universities
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse">
            <tbody>
              {fields.map(({ label, getValue }) => (
                <tr key={label} className="border-b border-slate-100">
                  <td className="w-40 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-700">
                    {label}
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-900">{getValue(a)}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{getValue(b)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d4a6f]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
