import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Customer, UpsertCustomer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly supabase = inject(SupabaseService);

  async upsertCustomer(customer: UpsertCustomer): Promise<{
    data: Customer | null;
    error: Error | null;
  }> {
    const { data, error } = await this.supabase.client.rpc('upsert_customer', {
      p_line_user_id: customer.line_user_id,
      p_display_name: customer.display_name ?? null,
      p_picture_url: customer.picture_url ?? null,
    });

    if (error) {
      console.error('Upsert customer error:', error);

      return {
        data: null,
        error,
      };
    }

    return {
      data: data as Customer,
      error: null,
    };
  }

  async getByLineUserId(lineUserId: string): Promise<{
    data: Customer | null;
    error: Error | null;
  }> {
    const { data, error } = await this.supabase.client
      .from('customers')
      .select('*')
      .eq('line_user_id', lineUserId)
      .maybeSingle();

    if (error) {
      return {
        data: null,
        error,
      };
    }

    return {
      data: data as Customer | null,
      error: null,
    };
  }
}
