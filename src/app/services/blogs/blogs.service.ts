import type { Blog } from '@/models/blog.model';
import { httpResource } from '@angular/common/http';
import { Injectable, type Signal, computed, signal } from '@angular/core';
import blogsData from 'public/blogs/index.json';

@Injectable({ providedIn: 'root' })
export class BlogsService {
	 private readonly _blogs = httpResource<Blog[]>(() => ({
	 	method: 'GET',
	 	url: 'public/blogs/index.json',
	 }));

	blogs: Signal<Blog[]> = computed(() => this._blogs.value() ?? []);
}
