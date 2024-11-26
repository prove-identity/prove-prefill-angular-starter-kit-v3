import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLangs = 'en' | 'es';

@Injectable({
  providedIn: 'root',
})
export class LangService implements OnInit {
  private lang = new BehaviorSubject<SupportedLangs>('en');

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    let initialLang: SupportedLangs = 'en';
    // Check if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.translate.addLangs(['en', 'es']);
      this.translate.setDefaultLang('en');
      const savedLang = localStorage.getItem('lang') as SupportedLangs;
      if (savedLang) {
        initialLang = savedLang;
      }
    }
    this.setLang(initialLang);
  }

  setLang(language: SupportedLangs) {
    this.lang.next(language);
    this.translate.use(language);
    // Save the selected language in localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', language);
    }
  }

  ngOnInit() {
    // Get the 'lang' parameter from the URL
    this.route.queryParams.subscribe((params) => {
      const langParam = params['lang'] as SupportedLangs;
      if (langParam) {
        this.setLang(langParam);
      }
    });
  }
}
