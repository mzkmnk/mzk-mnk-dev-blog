import { CardComponent } from '@/components/card/card.component';
import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-top',
	imports: [CardComponent, DatePipe],
	host: {
		class: 'w-full',
	},
	template: `
    <div class="grid gap-14 grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] justify-center">
      @for (blog of blogs;let i = $index; track i) {
        <app-card (onClick)="navigateBlog(i+1)">
          <div class="flex flex-col gap-2 w-full items-start" card-content>
            <div class="flex gap-2 overflow-x-auto">

              <!-- TODO create chip component -->

              <div class="rounded-full bg-sky-100 px-4 py-1 text-xs text-sky-600">Tech</div>

              <div class="rounded-full bg-rose-100 px-4 py-1 text-rose-600 text-xs">Angular</div>
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
	blogs: { imagePath: string; title: string; createdAt: Date }[] = [
		{
			imagePath: 'assets/signals.png',
			title: 'Angular signalsについて',
			createdAt: new Date(),
		},
	];
	private router = inject(Router);

	async navigateBlog(blogId: number): Promise<void> {
		await this.router.navigateByUrl(`/blog/${blogId}`);
	}
}
