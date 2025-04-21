import { ChipComponent } from '@/components/chip/chip.component';
import { AgendaComponent } from '@/pages/blog/components/agenda/agenda.component';
import { BlogsService } from '@/services/blogs/blogs.service';
import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerCalendarCode } from '@ng-icons/tabler-icons';
import { MarkdownComponent } from './components/markdown/markdown.component';

@Component({
	selector: 'app-blog',
	standalone: true,
	providers: [provideIcons({ tablerCalendarCode })],
	imports: [
		MarkdownComponent,
		AgendaComponent,
		ChipComponent,
		NgIcon,
		DatePipe,
	],
	host: {
		class: 'flex flex-col items-center justify-center gap-16 w-full',
	},
	template: `
		
		<div class="flex flex-col items-center gap-2 md:gap-6 md:max-w-324">
			<h2 class="text-center font-bold">{{blog()?.title}}</h2>
			<p class="text-center text-base">{{blog()?.description}}</p>
			
			<div class="flex gap-2 items-center">
				<ng-icon
					name="tablerCalendarCode"
				/>
				<p>{{blog()?.createdAt | date: 'yyyy-MM-dd' }}</p>
			</div>
			
			<div class="flex gap-1 items-center flex-wrap">
				@for(tag of blog()?.tags; let i = $index; track i){
					<app-chip [tag]="tag" [variant]="tag" />
				}
			</div>
		</div>
		
		<div class="flex gap-8 lg:w-292 lg:max-w-full">
			
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
