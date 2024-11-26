import { Next } from '../(definitions)';

//Define interfaces
export interface ValidateRequestParams {
  correlationId: string;
}

export interface ValidateRequestPayload {
  correlationId: string;
}

export interface ValidateRequestResponse {
  message: string;
  success: boolean;
  next: Partial<Next>;
  challengeMissing: boolean;
}

export const MOCK_VALIDATE_RESPONSE_DATA: ValidateRequestResponse = {
  message: 'ok',
  success: true,
  next: {
    'v3-challenge': '/v3/challenge',
  },
  challengeMissing: true,
};
