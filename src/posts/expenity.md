---
title: "Expenity: the bill reminder that doesn't live on one phone"
date: 2026-10-15
order: 80
summary: Bill reminder apps are great until you change phones. Expenity is a free web app for bills and subscriptions that runs everywhere, speaks Greek, and is honest about what a website can't do.
tags: webapp, finance, privacy, greek
project: expenity
---

Nobody dreams of paying the electricity bill. We dream of *not forgetting* to pay it, which is a smaller dream and much more achievable.

That is the whole job of a bill reminder app: you tell it what you owe, it nags you at the right moment, the lights stay on.

## The gap

I read up on RemindPayBee, a perfectly sensible Android app. You record your payments, group them by category, pick when you want to be reminded, and it does that, with charts, 17 languages and no account. It also keeps everything on the device, which is admirable for privacy and a small adventure the day you change phones.

Taking that as the starting point, the gaps are easy to list:

- It is Android only. Your partner on an iPhone, or you on a laptop, are on their own.
- The data lives on one device. No sync, no second screen.
- You type every bill by hand, which is exactly how trackers get abandoned.
- The reminder is a notification, and a notification you muted is a bill you forgot.

## What I wanted

A bill reminder that is **a website**, so it runs on a phone, a tablet and a laptop without anyone's app store. That needs no account to be useful. That understands a sentence like *Netflix 15.99 monthly on the 3rd*. And that speaks Greek properly, because bills here have their own words: ΕΝΦΙΑ, ΔΕΗ, ΕΥΔΑΠ, and a "τριμηνιαία" that English has no single word for.

## What Expenity does today

- **Add a bill in a sentence**, in English or in Greek, or from a template.
- **Today, Calendar and Insights.** What is overdue, what is due this week, the next 13 weeks as bars, what every subscription costs per year, and a note when a price changed.
- **Mark paid, undo, snooze, skip.** The next date is worked out for you, including the 31st in a 30-day month.
- **A calendar file with alarms** that your own calendar app delivers, on every device, even when Expenity is closed.
- **Backup, restore, CSV, and delete-everything**, because your bills are yours.

It runs in the browser, stores everything on your device, installs like an app, and works offline.

## The honest part

I wanted the reminders to arrive even when the app is closed. A website cannot do that on its own. A closed page can't wake a phone; that takes a server and push notifications, and on iPhone only for apps added to the Home Screen.

So Expenity tells you the truth: today it notifies you while it is open, and for everything else it hands you a calendar file, because calendars have been waking people up on time since before the web. Sync between devices, email and push reminders, and shared households are on the plan, in the repository, with the specs written. They need a small server, and I would rather say so than pretend.

## The look

I liked the clean, confident feel of Wallet by BudgetBakers, emerald green, soft mint, big numbers, calm cards. Expenity borrows the mood, not the pixels: its own logo (a calendar page with a tick) and its own colours.

## Try it

Open it, press **Load sample bills** if you want to look around first, and then add one real bill. Ten seconds. If the sentence box misreads something, [tell me the exact sentence](https://github.com/george-stathopoulos/expenity/issues) and I'll teach it.
