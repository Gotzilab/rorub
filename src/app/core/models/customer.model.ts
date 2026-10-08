export interface Customer {
  id: string;
  line_user_id: string;
  display_name: string | null;
  picture_url: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpsertCustomer {
  line_user_id: string;
  display_name?: string | null;
  picture_url?: string | null;
  phone?: string | null;
}
