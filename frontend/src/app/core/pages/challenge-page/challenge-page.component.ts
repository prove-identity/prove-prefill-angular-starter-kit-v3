import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { TranslateService } from '@ngx-translate/core';
import { ProveClientSdk } from '@/src/app/core/prove/prove-client-sdk';
import { ProveApiService } from '@/src/app/core/prove/prove-service/prove-api.service';
import { AuthService } from '@/src/app/core/auth/auth.service';
import { DeviceService } from '@/src/app/core/device/device.service';
import { AppEnv } from '@/src/app/core/prove/prove-service/(definitions)';
import { ChallengePageData } from '@/src/app/core/prove/prove-service/apis/challengeRequest';

import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import {
  MatError,
  MatHint,
  MatLabel,
  MatFormField,
  MatInputModule,
} from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthAgreementComponent } from '@/src/app/shared/components/auth-agreement/auth-agreement.component';
import { ProveButtonComponent } from '@/src/app/shared/components/prove-button/prove-button.component';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  templateUrl: './challenge-page.component.html',
  styleUrl: './challenge-page.component.css',
  imports: [
    NgIf,
    NgFor,
    MatLabel,
    MatError,
    MatHint,
    MatCard,
    MatSelect,
    MatOption,
    CommonModule,
    MatFormField,
    MatProgressSpinner,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ProveButtonComponent,
    AuthAgreementComponent,
    NgxMatIntlTelInputComponent,
    MatProgressSpinnerModule,
  ],
})
export class ChallengePageComponent {
  form: FormGroup;
  isLoading = false;
  error: string | null = null;
  isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly proveClientSDK: ProveClientSdk,
    private readonly proveService: ProveApiService,
    private readonly authService: AuthService,
    private readonly deviceService: DeviceService,
    private readonly translate: TranslateService
  ) {
    const phoneValidationLength =
      this.authService.appEnv() === AppEnv.SANDBOX ? 12 : 10;
    this.form = this.fb.group({
      last4SSN: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.minLength(phoneValidationLength)],
      ],
    });
  }

  isDirty(): boolean {
    return this.form.dirty;
  }

  isValid(): boolean {
    return this.form.valid;
  }

  t(key: string): string {
    return this.translate.instant(key);
  }

  async handleContinueButton(data: ChallengePageData) {
    try {
      const { last4SSN, phoneNumber } = data;
      this.deviceService.setPhoneNumber(phoneNumber);
      // Call /start endpoint here - v3StartRequest
      const response = this.proveService.v3StartRequest({
        isMobile: this.deviceService.isMobile(),
        phoneNumber,
        last4SSN,
      }) as Observable<any>;

      response.subscribe((res: any) => {
        const { data: startResponse } = res;
        // Save authToken and correlationId in AuthProvider
        // for use in the SMSWaiting Page to avoid passing auth tokens in url
        this.authService.setAuthToken(startResponse.authToken);
        this.authService.setCorrelationId(startResponse.correlationId);
        this.authService.setNextStep(startResponse.next);
        // redirect users to appropriate page depending on flowType ('desktop' | 'mobile')
        const smsWaitingPath =
          (this.deviceService.isMobile() ? '/sms-otp' : '/sms-waiting') +
          location.search;
        this.router.navigate([smsWaitingPath]);
      });
    } catch (err) {
      console.error('API call failed:', err);
      this.error =
        'An error occurred while processing your request. Please try again.';
      // Set error message
    } finally {
      this.isLoading = false;
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (this.form.valid) {
      // Test Navigate to another page, e.g., '/sms-waiting'
      this.handleContinueButton(this.form.value);
    } else {
      console.error('Form is invalid');
      this.isLoading = false;
    }
  }

  getSSNErrorMessage() {
    const control = this.form.get('last4SSN');
    if (control?.hasError('required')) {
      return this.t('dataCollection.ssn.errorText');
    }
    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'Must be exactly 4 digits';
    }
    return '';
  }

  getPhoneErrorMessage() {
    const control = this.form.get('phoneNumber');
    if (control?.hasError('required')) {
      return 'Phone number is required';
    }
    if (control?.hasError('minlength')) {
      return 'Not a valid phone number';
    }
    return '';
  }
}
