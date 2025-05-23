import type { Agenda } from '@/models/agenda.model';
import { MarkdownPipe } from '@/pipes/markdown.pipe';
import { BlogDetailService } from '@/services/blog-detail/blog-detail.service';
import { generateSlug } from '@/utils/generate-slug.helper';
import { AsyncPipe } from '@angular/common';
import { Component, type OnInit, inject, input } from '@angular/core';
import { type Token, type TokensList, marked } from 'marked';

@Component({
	selector: 'app-markdown',
	imports: [MarkdownPipe, AsyncPipe],
	host: {
		class: 'w-full md:flex-1',
	},
	template: `
		<article class="prose prose-a:no-underline prose-a:border-b-2 prose-a:border-b-sky-400" [innerHTML]="blog() | markdown | async"></article>
  `,
})
export class MarkdownComponent implements OnInit {
	blog = input.required<string>();
	private readonly blogService = inject(BlogDetailService);

	ngOnInit(): void {
		this.getAgenda();
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
