import {AgendaComponent} from '@/pages/blog/components/agenda/agenda.component';
import {BlogService} from '@/services/blog/blog.service';
import {Component, inject, input, resource} from '@angular/core';
import {MarkdownComponent} from './components/markdown/markdown.component';

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
	private readonly blogService = inject(BlogService);
	blog = resource({
		request: () => ({ blogId: this.blogId() }),
		loader: ({ request }) => this.blogService.getBlog(request.blogId),
	});
}
