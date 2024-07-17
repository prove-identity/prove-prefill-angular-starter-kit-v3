import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-challenge-page',
  standalone: true,
  templateUrl: './sms-waiting-page.component.html',
  styleUrl: './sms-waiting-page.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    RouterModule
  ],
})
export class SMSWaitingComponent { 
  onSubmit() {
    console.log("next page");
  }
}