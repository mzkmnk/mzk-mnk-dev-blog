import {
	type ApplicationConfig,
	SecurityContext,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { markdownOptionsFactory } from '@/utils/markdown.helper';
import { provideHttpClient } from '@angular/common/http';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),
		provideMarkdown({
			sanitize: SecurityContext.NONE,
			markedOptions: {
				provide: MARKED_OPTIONS,
				useFactory: markdownOptionsFactory,
			},
			markedExtensions: [gfmHeadingId()],
		}),
		provideClientHydration(withEventReplay()),
	],
};
