import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import states from '@/src/app/utils/states';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MatLabel,
  MatError,
  MatFormField,
  MatInputModule,
} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatError,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.css',
})
export class AddressInputComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() onRegionChanged: EventEmitter<string> = new EventEmitter<string>();

  states = [] as {
    name: string;
    shortCode: string;
  }[];
  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {
    this.states = states;

    if (!this.form) {
      this.form = this.fb.group({
        address: ['', Validators.required],
        extendedAddress: [''],
        city: ['', Validators.required],
        region: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.maxLength(5)]],
      });
    }
    // Subscribe to region changes
    const region = this.form.get('region');
    if (region) {
      region.valueChanges.subscribe((value: string) => {
        this.onRegionChanged.emit(value);
      });
    }
  }

  t(key: string): string {
    return this.translate.instant(key);
  }

  getErrorMessage(controlName: string, message: string): string | null {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return this.t(message);
    }
    return '';
  }
}
