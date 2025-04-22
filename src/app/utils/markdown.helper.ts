import { generateSlug } from '@/utils/generate-slug.helper';
import {
	type MarkedOptions,
	type RendererObject,
	type Tokens,
	marked,
} from 'marked';
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

export function rendererFactory(): RendererObject {
	return {
		heading({ tokens, depth }: Tokens.Heading): string {
			const text = Parser.parseInline(tokens);

			const slug = generateSlug(text);

			return `<h${depth} id="${slug}">${text}</h${depth}>`;
		},
		blockquote({ tokens }: Tokens.Blockquote): string {
			console.log(Parser.parseInline(tokens));

			return `<blockquote>aa</blockquote>`;
		},
	};
}
