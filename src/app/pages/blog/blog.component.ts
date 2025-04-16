import { AgendaComponent } from '@/pages/blog/components/agenda/agenda.component';
import { BlogDetailService } from '@/services/blog-detail/blog-detail.service';
import { BlogsService } from '@/services/blogs/blogs.service';
import { Component, inject, input, resource } from '@angular/core';
import { MarkdownComponent } from './components/markdown/markdown.component';

@Component({
	selector: 'app-blog',
	standalone: true,
	imports: [MarkdownComponent, AgendaComponent],
	host: {
		class: 'flex justify-center w-full',
	},
	template: `
    <div class="flex w-312 justify-center gap-8">
      @if(blog.isLoading()){

        <!-- TODO create loading component -->

      }@else{
        <app-markdown [blog]="blog.value() ?? ''" />

        <app-agenda />
      }
    </div>
  `,
})
export class BlogComponent {
	blogId = input.required<number>();

	private readonly blogDetailService = inject(BlogDetailService);
	blog = resource({
		request: () => ({ blogId: this.blogId(), blogs: this.blogs() }),
		loader: ({ request }) => {
			const { blogId, blogs } = request;

			return this.blogDetailService.getBlog(blogs[blogId - 1].filePath);
		},
	});
	private readonly blogsService = inject(BlogsService);
	blogs = this.blogsService.blogs;
}
