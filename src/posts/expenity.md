---
title: "Expenity: the money app Olga asked for (and then it got out of hand)"
date: 2026-10-18
order: 80
summary: It began with one request from my wife, Olga: an easy way to track expenses. Twenty-five animated tutorials, a daily "you can spend today" number, a flame for streaks and a pulsing help icon later, here we are.
tags: webapp, finance, privacy, greek
project: expenity
---

This app exists because my wife, Olga, wanted an easy way to track expenses.

That is the whole origin story. No grand market analysis, no five-year plan. Just one very reasonable sentence, and one word in it that turned out to be dangerous: **easy**.

It started as a bill reminder, which is the most natural thing to build when someone says "what needs paying, and when?". Then "easy" kept moving the goalposts. Easy means fewer taps. Easy means it remembers things. Easy means it does not make you feel bad. Easy means it speaks Greek properly. You can see where this is going.

[Open Expenity](https://expenity.github.io/expenity/app/), or [look around the website](https://expenity.github.io/expenity/). It is free, open source, and works on phones, tablets and computers, in English and Greek.

## What "easy" turned into

Here is the honest inventory, because it got a little out of hand:

- **Type it like you would say it.** "Coffee 3.50 yesterday" becomes an expense with a name, an amount and a date. It works in Greek too: "Καφές 3,50 χθες".
- **Scan a receipt.** Hold the + button, take a photo, and the merchant, total and date are read on your device. Not uploaded for recognition, read on your device. Wrong? Re-scan.
- **A number for today.** One friendly figure: what you can spend today, worked out from your balance, bills and budgets. Or set your own daily, weekly or monthly target. You can track an income target too.
- **A flame.** Streaks count the days you stay within budget. It is a small thing, and it is surprisingly hard to ignore.
- **Budgets, goals, repeating income, reports and a 90-day forecast.** The grown-up bits, with rings and bars that fill up as you go.
- **Swipe, or press and hold.** A swipe never pays or deletes anything by itself, it only reveals buttons. (It used to be more eager. That did not go well.)
- **Little safety nets.** A duplicate guard that asks before you add the same entry twice. A note when a bill quietly got more expensive. Drafts, so a flat battery does not eat your half-typed expense. A recently deleted list that keeps things for 30 days.
- **Shared wallets, photos, 18 themes with a pencil, a profile picture** you choose from 20 characters, and a few more things I will stop listing before this becomes a menu.

## Show, do not tell

Documentation is lovely, and nobody reads it while they are standing in a shop. So every feature has a short **animated tutorial** built into the app. There are twenty-five of them, and they are pure CSS, no video, so they are tiny and they match your theme.

On top of that there is a **help icon**. It sits at the top of a screen, pulses, and rings like a bell every few seconds, because a quiet help button is a button nobody finds. Tap it and a popup explains the screen you are on. You never lose your place: if you were halfway through an expense, it is still there when you close it. Know a screen well already? Tell it to never show that icon again. It will take the hint.

## As much app as you want

Packed is not the same as cluttered. The first-run setup asks how much you want to see: **Basic** for wallets, expenses, income, bills and reports; **Pro** for repeating bills, budgets, goals, tags, photos and sharing; **Advanced** for everything, including receipt scanning and streaks. Or build your own mix with a toggle for each feature. Switching never deletes anything. Hidden features come back exactly as you left them.

## Honest about the data

Passkeys replace passwords. With an account, your records sync through Cloudflare Workers and D1 over an encrypted connection. It is not end-to-end encrypted, like most online services, and I would rather tell you than let you assume. Without an account, everything stays in your browser. No bank connection is required, and Expenity never moves money. Financial records work offline. Photos need a connection.

## Tell me what is missing

There is a **Contact us** form inside the app, with formatting and photos, for feedback or a problem report. You do not need an account to use it. And if you want the long version, the [English guide](https://expenity.github.io/expenity/docs/) and the [Greek guide](https://expenity.github.io/expenity/el/docs/) cover everything, with the same animations. The [source is on GitHub](https://github.com/expenity/expenity).

Olga, if you are reading this: I hope it is easy enough.
