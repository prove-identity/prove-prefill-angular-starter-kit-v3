import { AppComponent } from '@/src/app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { config } from '@/src/app/config/app.config';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
