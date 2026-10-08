import { Component, OnInit, inject } from '@angular/core';

import { LiffService } from '../../core/services/liff.service';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../core/models/customer.model';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent implements OnInit {
  private readonly liffService = inject(LiffService);
  private readonly customerService = inject(CustomerService);

  loading = true;
  loggedIn = false;

  displayName = '';
  pictureUrl = '';
  userId = '';

  customer: Customer | null = null;

  errorMessage = '';

  async ngOnInit(): Promise<void> {
    try {
      // 1. Initialize LIFF
      await this.liffService.init();

      // 2. Check login
      this.loggedIn = this.liffService.isLoggedIn();

      if (!this.loggedIn) {
        this.liffService.login();
        return;
      }

      // 3. Get LINE profile
      const profile = await this.liffService.getProfile();

      this.displayName = profile.displayName;
      this.pictureUrl = profile.pictureUrl ?? '';
      this.userId = profile.userId;

      console.log('LINE Profile:', profile);

      // 4. Save customer to Supabase
      const result = await this.customerService.upsertCustomer({
        line_user_id: profile.userId,
        display_name: profile.displayName,
        picture_url: profile.pictureUrl ?? null,
      });

      if (result.error) {
        throw result.error;
      }

      this.customer = result.data;

      console.log('Customer:', this.customer);
    } catch (error) {
      console.error(error);

      this.errorMessage = 'ไม่สามารถโหลดข้อมูลลูกค้าได้ กรุณาลองใหม่อีกครั้ง';
    } finally {
      this.loading = false;
    }
  }

  logout(): void {
    this.liffService.logout();
  }
}
