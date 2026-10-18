---
title: "FixPin: for everyone who has ever said \"the blue one\""
date: 2026-10-19
order: 90
summary: A free app and browser extension that let you point at the broken thing instead of describing it. Born as a feature, renamed after an awkward discovery, and powered by a flashlight.
tags: webapp, extension, support, privacy
project: fixpin
---

"Can I use the pointing thing on a site that isn't WordPress?"

I had just finished explaining Fixpass to someone. I'd talked for ten minutes about safe temporary access, about never emailing a password, about the careful bit I was proud of. And they said: *"Yeah, but can I use the pointing thing?"*

Ten minutes of careful security engineering, and the review came back: *nice button.*

I took it personally for about a minute. Then I took it as a brief.

## Here is the whole problem

Someone: "The button doesn't work."
Me: "Which button?"
Someone: "The blue one."
Me: "We have eleven blue buttons."
Someone: "...The blue one that doesn't work."

This conversation has been happening for as long as there have been buttons. It ends either with a screenshot of the wrong page, or with someone saying "can we just jump on a call?", which is how every adult hobby dies.

## What FixPin does

You point at the broken thing. That's it. That's the product.

- **The app** works on any phone, tablet or computer. Drop in a screenshot, click the problem (or drag a box round it), write a note.
- **The browser extension** does the screenshot for you, and also brings along the page address, your screen size, your browser and whatever errors the page threw while you weren't looking.
- Then you get **a link**. It's private, it self-destructs in 1, 7 or 30 days, and you can put a passcode on it, like a tiny secret clubhouse for one bug.

[Open the app](https://fixpin.george-stathopoulos.workers.dev/), or [wander around the website](https://george-stathopoulos.github.io/fixpin/). Fair warning: the website is dark, and you navigate it with a flashlight. I will not be taking questions about this.

## The naming incident

I wanted to keep "Fix", because Fixpass taught me I have exactly one good prefix and I intend to wear it out.

Meeting one produced **FixSpot**. I loved it. I built an app, an extension, a website, a flashlight and half a blog post around it. It had a dog-ish ring to it. It was perfect.

Then I did what I should have done *before* the logo: I searched the browser store. Somebody already had an extension with that exact name, doing a similar job. I won't name them. They got there first, and they deserve their peace, and also I'm too embarrassed.

Meeting two, now held with the knowledge that I am a person who names things first and checks later:

- **FixShot** was clear, but it sounds like something a pharmacist gives you.
- **FixPoint** already belongs to mathematicians and some very serious finance people. I don't want their lawyers *or* their calculators.
- **FixLens** sounded like it comes with a subscription and a lanyard.
- **FixPin** won. You pin the problem to where it actually is. The numbered markers even look like little map pins, which I am going to claim was the plan all along.

This time I searched first. The whole incident cost one evening, one renamed repository and a commit message I would like everyone to forget.

## No accounts, on purpose

Nothing to sign up for. Nothing to forget. Nothing to leak. Reports live on a small Cloudflare Worker under a link nobody can guess, and they delete themselves when the time is up. The extension sends nothing until you press Send, and only runs on the page you click it on. No analytics, in the app or the extension.

There is no user table to get hacked, because there are no users. Security through not inviting anyone to the party.

## The part where I'm honest

The extension collects page errors **from the moment you click its button**, not before. Browsers won't let a polite extension peek into the past without asking permission to watch every site you visit, and I didn't want that permission. So the instruction is: click first, *then* make the bug happen again.

Yes, this means asking the bug to perform on cue. Bugs are famously shy. Good luck.

## Using WordPress? Even better

Then you can have the whole chain: point at the problem with FixPin (or Spotlight inside [Fixpass](https://george-stathopoulos.github.io/fixpass/)), let support in safely with Fixpass, and if you're the one answering the tickets, [Helpdesk Hero](https://george-stathopoulos.github.io/helpdesk-hero/) hands you the diagnostics so you stop asking "which PHP version?" four times a day.

## What I learned

Some features are homeless before they're finished. Spotlight was a perfectly good idea living in a house too small for it. The fix wasn't a bigger house, it was a front door of its own.

And: check the name *before* you build the flashlight.

If you have ever said "the blue one" to someone with eleven blue buttons, this is for you. I'm only a little judging. (I'm more than a little judging.)
