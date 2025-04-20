import { AgendaComponent } from '@/pages/blog/components/agenda/agenda.component';
import { BlogsService } from '@/services/blogs/blogs.service';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { MarkdownComponent } from './components/markdown/markdown.component';

@Component({
	selector: 'app-blog',
	standalone: true,
	imports: [MarkdownComponent, AgendaComponent],
	host: {
		class: 'flex flex-col items-center justify-start gap-16 w-full',
	},
	template: `
		
		<div class="flex flex-col items-center gap-2 md:gap-6 md:w-2/3">
			<h2 class="text-center font-bold">{{blog()?.title}}</h2>
			<p class="text-center text-base">{{blog()?.description}}</p>
		</div>
		
		<div class="flex gap-8 w-full">
			
			@let value = blogString.value();
			
			@defer (when value !== undefined && value !== '') {
				
				<app-markdown [blog]="value ?? ''"/>
				
				<app-agenda/>
				
			}
		</div>
	`,
})
export class BlogComponent {
	private readonly blogsService = inject(BlogsService);

	blogId = input.required<number>();

	blogs = this.blogsService.blogs;

	blog = computed(() => {
		if (this.blogs().length === 0) return undefined;

		return this.blogs()[this.blogId() - 1];
	});

	blogString = httpResource.text<string>(() =>
		this.blog()?.filePath ? this.blog()?.filePath : undefined,
	);
}
