import { HEADER_HEIGHT } from '@/constants/header-height.constant';
import { BlogDetailService } from '@/services/blog-detail/blog-detail.service';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
	selector: 'app-agenda',
	host: {
		class:
			'sticky top-24 bg-gray-200 min-w-76 rounded-xl lg:flex lg:flex-col lg:gap-4 hidden lg:self-start p-5',
	},
	template: `
		<h4>目次</h4>
		<ol class="flex flex-col gap-4 list-decimal list-inside">
			@for(item of agenda(); let i = $index; track i){
				<li class="w-full cursor-pointer text-sm hover:underline" (click)="scrollTo(item.id)">
					{{item.title}}
				</li>
			}
		</ol>
  `,
})
export class AgendaComponent {
	private readonly blogDetailService = inject(BlogDetailService);

	private readonly scroller = inject(ViewportScroller);

	private readonly document = inject(DOCUMENT);

	agenda = this.blogDetailService.agenda;

	scrollTo = (slug: string): void => {
		const [_, currentY] = this.scroller.getScrollPosition();

		const clientRect = this.document
			.getElementById(slug)
			?.getBoundingClientRect();

		if (clientRect === undefined) return;

		window.scrollTo({
			top: currentY + clientRect.y - HEADER_HEIGHT,
			behavior: 'smooth',
		});
	};
}
