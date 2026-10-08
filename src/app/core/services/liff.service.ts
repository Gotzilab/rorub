import { Injectable } from '@angular/core';
import liff from '@line/liff';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LiffService {
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }

    await liff.init({
      liffId: environment.liffId,
    });

    this.initialized = true;
  }

  isLoggedIn(): boolean {
    return liff.isLoggedIn();
  }

  login(): void {
    liff.login();
  }

  logout(): void {
    liff.logout();
  }

  getProfile() {
    return liff.getProfile();
  }

  getUserId(): string | null {
    return liff.getDecodedIDToken()?.sub ?? null;
  }

  isInClient(): boolean {
    return liff.isInClient();
  }

  closeWindow(): void {
    if (liff.isInClient()) {
      liff.closeWindow();
    }
  }
}
