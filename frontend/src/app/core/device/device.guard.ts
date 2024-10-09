import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { DeviceService } from './device.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceGuard implements CanActivate {
  constructor(private deviceService: DeviceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.deviceService.isMobile) {
      // Allow access if the device is mobile
      return true;
    } else {
      // Redirect or deny access if not mobile
      this.router.navigate(['/not-mobile']);
      return false;
    }
  }
}
