// Lightweight client for server API
// Uses Vite env VITE_API_BASE_URL, defaults to http://localhost:4000

export type KPI = {
  co2Saved: number; // e.g., tons per year
  jobsCreated: number;
  netZero: number; // percentage 0..100
};

export type ScenarioInput = {
  name: string;
  notes?: string | null;
  score?: number | null;
};

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  // KPIs
  async getKPIs(): Promise<KPI> {
    return request<KPI>("/api/kpis");
  },
  async saveKPIs(kpi: KPI): Promise<KPI> {
    return request<KPI>("/api/kpis", { method: 'POST', body: JSON.stringify(kpi) });
  },

  // Scenarios
  async getScenarios(): Promise<any[]> {
    return request<any[]>("/api/scenarios");
  },
  async saveScenario(input: ScenarioInput): Promise<any> {
    return request<any>("/api/scenarios", { method: 'POST', body: JSON.stringify({
      name: input.name,
      notes: input.notes ?? null,
      score: input.score ?? 0,
    }) });
  },
};