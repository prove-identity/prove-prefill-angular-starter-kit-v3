import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formState = new BehaviorSubject<any>({
    ssn: '',
    last4: '',
    phoneNumber: '',
    // Add other fields as needed
  });
  currentState = this.formState.asObservable();

  constructor() {}

  updateState(newState: any) {
    const currentState = this.formState.getValue();
    this.formState.next({ ...currentState, ...newState });
  }

  getState() {
    return this.formState.getValue();
  }
}
