import { BlogsService } from '@/services/blogs/blogs.service';
import { inject } from '@angular/core';
import { RenderMode } from '@angular/ssr';
import type { ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
	{
		path: '**',
		renderMode: RenderMode.Server,
	},
];
