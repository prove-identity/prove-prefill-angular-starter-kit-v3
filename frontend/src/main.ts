import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@/src/app/app.component';
import { config } from '@/src/app/config/app.config';

bootstrapApplication(AppComponent, config).catch((err) => console.error(err));
