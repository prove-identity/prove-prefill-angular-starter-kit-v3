import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-ssn',
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
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './ssn.component.html',
  styleUrl: './ssn.component.css',
})
export class SsnComponent {
  @Input() form: FormGroup;
  constructor(private readonly translate: TranslateService) {}

  t(key: string): string {
    return this.translate.instant(key);
  }

  getSSNErrorMessage() {
    const control = this.form.get('ssn');
    if (control?.hasError('required')) {
      return this.t('dataCollection.ssn.errorText');
    }
    return '';
  }
}
