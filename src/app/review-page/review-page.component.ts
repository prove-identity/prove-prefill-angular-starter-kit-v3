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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    // NgIf,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    //BrowserAnimationsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css',
})
export class ReviewPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      extendedaddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.minLength(5)]],
      dob: ['', [Validators.required]],
      ssn: ['', [Validators.required, Validators.minLength(4)]],
    });
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
}
