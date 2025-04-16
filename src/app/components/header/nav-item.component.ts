import { Component, input, output } from '@angular/core';

@Component({
	selector: 'app-nav-item',
	template: `
    <li class="hover:underline underline-offset-1 cursor-pointer" (click)="clickNavItem()">
      {{item()}}
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
