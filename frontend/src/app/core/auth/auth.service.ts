import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Next,
  AppEnv,
  apiEndpoints,
} from '../prove/prove-service/(definitions)';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenSubject = new BehaviorSubject<string | null>(null);
  private correlationIdSubject = new BehaviorSubject<string | null>(null);
  private appEnvSubject = new BehaviorSubject<AppEnv | null>(null);
  private nextStepSubject = new BehaviorSubject<Partial<Next> | null>(null);
  authToken$ = this.authTokenSubject.asObservable();

  constructor() {}

  authToken(): string | null {
    return this.authTokenSubject.getValue();
  }
  correlationId(): string | null {
    return this.correlationIdSubject.getValue();
  }
  appEnv(): AppEnv | null {
    return this.appEnvSubject.getValue();
  }
  nextStep(): Partial<Next> | null {
    return this.nextStepSubject.getValue();
  }
  // Methods to set values
  setAuthToken(token: string | null): void {
    this.authTokenSubject.next(token);
  }
  setCorrelationId(correlationId: string | null): void {
    this.correlationIdSubject.next(correlationId);
  }
  setAppEnv(appEnv: string): void {
    this.appEnvSubject.next(appEnv as unknown as AppEnv);
  }
  setNextStep(nextStep: Partial<Next> | null): void {
    this.nextStepSubject.next(nextStep);
  }
  // Method to get the next endpoint
  getNextEndpoint(): string | null {
    const nextStep = this.nextStep();
    if (!nextStep || !Object.keys(nextStep).length) {
      console.log('Next step is null, no API call needed.');
      return null;
    }
    const nextKey = Object.keys(nextStep)[0] as keyof Next;
    return apiEndpoints[nextKey];
  }
}
