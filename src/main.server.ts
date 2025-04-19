import { AppComponent } from '@/app.component';
import { config } from '@/app.config.server';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
