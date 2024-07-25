import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formState = new BehaviorSubject<{ ssn: string, phoneNumber: string }>({
    ssn: '',
    phoneNumber: '',
  });

  currentState = this.formState.asObservable();

  updateState(newState: { ssn: string, phoneNumber: string }) {
    this.formState.next(newState);
  }

  getState() {
    return this.formState.getValue();
  }
}
