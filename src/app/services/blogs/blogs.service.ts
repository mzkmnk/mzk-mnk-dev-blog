import type { Blog } from '@/models/blog.model';
import { httpResource } from '@angular/common/http';
import { Injectable, type Signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlogsService {
	private readonly _blogs = httpResource<Blog[]>(() => ({
		method: 'POST',
		url: 'blogs/index.json',
	}));

	blogs: Signal<Blog[]> = computed(() => this._blogs.value() ?? []);
}
