import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css'
})
export class ReviewPageComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.email]],
      extendedaddress: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required, Validators.email]],
      ssn: ['', [Validators.required, Validators.email]]
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
