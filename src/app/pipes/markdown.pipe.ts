import { Pipe, type PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
	transform(markdown: string) {
		return Promise.resolve(marked(markdown));
	}
}
