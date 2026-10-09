import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Branch, Category, Product } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly supabase = inject(SupabaseService);

  async getBranches(): Promise<Branch[]> {
    const { data, error } = await this.supabase.client
      .from('branches')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return (data ?? []) as Branch[];
  }

  async getCategories(branchId: string): Promise<Category[]> {
    const { data, error } = await this.supabase.client
      .from('categories')
      .select('*')
      .eq('branch_id', branchId)
      .eq('is_active', true)
      .order('sort_order');

    if (error) throw error;
    return (data ?? []) as Category[];
  }

  async getProducts(branchId: string, categoryId?: string): Promise<Product[]> {
    let query = this.supabase.client
      .from('products')
      .select('*')
      .eq('branch_id', branchId)
      .eq('is_available', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query.order('sort_order');

    if (error) throw error;
    return (data ?? []) as Product[];
  }
}
