import { Component } from '@angular/core';
import { ThemeService } from '@/src/app/core/theme/theme.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  logoUrl: string = '/img/proveLogo-dark.svg';

  constructor(private readonly theme: ThemeService) {
    theme.mode$.subscribe((mode) => {
      this.logoUrl =
        mode === 'dark'
          ? '/img/proveLogo-dark.svg'
          : '/img/proveLogo-light.svg';
    });
  }
}
