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
import { Data, RouterModule } from '@angular/router';
import { FormStateService } from '../services/form-state.service';
import { Router } from '@angular/router'; // Import Router
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { ProveApiService } from '../services/prove-api.service';
import { User } from '../user';

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

  constructor(
    private formStateService: FormStateService,
    private fb: FormBuilder,
    private router: Router,
    private api: ProveApiService
  ) {
    this.form = this.fb.group({
      ssn: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    this.formStateService.currentState.subscribe((state) => {
      this.form.patchValue(state, { emitEvent: false });
    });

    this.form.valueChanges.subscribe((newState) => {
      this.formStateService.updateState(newState);
    });

    const mockData = this.api.mockResponse();
    console.log(mockData);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      // Test Navigate to another page, e.g., '/sms-waiting'
      this.router.navigate(['/sms-waiting']);
      const mockData = this.api.mockResponse();
      const mockRequest = this.api.challengeRequest();
      console.log(mockRequest);
      console.log(mockData);
      this.api.addUser(); //should be added with lowest available id and all fields not named lastfour or phonenumber set to null
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
