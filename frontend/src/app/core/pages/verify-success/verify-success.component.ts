import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-verify-success',
  standalone: true,
  imports: [],
  templateUrl: './verify-success.component.html',
  styleUrl: './verify-success.component.css',
})
export class VerifySuccessComponent {
  @Input({ required: true }) status: string = 'success';
  isSuccess = this.status === 'success';
  title = this.isSuccess ? 'Congratulations' : 'Verification Completed';
  message = this.isSuccess
    ? 'Identity Verified'
    : 'Identity could not be verified';
  imageSrc = this.isSuccess ? '/img/success.png' : '/img/failure.png';
}
