import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-auth-agreement-page',
  templateUrl: './auth-agreement.component.html',
  styleUrl: './auth-agreement.component.css',
  imports: [],
})
export class AuthAgreementComponent implements OnChanges {
  @Input() status: string = '';
  isSuccess: boolean = false;
  title: string = '';
  message: string = '';
  imageSrc: string = '';

  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.updateContent();
    }
  }

  t(key: string): string {
    return this.translate.instant(key);
  }

  private updateContent(): void {
    this.isSuccess = this.status === 'success';
    this.title = this.isSuccess ? 'Congratulations' : 'Verification Completed';
    this.message = this.isSuccess
      ? 'Identity Verified'
      : 'Identity could not be verified';
    this.imageSrc = this.isSuccess
      ? 'assets/img/success.png'
      : 'assets/img/failure.png';
  }
}
