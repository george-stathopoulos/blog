/* Renders src/assets/social.png (1200x630) with headless Chrome. Needs playwright-core (installed in ../ai-gateway). */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { writeFileSync, rmSync } from 'node:fs';
const { chromium } = createRequire( resolve( '../ai-gateway/package.json' ) )( 'playwright-core' );

const html = `<html><body style="margin:0;width:1200px;height:630px;background:#0b0a08;color:#ffb000;font-family:monospace;position:relative;overflow:hidden">
<style>@font-face{font-family:V;src:url('${ pathToFileURL( resolve( 'src/assets/fonts/vt323-latin-400-normal.woff2' ) ) }')}
body::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(to bottom,transparent 0,transparent 2px,rgba(0,0,0,.25) 3px)}</style>
<div style="position:absolute;left:80px;top:70px;font:44px V;color:#9a7424">george@blog:~$ <span style="background:#ffb000">&nbsp;&nbsp;</span></div>
<div style="position:absolute;left:80px;top:150px;font:120px/0.92 V;text-shadow:0 0 18px rgba(255,176,0,.5)">Notes from the gap<br>between what exists<br>and what people need</div>
<div style="position:absolute;left:80px;bottom:44px;font:40px V;color:#f2d49a">the story behind every project I build</div></body></html>`;

const browser = await chromium.launch( { channel: 'chrome' } );
const page = await browser.newPage( { viewport: { width: 1200, height: 630 } } );
writeFileSync( 'dev/.og.html', html );
await page.goto( pathToFileURL( resolve( 'dev/.og.html' ) ).href );
await page.evaluate( () => document.fonts.load( '44px V' ) );
await page.waitForTimeout( 400 );
rmSync( 'dev/.og.html' );
await page.screenshot( { path: 'src/assets/social.png' } );
await browser.close();
console.log( 'src/assets/social.png' );
