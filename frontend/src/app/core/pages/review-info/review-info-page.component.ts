import { Router } from '@angular/router';
import moment from 'moment';
import states from '@/src/app/utils/states';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ProveApiService } from '@/src/app/core/prove/prove-service/prove-api.service';
import { AuthService } from '@/src/app/core/auth/auth.service';
import { ApiEndpoints } from '@/src/app/core/prove/prove-service/(definitions)';
import {
  ReviewInfoFormData,
  CompleteRequestResponse,
} from '@/src/app/core/prove/prove-service/apis/completeRequest';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatError,
  MatHint,
  MatLabel,
  MatFormField,
  MatInputModule,
} from '@angular/material/input';
import { Observable } from 'rxjs';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { AddressInputComponent } from '@/src/app/shared/components/address-input/address-input.component';
import { UserInputComponent } from '@/src/app/shared/components/user-input/user-input.component';
import { ProveButtonComponent } from '@/src/app/shared/components/prove-button/prove-button.component';
import { SsnComponent } from '@/src/app/shared/components/ssn/ssn.component';
import { DobComponent } from '@/src/app/shared/components/dob/dob.component';

@Component({
  selector: 'app-review-info',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './review-info-page.component.html',
  styleUrl: './review-info-page.component.css',
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
    MatDatepicker,
    MatDatepickerToggle,
    AddressInputComponent,
    FormsModule,
    SsnComponent,
    DobComponent,
    MatInputModule,
    UserInputComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    ProveButtonComponent,
    NgxMatIntlTelInputComponent,
    MatProgressSpinnerModule,
  ],
})
export class ReviewInfoPageComponent implements OnInit {
  isLoading: boolean = false;
  isSubmitting = false;
  error: string | null = null;
  manualEntry: boolean = false;

  form: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly proveService: ProveApiService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly translate: TranslateService
  ) {
    this.states = states;
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dob: [''],
      extendedAddress: [''],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      region: ['', [Validators.required]],
      ssn: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  states = [] as {
    name: string;
    shortCode: string;
  }[];

  t(key: string): string {
    return this.translate.instant(key);
  }

  ngOnInit() {
    this.processVerification();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.completeIdentityVerify(this.form.value).finally(() => {
        this.isSubmitting = false;
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  getRegionAddressValue() {
    const region = this.form.get('region');
    if (region) {
      this.form.setValue({ region });
    }
    return '';
  }

  async processVerification() {
    this.isLoading = true;

    try {
      const nextEndpoint = this.authService.getNextEndpoint();

      if (nextEndpoint === ApiEndpoints.V3_CHALLENGE) {
        await this.handleV3ChallengeRequest();
      } else if (nextEndpoint === ApiEndpoints.V3_COMPLETE) {
        this.manualEntry = true;
      }
    } catch (error) {
      console.error('Error during verification:', error);
      alert(this.t('global.identityError'));
    } finally {
      this.isLoading = false;
    }
  }

  async handleV3ChallengeRequest() {
    try {
      const observable = this.proveService.v3ChallengeRequest({
        correlationId: this.authService.correlationId() as string,
      }) as Observable<any>;

      observable.subscribe((response: any) => {
        if (response && response.data) {
          const { data: challengeResponse } = response;
          const { individual = null, next, success } = challengeResponse;
          this.authService.setNextStep(next);

          if (success && individual) {
            const {
              firstName = '',
              lastName = '',
              addresses = [],
              dob = '',
              ssn = '',
            } = individual;

            if (dob)
              this.form.setValue({ dob: moment(dob).format('MM/DD/YYYY') });

            if (addresses && addresses.length > 0) {
              const addressData = addresses[0];
              const {
                city = '',
                postalCode = '',
                extendedAddress = '',
                region = '',
                address = '',
              } = addressData;

              this.form.setValue({
                firstName,
                lastName,
                address,
                extendedAddress,
                city,
                region,
                postalCode,
                last4SSN: ssn,
              });
            }
          }
        }
      });
    } catch (error) {
      console.error('Error during v3ChallengeRequest:', error);
    }
  }

  async completeIdentityVerify(data: ReviewInfoFormData) {
    const nextEndpoint = this.authService.getNextEndpoint();

    if (nextEndpoint !== ApiEndpoints.V3_COMPLETE) {
      return;
    }

    this.isLoading = true;

    try {
      const observable = this.proveService.v3CompleteRequest({
        correlationId: this.authService.correlationId() as string,
        individual: {
          firstName: data.firstName,
          lastName: data.lastName,
          ssn: data.ssn,
          addresses: [
            {
              city: data.city,
              address: data.address,
              extendedAddress: data?.extendedAddress,
              postalCode: data.postalCode,
              region: data.region,
            },
          ],
          dob: moment(data.dob).format('YYYY-MM-DD'),
        },
      }) as Observable<any>;

      observable.subscribe((response: any) => {
        if (response && response.data && response.data.success) {
          this.handleCompleteResponse(response.data);
        } else {
          this.router.navigate(['/verify-failure']);
        }
      });
    } catch (error: any) {
      console.error('Error during v3CompleteRequest:', error);
      alert(error.message ?? 'Please check your information and try again.');
    } finally {
      this.isLoading = false;
    }
  }

  handleCompleteResponse(completeResponse: CompleteRequestResponse): void {
    const { next } = completeResponse;
    if (next !== null) {
      this.authService.setNextStep(next);
    }

    console.log('Successfully verified');
    this.router.navigate(['/verify-success']);
  }
}
