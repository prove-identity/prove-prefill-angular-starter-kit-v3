import { NgModule } from '@angular/core';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

export type Resource = { prefix: string; suffix: string };
const localePrefix = './assets/i18n';

export const mergeObjectsRecursively = (
  objects: Record<string, any>[]
): Record<string, any> => {
  const mergedObject: Record<string, any> = {};

  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          mergedObject[key] = mergeObjectsRecursively([
            mergedObject[key],
            obj[key],
          ]);
        } else {
          mergedObject[key] = obj[key];
        }
      }
    }
  }

  return mergedObject;
};

class MultiTranslateHttpLoader implements TranslateLoader {
  resources: Resource[];
  withCommon: boolean;

  constructor(
    private readonly http: HttpClient,
    {
      resources,
      withCommon = true,
    }: { resources: Resource[]; withCommon?: boolean }
  ) {
    this.resources = resources;
    this.withCommon = withCommon;
  }

  getTranslation(lang: string): Observable<Record<string, unknown>> {
    let resources: Resource[] = [...this.resources];
    return forkJoin(
      resources.map((resource: Resource) => {
        return this.http.get<Record<string, unknown>>(
          `${resource.prefix}/${lang}${resource.suffix}`
        );
      })
    ).pipe(
      map((response: Record<string, unknown>[]) =>
        mergeObjectsRecursively(response)
      )
    );
  }
}

@NgModule({
  exports: [TranslateModule],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient): MultiTranslateHttpLoader => {
          return new MultiTranslateHttpLoader(http, {
            resources: [
              { prefix: localePrefix, suffix: '.json' },
              { prefix: localePrefix, suffix: '.json' },
            ],
          });
        },
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideHttpClient()],
})
export class I18nModule {}
