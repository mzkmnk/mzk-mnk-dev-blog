import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	tablerActivity,
	tablerArticle,
	tablerBrandAngular,
	tablerHash,
} from '@ng-icons/tabler-icons';

@Component({
	selector: 'app-chip',
	providers: [
		provideIcons({
			tablerHash,
			tablerBrandAngular,
			tablerActivity,
			tablerArticle,
		}),
	],
	host: {
		class:
			'flex gap-1 items-center rounded-full border border-gray-300 px-3 py-1',
	},
	template: `
		<ng-icon
			[name]="iconName()"
			strokeWidth="2"
		/>
		<p class="text-xs">{{tag()}}</p>
	`,
	imports: [NgIcon],
})
export class ChipComponent {
	variant = input<string>('default');
	tag = input.required<string>();

	iconName = computed(() => {
		switch (this.variant()) {
			case 'Angular':
				return 'tablerBrandAngular';
			case 'Signals':
				return 'tablerActivity';
			case 'Blog':
				return 'tablerArticle';
			default:
				return 'tablerHash';
		}
	});
}
