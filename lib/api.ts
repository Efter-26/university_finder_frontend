const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface University {
  id: string;
  name: string;
  country: string;
  location: string;
  tuitionFee: number;
  ranking: number;
  establishedYear: number;
  minIeltsScore?: number;
  courses?: string[];
  scholarshipsAvailable?: boolean;
}

export interface UniversityFilters {
  name?: string;
  country?: string;
  location?: string;
  tuitionMin?: string;
  tuitionMax?: string;
  rankingMin?: string;
  rankingMax?: string;
  establishedMin?: string;
  establishedMax?: string;
  minIelts?: string;
  course?: string;
  scholarships?: string;
}

export interface UniversitiesResponse {
  universities: University[];
  total: number;
}

export interface FilterOptions {
  countries: string[];
  courses: string[];
  ieltsScores: number[];
}

export async function fetchUniversities(
  filters: UniversityFilters = {}
): Promise<UniversitiesResponse> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const url = `${API_BASE}/api/universities${params.toString() ? `?${params}` : ''}`;
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });

  if (!res.ok) {
    throw new Error('Failed to fetch universities');
  }

  return res.json();
}

export async function fetchUniversityById(id: string): Promise<University> {
  const res = await fetch(`${API_BASE}/api/universities/${id}`);

  if (!res.ok) {
    throw new Error('University not found');
  }

  return res.json();
}

export async function fetchFilterOptions(): Promise<FilterOptions> {
  const res = await fetch(`${API_BASE}/api/filters`);

  if (!res.ok) {
    throw new Error('Failed to fetch filter options');
  }

  return res.json();
}
