import type { Blog } from '@/models/blog.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlogsAPI {
	private readonly http = inject(HttpClient);

	getBlogs() {
		return this.http.post<Blog[]>('blogs/index.json', {});
	}
}
