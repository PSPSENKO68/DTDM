import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Tạo Supabase client với cấu hình tùy chỉnh cho authentication
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Đường dẫn trang xác nhận email
    flowType: 'pkce', // Preferred Key for Code Exchange - bảo mật hơn
  },
});

// Types for database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Main database interface
export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          title: string
          description: string
          full_description: string
          image: string
          category: string
          level: string
          duration: string
          schedule: string
          price: string
          rating: number
          num_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          full_description: string
          image: string
          category: string
          level: string
          duration: string
          schedule: string
          price: string
          rating?: number
          num_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          full_description?: string
          image?: string
          category?: string
          level?: string
          duration?: string
          schedule?: string
          price?: string
          rating?: number
          num_reviews?: number
          created_at?: string
          updated_at?: string
        }
      }
      instructors: {
        Row: {
          id: string
          name: string
          image: string
          qualification: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          image: string
          qualification: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          image?: string
          qualification?: string
          created_at?: string
        }
      }
      course_instructors: {
        Row: {
          id: string
          course_id: string
          instructor_id: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          instructor_id: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          instructor_id?: string
          created_at?: string
        }
      }
      curriculum: {
        Row: {
          id: string
          course_id: string
          week: number
          title: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          week: number
          title: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          week?: number
          title?: string
          content?: string
          created_at?: string
        }
      }
      course_features: {
        Row: {
          id: string
          course_id: string
          feature: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          feature: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          feature?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      levels: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          phone: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
      }
      registrations: {
        Row: {
          id: string
          user_id: string
          course_id: string
          status: string
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          status: string
          payment_status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          status?: string
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          subject?: string
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'] 