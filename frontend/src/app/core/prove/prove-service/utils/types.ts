// Define interfaces
import { Next } from '../(definitions)';

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
