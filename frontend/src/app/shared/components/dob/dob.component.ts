import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  MatError,
  MatHint,
  MatInput,
  MatLabel,
  MatFormField,
} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-dob',
  standalone: true,
  imports: [
    MatLabel,
    MatError,
    MatHint,
    MatInput,
    MatSelect,
    MatOption,
    CommonModule,
    MatFormField,
    FormsModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './dob.component.html',
  styleUrl: './dob.component.css',
})
export class DobComponent {
  @Input() form: FormGroup;
  constructor(private readonly translate: TranslateService) {}

  getErrorMessage(controlName: string): string | null {
    const control: AbstractControl | null = this.form.get(controlName);
    console.log('control : ', control, controlName);
    if (control && control.invalid) {
      if (control.errors?.['required']) {
        return this.translate.instant(
          `dataCollection.${controlName}.errorText`
        );
      }
      if (control.errors?.['maxlength']) {
        return this.translate.instant(
          `dataCollection.${controlName}.maxlengthErrorText`
        );
      }
    }
    return null;
  }

  t(key: string): string {
    return this.translate.instant(key);
  }

  getDobErrorMessage() {
    const control = this.form.get('dob');
    if (control?.hasError('required')) {
      return this.t('dataCollection.dob.errorText');
    }
    return '';
  }
}
