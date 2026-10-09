export interface Branch {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  image_url: string | null;
  is_active: boolean;
}

export interface Category {
  id: string;
  branch_id: string;
  name: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  branch_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
}
