import { NavItemComponent } from '@/components/header/nav-item.component';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerAlignRight, tablerSearch } from '@ng-icons/tabler-icons';

@Component({
	selector: 'app-header',
	imports: [NavItemComponent, NgIcon, NgOptimizedImage],
	providers: [provideIcons({ tablerSearch, tablerAlignRight })],
	template: `
		<header class="h-20 bg-gray-50/30 backdrop-blur-md">
			<div class="flex h-full items-center justify-between sm:px-6 px-3">
				<h4 class="font-semibold text-xl">MZK.MNK.DEV</h4>
				<ul class="md:flex gap-6 md:items-center hidden">
					<app-nav-item
						item="Home"
						(onClickNavItem)="clickNavItem('home')"
					/>
					<li class="cursor-pointer">
						<img
							class="rounded-full border-2 border-slate-600"
							ngSrc="public/icon.jpg"
							[height]="35"
							[width]="35"
							alt="mzkmnk icon"
						/>
					</li>
					<ng-icon
						class="cursor-pointer"
						name="tablerSearch"
						strokeWidth="3"
					/>
				</ul>
				
				<ul class="md:hidden flex items-center">
					<ng-icon
						class="cursor-pointer"
						name="tablerAlignRight"
						strokeWidth="3"
					/>
				</ul>
			</div>
		</header>
	`,
})
export class HeaderComponent {
	private readonly router = inject(Router);

	async clickNavItem(item: 'home' | 'aboutMe'): Promise<void> {
		switch (item) {
			case 'home':
				await this.router.navigate(['/home']);
		}
	}
}
