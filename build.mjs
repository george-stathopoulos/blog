/**
 * Builds the blog into dist/ (published to GitHub Pages from the gh-pages branch).
 *
 * Posts are Markdown files in src/posts/ with a small header (title, date, tags, project, summary).
 * Pages are Markdown files in src/pages/. A post with "draft: true" is left out of the build.
 *
 * Run from the repository root: node build.mjs
 */
import MarkdownIt from 'markdown-it';
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/* ------------------------------------------------------------------ Config */

const SITE = {
	name: 'George Stathopoulos',
	title: 'george@blog',
	url: 'https://george-stathopoulos.github.io/blog/',
	base: '/blog/',
	author: 'George Stathopoulos',
	authorUrl: 'https://george-stathopoulos.github.io/',
	repo: 'https://github.com/george-stathopoulos/blog',
	tagline: 'Notes from the gap between what exists and what people actually need.',
};

// Every project site lists the others (and the personal site and this blog keep them all). Keep the
// `public` ones the same in each project's website build. `slug` ties a post to its project.
const PROJECTS = [
	{ slug: 'gatehouse', name: 'Gatehouse', url: 'https://george-stathopoulos.github.io/gatehouse/', repo: 'https://github.com/george-stathopoulos/gatehouse', text: 'AI governance and cost control for WordPress', kind: 'WordPress plugin · free' },
	{ slug: 'helpdesk-hero', name: 'Helpdesk Hero', url: 'https://george-stathopoulos.github.io/helpdesk-hero/', repo: 'https://github.com/george-stathopoulos/helpdesk-hero', text: 'WordPress support with diagnostics and password-free access', kind: 'WordPress plugins · free' },
	{ slug: 'fixpass', name: 'Fixpass', url: 'https://george-stathopoulos.github.io/fixpass/', repo: 'https://github.com/george-stathopoulos/fixpass', text: 'Spotlight the problem and give support safe, temporary access', kind: 'WordPress plugin · free' },
	{ slug: 'sheetpilot', name: 'SheetPilot', url: 'https://george-stathopoulos.github.io/sheetpilot/', repo: 'https://github.com/george-stathopoulos/sheetpilot', text: 'Turn any spreadsheet into an interactive dashboard, in your browser', kind: 'Web app · free' },
	{ slug: 'expenity', name: 'Expenity', url: 'https://expenity.github.io/expenity/', repo: 'https://github.com/expenity/expenity', text: 'Bills and subscriptions, calmly in one place. English and Greek', kind: 'Web app · free' },
	{ slug: 'mitos-checklist', name: 'Mitos Checklist', url: 'https://github.com/george-stathopoulos/mitos-checklist', repo: 'https://github.com/george-stathopoulos/mitos-checklist', text: 'Greek public-service procedures as tick-off checklists', kind: 'WordPress plugin · free' },
	{ slug: 'mission-control', name: 'Mission Control', url: '', repo: '', text: 'One private dashboard for the visits to all of these sites', kind: 'Private tool' },
];

const THEMES = [
	{ id: 'amber', sw: '#ffb000' },
	{ id: 'green', sw: '#33ff66' },
	{ id: 'white', sw: '#f2f2f2' },
	{ id: 'paper', sw: '#f4efe2' },
];
const FONTS = [
	{ id: 'terminal', label: 'terminal', css: "'VT323', monospace" },
	{ id: 'plex', label: 'plex mono', css: "'IBM Plex Mono', monospace" },
	{ id: 'jetbrains', label: 'jetbrains', css: "'JetBrains Mono', monospace" },
	{ id: 'space', label: 'space mono', css: "'Space Mono', monospace" },
	{ id: 'system', label: 'system', css: 'ui-monospace, Menlo, monospace' },
];

const ROOT = process.cwd();
const SRC = join( ROOT, 'src' );
const OUT = join( ROOT, 'dist' );
const ASSET_V = Date.now().toString( 36 );

/* ----------------------------------------------------------------- Helpers */

const md = new MarkdownIt( { html: true, linkify: false, typographer: false } );

