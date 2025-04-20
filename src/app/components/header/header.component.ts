import { NavItemComponent } from '@/components/header/nav-item.component';
import { DevService } from '@/services/dev/dev.service';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { radixGithubLogo } from '@ng-icons/radix-icons';
import { tablerAlignRight, tablerSearch } from '@ng-icons/tabler-icons';

@Component({
	selector: 'app-header',
	imports: [NavItemComponent, NgIcon, NgOptimizedImage],
	providers: [
		provideIcons({ tablerSearch, tablerAlignRight, radixGithubLogo }),
	],
	template: `
		<header class="h-20 bg-gray-50/30 backdrop-blur-md">
			<div class="flex h-full items-center justify-between sm:px-6 px-3">
				<button class="cursor-pointer" (click)="clickNavItem('home')">
					<h4 class="font-semibold text-xl">MZK.MNK.DEV</h4>
				</button>
				<ul class="md:flex gap-6 md:items-center hidden">
					<app-nav-item
						item="Home"
						(onClickNavItem)="clickNavItem('home')"
					/>
					<li>
						<div class="cursor-pointer" (click)="inDevelopment()">
							<img
								class="rounded-full border-2 border-slate-600"
								ngSrc="public/icon.jpg"
								[height]="35"
								[width]="35"
								alt="mzkmnk icon"
							/>
						</div>
					</li>
					<li>
						<button class="cursor-pointer" (click)="navigateGithub()">
							<ng-icon
								name="radixGithubLogo"
							/>
						</button>
					</li>
					<li>
						<div class="cursor-pointer" (click)="inDevelopment()">
							<ng-icon
								name="tablerSearch"
								strokeWidth="3"
							/>
						</div>
					</li>
				</ul>
				
				<ul class="md:hidden flex items-center">
					<li>
						<div (click)="inDevelopment()">
							<ng-icon
								class="cursor-pointer"
								name="tablerAlignRight"
								strokeWidth="3"
							/>
						</div>
					</li>
				</ul>
			</div>
		</header>
	`,
})
export class HeaderComponent {
	private readonly router = inject(Router);

	private readonly devService = inject(DevService);

	async clickNavItem(item: 'home' | 'aboutMe'): Promise<void> {
		switch (item) {
			case 'home':
				await this.router.navigate(['/home']);
		}
	}

	navigateGithub(): void {
		window.open('https://github.com/mzkmnk/mzk-mnk-dev-blog');
	}

	inDevelopment(): void {
		this.devService.inDevelopment();
	}
}
