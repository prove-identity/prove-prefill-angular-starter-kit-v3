import { Routes } from '@angular/router';
import { AuthGuard } from '@/src/app/core/auth/auth.guard';
import { OtpEntryPageComponent } from '@/src/app/core/pages/otp-entry/otp-entry-page.component';
import { ReviewInfoPageComponent } from '@/src/app/core/pages/review-info/review-info-page.component';
import { ChallengePageComponent } from '@/src/app/core/pages/challenge-page/challenge-page.component';
import { SMSWaitingComponent } from '@/src/app/core/pages/sms-waiting-page/sms-waiting-page.component';
import { ResultPageComponent } from '@/src/app/shared/components/result-page/result-page.component';
import { SuccessComponent } from './core/pages/success/success.component';
import { FailureComponent } from './core/pages/failure/failure.component';

export const routes: Routes = [
  {
    path: 'review',
    component: ReviewInfoPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'challenge',
    component: ChallengePageComponent,
    canActivate: [],
  },
  {
    path: 'sms-otp',
    component: OtpEntryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sms-waiting',
    component: SMSWaitingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sms-result',
    component: ResultPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'verify-success',
    component: SuccessComponent,
    canActivate: [],
  },
  {
    path: 'verify-failure',
    component: FailureComponent,
    canActivate: [],
  },
  {
    path: '**',
    component: ChallengePageComponent,
    canActivate: [],
  },
];
