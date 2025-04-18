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
		class: 'flex justify-center w-full',
	},
	template: `
    <div class="flex md:w-312 w-full justify-center gap-8">
			
			@let value = blog.value();
			
			@defer(when value !== undefined && value !== ''){
          
					<app-markdown [blog]="value ?? ''" />
					
					<app-agenda />

      }
    </div>
  `,
})
export class BlogComponent {
	blogId = input.required<number>();

	private readonly blogsService = inject(BlogsService);

	blogs = this.blogsService.blogs;

	private readonly filePath = computed(() => {
		if (this.blogs().length === 0) return undefined;

		return this.blogs()[this.blogId() - 1].filePath;
	});

	blog = httpResource.text<string>(() =>
		this.filePath() ? this.filePath() : undefined,
	);
}
