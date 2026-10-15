---
title: "Gatehouse: who is spending my AI money?"
date: 2026-10-15
order: 90
summary: Every AI plugin shares one bill and one API key, and nobody tells you who ate what. So I built a gatehouse.
tags: wordpress, ai, privacy
project: gatehouse
---

Picture a shared fridge in an office. Now picture that every plugin on your WordPress site is a colleague with an appetite, and the fridge is your AI provider account. Someone has finished the budget. Nobody did it. Everyone did it.

That's the problem Gatehouse is for.

## The gap

WordPress is getting a built-in way for plugins to talk to AI providers. That's great, and it also means a handful of plugins can quietly draw on **one bill**, with no view of who spends what and no way to say "that's enough".

And there's a second thing that nags me. Those plugins send text to a provider. Sometimes that text has a customer's name or email in it. As someone who's spent a career asking customers for their data very carefully, this makes me itchy.

## What I wanted

Four things, in plain words:

- **Know the cost, per plugin and theme**, call by call.
- **Stop spending before it happens.** Monthly budgets and hourly limits checked before a request goes out, not an apology after the invoice.
- **See what personal data leaves the site,** and strip it where it isn't needed. The provider's answer gets the real values put back, so nothing looks broken.
- **One set of instructions** for the brand's voice, added to every request, so each plugin doesn't improvise its own.

## How it works

It sits between the plugins and the provider, using WordPress's own AI hooks, so it doesn't wrap or fork anything. Think of the little booth at the gate of a building: it doesn't make the visitors' decisions for them, it just writes down who came in and what they carried.

Prices are the tricky part, because they change. You can type your own. Gatehouse can optionally fetch a public model price list once a day. Failing that it falls back to a built-in table. I wrote down exactly where the numbers come from in the docs, because a cost tool that's vague about its own maths is a bad joke.

## The honest bit

I also added a way to run a small AI model **in your browser**, so you can test on a development site without paying or sending anything anywhere. It's slower and smaller than the big hosted models. It's also free and private, which is a trade I like more every month.

If AI is going to be in every plugin, somebody has to hold the clipboard at the gate. It's now my job on my own sites, and it can be yours too.
