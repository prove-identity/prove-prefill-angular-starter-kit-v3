import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MatError,
  MatLabel,
  MatFormField,
  MatInputModule,
} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatError,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });
    }
  }

  t(key: string): string {
    return this.translate.instant(key);
  }

  getFirstNameErrorMessage() {
    const control = this.form.get('firstName');
    if (control?.hasError('required')) {
      return this.t('dataCollection.firstName.errorText');
    }
    return '';
  }

  getLastNameErrorMessage() {
    const control = this.form.get('lastName');
    if (control?.hasError('required')) {
      return this.t('dataCollection.lastName.errorText');
    }
    return '';
  }
}
