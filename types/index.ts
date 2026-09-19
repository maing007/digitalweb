export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  plan: string;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  tenant_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  department: string | null;
  hire_date: string | null;
  avatar_url: string | null;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PerformanceReview {
  id: string;
  employee_id: string;
  tenant_id: string;
  review_period: string;
  score: number;
  goals: Record<string, unknown>;
  feedback: string | null;
  manager_comments: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface VPNAccess {
  id: string;
  tenant_id: string;
  employee_id: string | null;
  vpn_config: Record<string, unknown>;
  active: boolean;
  expires_at: string | null;
  created_at: string;
}
