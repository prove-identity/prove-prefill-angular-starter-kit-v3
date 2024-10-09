import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThemeModule } from '@/src/app/core/theme/theme.module';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { I18nModule } from '@/src/app/core/i18n/i18n.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DobComponent } from '@/src/app/shared/components/dob/dob.component';
import { SsnComponent } from '@/src/app/shared/components/ssn/ssn.component';
import { LogoComponent } from '@/src/app/shared/components/logo/logo.component';
import { ChallengePageComponent } from '@/src/app/core/pages/challenge-page/challenge-page.component';
import { SMSWaitingComponent } from '@/src/app/core/pages/sms-waiting-page/sms-waiting-page.component';
import { ReviewInfoPageComponent } from '@/src/app/core/pages/review-info/review-info-page.component';
import { OtpEntryPageComponent } from '@/src/app/core/pages/otp-entry/otp-entry-page.component';
import { LangToggleComponent } from '@/src/app/shared/components/lang-toggle/lang-toggle.component';
import { ThemeToggleComponent } from '@/src/app/shared/components/theme-toggle/theme-toggle.component';
import { LayoutComponent } from '@/src/app/shared/components/layout/layout.component';
import { AddressInputComponent } from '@/src/app/shared/components/address-input/address-input.component';
import { AuthAgreementComponent } from '@/src/app/shared/components/auth-agreement/auth-agreement.component';
import { ResultPageComponent } from '@/src/app/shared/components/result-page/result-page.component';
import { UserInputComponent } from '@/src/app/shared/components/user-input/user-input.component';
import { ProveButtonComponent } from '@/src/app/shared/components/prove-button/prove-button.component';

@NgModule({
  declarations: [
    AppComponent,
    SsnComponent,
    DobComponent,
    LogoComponent,
    LayoutComponent,
    UserInputComponent,
    SMSWaitingComponent,
    LangToggleComponent,
    ThemeToggleComponent,
    ProveButtonComponent,
    AddressInputComponent,
    AuthAgreementComponent,
    OtpEntryPageComponent,
    ChallengePageComponent,
    ReviewInfoPageComponent,
    ResultPageComponent,
  ],
  imports: [
    I18nModule,
    ThemeModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
