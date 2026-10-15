/* George Stathopoulos' blog: theme, menu, hero boot and fade, reading progress, and the post transitions. */
( function () {
	'use strict';

	var root = document.documentElement;
	var body = document.body;
	root.classList.add( 'js' );
	var reduce = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function store( key, value ) {
		try {
			if ( value === undefined ) { return localStorage.getItem( key ); }
			localStorage.setItem( key, value );
		} catch ( e ) {}
		return null;
	}

	/* Colour: amber -> green -> paper ----------------------------------- */
	var THEMES = [ 'amber', 'green', 'paper' ];
	var label = document.querySelector( '[data-theme-name]' );
	function setTheme( name ) {
		if ( name === 'amber' ) { delete root.dataset.theme; } else { root.dataset.theme = name; }
		if ( label ) { label.textContent = name; }
		store( 'gs-blog-theme', name === 'amber' ? '' : name );
		var meta = document.querySelector( 'meta[name="theme-color"]' );
		if ( meta ) { meta.content = getComputedStyle( root ).getPropertyValue( '--bg' ).trim(); }
	}
	var current = root.dataset.theme || 'amber';
	if ( label ) { label.textContent = current; }
	var cycle = document.querySelector( '[data-theme-cycle]' );
	if ( cycle ) {
		cycle.addEventListener( 'click', function () {
			var now = root.dataset.theme || 'amber';
			setTheme( THEMES[ ( THEMES.indexOf( now ) + 1 ) % THEMES.length ] );
		} );
	}

	/* Mobile menu -------------------------------------------------------- */
	var menu = document.querySelector( '[data-menu]' );
	var nav = document.getElementById( 'nav' );
	if ( menu && nav ) {
		menu.addEventListener( 'click', function () {
			var open = nav.classList.toggle( 'open' );
			menu.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
			menu.textContent = open ? '[close]' : '[menu]';
		} );
	}

	/* Hero boot text: types in line by line ------------------------------ */
	var boot = document.querySelector( '[data-boot]' );
	if ( boot ) {
		var full = boot.textContent;
		var booted = false;
		try { booted = !! window.sessionStorage.getItem( 'gs-booted' ); } catch ( e ) {}
		if ( ! reduce && ! booted ) {
			var i = 0;
			boot.textContent = '';
			( function type() {
				boot.textContent = full.slice( 0, i );
				i += 2;
				if ( i <= full.length + 1 ) { setTimeout( type, 14 ); }
			} )();
			try { window.sessionStorage.setItem( 'gs-booted', '1' ); } catch ( e ) {}
		}
	}

	/* Hero fades away as you scroll -------------------------------------- */
	var hero = document.querySelector( '.hero' );
	var bar = document.querySelector( '.progress i' );
	var ticking = false;
	function onScroll() {
		ticking = false;
		var y = window.scrollY;
		if ( hero ) {
			var p = Math.min( 1, Math.max( 0, y / ( hero.offsetHeight * 0.7 ) ) );
			hero.style.setProperty( '--p', p.toFixed( 3 ) );
		}
		if ( bar && body.classList.contains( 'is-post' ) ) {
			var max = document.documentElement.scrollHeight - window.innerHeight;
			bar.parentNode.style.setProperty( '--read', max > 0 ? Math.min( 1, y / max ).toFixed( 4 ) : 0 );
		}
	}
	window.addEventListener( 'scroll', function () {
		if ( ! ticking ) { ticking = true; requestAnimationFrame( onScroll ); }
	}, { passive: true } );
	onScroll();

	/* Reveal on scroll ---------------------------------------------------- */
	var items = document.querySelectorAll( '.reveal' );
	if ( 'IntersectionObserver' in window && ! reduce ) {
		var io = new IntersectionObserver( function ( entries ) {
			entries.forEach( function ( e ) {
				if ( e.isIntersecting ) { e.target.classList.add( 'in' ); io.unobserve( e.target ); }
			} );
		}, { rootMargin: '0px 0px -8% 0px' } );
		items.forEach( function ( el ) { io.observe( el ); } );
	} else {
		items.forEach( function ( el ) { el.classList.add( 'in' ); } );
	}

	/* Opening a post: dissolve the hero and list, then navigate ---------- */
	var postPage = document.querySelector( '[data-post-page]' );
	if ( postPage && ! reduce ) {
		body.classList.add( 'entering' );
	}
	document.querySelectorAll( 'a[data-post]' ).forEach( function ( a ) {
		a.addEventListener( 'click', function ( ev ) {
			if ( reduce || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0 ) { return; }
			ev.preventDefault();
			var href = a.href;
			body.classList.add( 'leaving' );
			setTimeout( function () { window.location.href = href; }, 420 );
		} );
	} );

	/* Coming back with the browser's back button must not show a faded page. */
	window.addEventListener( 'pageshow', function ( e ) {
		if ( e.persisted ) { body.classList.remove( 'leaving' ); }
	} );
} )();
