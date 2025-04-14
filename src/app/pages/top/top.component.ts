import { CardComponent } from '@/components/card/card.component';
import { ChipComponent } from '@/components/chip/chip.component';
import type { Blog } from '@/models/blog.model';
import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-top',
	imports: [CardComponent, DatePipe, ChipComponent],
	host: {
		class: 'w-full',
	},
	template: `
    <div class="grid gap-14 grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] justify-center">
      @for (blog of blogs.value();let i = $index; track i) {
        <app-card (onClick)="navigateBlog(i+1)">
          <div class="flex flex-col gap-2 w-full items-start" card-content>
            <div class="flex gap-2 overflow-x-auto">

              @for(tag of blog.tags; let j = $index; track j){
                <app-chip [tag]="tag" />
              }
            </div>
            <p class="font-semibold underline text-lg">{{blog.title}}</p>
            <p class="text-gray-500 text-xs">{{blog.createdAt | date: 'yyyy-MM-dd'}}</p>
          </div>
        </app-card>
      }
    </div>
  `,
})
export class TopComponent {
	blogs = httpResource<Blog[]>(() => ({
		method: 'POST',
		url: 'blogs/index.json',
	}));
	private router = inject(Router);

	async navigateBlog(blogId: number): Promise<void> {
		await this.router.navigateByUrl(`/blog/${blogId}`);
	}
}
