import { Routes } from '@angular/router';
import { ChallengePageComponent } from './challenge-page/challenge-page.component';

export const routes: Routes = [
    { path: 'challenge-page', component: ChallengePageComponent },
    { path: '**', component: ChallengePageComponent },
];
