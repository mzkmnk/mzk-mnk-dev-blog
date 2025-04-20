import { CardComponent } from '@/components/card/card.component';
import { ChipComponent } from '@/components/chip/chip.component';
import { BlogsService } from '@/services/blogs/blogs.service';
import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-top',
	imports: [CardComponent, DatePipe, ChipComponent],
	host: {
		class: 'w-full',
	},
	template: `
    <div class="md:grid md:gap-14 md:grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] md:justify-center flex flex-col gap-4">
      @for (blog of blogs();let i = $index; track i) {
        <app-card (onClick)="navigateBlog(i+1)">
          <div class="flex flex-col gap-2 w-full items-start" card-content>
            <div class="flex gap-2 overflow-x-auto">

              @for(tag of blog.tags; let j = $index; track j){
                <app-chip [tag]="tag" [variant]="tag" />
              }
            </div>
            <p class="font-semibold text-lg transition group-hover:text-sky-600">{{blog.title}}</p>
            <p class="text-gray-500 text-xs">{{blog.createdAt | date: 'yyyy-MM-dd'}}</p>
          </div>
        </app-card>
      }
    </div>
  `,
})
export class TopComponent {
	private readonly blogsService = inject(BlogsService);
	blogs = this.blogsService.blogs;
	private router = inject(Router);

	async navigateBlog(blogId: number): Promise<void> {
		await this.router.navigateByUrl(`/blog/${blogId}`);
	}
}
