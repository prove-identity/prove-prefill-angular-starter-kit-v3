import {
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormStateService } from '../../prove/prove-service/form-state.service';
import PhoneNumberInput from '@prove-identity/prove-auth/build/lib/proveauth/internal/phone-number-input';
import { ProveApiService } from '../../prove/prove-service/prove-api.service';
import { AuthService } from '../../auth/auth.service';
import { DeviceService } from '../../device/device.service';
import { AuthFinishStepInput } from '@prove-identity/prove-auth';
import { APP_CONFIG } from '../../../config/app.config';
import { IAppConfig } from '../../../config/app-config.interface';
import { ProveClientSdk } from '../../prove/prove-client-sdk';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  templateUrl: './sms-waiting-page.component.html',
  styleUrl: './sms-waiting-page.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    NgIf,
    ProveClientSdk,
    RouterModule,
    FormsModule,
    RouterModule,
  ],
})
export class SMSWaitingComponent implements OnInit, OnChanges, OnDestroy {
  @Inject(APP_CONFIG) public config: IAppConfig;

  //Get Phone number from context (Set in ChallengePage)
  phoneNumber;
  //Auth Ref
  authRef = null;
  // Config
  loading: boolean = true;

  constructor(
    private formStateService: FormStateService,
    private fb: FormBuilder,
    private router: Router,
    private proveClientSDK: ProveClientSdk,
    private proveService: ProveApiService,
    private authService: AuthService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.phoneNumber = this.deviceService.phoneNumber;
    if (this.authService.authToken) {
      this.router.navigate(['/challenge']);
    }
    this.sendInstantLink(this.authService.authToken as string);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.phoneNumber = this.deviceService.phoneNumber;
    if (this.authService.authToken) {
      this.router.navigate(['/challenge']);
    }
    this.sendInstantLink(this.authService.authToken as string);
  }

  ngOnDestroy(): void {
    this.authService.setAuthToken('');
    if (this.authRef) {
      this.authRef.cancel();
    }
  }

  async sendInstantLink(authToken: string) {
    try {
      //if API_BASE_URL is set in .env, then call real endpoint
      if (this.config.app_base_url) {
        const builder = this.proveClientSDK.handleInstantLink(
          this.instantLinkStartStep,
          this.authFinishStep
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
      this.loading = false;
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
      this.loading = false;
    });
  }

  async authFinishStep(input: AuthFinishStepInput): Promise<any> {
    //On successful authFinish, call /v3ValidateRequest
    try {
      const response = await this.proveService.v3ValidateRequest({
        correlationId: this.authService.correlationId as string,
      });
      if (response.data) {
        const { next, success, challengeMissing } = response.data;
        this.authService.setNextStep(next);
        return this.router.navigate(['/review' + location.search]);
      }
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
  }
}
