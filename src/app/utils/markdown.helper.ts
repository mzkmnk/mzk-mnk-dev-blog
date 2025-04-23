import {
	BLOCKQUOTES_CLASS,
	isBlockquoteLabel,
} from '@/constants/blockquote.constant';
import { generateSlug } from '@/utils/generate-slug.helper';
import type { RendererObject, Tokens } from 'marked';
import { Parser } from 'marked';

export function rendererFactory(): RendererObject {
	return {
		heading({ tokens, depth }: Tokens.Heading): string {
			const text = Parser.parseInline(tokens);

			const slug = generateSlug(text);

			return `<h${depth} id="${slug}">${text}</h${depth}>`;
		},
		link({ href, tokens }: Tokens.Link): string {
			const text = Parser.parseInline(tokens);

			return `<a href="${href}" target="_blank">${text}</a>`;
		},
		blockquote({ tokens }: Tokens.Blockquote): string {
			const content = Parser.parse(tokens);

			const lines = content.split('<br>');

			if (lines.length === 0) {
				return `<blockquote>${content}</blockquote>`;
			}

			const label = lines[0].replace('<p>', '');

			if (isBlockquoteLabel(label)) {
				return `<blockquote class="${BLOCKQUOTES_CLASS[label]}">${content}</blockquote>`;
			}

			return `<blockquote>${content}</blockquote>`;
		},
	};
}
