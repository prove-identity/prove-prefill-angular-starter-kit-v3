import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routes';
import { ChallengePageComponent } from './challenge-page/challenge-page.component';
import { SMSWaitingComponent } from './sms-waiting-page/sms-waiting-page.component';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ChallengePageComponent, SMSWaitingComponent],
  imports: [
    BrowserModule,
    appRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  //providers: [CommonModule, provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
