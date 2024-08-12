import { Routes, RouterModule } from '@angular/router';
import { ChallengePageComponent } from './challenge-page/challenge-page.component';
import { SMSWaitingComponent } from './sms-waiting-page/sms-waiting-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { VerifySuccessComponent } from './verify-success/verify-success.component';

export const routes: Routes = [
  { path: 'challenge-page', component: ChallengePageComponent },
  { path: 'sms-waiting', component: SMSWaitingComponent },
  { path: 'review-page', component: ReviewPageComponent },
  { path: 'verify-success', component: VerifySuccessComponent },
  { path: '**', component: ChallengePageComponent },
];

export const appRoutingModule = RouterModule.forRoot(routes);
