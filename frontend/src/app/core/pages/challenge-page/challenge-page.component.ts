import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormStateService } from '../../prove/prove-service/form-state.service';
import { Router } from '@angular/router'; // Import Router
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ProveApiService } from '../../prove/prove-service/prove-api.service';
import { AuthService } from '../../auth/auth.service';
import { DeviceService } from '../../device/device.service';
import { ProveClientSdk } from '../../prove/prove-client-sdk';
import { ChallengePageData } from '../../prove/prove-service/apis/challengeRequest';
import { AppEnv } from '../../prove/prove-service/(definitions)';

@Component({
  selector: 'app-challenge-page',
  standalone: true,
  templateUrl: './challenge-page.component.html',
  styleUrl: './challenge-page.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    RouterModule,
    FormsModule,
    NgxMatIntlTelInputComponent,
  ],
})
export class ChallengePageComponent implements OnInit {
  form: FormGroup;
  error: string = '';

  //Setup Validation Schema for form validation (passing appEnv)

  async handleContinueButton(data: ChallengePageData) {
    try {
      const { last4SSN, phoneNumber } = data;
      this.deviceService.setPhoneNumber(phoneNumber);
      // Call /start endpoint here - v3StartRequest
      const response = await this.proveService.v3StartRequest({
        isMobile: this.deviceService.isMobile,
        phoneNumber,
        last4SSN,
        finalTargetUrl: 'http://127.0.0.1:3000/sms-result',
      });

      const { data: startResponse } = response;

      // Save authToken and correlationId in AuthProvider
      // for use in the SMSWaiting Page to avoid passing auth tokens in url
      this.authService.setAuthToken(startResponse.authToken);
      this.authService.setCorrelationId(startResponse.correlationId);
      this.authService.setNextStep(startResponse.next);
      // redirect users to appropriate page depending on flowType ('desktop' | 'mobile')
      const smsWaitingPath =
        (this.deviceService.isMobile ? '/sms-otp' : '/sms-waiting') +
        location.search;
      this.router.navigate([smsWaitingPath]);
    } catch (err) {
      console.error('API call failed:', err);
      this.error =
        'An error occurred while processing your request. Please try again.';
      // Set error message
    }
  }

  constructor(
    private formStateService: FormStateService,
    private fb: FormBuilder,
    private router: Router,
    private proveClientSDK: ProveClientSdk,
    private proveService: ProveApiService,
    private authService: AuthService,
    private deviceService: DeviceService
  ) {
    const phoneValidationLength =
      this.authService.appEnv === AppEnv.SANDBOX ? 12 : 10;
    this.form = this.fb.group({
      ssn: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.minLength(phoneValidationLength)],
      ],
    });
  }

  ngOnInit() {
    this.formStateService.currentState.subscribe((state) => {
      this.form.patchValue(state, { emitEvent: false });
    });

    this.form.valueChanges.subscribe((newState) => {
      this.formStateService.updateState(newState);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      // Test Navigate to another page, e.g., '/sms-waiting'
      this.router.navigate(['/sms-waiting']);
      this.proveService.v3ChallengeRequest(this.form.value);
    } else {
      console.error('Form is invalid');
    }
  }

  getSSNErrorMessage() {
    const control = this.form.get('ssn');
    if (control?.hasError('required')) {
      return 'SSN is required';
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
