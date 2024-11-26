import {
  Inject,
  OnInit,
  Component,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { ThemeService } from '@/src/app/core/theme/theme.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconModule, MatIconButton],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent implements OnInit {
  themeMode: string = 'light_mode';

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.themeService.mode$.subscribe((mode) => {
      const theme = mode === 'light' ? 'light-theme' : 'dark-theme';
      const isDarkMode = mode === 'light' ? 'dark-theme' : 'light-theme';
      if (isPlatformBrowser(this.platformId)) {
        this.themeMode = theme === 'dark-theme' ? 'dark_mode' : 'light_mode';
        this.renderer.removeClass(this.document.body, isDarkMode);
        this.renderer.addClass(this.document.body, theme);
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
