export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          source: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          source?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          source?: string | null;
        };
      };
      custom_orders: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          product_type: string;
          width_cm: number;
          height_cm: number;
          depth_cm: number;
          material: string | null;
          finish: string | null;
          notes: string | null;
          image_urls: string[];
          customer_name: string | null;
          customer_email: string | null;
          customer_phone: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          order_id: string;
          product_type: string;
          width_cm: number;
          height_cm: number;
          depth_cm: number;
          material?: string | null;
          finish?: string | null;
          notes?: string | null;
          image_urls?: string[];
          customer_name?: string | null;
          customer_email?: string | null;
          customer_phone?: string | null;
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["custom_orders"]["Insert"]>;
      };
      inquiries: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          message: string | null;
          inquiry_type: string | null;
          product_type: string | null;
          source: string | null;
          page_path: string | null;
          dimensions_text: string | null;
          material: string | null;
          finish: string | null;
          artwork_size: string | null;
          frame_style: string | null;
          reference_image_urls: string[];
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          message?: string | null;
          inquiry_type?: string | null;
          product_type?: string | null;
          source?: string | null;
          page_path?: string | null;
          dimensions_text?: string | null;
          material?: string | null;
          finish?: string | null;
          artwork_size?: string | null;
          frame_style?: string | null;
          reference_image_urls?: string[];
          status?: string;
        };
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
      };
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          seo_title: string | null;
          seo_description: string | null;
          published: boolean;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          published?: boolean;
          published_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
      };
    };
  };
}

export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type CustomOrder = Database["public"]["Tables"]["custom_orders"]["Row"];
export type CustomOrderInsert = Database["public"]["Tables"]["custom_orders"]["Insert"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];
