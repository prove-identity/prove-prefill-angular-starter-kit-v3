import { NgModule } from '@angular/core';
import { LangService } from './lang.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nModule } from '@/src/app/core/i18n/i18n.module';

@NgModule({
  imports: [I18nModule, TranslateModule],
  exports: [LangService],
  providers: [LangService, TranslateService],
})
export class LangModule {}
