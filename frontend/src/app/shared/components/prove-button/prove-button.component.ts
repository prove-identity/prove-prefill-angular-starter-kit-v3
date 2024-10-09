import {
  Inject,
  Input,
  OnInit,
  Output,
  Component,
  PLATFORM_ID,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '@/src/app/core/theme/theme.service';

@Component({
  selector: 'app-prove-button',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './prove-button.component.html',
  styleUrl: './prove-button.component.css',
})
export class ProveButtonComponent implements OnInit {
  isDarkMode: boolean = true;

  @Input() isDisabled = false;
  @Input() isLoading: boolean = false;
  @Input() isSubmitting = false;
  @Output() onClick = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly themeService: ThemeService
  ) {}

  ngOnChanges(): void {
    this.themeService.mode$.subscribe((themeMode) => {
      const isDarkMode = themeMode !== 'light';
      if (isPlatformBrowser(this.platformId)) {
        this.isDarkMode = isDarkMode;
      }
    });
  }

  ngOnInit(): void {
    this.themeService.mode$.subscribe((themeMode) => {
      const isDarkMode = themeMode !== 'light';
      if (isPlatformBrowser(this.platformId)) {
        this.isDarkMode = isDarkMode;
      }
    });
  }

  handleBtnClick = () => {
    if (this.onClick) {
      this.onClick.emit();
    }
  };
}
