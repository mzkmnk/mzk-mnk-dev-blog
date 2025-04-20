import { Component, input, output } from '@angular/core';

@Component({
	selector: 'app-nav-item',
	template: `
    <div class="cursor-pointer" (click)="clickNavItem()">
			<p class="font-semibold">{{item()}}</p>
    </div>
  `,
})
export class NavItemComponent {
	item = input.required<string>();

	onClickNavItem = output<void>();

	clickNavItem(): void {
		this.onClickNavItem.emit();
	}
}
