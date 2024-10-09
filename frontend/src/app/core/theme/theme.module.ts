import { NgModule } from '@angular/core';
import { ThemeService } from '@/src/app/core/theme/theme.service';

@NgModule({
  exports: [ThemeService],
  providers: [ThemeService],
})
export class ThemeModule {}
