import { BlogDetailService } from '@/services/blog-detail/blog-detail.service';
import { Component, inject } from '@angular/core';

@Component({
	selector: 'app-agenda',
	host: {
		class:
			'sticky top-24 bg-gray-200 min-w-76 rounded-xl lg:flex lg:flex-col lg:gap-4 hidden lg:self-start p-5',
	},
	template: `
		<h4>目次</h4>
		<div class="flex flex-col gap-4">
			@for(item of agenda(); let i = $index; track i){
				<div class="w-full flex gap-2">
					<p>{{i + 1}}<span>.</span></p>
					<p class="underline cursor-pointer">{{item.title}}</p>
				</div>
			}
		</div>
  `,
})
export class AgendaComponent {
	private readonly blogDetailService = inject(BlogDetailService);

	agenda = this.blogDetailService.agenda;
}
