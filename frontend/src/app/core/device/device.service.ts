import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  private phoneNumberSubject = new BehaviorSubject<string>('');

  isMobile(): boolean {
    return this.isMobileSubject.getValue();
  }
  phoneNumber(): string {
    return this.phoneNumberSubject.getValue();
  }
  setIsMobile(isMobile: boolean): void {
    this.isMobileSubject.next(isMobile);
  }
  setPhoneNumber(phoneNumber: string): void {
    this.phoneNumberSubject.next(phoneNumber);
  }
}
