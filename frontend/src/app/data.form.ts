import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

const form = {
  ssn: new FormControl('4444'),
  phonenumber: new FormControl('1234567890'),
};

@Injectable({ providedIn: 'root' })
export class DataForm extends FormGroup {
  constructor() {
    super(form);
  }

  get ssn(): FormControl {
    return this.get('ssn') as FormControl;
  }

  get phonenumber(): FormControl {
    return this.get('phonenumber') as FormControl;
  }
}
