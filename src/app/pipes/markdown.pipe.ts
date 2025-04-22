import { rendererFactory } from '@/utils/markdown.helper';
import { Pipe, type PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
	private sanitizer = inject(DomSanitizer);

	async transform(markdown: string) {
		marked.use({
			gfm: true,
			renderer: rendererFactory(),
			breaks: true,
		});

		const html = await marked.parse(markdown);
		return this.sanitizer.bypassSecurityTrustHtml(html);
	}
}
