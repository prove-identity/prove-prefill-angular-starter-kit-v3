import { Next } from '../(definitions)';

// Define interfaces
export interface ChallengeRequestParams {
  correlationId: string;
  last4SSN?: string; //! required if not passed into /startRequest method call
  dob?: string; //! required if not passed into /startRequest method call
}

export interface ChallengeRequestPayload {
  correlationId: string;
  last4SSN?: string; //! required if not passed into /startRequest method call
  dob?: string; //! required if not passed into /startRequest method call
}

export interface ChallengeRequestResponse {
  message: string;
  next: Partial<Next>;
  individual: Individual;
  success: boolean;
}

export interface ChallengePageData {
  last4SSN: string;
  phoneNumber: string;
}

interface Individual {
  firstName: string;
  lastName: string;
  addresses: Address[];
  emailAddresses: string[];
  dob: string;
  ssn: string;
}

interface Address {
  address: string;
  city: string;
  postalCode: string;
  extendedAddress: string;
  region: string;
}

// Define mock data for testing
export const MOCK_CHALLENGE_RESPONSE_DATA: ChallengeRequestResponse = {
  message: 'ok',
  next: {
    'v3-complete': '/v3/complete',
  },
  individual: {
    firstName: 'Tod',
    lastName: 'Weedall',
    addresses: [
      {
        address: '39 South Trail',
        city: 'San Antonio',
        postalCode: '78285',
        extendedAddress: '39 South Trail',
        region: 'TX',
      },
      {
        address: '39 South Trail',
        city: 'San Antonio',
        postalCode: '78285',
        extendedAddress: '39 South Trail',
        region: 'TX',
      },
    ],
    emailAddresses: ['email@example.com', 'email@example.com'],
    dob: '2024-05-02',
    ssn: '8370',
  },
  success: true,
};
