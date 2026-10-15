# George Stathopoulos' blog

The story behind every project I build, in an 80s terminal style. Live at https://george-stathopoulos.github.io/blog/

A tiny static site: Markdown posts, one build script, no framework, no cookies (visits are counted anonymously with Cloudflare Web Analytics).

## The rule

Every new project (website, plugin, app or private tool) gets **at least one post** here: why it exists, what it was meant to achieve, what went wrong. Written in a human, slightly funny voice. Every project website links to this blog in its footer, and the portfolio links to it at the very top.

## Write a post

1. Add `src/posts/<slug>.md`:

   ```
   ---
   title: "Project: the hook"
   date: 2026-10-15
   order: 10          # tie-break for posts on the same day (higher first)
   summary: One or two sentences, shown in lists and shared links.
   tags: wordpress, support
   project: fixpass   # slug from PROJECTS in build.mjs (optional)
   draft: true        # optional: left out of the build
   ---
   Markdown here.
   ```

2. New project? Add it to `PROJECTS` in `build.mjs` (and to the footer list of every other site).
3. `npm run build`, then `npm run serve` and open http://localhost:4173/blog/
4. Publish: `bin/publish-site.sh` (builds, then pushes `dist/` to the `gh-pages` branch).

## Files

| File | What it is |
|---|---|
| `build.mjs` | Builds `dist/`: home, posts, projects, about, 404, RSS feed, sitemap |
| `src/posts/` | The posts (Markdown) |
| `src/pages/` | Other pages, such as About |
| `src/assets/` | CSS, JS, favicon, social image, fonts (VT323 and IBM Plex Mono, SIL Open Font License) |
| `dev/serve.mjs` | Serves `dist/` under `/blog/` for local checks |
| `dev/portrait.mjs` | Rebuilds the About portrait (`src/assets/george-signal.png`) from the portfolio photo: a grey tone map the page tints with the current colour |
| `dev/og.mjs` | Regenerates the social image (`src/assets/social.png`) |

Colours (amber default, green, white, paper) and fonts (terminal, plex mono, jetbrains, space mono, system) are chosen from the `[style]` button in the top bar and remembered in the browser.
