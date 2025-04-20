import { Component, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { radixInfoCircled } from '@ng-icons/radix-icons';
import { tablerX } from '@ng-icons/tabler-icons';

@Component({
	selector: 'app-toast-container',
	imports: [NgIcon],
	providers: [provideIcons({ radixInfoCircled, tablerX })],
	host: {
		class:
			'flex justify-between items-center md:w-64 w-48 py-2 px-4 rounded-md bg-sky-300/30 text-sky-700 backdrop-blur-xs border border-sky-500/30 shadow-md shadow-sky-300/30',
		'[class.toast-container-show]': 'animationState() === "visible"',
		'[class.toast-container-exit]': 'animationState() === "exit"',
		'(animatedEnd)': 'onAnimatedEnd()',
	},
	styles: `
		:host {
			opacity: 1;
		}
		
		:host(.toast-container-show) {
			animation: toast-show 200ms linear forwards;
		}
		
		:host(.toast-container-exit) {
			animation: toast-exit 200ms linear forwards;
		}
		
		@keyframes toast-show {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
		
		@keyframes toast-exit {
			from {
				opacity: 1;
			}
			
			to {
				display: none;
				opacity: 0;
			}
		}
	`,
	template: `
		<div class="flex gap-2 items-center">
			<ng-icon
				name="radixInfoCircled"
			/>
			<p>{{ message() }}</p>
		</div>
		<ng-icon
			class="cursor-pointer"
			(click)="exit()"
			name="tablerX"
		/>
	`,
})
export class ToastContainerComponent {
	message = input.required<string>();

	readonly animationState = signal<'visible' | 'exit'>('visible');

	onCompleteExit?: () => void;

	registerOnCompleteExit(fn: () => void) {
		this.onCompleteExit = fn;
	}

	onAnimatedEnd(): void {
		this.onCompleteExit?.();
	}

	exit(): void {
		this.animationState.set('exit');
	}
}
