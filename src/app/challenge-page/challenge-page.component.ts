import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  ],
})
export class ChallengePageComponent {
  form: FormGroup;
  //ssndata;
  //phonenumber;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ssn: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    // this.ssndata = '';
    //this.phonenumber = '';
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      //this.ssndata = this.form.value;
    } else {
      console.error('Form is invalid');
      console.log(this.form.value);
    }
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

  getPhoneErrorMessage() {
    const control = this.form.get('phone');
    if (control?.hasError('required')) {
      return 'You must enter a phone number';
    }
    /*
    if (control?.hasError('email')) {
      return 'Not a valid phone number';
    }
      */
    return '';
  }
}
