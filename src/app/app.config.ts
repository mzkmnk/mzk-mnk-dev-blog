import {
	type ApplicationConfig,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideMarkdown({
			markedOptions: {
				provide: MARKED_OPTIONS,
				useValue: {
					gfm: true,
					breaks: true,
				},
			},
		}),
		provideClientHydration(withEventReplay()),
	],
};
