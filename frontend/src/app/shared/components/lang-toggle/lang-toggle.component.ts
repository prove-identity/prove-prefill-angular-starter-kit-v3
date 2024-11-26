import { Component } from '@angular/core';
import { LangService, SupportedLangs } from '@/src/app/core/lang/lang.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-lang-toggle',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatIconButton],
  templateUrl: './lang-toggle.component.html',
  styleUrl: './lang-toggle.component.css',
})
export class LangToggleComponent {
  constructor(private langService: LangService) {}

  changeLang(language: SupportedLangs) {
    this.langService.setLang(language);
  }
}
