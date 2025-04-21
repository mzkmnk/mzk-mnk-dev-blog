import {
	BLOCKQUOTES_CLASS,
	BLOCKQUOTES_LABEL,
	isBlockquoteLabel,
} from '@/constants/blockquote.constant';
import type { Agenda } from '@/models/agenda.model';
import { BlogDetailService } from '@/services/blog-detail/blog-detail.service';
import { generateSlug } from '@/utils/generate-slug.helper';
import { Component, ElementRef, inject, input } from '@angular/core';
import { type Token, type TokensList, marked } from 'marked';
import { MarkdownComponent as NgxMarkdownComponent } from 'ngx-markdown';

@Component({
	selector: 'app-markdown',
	imports: [NgxMarkdownComponent],
	host: {
		class: 'w-full md:flex-1',
	},
	template: `
    <markdown
			class="prose prose-indigo"
      (ready)="readyMarkdown()"
    >
      {{blog()}}
    </markdown>
  `,
})
export class MarkdownComponent {
	blog = input.required<string>();
	private readonly elementRef = inject(ElementRef);
	private readonly blogService = inject(BlogDetailService);

	readyMarkdown(): void {
		// this.highlightBlockquote();

		this.getAgenda();
	}

	private highlightBlockquote(): void {
		const blockquotes: HTMLElement[] = Array.from(
			this.elementRef.nativeElement.querySelectorAll('blockquote'),
		);

		for (const blockquote of blockquotes) {
			const pElement = blockquote.querySelector('p');

			if (pElement === null) return;

			const pElementChildren = Array.from(pElement.children);

			if (pElementChildren.length === 0) return;

			if (pElementChildren[0].tagName !== 'STRONG') return;

			const textContent = pElementChildren[0].textContent;

			if (textContent === null) return;

			if (!isBlockquoteLabel(textContent)) return;

			pElementChildren[0].textContent = BLOCKQUOTES_LABEL[textContent];

			blockquote.classList.add(BLOCKQUOTES_CLASS[textContent]);
		}
	}

	private getAgenda(): void {
		const lexers: TokensList = marked.lexer(this.blog());

		const tokens: Token[] = lexers.filter(
			(lexer) => lexer.type === 'heading' && lexer.depth === 2,
		);

		const agenda: Agenda[] = tokens.map((token) => {
			const title = (token as Token & { text: string }).text;
			return {
				title,
				id: generateSlug(title),
				child: [],
			};
		});

		this.blogService.setAgenda(agenda);
	}
}
