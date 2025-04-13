import { Component, output } from '@angular/core';

@Component({
	selector: 'app-card',
	template: `
    <button class="hover:-translate-y-2 hover:scale-105 transition duration-350 relative overflow-hidden flex justify-start p-4 items-center min-h-10 min-w-96 bg-white rounded-lg shadow-xs cursor-pointer" (click)="navigateBlog()">
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
