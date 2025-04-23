import { NgOptimizedImage } from '@angular/common';
import { Component, output } from '@angular/core';

@Component({
	selector: 'app-user-icon',
	template: `
		<div
			class="cursor-pointer"
			(click)="clickIcon()"
		>
			<img
				class="rounded-full border-2 border-slate-600"
				ngSrc="public/icon.jpg"
				[height]="35"
				[width]="35"
				alt="mzkmnk icon"
			/>
		</div>
	`,
	imports: [NgOptimizedImage],
})
export class UserIconComponent {
	onClick = output<void>();

	clickIcon(): void {
		this.onClick.emit();
	}
}
