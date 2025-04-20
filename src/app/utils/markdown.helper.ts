import { generateSlug } from '@/utils/generate-slug.helper';
import type { MarkedOptions } from 'marked';
import { Parser } from 'marked';
import { MarkedRenderer } from 'ngx-markdown';

export function markdownOptionsFactory(): MarkedOptions {
	const renderer = new MarkedRenderer();

	renderer.heading = ({ tokens, depth }): string => {
		const text = Parser.parseInline(tokens);

		const slug = generateSlug(text);

		return `<h${depth} id="${slug}">${text}</h${depth}>`;
	};

	return {
		renderer: renderer,
		gfm: true,
		breaks: true,
	};
}
