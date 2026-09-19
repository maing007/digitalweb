export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          domain: string | null;
          plan: string;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          domain?: string | null;
          plan?: string;
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          domain?: string | null;
          plan?: string;
          settings?: Json;
          updated_at?: string;
        };
      };
      employees: {
        Row: {
          id: string;
          tenant_id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: string;
          department: string | null;
          hire_date: string | null;
          avatar_url: string | null;
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          email: string;
          first_name: string;
          last_name: string;
          role: string;
          department?: string | null;
          hire_date?: string | null;
          avatar_url?: string | null;
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          role?: string;
          department?: string | null;
          hire_date?: string | null;
          avatar_url?: string | null;
          settings?: Json;
          updated_at?: string;
        };
      };
      performance_reviews: {
        Row: {
          id: string;
          employee_id: string;
          tenant_id: string;
          review_period: string;
          score: number;
          goals: Json;
          feedback: string | null;
          manager_comments: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          employee_id: string;
          tenant_id: string;
          review_period: string;
          score: number;
          goals: Json;
          feedback?: string | null;
          manager_comments?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          employee_id?: string;
          tenant_id?: string;
          review_period?: string;
          score?: number;
          goals?: Json;
          feedback?: string | null;
          manager_comments?: string | null;
          status?: string;
          updated_at?: string;
        };
      };
      vpn_access: {
        Row: {
          id: string;
          tenant_id: string;
          employee_id: string | null;
          vpn_config: Json;
          active: boolean;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          employee_id?: string | null;
          vpn_config?: Json;
          active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          employee_id?: string | null;
          vpn_config?: Json;
          active?: boolean;
          expires_at?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          tenant_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          tenant_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          tenant_id?: string | null;
        };
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
