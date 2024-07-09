import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

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
    NgIf
  ],
})
export class ChallengePageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.error('Form is invalid');
    }
  }

  getNameErrorMessage() {
    const control = this.form.get('name');
    if (control?.hasError('required')) {
      return 'You must enter a name';
    }
    if (control?.hasError('minlength')) {
      return 'Name must be at least 2 characters long';
    }
    return '';
  }

  getEmailErrorMessage() {
    const control = this.form.get('email');
    if (control?.hasError('required')) {
      return 'You must enter an email';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }
}
