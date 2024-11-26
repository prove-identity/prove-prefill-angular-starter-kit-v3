import { Next } from '../(definitions)';

// Define interfaces
export interface CompleteRequestParams {
  individual: Individual;
  correlationId: string;
}

export interface CompleteRequestPayload {
  individual: Individual;
  correlationId: string;
}

interface Individual {
  firstName: string;
  lastName: string;
  addresses: Address[];
  emailAddresses?: string[];
  dob?: string;
  ssn?: string;
  last4SSN?: string;
}

interface Address {
  address: string;
  city: string;
  postalCode: string;
  extendedAddress?: string;
  region: string;
}

export interface CompleteRequestResponse {
  message: string;
  success: boolean;
  next: Partial<Next>;
  changeDetected: boolean;
}

export interface ReviewInfoFormData {
  address: string;
  extendedAddress: string;
  city: string;
  region: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  last4SSN: string;
}
// Define mock data for testing
export const MOCK_COMPLETE_RESPONSE_DATA: CompleteRequestResponse = {
  message: 'ok',
  success: true,
  next: {
    done: null,
  },
  changeDetected: false,
};
