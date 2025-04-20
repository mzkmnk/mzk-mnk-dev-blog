import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import bootstrap from './src/main.server';

export function app(): express.Express {
	const server = express();

	const serverDistFolder = dirname(fileURLToPath(import.meta.url));

	const browserDistFolder = resolve(serverDistFolder, '../browser');

	const indexHTML = join(serverDistFolder, 'index.server.html');

	const commonEngine = new CommonEngine();

	server.set('view engine', 'html');

	server.set('views', browserDistFolder);

	server.get(
		'*.*',
		express.static(browserDistFolder, {
			maxAge: '1y',
			index: false,
			redirect: false,
		}),
	);

	server.get('*', (req, res, next) => {
		const { protocol, originalUrl, baseUrl, headers } = req;

		commonEngine
			.render({
				bootstrap,
				documentFilePath: indexHTML,
				url: `${protocol}://${headers.host}${originalUrl}`,
				publicPath: browserDistFolder,
				providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
			})
			.then((html) => res.send(html))
			.catch((err) => next(err));
	});

	return server;
}