// Open external links safely and give code blocks a language label.
const defaultLink = md.renderer.rules.link_open || ( ( t, i, o, e, s ) => s.renderToken( t, i, o ) );
md.renderer.rules.link_open = ( tokens, idx, options, env, self ) => {
	const href = tokens[ idx ].attrGet( 'href' ) || '';
	if ( /^https?:/.test( href ) && ! href.startsWith( SITE.url ) ) {
		tokens[ idx ].attrSet( 'rel', 'noopener' );
	}
	return defaultLink( tokens, idx, options, env, self );
};

const esc = ( s ) => String( s ).replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /"/g, '&quot;' );

function parseFile( path ) {
	const raw = readFileSync( path, 'utf8' );
	const m = raw.match( /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/ );
	if ( ! m ) throw new Error( `${ path }: missing header` );
	const meta = {};
	for ( const line of m[ 1 ].split( '\n' ) ) {
		const k = line.match( /^(\w+):\s*(.*)$/ );
		if ( k ) meta[ k[ 1 ] ] = k[ 2 ].trim().replace( /^["']|["']$/g, '' );
	}
	return { meta, body: m[ 2 ].trim() };
}

function dateLabel( iso ) {
	return new Date( iso + 'T12:00:00Z' ).toLocaleDateString( 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' } );
}

function write( rel, html ) {
	const file = join( OUT, rel );
	mkdirSync( join( file, '..' ), { recursive: true } );
	writeFileSync( file, html );
}

/* ----------------------------------------------------------------- Content */

const posts = readdirSync( join( SRC, 'posts' ) )
	.filter( ( f ) => f.endsWith( '.md' ) )
	.map( ( f ) => {
		const { meta, body } = parseFile( join( SRC, 'posts', f ) );
		const words = body.split( /\s+/ ).length;
		return {
			slug: f.replace( /\.md$/, '' ),
			title: meta.title,
			date: meta.date,
			order: Number( meta.order || 0 ),
			summary: meta.summary || '',
			tags: ( meta.tags || '' ).split( ',' ).map( ( t ) => t.trim() ).filter( Boolean ),
			project: PROJECTS.find( ( p ) => p.slug === meta.project ),
			draft: meta.draft === 'true',
			pinned: meta.pinned === 'true',
			minutes: Math.max( 1, Math.round( words / 200 ) ),
			html: md.render( body ),
		};
	} )
	.filter( ( p ) => ! p.draft )
	.sort( ( a, b ) => Number( b.pinned ) - Number( a.pinned ) || ( a.date < b.date ? 1 : a.date > b.date ? -1 : b.order - a.order ) );

/* ----------------------------------------------------------------- Layout */

const NAV = [
	{ href: '', cmd: 'home', label: '~' },
	{ href: 'posts/', cmd: 'ls', label: 'posts' },
	{ href: 'projects/', cmd: 'cd', label: 'projects' },
	{ href: 'about/', cmd: 'cat', label: 'about' },
	{ href: 'feed.xml', cmd: 'rss', label: 'feed' },
];

function layout( { title, description, path, body, bodyClass = '', jsonLd = '', noindex = false, ogType = 'website', active = '' } ) {
	const url = SITE.url + path;
	const full = title ? `${ title } | ${ SITE.name }'s blog` : `${ SITE.name }'s blog`;
	const nav = NAV.map( ( n ) => {
		const on = n.label === active ? ' aria-current="page"' : '';
		return `<a href="${ SITE.base }${ n.href }"${ on }><span class="cmd">${ n.cmd }</span> ${ esc( n.label === '~' ? '~/' : n.label ) }</a>`;
	} ).join( '' );
	const projects = PROJECTS.filter( ( p ) => p.url ).map( ( p ) => `<li><a href="${ p.url }">${ esc( p.name ) }</a><span> ${ esc( p.text ) }</span></li>` ).join( '' );
	return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${ esc( full ) }</title>
<meta name="description" content="${ esc( description || SITE.tagline ) }">
<link rel="canonical" href="${ url }">
${ noindex ? '<meta name="robots" content="noindex">\n' : '' }<meta name="theme-color" content="#0b0a08">
<meta property="og:type" content="${ ogType }">
<meta property="og:title" content="${ esc( full ) }">
<meta property="og:description" content="${ esc( description || SITE.tagline ) }">
<meta property="og:url" content="${ url }">
<meta property="og:image" content="${ SITE.url }assets/social.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="alternate" type="application/rss+xml" title="${ esc( SITE.name ) }'s blog" href="${ SITE.url }feed.xml">
<link rel="icon" href="${ SITE.base }assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${ SITE.base }assets/fonts/vt323-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ SITE.base }assets/site.css?v=${ ASSET_V }">
<script>document.documentElement.classList.remove('no-js');try{var t=localStorage.getItem('gs-blog-theme'),f=localStorage.getItem('gs-blog-font');if(t)document.documentElement.dataset.theme=t;if(f)document.documentElement.dataset.font=f}catch(e){}</script>
<!-- Cloudflare Web Analytics: counts visits anonymously, no cookies --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "64332b427a604e879f82853393ebdb0d"}'></script><!-- End Cloudflare Web Analytics -->
${ jsonLd }</head>
<body class="${ bodyClass }">
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><i></i></div>
<header class="bar">
	<div class="wrap bar-in">
		<a class="prompt" href="${ SITE.base }" aria-label="Blog home"><span class="u">george</span>@<span class="h">blog</span>:<span class="p">~</span>$</a>
		<nav id="nav" class="nav" aria-label="Main">${ nav }</nav>
		<div class="bar-tools">
			<button type="button" class="tool" data-style-toggle aria-expanded="false" aria-controls="style-panel">[style]</button>
			<button type="button" class="tool menu" data-menu aria-controls="nav" aria-expanded="false">[menu]</button>
		</div>
		<div class="style-panel" id="style-panel" hidden>
			<p class="sp-h">colour</p>
			<div class="sp-row">${ THEMES.map( ( t ) => `<button type="button" class="sp-btn" data-theme-set="${ t.id }" aria-pressed="false"><span class="sp-sw" style="--sw:${ t.sw }"></span>${ t.id }</button>` ).join( '' ) }</div>
			<p class="sp-h">font</p>
			<div class="sp-row">${ FONTS.map( ( f ) => `<button type="button" class="sp-btn" data-font-set="${ f.id }" aria-pressed="false" style="font-family:${ f.css }">${ f.label }</button>` ).join( '' ) }</div>
		</div>
	</div>
</header>
<main id="main">
${ body }
</main>
<footer class="foot">
	<div class="wrap">
		<p class="foot-line"><span class="dim">$</span> ls ~/projects</p>
		<ul class="foot-projects">${ projects }</ul>
		<p class="foot-meta"><a href="${ SITE.authorUrl }">george-stathopoulos.github.io</a> · <a href="${ SITE.repo }">source</a> · no cookies; visits are counted anonymously, with no personal data · made with <span class="heart" aria-label="love">♥</span> in Athens</p>
	</div>
</footer>
<script src="${ SITE.base }assets/site.js?v=${ ASSET_V }" defer></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------- Parts */

// Pinned posts stay on top, marked with a pin.
const PIN = '<span class="pin" title="Pinned"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M9.8 1.2 14.8 6.2 13.6 7.4 12.9 6.7 10.2 9.4 10.9 12.2 9.8 13.3 6.9 10.4 3.1 14.2 1.8 12.9 5.6 9.1 2.7 6.2 3.8 5.1 6.6 5.8 9.3 3.1 8.6 2.4z"/></svg><span class="pin-t">pinned</span></span>';

function postRow( p, i ) {
	const tags = p.tags.slice( 0, 2 ).map( ( t ) => `<span class="tag">#${ esc( t ) }</span>` ).join( ' ' );
	return `<li class="row"><a href="${ SITE.base }posts/${ p.slug }/" data-post>
	<span class="row-n">${ String( i + 1 ).padStart( 2, '0' ) }</span>
	<span class="row-main"><span class="row-title">${ esc( p.title ) }</span><span class="row-sum">${ esc( p.summary ) }</span><span class="row-meta">${ p.pinned ? PIN + ' · ' : '' }${ dateLabel( p.date ) } · ${ p.minutes } min read ${ tags }</span></span>
	<span class="row-go" aria-hidden="true">→</span>
</a></li>`;
}

function hero() {
	return `<section class="hero" id="top" aria-labelledby="hero-title">
	<div class="wrap hero-in">
		<pre class="boot" aria-hidden="true" data-boot><span class="bl" data-text="BIOS (c) Feb 20, 1983 G.S. Systems">BIOS (c) Feb 20, 1983 G.S. Systems</span>
<span class="bl" data-text="CHECKING 64K RAM" data-status="OK">CHECKING 64K RAM ......... <b class="ok">OK</b></span>
<span class="bl" data-text="LOADING THOUGHTS" data-status="OK">LOADING THOUGHTS ....... <b class="ok">OK</b></span>
<span class="bl" data-text="LOADING PROJECTS" data-status="OK">LOADING PROJECTS ....... <b class="ok">OK</b></span>
<span class="bl" data-text="LOADING BAD JOKES" data-status="ERROR 404" data-err="1">LOADING BAD JOKES ...... <b class="err">ERROR 404</b></span>
<span class="bl" data-text="&gt; JOKES NOT FOUND. CONTINUING ANYWAY" data-dim="1">&gt; JOKES NOT FOUND. CONTINUING ANYWAY</span></pre>
		<h1 id="hero-title" class="hero-title">Notes from the gap <br class="br">between what exists <br class="br">and what people <br class="br">need<span class="caret big" aria-hidden="true"></span></h1>
		<p class="hero-sub">I'm George. I build small tools that fill gaps I keep running into, and every one of them gets a post here: why it exists, what went wrong, what I hoped for.</p>
		<p class="hero-cta"><a class="btn" href="${ SITE.base }posts/${ ( posts.find( ( p ) => ! p.pinned ) || posts[ 0 ] ).slug }/" data-post>&gt; read the latest post</a> <a class="btn ghost" href="#posts">&gt; ls posts</a></p>
	</div>
	<a class="scroll-hint" href="#posts" aria-label="Scroll to the posts">scroll<span>↓</span></a>
</section>`;
}

// The portrait is a grey tone map (assets/george-signal.png); the CSS colours it with the current theme.

function aboutHead( title ) {
	const img = `${ SITE.base }assets/george-signal.png`;
	return `<section class="wrap about-head">
	<div class="page-head"><p class="crumb"><span class="dim">$</span> cat about.md</p><h1 class="page-title">${ esc( title ) }</h1></div>
	<figure class="portrait" data-portrait>
		<div class="p-stage">
			<div class="p-shake"><img class="p-main" src="${ img }" width="640" height="640" alt="George, as a half-lit portrait glowing like an old monitor"><img class="p-slice" src="${ img }" alt="" aria-hidden="true"><img class="p-slice" src="${ img }" alt="" aria-hidden="true"></div>
			<i class="p-bar"></i><i class="p-noise"></i>
		</div>
		<figcaption class="osd" aria-hidden="true"><span class="rec">PLAY</span><span>CH 03</span></figcaption>
	</figure>
</section>`;
}

/* ------------------------------------------------------------------- Pages */

rmSync( OUT, { recursive: true, force: true } );
mkdirSync( OUT, { recursive: true } );
cpSync( join( SRC, 'assets' ), join( OUT, 'assets' ), { recursive: true } );

// Home
{
	const latest = posts.slice( 0, 6 );
	const body = `${ hero() }
<section class="wrap list-sec reveal" id="posts" aria-labelledby="posts-h">
	<h2 id="posts-h" class="sec-title"><span class="dim">$</span> ls -t posts/</h2>
	<ol class="rows">${ latest.map( postRow ).join( '\n' ) }</ol>
	${ posts.length > latest.length ? `<p class="more"><a href="${ SITE.base }posts/">&gt; ls all ${ posts.length } posts</a></p>` : '' }
</section>
<section class="wrap pitch reveal" aria-labelledby="how-h">
	<h2 id="how-h" class="sec-title"><span class="dim">$</span> man blog</h2>
	<p>Every project I build fills a gap: something from my own experience, or something I just love. When a project ships, it gets at least one post here, written like I'd explain it to a friend over coffee. Less launch announcement, more "so here's what happened".</p>
	<p><a href="${ SITE.base }projects/">&gt; see all projects</a> · <a href="${ SITE.base }about/">&gt; who is writing this</a></p>
</section>`;
	write( 'index.html', layout( {
		title: '',
		description: SITE.tagline + ' The story behind every project I build.',
		path: '',
		body,
		bodyClass: 'is-home',
		active: '~',
		jsonLd: `<script type="application/ld+json">${ JSON.stringify( { '@context': 'https://schema.org', '@type': 'Blog', name: `${ SITE.name }'s blog`, url: SITE.url, author: { '@type': 'Person', name: SITE.author, url: SITE.authorUrl } } ) }</script>\n`,
	} ) );
}

// Posts index
write( 'posts/index.html', layout( {
	title: 'Posts',
	description: 'Every post, newest first.',
	path: 'posts/',
	active: 'posts',
	body: `<section class="wrap page-head"><p class="crumb"><span class="dim">$</span> ls -t posts/</p><h1 class="page-title">Posts</h1><p class="lede">${ posts.length } so far. Newest first.</p></section>
<section class="wrap"><ol class="rows">${ posts.map( postRow ).join( '\n' ) }</ol></section>`,
} ) );

// Each post
posts.forEach( ( p, i ) => {
	const newer = posts[ i - 1 ];
	const older = posts[ i + 1 ];
	const project = p.project
		? `<aside class="project-box reveal"><p class="crumb"><span class="dim">$</span> cat project.info</p><h2>${ esc( p.project.name ) }</h2><p>${ esc( p.project.text ) }.</p><p class="kind">${ esc( p.project.kind ) }</p><p>${ [ p.project.url ? `<a class="btn" href="${ p.project.url }">&gt; visit ${ esc( p.project.name.toLowerCase() ) }</a>` : '', p.project.repo ? `<a class="btn ghost" href="${ p.project.repo }">&gt; source</a>` : '' ].join( ' ' ) }</p></aside>`
		: '';
	const body = `<article class="post wrap" data-post-page>
	<header class="post-head">
		<p class="crumb" data-type><span class="dim">$</span> cat posts/${ p.slug }.md</p>
		<h1 class="post-title">${ esc( p.title ) }</h1>
		<p class="post-meta">${ p.pinned ? PIN + ' · ' : '' }<time datetime="${ p.date }">${ dateLabel( p.date ) }</time> · ${ p.minutes } min read${ p.tags.length ? ' · ' + p.tags.map( ( t ) => `<span class="tag">#${ esc( t ) }</span>` ).join( ' ' ) : '' }</p>
		<p class="post-lede">${ esc( p.summary ) }</p>
	</header>
	<div class="prose">${ p.html }</div>
	<p class="eof" aria-hidden="true">-- EOF --</p>
	${ project }
	<nav class="pager" aria-label="More posts">
		${ older ? `<a href="${ SITE.base }posts/${ older.slug }/"><small>&lt; older</small><span>${ esc( older.title ) }</span></a>` : '<span></span>' }
		${ newer ? `<a class="next" href="${ SITE.base }posts/${ newer.slug }/"><small>newer &gt;</small><span>${ esc( newer.title ) }</span></a>` : '<span></span>' }
	</nav>
	<p class="back"><a href="${ SITE.base }posts/">&lt; cd ..</a></p>
</article>`;
	write( `posts/${ p.slug }/index.html`, layout( {
		title: p.title,
		description: p.summary,
		path: `posts/${ p.slug }/`,
		body,
		bodyClass: 'is-post',
		ogType: 'article',
		active: 'posts',
		jsonLd: `<script type="application/ld+json">${ JSON.stringify( { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, datePublished: p.date, description: p.summary, author: { '@type': 'Person', name: SITE.author, url: SITE.authorUrl }, mainEntityOfPage: SITE.url + `posts/${ p.slug }/` } ) }</script>\n`,
	} ) );
} );

// Projects
{
	const items = PROJECTS.map( ( pr ) => {
		const related = posts.filter( ( p ) => p.project && p.project.slug === pr.slug );
		return `<li class="proj reveal">
	<h2>${ pr.url ? `<a href="${ pr.url }">${ esc( pr.name ) }</a>` : esc( pr.name ) }</h2>
	<p class="kind">${ esc( pr.kind ) }</p>
	<p>${ esc( pr.text ) }.</p>
	<p class="proj-links">${ related.map( ( p ) => `<a href="${ SITE.base }posts/${ p.slug }/">&gt; read: ${ esc( p.title ) }</a>` ).join( ' ' ) }${ pr.repo ? ` <a href="${ pr.repo }">&gt; source</a>` : '' }</p>
</li>`;
	} ).join( '\n' );
	write( 'projects/index.html', layout( {
		title: 'Projects',
		description: 'Everything I have built, and the story behind each one.',
		path: 'projects/',
		active: 'projects',
		body: `<section class="wrap page-head"><p class="crumb"><span class="dim">$</span> cd ~/projects &amp;&amp; ls</p><h1 class="page-title">Projects</h1><p class="lede">Each one fills a gap. Each one has a story.</p></section>
<section class="wrap"><ul class="projs">${ items }</ul></section>`,
	} ) );
}

// About (and any other page in src/pages)
for ( const f of readdirSync( join( SRC, 'pages' ) ).filter( ( x ) => x.endsWith( '.md' ) ) ) {
	const { meta, body } = parseFile( join( SRC, 'pages', f ) );
	const slug = f.replace( /\.md$/, '' );
	write( `${ slug }/index.html`, layout( {
		title: meta.title,
		description: meta.summary,
		path: `${ slug }/`,
		active: slug,
		bodyClass: slug === 'about' ? 'is-about' : '',
		body: `${ slug === 'about' ? aboutHead( meta.title ) : `<section class="wrap page-head"><p class="crumb"><span class="dim">$</span> cat ${ slug }.md</p><h1 class="page-title">${ esc( meta.title ) }</h1></section>` }
<section class="wrap"><div class="prose">${ md.render( body ) }</div></section>`,
	} ) );
}

// 404
write( '404.html', layout( {
	title: 'Not found',
	description: 'That page does not exist.',
	path: '404.html',
	noindex: true,
	body: `<section class="wrap page-head"><p class="crumb"><span class="dim">$</span> cat ${ 'that-page' }</p><h1 class="page-title">404: no such file</h1><p class="lede">I looked everywhere. Even in /tmp.</p><p><a class="btn" href="${ SITE.base }">&gt; cd ~</a></p></section>`,
} ) );

// Feed and sitemap
{
	const items = posts.map( ( p ) => `<item><title>${ esc( p.title ) }</title><link>${ SITE.url }posts/${ p.slug }/</link><guid>${ SITE.url }posts/${ p.slug }/</guid><pubDate>${ new Date( p.date + 'T12:00:00Z' ).toUTCString() }</pubDate><description>${ esc( p.summary ) }</description></item>` ).join( '\n' );
	write( 'feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${ esc( SITE.name ) }'s blog</title><link>${ SITE.url }</link><description>${ esc( SITE.tagline ) }</description><language>en</language>
${ items }
</channel></rss>
` );
	const urls = [ '', 'posts/', 'projects/', 'about/', ...posts.map( ( p ) => `posts/${ p.slug }/` ) ];
	write( 'sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ urls.map( ( u ) => `<url><loc>${ SITE.url }${ u }</loc></url>` ).join( '\n' ) }
</urlset>
` );
}

console.log( `Built ${ posts.length } posts into dist/` );
