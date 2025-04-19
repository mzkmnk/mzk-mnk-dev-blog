import { Component, input, output } from '@angular/core';

@Component({
	selector: 'app-nav-item',
	template: `
    <li class="cursor-pointer" (click)="clickNavItem()">
			<p class="font-semibold">{{item()}}</p>
    </li>
  `,
})
export class NavItemComponent {
	item = input.required<string>();

	onClickNavItem = output<void>();

	clickNavItem(): void {
		this.onClickNavItem.emit();
	}
}
