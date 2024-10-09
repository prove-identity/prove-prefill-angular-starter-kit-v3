import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-result-page',
  standalone: true,
  imports: [],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css',
})
export class ResultPageComponent implements OnChanges {
  @Input() status: string = '';

  title: string = '';
  message: string = '';
  imageSrc: string = '';
  isSuccess: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']) {
      this.updateContent();
    }
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
