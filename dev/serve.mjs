/* Serves dist/ under /blog/ on http://localhost:4173, the way GitHub Pages will. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = join( process.cwd(), 'dist' );
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain' };

createServer( async ( req, res ) => {
	let path = decodeURIComponent( new URL( req.url, 'http://x' ).pathname );
	if ( ! path.startsWith( '/blog/' ) ) {
		res.writeHead( 302, { Location: '/blog/' } ).end();
		return;
	}
	path = normalize( path.slice( 5 ) );
	if ( path.endsWith( '/' ) ) path += 'index.html';
	try {
		const body = await readFile( join( ROOT, path ) );
		res.writeHead( 200, { 'Content-Type': TYPES[ extname( path ) ] || 'application/octet-stream' } ).end( body );
	} catch {
		const body = await readFile( join( ROOT, '404.html' ) ).catch( () => 'Not found' );
		res.writeHead( 404, { 'Content-Type': 'text/html; charset=utf-8' } ).end( body );
	}
} ).listen( 4173, () => console.log( 'http://localhost:4173/blog/' ) );
