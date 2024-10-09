import {
  Inject,
  OnInit,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '@/src/app/config/app.config';
import { AuthService } from '@/src/app/core/auth/auth.service';
import { AuthFinishStepInput } from '@prove-identity/prove-auth';
import { IAppConfig } from '@/src/app/config/app-config.interface';
import { DeviceService } from '@/src/app/core/device/device.service';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProveClientSdk } from '@/src/app/core/prove/prove-client-sdk';
import { MatError, MatFormField, MatLabel } from '@angular/material/input';
import { ProveApiService } from '@/src/app/core/prove/prove-service/prove-api.service';
import PhoneNumberInput from '@prove-identity/prove-auth/build/lib/proveauth/internal/phone-number-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProveButtonComponent } from '@/src/app/shared/components/prove-button/prove-button.component';

@Component({
  standalone: true,
  selector: 'app-challenge-page',
  templateUrl: './sms-waiting-page.component.html',
  styleUrl: './sms-waiting-page.component.css',
  imports: [
    MatLabel,
    MatError,
    CommonModule,
    MatFormField,
    TranslateModule,
    ProveButtonComponent,
    MatProgressSpinnerModule,
    NgxMatIntlTelInputComponent,
  ],
})
export class SMSWaitingComponent implements OnInit, OnChanges, OnDestroy {
  phoneNumber: string = '';
  authRef: any;
  isLoading: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly proveClientSDK: ProveClientSdk,
    private readonly proveService: ProveApiService,
    private readonly authService: AuthService,
    private readonly deviceService: DeviceService,
    private readonly translate: TranslateService,
    @Inject(APP_CONFIG) public config: IAppConfig
  ) {}

  ngOnInit(): void {
    this.phoneNumber = this.deviceService.phoneNumber();
    if (!this.authService.authToken()) {
      this.router.navigate(['/challenge']);
    }
    this.sendInstantLink(this.authService.authToken() as string);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.phoneNumber = this.deviceService.phoneNumber();
    if (this.authService.authToken()) {
      this.router.navigate(['/challenge']);
    }
    this.sendInstantLink(this.authService.authToken() as string);
  }

  ngOnDestroy(): void {
    this.authService.setAuthToken('');
    if (this.authRef) {
      this.authRef.cancel();
    }
  }

  t(key: string): string {
    return this.translate.instant(key);
  }

  async sendInstantLink(authToken: string) {
    try {
      //if API_BASE_URL is set in .env, then call real endpoint
      if (this.config.app_base_url) {
        const builder = this.proveClientSDK.handleInstantLink(
          this.instantLinkStartStep.bind(this),
          this.authFinishStep.bind(this)
        );
        //set ref to builder instance to clear on unmount
        this.authRef = builder.authenticate(authToken);
        await this.authRef;
      } else {
        //local mock mode (simulate succesful instant-link auth finish)
        setTimeout(() => {
          this.authFinishStep({
            authId: '',
          });
        }, 3000);
      }
    } catch (e) {
      console.log('error: ', e);
    } finally {
      this.isLoading = false;
    }
  }

  instantLinkStartStep(
    phoneNumberNeeded: boolean,
    phoneValidationError?: any
  ): Promise<PhoneNumberInput | null> {
    return new Promise((resolve, reject) => {
      console.log('phoneNumberNeeded: ', phoneNumberNeeded);
      console.log('phoneValidationError: ', phoneValidationError);
      if (phoneNumberNeeded) {
        if (phoneValidationError) {
          // Handle validation error if needed
          alert(`Validation Error: ${phoneValidationError.message}`);
          reject(
            new Error(`Validation Error: ${phoneValidationError.message}`)
          );
        }

        // Resolve the phone number input
        resolve({ phoneNumber: this.phoneNumber });
      } else {
        // Phone number not needed, resolve with null
        resolve(null);
      }
      this.isLoading = false;
    });
  }

  async authFinishStep(input: AuthFinishStepInput): Promise<any> {
    //On successful authFinish, call /v3ValidateRequest
    try {
      const observable = this.proveService.v3ValidateRequest({
        correlationId: this.authService.correlationId() as string,
      }) as Observable<any>;

      observable.subscribe((response: any) => {
        if (response && response.data) {
          const { next, success, challengeMissing } = response.data;
          this.authService.setNextStep(next);
          return this.router.navigate(['/review' + location.search]);
        }
        return null;
      });
    } catch (e: any) {
      console.log('error: ', e);
    }
  }

  //Redirects users back to challenge page
  async handleReturnToChallengePage() {
    // Construct new path with existing query parameters
    const challengePagePath = '/challenge' + location.search;
    this.router.navigate([challengePagePath]);
  }

  // Utility function to format phone number
  formatPhoneNumber(phoneNumber: string) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[4];
    }
    return null;
  }
}
