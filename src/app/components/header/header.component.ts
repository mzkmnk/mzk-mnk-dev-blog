import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerSearch } from '@ng-icons/tabler-icons';
import { NavItemComponent } from './nav-item.component';

@Component({
	selector: 'app-header',
	imports: [NavItemComponent, NgIcon],
	providers: [provideIcons({ tablerSearch })],
	template: `
    <header class="h-20 bg-gray-50/30 backdrop-blur-md">
      <div class="flex h-full items-center justify-between px-6">
        <h3 class="font-semibold">MZK.MNK.DEV</h3>
        <ul class="flex gap-10 items-center">
          <app-nav-item item="Home" (onClickNavItem)="clickNavItem('home')" />
          <app-nav-item item="About me" (onClickNavItem)="clickNavItem('aboutMe')" />
          <ng-icon class="cursor-pointer" name="tablerSearch" />
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
