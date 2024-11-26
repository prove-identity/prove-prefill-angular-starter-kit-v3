import {
  Inject,
  OnInit,
  QueryList,
  OnDestroy,
  Component,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import * as proveAuth from '@prove-identity/prove-auth';
import { APP_CONFIG } from '@/src/app/config/app.config';
import { IAppConfig } from '@/src/app/config/app-config.interface';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { DeviceService } from '@/src/app/core/device/device.service';
import { AuthService } from '@/src/app/core/auth/auth.service';
import { ProveClientSdk } from '@/src/app/core/prove/prove-client-sdk';
import { MatError, MatFormField, MatLabel } from '@angular/material/input';
import { ProveApiService } from '@/src/app/core/prove/prove-service/prove-api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProveButtonComponent } from '@/src/app/shared/components/prove-button/prove-button.component';

@Component({
  standalone: true,
  selector: 'app-otp-entry',
  templateUrl: './otp-entry-page.component.html',
  styleUrl: './otp-entry-page.component.css',
  imports: [
    NgIf,
    NgFor,
    MatLabel,
    MatError,
    FormsModule,
    CommonModule,
    MatFormField,
    ProveButtonComponent,
    NgxMatIntlTelInputComponent,
    MatProgressSpinnerModule,
  ],
})
export class OtpEntryPageComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isVerifyButtonEnabled: boolean = false;
  isError: boolean = false;
  errorMsg: string | null = null;

  OTP_LENGTH = 4;
  BLANK_OTP = Array(this.OTP_LENGTH).fill('');
  otp: string[] = [...this.BLANK_OTP];
  otpSent: boolean = false;

  // OTP Actions
  otpActions: {
    submitOtp: ((otp: string) => void) | null;
    cancelOtpFinish: (() => void) | null;
  } = {
    submitOtp: null,
    cancelOtpFinish: null,
  };

  // References to OTP Inputs and Verify Button
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  verifyButtonRef!: ElementRef;
  // Prove Authentication Reference
  authRef: proveAuth.CancelablePromise<void> | null = null;
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly deviceService: DeviceService,
    private readonly authService: AuthService,
    private readonly proveClient: ProveClientSdk,
    private readonly proveService: ProveApiService,
    @Inject(APP_CONFIG) public config: IAppConfig
  ) {}

  ngOnInit(): void {
    const authToken = this.authService.authToken;
    if (!authToken) {
      // User needs to start from the beginning
      this.router.navigate(['/challenge']);
      return;
    }
    this.resetFields();
    this.sendOTP();
  }

  ngOnDestroy(): void {
    this.authService.setAuthToken('');
    this.handleCancelOtp();
    if (this.authRef) {
      this.authRef.cancel();
    }
    this.subscriptions.unsubscribe();
  }

  t(key: string): string {
    return this.translate.instant(key);
  }

  // Reset OTP Fields
  resetFields(): void {
    this.errorMsg = '';
    this.otp = [...this.BLANK_OTP];
    this.clearOtpActions();
  }
  // Send OTP
  async sendOTP(): Promise<void> {
    this.isLoading = true;
    try {
      const API_BASE_URL = this.config.app_base_url; // Implement this method in ProveService
      if (API_BASE_URL) {
        // Handle OTP steps
        const builder = this.proveClient.handleOtp(
          this.otpStartStep.bind(this),
          this.otpFinishStep.bind(this),
          this.authFinishStep.bind(this)
        );
        this.authRef = builder.authenticate(
          this.authService.authToken() as string
        );
        await this.authRef;
      } else {
        this.otpSent = true;
      }
    } catch (e: any) {
      this.isError = true;
      this.errorMsg = `Error: ${e.message}`;
    } finally {
      this.isLoading = false;
    }
  }
  // Handle OTP Verification
  handleVerifyOTP(): void {
    const API_BASE_URL = this.config.app_base_url; // Implement this method in ProveService
    if (API_BASE_URL) {
      console.log('OTP verification started');
      const enteredOtp = this.otp.join('');
      try {
        this.handleOtpSubmit(enteredOtp);
      } catch (e: any) {
        console.log('Error: handleVerifyOTP', e);
        this.errorMsg = 'Something went wrong, please try again later.';
      }
    } else {
      this.authFinishStep({
        authId: '',
      });
    }
  }
  // OTP Start Step Callback
  async otpStartStep(
    phoneNumberNeeded: boolean,
    phoneValidationError?: proveAuth.PhoneValidationError
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (phoneNumberNeeded) {
          if (phoneValidationError) {
            reject(
              new Error(`Validation Error: ${phoneValidationError.message}`)
            );
            return;
          }
          resolve({ phoneNumber: this.deviceService.phoneNumber });
        } else {
          resolve(null);
        }
      } catch (e) {
        console.log('Error: otpStartStep', e);
        reject(e);
      }
    });
  }
  // OTP Finish Step Callback
  async otpFinishStep(
    otpError: proveAuth.OtpError | undefined
  ): Promise<proveAuth.OtpFinishResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const message = otpError
          ? 'OTP is invalid. Try re-entering the OTP'
          : 'Enter the SMS OTP';
        if (!otpError) {
          this.otpSent = true;
        } else {
          this.errorMsg = message;
        }
        const result = await this.otpFinishStepHandler(message);
        resolve(result);
      } catch (e: any) {
        console.log('Error: otpFinishStep', e);
        reject(e);
      }
    });
  }
  // OTP Finish Step Handler
  otpFinishStepHandler(
    otpMessageToUI: string
  ): Promise<proveAuth.OtpFinishResult> {
    return new Promise<proveAuth.OtpFinishResult>((resolve, reject) => {
      const submitOtp = (otp: string) => {
        const input: proveAuth.OtpFinishInput = {
          otp: otp ?? '',
        };
        const result: proveAuth.OtpFinishResult = {
          input: input,
          resultType: proveAuth.OtpFinishResultType.OnSuccess,
        };
        resolve(result);
      };
      const cancelOtpFinish = () => {
        reject(new Error('User has canceled OTP flow'));
      };
      this.otpActions = { submitOtp, cancelOtpFinish };
    });
  }
  // Auth Finish Step Callback
  async authFinishStep(input: proveAuth.AuthFinishStepInput): Promise<any> {
    // On successful authFinish, call /v3ValidateRequest
    try {
      const observable = this.proveService.v3ValidateRequest({
        correlationId: this.authService.correlationId() as string,
      }) as Observable<any>;

      observable.subscribe((response: any) => {
        if (response && response.data) {
          const { next } = response.data;
          if (Object.keys(next).length) {
            this.authService.setNextStep(next);
            this.router.navigate(['/review' + this.router.url.split('?')[1]]);
          }
        }
      });
    } catch (e: any) {
      console.log('Error: ', e);
      throw e;
    }
  }
  // Handle OTP Submission
  handleOtpSubmit(otp: string): void {
    if (this.otpActions.submitOtp) {
      try {
        const result = this.otpActions.submitOtp(otp);
        console.log('OTP Finish Successful', result);
        return result;
      } catch (e: any) {
        this.errorMsg = e.message;
        console.error('OTP Finish Failed', e);
      }
    }
  }
  handleCancelOtp(): void {
    if (this.otpActions.cancelOtpFinish) {
      this.otpActions.cancelOtpFinish();
    }
  }
  clearOtpActions(): void {
    this.otpActions = { submitOtp: null, cancelOtpFinish: null };
  }
  handleOtpChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    const numericValue = value.replace(/\D/g, '');
    const updatedOtp = [...this.otp];
    updatedOtp[index] = numericValue;
    this.otp = updatedOtp;
    // Move focus to the next input field if available
    if (index < this.OTP_LENGTH - 1 && numericValue) {
      const nextInput = this.otpInputs.toArray()[index + 1];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }
    const isFilled = this.otp.every((digit) => digit.length === 1);
    this.isVerifyButtonEnabled = isFilled;
    if (isFilled && this.verifyButtonRef) {
      this.errorMsg = null;
      this.verifyButtonRef.nativeElement.focus();
    }
  }
  // Handle OTP Key Down Events
  handleOtpKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && index > 0 && this.otp[index] === '') {
      event.preventDefault();
      const prevInput = this.otpInputs.toArray()[index - 1];
      if (prevInput) {
        prevInput.nativeElement.focus();
        const updatedOtp = [...this.otp];
        updatedOtp[index - 1] = '';
        this.otp = updatedOtp;
        this.isVerifyButtonEnabled = false;
      }
    } else if (event.key === 'Enter' && this.isVerifyButtonEnabled) {
      const enteredOtp = this.otp.join('');
      if (enteredOtp.length < this.OTP_LENGTH) {
        this.errorMsg = 'OTP should be a minimum of 6 characters!';
        return;
      } else {
        this.handleVerifyOTP();
      }
    }
  }
  handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text').trim() || '';
    if (pasteData.length === this.OTP_LENGTH && /^\d+$/.test(pasteData)) {
      this.otp = pasteData.split('');
      this.isVerifyButtonEnabled = true;
      const verifyButton = this.verifyButtonRef
        .nativeElement as HTMLButtonElement;
      verifyButton.focus();
    }
  }
}
