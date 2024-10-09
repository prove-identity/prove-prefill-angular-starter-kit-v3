import { Injectable, OnInit } from '@angular/core';
import {
  DeviceRole,
  OtpStartStep,
  Authenticator,
  OtpStartStepFn,
  OtpFinishStepFn,
  AuthFinishStepFn,
  AuthenticatorBuilder,
  InstantLinkStartStep,
  InstantLinkStartStepFn,
} from '@prove-identity/prove-auth';
import * as proveAuth from '@prove-identity/prove-auth';

interface IProveClientSdk {
  authCheck: () => boolean;
  handleOtp: (
    otpStartStep: OtpStartStep | OtpStartStepFn,
    otpFinishStep: OtpFinishStepFn,
    authFinishStep: AuthFinishStepFn
  ) => Authenticator;
  handleInstantLink: (
    instantLinkStartStep: InstantLinkStartStep | InstantLinkStartStepFn,
    authFinishStep: AuthFinishStepFn
  ) => Authenticator;
}

@Injectable({ providedIn: 'root' })
export class ProveClientSdk implements IProveClientSdk, OnInit {
  private defaultAuthenticator: Authenticator;

  ngOnInit(): void {
    const authenticatorBuilder = new AuthenticatorBuilder();
    this.defaultAuthenticator = authenticatorBuilder.build() as Authenticator;
  }

  authCheck(): boolean {
    return this.defaultAuthenticator.isMobileWeb();
  }

  handleOtp(
    otpStartStep: OtpStartStep | OtpStartStepFn,
    otpFinishStep: OtpFinishStepFn,
    authFinishStep: AuthFinishStepFn
  ): Authenticator {
    return new AuthenticatorBuilder()
      .withRole(DeviceRole.Primary)
      .withOtpFallback(otpStartStep, otpFinishStep)
      .withAuthFinishStep(authFinishStep)
      .build();
  }

  handleInstantLink(
    instantLinkStartStep: InstantLinkStartStep | InstantLinkStartStepFn,
    authFinishStep: AuthFinishStepFn
  ): Authenticator {
    return new AuthenticatorBuilder()
      .withRole(DeviceRole.Secondary)
      .withInstantLinkFallback(instantLinkStartStep)
      .withAuthFinishStep(authFinishStep)
      .build();
  }
}
