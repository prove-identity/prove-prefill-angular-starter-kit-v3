import { Flowtype, Next } from '../(definitions)';

// Define interfaces
export interface StartRequestParams {
  isMobile: boolean;
  phoneNumber: string;
  last4SSN: string;
  finalTargetUrl?: string;
}

export interface StartRequestPayload {
  flowType: Flowtype;
  phoneNumber: string;
  last4SSN: string;
  finalTargetUrl?: string;
}

export interface StartRequestResponse {
  message: string;
  success: boolean;
  next: Partial<Next>;
  authToken: string;
  correlationId: string;
}

export const MOCK_START_RESPONSE_DATA: StartRequestResponse = {
  message: 'ok',
  success: true,
  next: {
    'v3-validate': '/v3/validate',
  },
  authToken: 'eyJhbGciOi...',
  correlationId: '713189b8-5555-4b08-83ba-75d08780aebd',
};
