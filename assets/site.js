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

	/* Style panel: colour and font ---------------------------------------- */
	var panel = document.getElementById( 'style-panel' );
	var toggle = document.querySelector( '[data-style-toggle]' );
	function marks() {
		var th = root.dataset.theme || 'amber';
		var fo = root.dataset.font || 'terminal';
		document.querySelectorAll( '[data-theme-set]' ).forEach( function ( b ) { b.setAttribute( 'aria-pressed', b.dataset.themeSet === th ? 'true' : 'false' ); } );
		document.querySelectorAll( '[data-font-set]' ).forEach( function ( b ) { b.setAttribute( 'aria-pressed', b.dataset.fontSet === fo ? 'true' : 'false' ); } );
	}
	function setOption( attr, key, value, fallback ) {
		if ( value === fallback ) { delete root.dataset[ attr ]; } else { root.dataset[ attr ] = value; }
		store( key, value === fallback ? '' : value );
		var meta = document.querySelector( 'meta[name="theme-color"]' );
		if ( meta ) { meta.content = getComputedStyle( root ).getPropertyValue( '--bg' ).trim(); }
		marks();
	}
	document.querySelectorAll( '[data-theme-set]' ).forEach( function ( b ) {
		b.addEventListener( 'click', function () { setOption( 'theme', 'gs-blog-theme', b.dataset.themeSet, 'amber' ); } );
	} );
	document.querySelectorAll( '[data-font-set]' ).forEach( function ( b ) {
		b.addEventListener( 'click', function () { setOption( 'font', 'gs-blog-font', b.dataset.fontSet, 'terminal' ); } );
	} );
	function closePanel() {
		if ( panel && toggle ) { panel.hidden = true; toggle.setAttribute( 'aria-expanded', 'false' ); }
	}
	if ( panel && toggle ) {
		toggle.addEventListener( 'click', function ( e ) {
			e.stopPropagation();
			var open = panel.hidden;
			panel.hidden = ! open;
			toggle.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
		} );
		panel.addEventListener( 'click', function ( e ) { e.stopPropagation(); } );
		document.addEventListener( 'click', closePanel );
		document.addEventListener( 'keydown', function ( e ) { if ( e.key === 'Escape' ) { closePanel(); } } );
	}
	marks();

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

	/* About portrait: signal-loss glitches ------------------------------- */
	var portrait = document.querySelector( '[data-portrait]' );
	if ( portrait ) {
		if ( reduce ) {
			portrait.classList.add( 'on' );
		} else {
			var slices = portrait.querySelectorAll( '.p-slice' );
			var main = portrait.querySelector( '.p-main' );
			var rnd = function ( a, b ) { return a + Math.random() * ( b - a ); };
			var burst = function () {
				var frames = 5 + Math.floor( Math.random() * 4 );
				var f = 0;
				( function step() {
					slices.forEach( function ( el ) {
						var top = rnd( 0, 88 );
						el.style.clipPath = 'inset(' + top + '% 0 ' + Math.max( 0, 100 - top - rnd( 3, 14 ) ) + '% 0)';
						el.style.transform = 'translateX(' + rnd( -26, 26 ) + 'px)';
						el.style.opacity = '1';
					} );
					main.style.transform = 'translateX(' + rnd( -4, 4 ) + 'px)';
					if ( ++f < frames ) {
						setTimeout( step, 55 );
					} else {
						slices.forEach( function ( el ) { el.style.opacity = '0'; } );
						main.style.transform = '';
						setTimeout( burst, rnd( 2200, 6500 ) );
					}
				} )();
			};
			var io2 = new IntersectionObserver( function ( entries ) {
				if ( entries[ 0 ].isIntersecting ) {
					io2.disconnect();
					portrait.classList.add( 'on' );
					setTimeout( burst, 3200 );
				}
			}, { threshold: 0.35 } );
			io2.observe( portrait );
		}
	}

	/* Post title: turns and slides into the empty left margin as you scroll ----- */
	var slot = document.querySelector( '[data-title-slot]' );
	if ( slot && ! reduce ) {
		var title = slot.firstElementChild;
		var barEl = document.querySelector( '.bar' );
		var frame = 0;
		var smooth = function ( t ) { return t * t * ( 3 - 2 * t ); };
		var turn = function () {
			frame = 0;
			var vw = window.innerWidth, vh = window.innerHeight;
			var barH = barEl ? barEl.offsetHeight : 64;
			var prose = document.querySelector( '.post .prose' );
			var colLeft = prose ? prose.getBoundingClientRect().left : 0;
			var w = slot.offsetWidth, h = title.offsetHeight;
			// The rotated title has to fit in the left margin, and in the height of the window.
			var fit = Math.min( 1, ( colLeft - 56 ) / h, ( vh - barH - 90 ) / w );
			if ( fit < 0.55 ) { title.style.transform = ''; title.style.filter = ''; title.style.opacity = ''; return; }
			var max = document.documentElement.scrollHeight - vh;
			var end = Math.max( 1, Math.min( max * 0.3, vh * 0.8 ) ); // never more than 30% of the page
			var p = smooth( Math.min( 1, Math.max( 0, window.scrollY / end ) ) );
			var r = slot.getBoundingClientRect();
			var tx = ( colLeft / 2 ) - ( r.left + w / 2 );
			var ty = ( barH + ( vh - barH ) / 2 ) - ( r.top + h / 2 );
			var sc = 1 + ( fit - 1 ) * p;
			var blur = Math.sin( Math.PI * p ) * 7;
			title.style.transform = 'translate(' + ( tx * p ).toFixed( 1 ) + 'px,' + ( ty * p ).toFixed( 1 ) + 'px) rotate(' + ( -90 * p ).toFixed( 2 ) + 'deg) scale(' + sc.toFixed( 4 ) + ')';
			title.style.filter = blur > 0.05 ? 'blur(' + blur.toFixed( 2 ) + 'px)' : '';
			title.style.opacity = ( 1 - Math.sin( Math.PI * p ) * 0.25 ).toFixed( 3 );
		};
		var ask = function () { if ( ! frame ) { frame = requestAnimationFrame( turn ); } };
		window.addEventListener( 'scroll', ask, { passive: true } );
		window.addEventListener( 'resize', ask );
		window.addEventListener( 'load', ask );
		ask();
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
