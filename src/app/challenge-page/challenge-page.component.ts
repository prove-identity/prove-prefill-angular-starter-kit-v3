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
  form: FormGroup;

  constructor(
    private formStateService: FormStateService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      ssn: ['', [Validators.required, Validators.minLength(4)]],
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
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      //this.ssndata = this.form.value;
    } else {
      console.error('Form is invalid');
      console.log(this.form.value);
    }
    this.formStateService.updateState(this.form.value);
    console.log(this.formStateService.getState());
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
    const control = this.form.get('phoneNumber');
    if (control?.hasError('required')) {
      return 'You must enter a phone number';
    }
    if (control?.hasError('minlength')) {
      return 'Not a valid phone number';
    }
    return '';
  }
}
