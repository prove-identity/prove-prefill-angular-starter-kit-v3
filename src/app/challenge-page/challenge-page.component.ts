import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import { FormStateService } from '../services/form-state.service';
import { Router } from '@angular/router'; // Import Router

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
    NgxMatIntlTelInputComponent
  ],
})
export class ChallengePageComponent implements OnInit {
  form: FormGroup;
  @ViewChild('ssnInput') ssnInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formStateService: FormStateService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      ssn: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
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

    // Initial display of masked SSN
    this.updateSSNDisplay();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      // Test Navigate to another page, e.g., '/sms-waiting'
      this.router.navigate(['/sms-waiting']);
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

  updateSSNDisplay() {
    if (this.ssnInput && this.ssnInput.nativeElement) {
      const value = this.form.get('ssn')?.value || '';
      this.ssnInput.nativeElement.value = this.getMaskedSSN(value);
    }
  }

  getMaskedSSN(value: string): string {
    // Return the masked value, ensuring it always shows ***-**- as prefix
    return `***-**-${value}`;
  }

  onSSNInput(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    const last4 = value.slice(-4); // Extract the last 4 digits
    this.form.get('ssn')?.setValue(last4, { emitEvent: false }); // Update form control without emitting event
    input.value = this.getMaskedSSN(last4); // Update displayed value
  }
}