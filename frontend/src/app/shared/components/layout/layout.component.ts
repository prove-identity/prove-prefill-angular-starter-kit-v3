import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LangToggleComponent } from '@/src/app/shared/components/lang-toggle/lang-toggle.component';
import { ThemeToggleComponent } from '@/src/app/shared/components/theme-toggle/theme-toggle.component';
import { LogoComponent } from '@/src/app/shared/components/logo/logo.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatCard,
    LogoComponent,
    LangToggleComponent,
    ThemeToggleComponent,
    MatToolbarModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
