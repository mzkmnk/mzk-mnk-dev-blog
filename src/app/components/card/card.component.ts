import { Component, output } from '@angular/core';

@Component({
	selector: 'app-card',
	template: `
    <button class="relative overflow-hidden flex justify-start p-4 items-center min-h-10 min-w-96 bg-white rounded-xl shadow-xs cursor-pointer" (click)="navigateBlog()">
      <ng-content select="[card-content]"></ng-content>
    </button>
  `,
})
export class CardComponent {
	onClick = output<void>();

	navigateBlog(): void {
		this.onClick.emit();
	}
}
