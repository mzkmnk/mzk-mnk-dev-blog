import { app } from '../app';

function run(): void {
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	const port = process.env['PORT'] || 4000;

	const server = app();

	server.listen(port, () => {
		console.log(`Node Express server listening on http://localhost:${port}`);
	});
}

run();
