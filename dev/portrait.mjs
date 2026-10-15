/* Builds src/assets/george-signal.png from the portfolio photo: a tone map (white = glow) where the
 * background is black, the left half fades out and pixelates, and the right half stays sharp.
 * CSS colours it with the current theme. Needs playwright-core (installed in ../ai-gateway).
 * Run: node dev/portrait.mjs */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
const { chromium } = createRequire( resolve( '../ai-gateway/package.json' ) )( 'playwright-core' );

const photo = readFileSync( resolve( '../personal-site/george-photo.jpg' ) ).toString( 'base64' );
const browser = await chromium.launch( { channel: 'chrome' } );
const page = await browser.newPage();
const dataUrl = await page.evaluate( async ( b64 ) => {
	const img = new Image();
	img.src = 'data:image/jpeg;base64,' + b64;
	await img.decode();
	const W = img.width, H = img.height;
	const src = document.createElement( 'canvas' ); src.width = W; src.height = H;
	const sctx = src.getContext( '2d' ); sctx.drawImage( img, 0, 0 );
	const d = sctx.getImageData( 0, 0, W, H ).data;
	const out = document.createElement( 'canvas' ); out.width = W; out.height = H;
	const octx = out.getContext( '2d' ); const o = octx.createImageData( W, H );
	const smooth = ( a, b, x ) => { const t = Math.min( 1, Math.max( 0, ( x - a ) / ( b - a ) ) ); return t * t * ( 3 - 2 * t ); };
	const bayer = [ 0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5 ];
	for ( let y = 0; y < H; y++ ) {
		for ( let x = 0; x < W; x++ ) {
			const u = x / W;
			// Pixel size grows towards the left edge: 1 on the right half, up to 28 at the far left.
			const bs = u > 0.5 ? 1 : Math.round( 1 + ( ( 0.5 - u ) / 0.5 ) ** 1.4 * 27 );
			const sx = Math.min( W - 1, Math.floor( x / bs ) * bs + ( bs >> 1 ) );
			const sy = Math.min( H - 1, Math.floor( y / bs ) * bs + ( bs >> 1 ) );
			const i = ( sy * W + sx ) * 4;
			const L = ( 0.299 * d[ i ] + 0.587 * d[ i + 1 ] + 0.114 * d[ i + 2 ] ) / 255;
			// Face and clothes glow; the bright wall behind falls to black. An ellipse around the face
			// keeps its pale skin from being mistaken for wall.
			const ex = ( sx - W * 0.5 ) / ( W * 0.27 ), ey = ( sy - H * 0.5 ) / ( H * 0.42 );
			const inside = 1 - smooth( 0.55, 0.98, Math.hypot( ex, ey ) );
			const wall = smooth( 0.8, 0.92, L ) * ( 1 - inside );
			let t = ( 0.3 + 0.7 * Math.pow( L, 1.5 ) ) * ( 1 - wall );
			// Ordered dither on the pixelated side so the blocks look like old video, not blur.
			if ( bs > 1 ) { t = Math.min( 1, Math.max( 0, t + ( bayer[ ( ( y % 4 ) * 4 ) + ( x % 4 ) ] / 16 - 0.5 ) * 0.25 ) ); }
			t *= smooth( 0.04, 0.58, u );
			const v = Math.round( t * 255 );
			const k = ( y * W + x ) * 4;
			o.data[ k ] = o.data[ k + 1 ] = o.data[ k + 2 ] = v; o.data[ k + 3 ] = 255;
		}
	}
	octx.putImageData( o, 0, 0 );
	return out.toDataURL( 'image/png' );
}, photo );
writeFileSync( 'src/assets/george-signal.png', Buffer.from( dataUrl.split( ',' )[ 1 ], 'base64' ) );
await browser.close();
console.log( 'src/assets/george-signal.png' );
