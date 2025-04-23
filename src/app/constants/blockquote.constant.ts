import type { BLOCKQUOTE_LABEL } from '@/models/blockquote.model';

export const isBlockquoteLabel: (label: string) => label is BLOCKQUOTE_LABEL = (
	label: string,
): label is BLOCKQUOTE_LABEL => {
	return (
		label === '!INFO' ||
		label === '!WARNING' ||
		label === '!ERROR' ||
		label === '!SUCCESS'
	);
};

export const BLOCKQUOTES_CLASS: { [key in BLOCKQUOTE_LABEL]: string } = {
	'!INFO': 'bg-blue-100 border-l-4 border-l-blue-400 rounded-xs py-1',
	'!WARNING': ' bg-yellow-100 border-l-4 border-l-yellow-400 rounded-xs py-1',
	'!ERROR': '',
	'!SUCCESS': 'bg-green-100 border-l-4 border-l-green-400 rounded-xs py-1',
};
