// Enhanced API client with authentication and comprehensive endpoints
// Uses Vite env VITE_API_BASE_URL, defaults to http://localhost:4000

export type User = {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'developer';
  status: 'active' | 'suspended' | 'pending';
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
};

export type KPI = {
  co2Saved: number;
  jobsCreated: number;
  netZero: number;
  investment: number;
  energyGenerated: number;
};

export type Scenario = {
  id: number;
  name: string;
  description?: string;
  notes?: string;
  score: number;
  status: 'draft' | 'review' | 'approved' | 'implemented';
  tags?: string[];
  data?: any;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type ScenarioInput = {
  name: string;
  description?: string;
  notes?: string;
  score?: number;
  tags?: string[];
  data?: any;
};

export type ModerationItem = {
  id: number;
  title: string;
  description?: string;
  type: 'dataset' | 'scenario' | 'project' | 'comment';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  data?: any;
  userId?: number;
  moderatorId?: number;
  user?: User;
  moderator?: User;
  createdAt: string;
  updatedAt: string;
};

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:4000";

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Set auth token in localStorage
const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Enhanced request function with authentication
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let errorData;
    try {
      errorData = JSON.parse(text);
    } catch {
      errorData = { error: text || 'Request failed' };
    }

    // Handle authentication errors
    if (res.status === 401 || res.status === 403) {
      removeAuthToken();
      window.location.href = '/login';
    }

    throw new Error(errorData.error || `Request failed ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  // Authentication
  async register(email: string, password: string, name: string, role: 'user' | 'developer' = 'user'): Promise<{ message: string; user: User }> {
    const response = await request<{ message: string; user: User }>("/api/auth/register", {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role })
    });
    return response;
  },

  async login(email: string, password: string): Promise<{ message: string; token: string; user: User }> {
    const response = await request<{ message: string; token: string; user: User }>("/api/auth/login", {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  async getProfile(): Promise<{ user: User }> {
    return request<{ user: User }>("/api/auth/profile");
  },

  async updateProfile(name?: string, avatar?: string): Promise<{ message: string; user: User }> {
    return request<{ message: string; user: User }>("/api/auth/profile", {
      method: 'PUT',
      body: JSON.stringify({ name, avatar })
    });
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return request<{ message: string }>("/api/auth/change-password", {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  logout(): void {
    removeAuthToken();
  },

  // Admin: User Management
  async getUsers(page: number = 1, limit: number = 10, role?: string, status?: string): Promise<{ users: User[]; pagination: any }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (role) params.append('role', role);
    if (status) params.append('status', status);
    
    return request<{ users: User[]; pagination: any }>(`/api/auth/users?${params}`);
  },

  async updateUser(userId: number, role?: string, status?: string): Promise<{ message: string; user: User }> {
    return request<{ message: string; user: User }>(`/api/auth/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ role, status })
    });
  },

  // KPIs
  async getKPIs(): Promise<KPI> {
    return request<KPI>("/api/kpis");
  },

  async saveKPIs(kpi: KPI): Promise<KPI> {
    return request<KPI>("/api/kpis", { 
      method: 'POST', 
      body: JSON.stringify(kpi) 
    });
  },

  // Scenarios
  async getScenarios(page: number = 1, limit: number = 10, status?: string, search?: string): Promise<{ scenarios: Scenario[]; pagination: any }> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    
    return request<{ scenarios: Scenario[]; pagination: any }>(`/api/scenarios?${params}`);
  },

  async getScenario(id: number): Promise<{ scenario: Scenario }> {
    return request<{ scenario: Scenario }>(`/api/scenarios/${id}`);
  },

  async saveScenario(input: ScenarioInput): Promise<{ message: string; scenario: Scenario }> {
    return request<{ message: string; scenario: Scenario }>("/api/scenarios", { 
      method: 'POST', 
      body: JSON.stringify(input) 
    });
  },

  async updateScenario(id: number, input: Partial<ScenarioInput> & { status?: string }): Promise<{ message: string; scenario: Scenario }> {
    return request<{ message: string; scenario: Scenario }>(`/api/scenarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input)
    });
  },

  async deleteScenario(id: number): Promise<{ message: string }> {
    return request<{ message: string }>(`/api/scenarios/${id}`, {
      method: 'DELETE'
    });
  },

  async updateScenarioStatus(id: number, status: string, reason?: string): Promise<{ message: string; scenario: Scenario }> {
    return request<{ message: string; scenario: Scenario }>(`/api/scenarios/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reason })
    });
  },

  async getScenarioStats(): Promise<{ stats: any }> {
    return request<{ stats: any }>("/api/scenarios/stats/overview");
  },

  // Moderation
  async getModerationItems(): Promise<ModerationItem[]> {
    return request<ModerationItem[]>("/api/moderation");
  },

  async createModerationItem(item: Partial<ModerationItem>): Promise<ModerationItem> {
    return request<ModerationItem>("/api/moderation", {
      method: 'POST',
      body: JSON.stringify(item)
    });
  },

  async updateModerationItem(id: number, status: string, reason?: string): Promise<ModerationItem> {
    return request<ModerationItem>(`/api/moderation/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reason })
    });
  },

  // Health check
  async healthCheck(): Promise<{ ok: boolean; timestamp: string; environment: string }> {
    return request<{ ok: boolean; timestamp: string; environment: string }>("/api/health");
  }
};

// Export utility functions
export const authUtils = {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  isAuthenticated: (): boolean => !!getAuthToken()
};