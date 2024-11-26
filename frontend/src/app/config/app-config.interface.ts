export interface IAppConfig {
  production: boolean;
  app_base_url: string;
  app_env: string;
  alertMilliseconds: number;
  defaultLang: string;
  languages: {
    es: string;
    en: string;
  };
}
