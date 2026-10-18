---
title: "FixSpot: the blue button, but for every website"
date: 2026-10-19
order: 90
summary: Spotlight was the favourite part of Fixpass, and people kept asking for it without WordPress. So it got its own app, its own browser extension and a very serious naming meeting with myself.
tags: webapp, extension, support, privacy
project: fixspot
---

"Can I use the pointing thing on a site that isn't WordPress?"

I had just finished explaining Fixpass to someone, and they had skipped the part about safe temporary access (which I think is the clever bit) and gone straight to the part where you point at the broken thing. A fair review. I took it personally for about a minute, and then I took it as a brief.

## The idea

Spotlight is the button in Fixpass that lets you click the broken part of a page, or drag a box around it, and add a note. Nothing about that needs WordPress. It needs a screenshot, a rectangle and a note. I had built the hard version of an easy idea and then locked it inside a plugin.

So FixSpot is Spotlight, set free:

- **An app** that works on any phone, tablet or computer. Add a screenshot, mark the spot, get a link.
- **A browser extension** that takes the screenshot for you and brings the page address, your screen size, your browser and the errors from the page.
- **A link** that is private, expires by itself in 1, 7 or 30 days, and can have a passcode.

[Open the app](https://fixspot.george-stathopoulos.workers.dev/), or [look around the website](https://george-stathopoulos.github.io/fixspot/). It is free and open source.

## The naming meeting

I wanted to keep "Fix", because Fixpass already taught the world that I have one good prefix and I intend to wear it out. The question was what to marry it to.

- **FixShot** was clear, but it sounds like something you get at a pharmacy.
- **FixPoint** is a perfectly good word that already belongs to mathematicians and some very serious finance people.
- **FixLens** sounded like it comes with a subscription and a lanyard.
- **FixSpot** is what you do: point at the spot. Also it sounds a bit like a dog, which is a plus.

It won. The dog thing was not a factor. (It was a factor.)

## No accounts, on purpose

Fixpass is built around "never send a password in an email". FixSpot has the same spirit: nothing to sign up for, nothing to forget, nothing left behind. Reports live on a small Cloudflare Worker, under a random link nobody can guess, and they delete themselves when the time is up. The extension sends nothing until you press Send, and only runs on the page you click it on. No analytics, in the app or the extension.

Which turned out to be a rather nice way to build something. There is no user table to leak, because there are no users.

## What I had to be honest about

The extension collects errors **from the moment you click its button**, not before. Browsers do not let a polite extension peek at a page's past without asking for permission to watch every site you visit, and I did not want that permission. So the instruction is: click first, then make the problem happen again. It is a small trade, and I think it is the right one.

I also did not build the part that lets someone into your site, because that is specific to each platform and a lot more dangerous. For WordPress, [Fixpass](https://george-stathopoulos.github.io/fixpass/) does that. For everything else, FixSpot does what it can do safely, which is show.

## Using WordPress?

Then you can have both, and the whole story works end to end: point at the problem with FixSpot or Spotlight, let support in with Fixpass, and if you are the one answering tickets, [Helpdesk Hero](https://george-stathopoulos.github.io/helpdesk-hero/) gives you the diagnostics that make it quick.

## What I learned

Features are often homeless before they are finished. I had a good idea, living in a house that was too small for it. The fix was not to make the house bigger. It was to build the idea its own door.

If you have ever said "the blue one" to someone with eleven blue buttons: this is for you. I am only a little judging.
