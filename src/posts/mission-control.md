---
title: "Mission Control: counting visits without selling anyone out"
date: 2026-10-15
order: 60
summary: I wanted to know if anyone visits my sites. Without cookies, ads or a spyware dashboard. So I built a very private, very boring one.
tags: analytics, privacy, cloudflare
project: mission-control
---

You build a handful of websites. You wonder, quietly, if anyone has visited any of them. You open an analytics tool, it asks for cookie consent, a data processing agreement and your firstborn.

I wanted something smaller.

## The gap

Cloudflare Web Analytics is exactly the right kind of tool: it counts page views and visits, no cookies, no personal data. But there's a catch for how I publish. My project sites all live on **one host**, `george-stathopoulos.github.io`, under different paths. In the dashboard that's one big blob. "How is the SheetPilot site doing" has no answer, only "how is everything doing".

## What I built

A private dashboard I call **Mission Control**. It's a single Cloudflare Worker that asks Cloudflare's own analytics for numbers and shows each of my sites **separately**: page views, visits, the change from the previous period, a daily or hourly trend, top pages, referrers, countries, devices, browsers.

Sites that share a host are told apart by path. The portfolio on the root is told to ignore the project paths, or it would count them twice.

## The boring part is the point

- It sits behind a password and signs you out after a week.
- The analytics access token is read-only and **never reaches the browser**. The browser only ever sees finished numbers.
- It tells search engines to stay away. This is a dashboard for one person.
- Adding a new site is one config entry and a push.

I don't track *people*. I count visits. The difference matters to me, and it's the same reason I tell visitors on every site that nothing personal is collected.

## What it taught me

Small numbers are fine, by the way. A site is not a failure because eleven people visited it. Eleven people is a good dinner party.

It's private because it's mine, but I'd happily describe how it works to anyone building their own. Ask me, and mind the password.
