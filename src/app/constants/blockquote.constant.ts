import type { BLOCKQUOTE_LABEL } from '@/models/blockquote.model';

export const isBlockquoteLabel: (label: string) => label is BLOCKQUOTE_LABEL = (
	label: string,
): label is BLOCKQUOTE_LABEL => {
	return (
		label === '[!INFO]' ||
		label === '[!WARNING]' ||
		label === '[!ERROR]' ||
		label === '[!SUCCESS]'
	);
};

export const BLOCKQUOTES_LABEL: { [key in BLOCKQUOTE_LABEL]: string } = {
	'[!INFO]': 'INFO',
	'[!WARNING]': 'WARNING',
	'[!ERROR]': 'ERROR',
	'[!SUCCESS]': 'SUCCESS',
};

export const BLOCKQUOTES_CLASS: { [key in BLOCKQUOTE_LABEL]: string } = {
	'[!INFO]': 'info',
	'[!WARNING]': 'warning',
	'[!ERROR]': 'error',
	'[!SUCCESS]': 'success',
};
