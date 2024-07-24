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
  ],
})
export class ChallengePageComponent implements OnInit {
  formData: any = {};

  constructor(private formStateService: FormStateService) {}

  ngOnInit() {
    this.formStateService.currentState.subscribe((state) => {
      this.formData = state;
    });
  }

  /*
  constructor(public form: DataForm) {
    this.form = this.fb.group({
      ssn: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  */

  onSubmit() {
    if (this.formData.valid) {
      console.log(this.formData.value);
      //this.ssndata = this.form.value;
    } else {
      console.error('Form is invalid');
      console.log(this.formData.value);
    }
    this.formStateService.updateState(this.formData);
  }

  getSSNErrorMessage() {
    const control = this.formData.get('ssn');
    if (control?.hasError('required')) {
      return 'Must be exactly 4 digits';
    }
    if (control?.hasError('minlength')) {
      return 'Must be exactly 4 digits';
    }
    return '';
  }

  getPhoneErrorMessage() {
    const control = this.formData.get('phone');
    if (control?.hasError('required')) {
      return 'You must enter a phone number';
    }
    return '';
  }
}
