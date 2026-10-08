import { Component, OnInit, inject } from '@angular/core';
import { LiffService } from '../../core/services/liff.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class CustomerComponent implements OnInit {
  private readonly liffService = inject(LiffService);

  loading = true;
  loggedIn = false;

  displayName = '';
  pictureUrl = '';
  userId = '';

  errorMessage = '';

  async ngOnInit(): Promise<void> {
    try {
      await this.liffService.init();

      this.loggedIn = this.liffService.isLoggedIn();

      // ยังไม่ได้ Login
      if (!this.loggedIn) {
        this.liffService.login();
        return;
      }

      // Login แล้ว
      const profile = await this.liffService.getProfile();

      this.displayName = profile.displayName;
      this.pictureUrl = profile.pictureUrl ?? '';
      this.userId = profile.userId;

      console.log('LINE Profile:', profile);
      console.log('LINE User ID:', profile.userId);
    } catch (error) {
      console.error(error);

      this.errorMessage = 'ไม่สามารถเชื่อมต่อกับ LINE ได้ กรุณาลองใหม่อีกครั้ง';
    } finally {
      this.loading = false;
    }
  }

  logout(): void {
    this.liffService.logout();
  }
}
