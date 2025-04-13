import {CardComponent} from '@/components/card/card.component';
import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-top',
	imports: [CardComponent],
	host: {
		class: 'w-full',
	},
	template: `
    <div class="grid gap-14 grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] justify-center">
      @for (blog of blogs;let i = $index; track i) {
        <app-card (onClick)="navigateBlog(i+1)" />
      }
    </div>
  `,
})
export class TopComponent {
	blogs: { imagePath: string; title: string }[] = [
		{
			imagePath: 'assets/signals.png',
			title: 'Angular signalsについて',
		},
	];
	private router = inject(Router);

	async navigateBlog(blogId: number): Promise<void> {
		await this.router.navigateByUrl(`/blog/${blogId}`);
	}
}
