import {
  InjectionToken,
  ApplicationConfig,
  mergeApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { IAppConfig } from './app-config.interface';
import { provideServerRendering } from '@angular/platform-server';
import {
  withFetch,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { I18nModule } from '@/src/app/core/i18n/i18n.module';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from '../app.routes';

export const APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  production: false,
  app_env: 'sandbox',
  app_base_url: 'http://localhost:8080',
  alertMilliseconds: 500,
  defaultLang: 'en',
  languages: {
    es: 'es',
    en: 'en',
  },
};

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

const configOptions: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
    importProvidersFrom(I18nModule),
    { provide: APP_CONFIG, useValue: AppConfig },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};

export const config = mergeApplicationConfig(configOptions, serverConfig);
