import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_CONFIG } from '@/src/app/config/app.config';
import { IAppConfig } from '@/src/app/config/app-config.interface';
import { AuthService } from '@/src/app/core/auth/auth.service';
import { DeviceService } from '@/src/app/core/device/device.service';
import { ProveClientSdk } from '@/src/app/core/prove/prove-client-sdk';
import { AppEnv } from '@/src/app/core/prove/prove-service/(definitions)';
import { LayoutComponent } from '@/src/app/shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  loading: boolean = true;
  ready: boolean = false;
  error: string = '';

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private readonly authService: AuthService,
    private readonly deviceService: DeviceService,
    private readonly proveClient: ProveClientSdk
  ) {}

  private async initApp() {
    try {
      this.proveClient.authCheck();
      this.deviceService.setIsMobile(this.proveClient.authCheck());
      this.authService.setAppEnv(
        this.config.app_env === AppEnv.PRODUCTION
          ? AppEnv.PRODUCTION
          : AppEnv.SANDBOX
      );
    } catch (e: any) {
      //default to desktop if sdk fails
      this.deviceService.setIsMobile(false);
    } finally {
      this.loading = false;
      this.ready = true;
    }
  }

  ngOnInit() {
    this.initApp();
  }
}
