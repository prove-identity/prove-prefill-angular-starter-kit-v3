import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormStateService } from '../services/form-state.service';

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
    RouterModule,
  ],
})
export class SMSWaitingComponent {
  formData: any = {};

  onSubmit() {
    console.log('next page');
  }

  constructor(private formStateService: FormStateService) { }

  ngOnInit() {
    //Directly get the current state
    const currentState = this.formStateService.getState();
    console.log('Current state:', currentState);
  }
}
