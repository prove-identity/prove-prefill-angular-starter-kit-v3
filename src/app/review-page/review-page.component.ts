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
import { CommonModule } from '@angular/common';
import { FormStateService } from '../services/form-state.service';
import { MatSelectModule } from '@angular/material/select';

interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css',
})
export class ReviewPageComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      extendedaddress: [''],
      city: ['', [Validators.required]],
      state: [''],
      zipcode: ['', [Validators.required, Validators.minLength(5)]],
      dob: [''],
      ssn: [
        this.formStateService.getState().ssn,
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }

  ngOnInit() {
    const currentState = this.formStateService.getState();
    console.log('Current state:', currentState);
  }

  getFirstNameErrorMessage() {
    const control = this.form.get('firstname');
    if (control?.hasError('required')) {
      return 'First name is required';
    }
    return '';
  }

  getLastNameErrorMessage() {
    const control = this.form.get('lastname');
    if (control?.hasError('required')) {
      return 'Last name is required';
    }
    return '';
  }

  getAddressErrorMessage() {
    const control = this.form.get('address');
    if (control?.hasError('required')) {
      return 'Address is required';
    }
    return '';
  }

  getCityErrorMessage() {
    const control = this.form.get('city');
    if (control?.hasError('required')) {
      return 'City is required';
    }
    return '';
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

  readonly state = this.formStateService.getState();

  states: State[] = [
    { value: 'alabama-0', viewValue: 'Alabama' },
    { value: 'alaska-1', viewValue: 'Alaska' },
    { value: 'americansamoa-2', viewValue: 'American Samoa' },
    { value: 'arizona-3', viewValue: 'Arizona' },
    { value: 'arkansas-4', viewValue: 'Arkansas' },
    { value: 'california-5', viewValue: 'California' },
    { value: 'colorado-6', viewValue: 'Colorado' },
    { value: 'connecticut-7', viewValue: 'Connecticut' },
    { value: 'delaware-8', viewValue: 'Delaware' },
    { value: 'dc-9', viewValue: 'District of Columbia' },
    { value: 'micronesia-10', viewValue: 'Micronesia' },
    { value: 'florida-11', viewValue: 'Florida' },
    { value: 'georgia-12', viewValue: 'Georgia' },
    { value: 'guam-13', viewValue: 'Guam' },
    { value: 'hawaii-14', viewValue: 'Hawaii' },
    { value: 'idaho-15', viewValue: 'Idaho' },
    { value: 'illinois-16', viewValue: 'Illinois' },
    { value: 'indiana-17', viewValue: 'Indiana' },
    { value: 'iowa-18', viewValue: 'Iowa' },
    { value: 'kansas-19', viewValue: 'Kansas' },
    { value: 'kentucky-20', viewValue: 'Kentucky' },
    { value: 'louisiana-21', viewValue: 'Louisiana' },
    { value: 'maine-22', viewValue: 'Maine' },
    { value: 'marshallislands-23', viewValue: 'Marshall Islands' },
    { value: 'maryland-24', viewValue: 'Maryland' },
    { value: 'massachusetts-25', viewValue: 'Massachusetts' },
    { value: 'michigan-26', viewValue: 'Michigan' },
    { value: 'minnesota-27', viewValue: 'Minnesota' },
    { value: 'mississippi-28', viewValue: 'Mississippi' },
    { value: 'missouri-29', viewValue: 'Missouri' },
    { value: 'montana-30', viewValue: 'Montana' },
    { value: 'nebraska-31', viewValue: 'Nebraska' },
    { value: 'nevada-32', viewValue: 'Nevada' },
    { value: 'newhampshire-33', viewValue: 'New Hampshire' },
    { value: 'newjersey-34', viewValue: 'New Jersey' },
    { value: 'newmexico-35', viewValue: 'New Mexico' },
    { value: 'newyork-36', viewValue: 'New York' },
    { value: 'northcarolina-37', viewValue: 'North Carolina' },
    { value: 'northdakota-38', viewValue: 'North Dakota' },
    { value: 'marianaislands-39', viewValue: 'Northern Mariana Islands' },
    { value: 'ohio-40', viewValue: 'Ohio' },
    { value: 'oklahoma-41', viewValue: 'Oklahoma' },
    { value: 'oregon-42', viewValue: 'Oregon' },
    { value: 'palau-43', viewValue: 'Palau' },
    { value: 'pennsylvania-43', viewValue: 'Pennsylvania' },
    { value: 'puertorico-44', viewValue: 'Puerto Rico' },
    { value: 'rhodeisland-45', viewValue: 'Rhode Island' },
    { value: 'southcarolina-46', viewValue: 'South Carolina' },
    { value: 'southdakota-47', viewValue: 'South Dakota' },
    { value: 'tennessee-48', viewValue: 'Tennessee' },
    { value: 'texas-49', viewValue: 'Texas' },
    { value: 'utah-50', viewValue: 'Utah' },
    { value: 'vermont-51', viewValue: 'Vermont' },
    { value: 'virginislands-52', viewValue: 'Virgin Islands' },
    { value: 'virginia-53', viewValue: 'Virginia' },
    { value: 'washington-54', viewValue: 'Washington' },
    { value: 'westvirginia-55', viewValue: 'West Virginia' },
    { value: 'wisconsin-56', viewValue: 'Wisconsin' },
    { value: 'wyoming-57', viewValue: 'Wyoming' },
    { value: 'armyamericas-58', viewValue: 'Armed Forces Americas' },
    {
      value: 'armyeucaafme-59',
      viewValue: 'Armed Forces Europe, Canada, Africa, and Middle East',
    },
    { value: 'armypacific-60', viewValue: 'Armed Forces Pacific' },
  ];
}
