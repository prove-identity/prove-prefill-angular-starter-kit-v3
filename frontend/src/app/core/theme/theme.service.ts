import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export type PaletteMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeMode = new BehaviorSubject<PaletteMode>('light');
  mode$ = this.themeMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const darkTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.themeMode.next(darkTheme ? 'dark' : 'light');
    } else {
      // Default to 'light' mode on the server
      this.themeMode.next('light');
    }
  }

  toggleTheme() {
    const newMode = this.themeMode.value === 'light' ? 'dark' : 'light';
    this.themeMode.next(newMode);
  }
}
