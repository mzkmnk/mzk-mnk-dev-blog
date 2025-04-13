import {BLOCKQUOTES_CLASS, BLOCKQUOTES_LABEL, isBlockquoteLabel} from '@/constants/blockquote.constant';
import type {Agenda} from '@/models/agenda.model';
import {BlogService} from '@/services/blog/blog.service';
import {Component, ElementRef, inject, input} from '@angular/core';
import {marked, type Token, type TokensList} from 'marked';
import {MarkdownComponent as NgxMarkdownComponent} from 'ngx-markdown';

@Component({
	selector: 'app-markdown',
	imports: [NgxMarkdownComponent],
	host: {
		class: 'flex-auto p-5',
	},
	template: `
    <markdown
      (ready)="readyMarkdown()"
    >
      {{blog()}}
    </markdown>
  `,
})
export class MarkdownComponent {
	blog = input.required<string>();
	private readonly elementRef = inject(ElementRef);
	private readonly blogService = inject(BlogService);

	readyMarkdown(): void {
		this.highlightBlockquote();

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

		const agenda: Agenda[] = tokens.map((token) => ({
			title: (token as Token & { text: string }).text,
			child: [],
		}));

		this.blogService.setAgenda(agenda);
	}
}
