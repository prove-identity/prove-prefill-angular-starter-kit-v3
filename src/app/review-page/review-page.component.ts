import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../services/form-state.service';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css',
})
export class ReviewPageComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      extendedaddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.minLength(5)]],
      dob: [''],
      ssn: [
        this.formStateService.getState().ssn,
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }

  ngOnInit() {
    const currentState = this.formStateService.getState();
    console.log('Current state:', currentState);
  }

  getZipcodeErrorMessage() {
    const control = this.form.get('ssn');
    if (control?.hasError('required')) {
      return 'Must be exactly 5 digits';
    }
    if (control?.hasError('minlength')) {
      return 'Must be exactly 5 digits';
    }
    return '';
  }

  getSSNErrorMessage() {
    const control = this.form.get('ssn');
    if (control?.hasError('required')) {
      return 'Must be exactly 4 digits';
    }
    if (control?.hasError('minlength')) {
      return 'Must be exactly 4 digits';
    }
    return '';
  }

  readonly state = this.formStateService.getState();
}
