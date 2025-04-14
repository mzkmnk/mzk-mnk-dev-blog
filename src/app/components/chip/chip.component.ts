import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerHash } from '@ng-icons/tabler-icons';

@Component({
	selector: 'app-chip',
	providers: [provideIcons({ tablerHash })],
	template: `
    <div class="flex gap-1 items-center rounded-full border border-gray-300 px-3 py-1 text-xs">
      <ng-icon
        class="text-sm"
        name="tablerHash"
      />
      {{ tag() }}
    </div>
  `,
	imports: [NgIcon],
})
export class ChipComponent {
	tag = input.required<string>();
}
