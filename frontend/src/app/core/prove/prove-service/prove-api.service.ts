import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ChallengeRequestParams,
  ChallengeRequestPayload,
  ChallengeRequestResponse,
  MOCK_CHALLENGE_RESPONSE_DATA,
} from './apis/challengeRequest';
import {
  StartRequestParams,
  StartRequestPayload,
  StartRequestResponse,
  MOCK_START_RESPONSE_DATA,
} from './apis/startRequest';
import {
  mockResponse,
  mapIsMobileToFlowtype,
  DEFAULT_REQUEST_HEADERS,
} from './(constants)';
import {
  CompleteRequestParams,
  CompleteRequestPayload,
  CompleteRequestResponse,
  MOCK_COMPLETE_RESPONSE_DATA,
} from './apis/completeRequest';
import {
  MOCK_VALIDATE_RESPONSE_DATA,
  ValidateRequestParams,
  ValidateRequestPayload,
  ValidateRequestResponse,
} from './apis/validateRequest';
import { APP_CONFIG } from '@/src/app/config/app.config';
import { IAppConfig } from '@/src/app/config/app-config.interface';

@Injectable({
  providedIn: 'root',
})
export class ProveApiService {
  private apiUrl = '';

  constructor(
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private readonly http: HttpClient
  ) {
    this.apiUrl = appConfig.app_base_url || '';
  }

  v3StartRequest({ isMobile, phoneNumber, last4SSN }: StartRequestParams): any {
    if (!this.appConfig.app_base_url) {
      return mockResponse<StartRequestResponse>(MOCK_START_RESPONSE_DATA);
    }

    const payload: StartRequestPayload = {
      flowType: mapIsMobileToFlowtype(isMobile),
      phoneNumber,
      last4SSN,
      finalTargetUrl: 'http://127.0.0.1:4200/sms-result',
    };

    return this.apiRequest<StartRequestResponse>(
      'v3/start',
      payload,
      MOCK_START_RESPONSE_DATA
    );
  }
  v3ChallengeRequest({
    correlationId,
    last4SSN,
    dob,
  }: ChallengeRequestParams): any {
    if (!this.appConfig.app_base_url) {
      return mockResponse<ChallengeRequestResponse>(
        MOCK_CHALLENGE_RESPONSE_DATA
      );
    }
    // Create payload conditionally including optional parameters
    const payload: ChallengeRequestPayload = { correlationId };
    if (last4SSN) payload.last4SSN = last4SSN;
    if (dob) payload.dob = dob;

    return this.apiRequest<ChallengeRequestResponse>(
      'v3/challenge',
      payload,
      MOCK_CHALLENGE_RESPONSE_DATA
    );
  }

  v3CompleteRequest({ individual, correlationId }: CompleteRequestParams): any {
    if (!this.appConfig.app_base_url) {
      return mockResponse<CompleteRequestResponse>(MOCK_COMPLETE_RESPONSE_DATA);
    }

    const payload: CompleteRequestPayload = {
      individual,
      correlationId,
    };

    return this.apiRequest<CompleteRequestResponse>(
      'v3/complete',
      payload,
      MOCK_COMPLETE_RESPONSE_DATA
    );
  }
  v3ValidateRequest({ correlationId }: ValidateRequestParams): any {
    if (!this.appConfig.app_base_url) {
      return mockResponse<ValidateRequestResponse>(MOCK_VALIDATE_RESPONSE_DATA);
    }

    // Create payload
    const payload: ValidateRequestPayload = { correlationId };

    return this.apiRequest<ValidateRequestResponse>(
      'v3/validate',
      payload,
      MOCK_VALIDATE_RESPONSE_DATA
    );
  }

  private apiRequest<T>(
    endpoint: string,
    payload: Record<string, any>,
    mockData: T
  ) {
    if (!this.appConfig.app_base_url) {
      return mockResponse<T>(mockData);
    }

    try {
      return this.http.post(
        `${this.appConfig.app_base_url}/api/${endpoint}`,
        payload,
        {
          headers: {
            ...DEFAULT_REQUEST_HEADERS,
          },
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
      return Promise.reject(error);
    }
  }
}
