import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { appRoutingModule } from "./app.routes";
import { ChallengePageComponent } from "./challenge-page/challenge-page.component";
import { SMSWaitingComponent } from "./sms-waiting-page/sms-waiting-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        ChallengePageComponent,
        SMSWaitingComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        appRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }