---
title: "Expenity: know where your money goes"
date: 2026-10-15
order: 80
summary: A free, open-source money app for expenses, income, bills, budgets and goals. It runs on every device, signs you in with a passkey, lets family share a wallet, speaks Greek, and tells you plainly what it can't do yet.
tags: webapp, finance, privacy, greek
project: expenity
---

I started with a smaller goal: *never forget to pay the electricity bill*. A bill reminder. It worked, and then I kept wanting more from it, the way you do with anything you actually use. Where did the money go this month? Can I afford the trip? Why is the Netflix charge different again?

So Expenity grew up. It is still a web app, still free, and still honest about its limits. It is now a proper little money app.

## The gap

Most money apps fail in one of three ways. They live on one phone, so a new phone or a partner on a different one breaks everything. They want your bank login before they help, which is a lot of trust for a first date. Or they feel like a spreadsheet with a logo, and you stop opening them.

What I wanted was fast to add to, clean to look at, and clear about where my data lives.

## What it does

- **Add an expense in seconds.** A big keypad, a category, done. Or type a sentence, in English or Greek: *Coffee 3.50 yesterday*, *Καφές 3,50 χθες*, *Netflix 15.99 monthly on the 3rd*.
- **Wallets in any currency.** Cash, bank, card, savings. Totals are converted with daily rates and marked as approximate, because "€10 + $5" is not a number.
- **Budgets and goals.** A limit for food, a goal for a trip, your salary as recurring income. You see what is left, what you can spend per day, and when you will get there.
- **Ideas from your own data.** You tell Expenity what you want: save for something, cut subscriptions, spend less on everyday things. It then points out specifics: this subscription costs €192 a year, delivery was €60 last month, here is what that would be worth towards your goal. It is arithmetic on your own numbers, done on your device, not advice.
- **Reports.** Spending by category you can tap into, cash flow, trends, a 90-day forecast, subscriptions, and a table you can sort and export.
- **Shared wallets.** Invite someone with a code or a link. They can edit or only view, and the server enforces it. Everything else of yours stays private.
- **Twelve themes**, from minimal to paper notes to terminal green to synthwave, and a switch that turns the animations off.

## Accounts without passwords

You sign in with a **passkey**: your fingerprint, face or device PIN. There is no password to forget or leak. You get recovery codes for the day you lose a phone, and you can add a second passkey on another device. Or skip the account and try it first; your data then stays in your browser.

The first run is deliberately gentle: create an account, a short animation shows how to add Expenity to your home screen, then a skippable setup asks about your currency, your wallets and what you want help with. Nothing can be added before that is done or skipped, so nothing ends up in a wallet you didn't choose.

## The honest part

- With an account, your data lives on my server (Cloudflare Workers and D1). It is protected by your passkey, but it is **not end-to-end encrypted**. I can technically read it. I don't, and the code is public, but you deserve to know.
- Email reminders and email invites are not on yet. They need a sending domain, and a website cannot wake a closed phone on its own, so for reminders when the app is closed there is still a calendar file with alarms.
- It has been tested in real Chrome with virtual passkeys and two simulated people sharing a wallet. It has not been tested on every phone. If something looks wrong on yours, please tell me.
- The Greek is my best attempt and is waiting for a native speaker to correct it.

## Try it

[Open Expenity](https://expenity.github.io/expenity/app/), create an account or choose **Try without an account**, and add one real expense. Ten seconds. The [website](https://expenity.github.io/expenity/) and the [help center](https://expenity.github.io/expenity/docs/) explain the rest, and the code is on [GitHub](https://github.com/expenity/expenity). If something is confusing, or a sentence is misread, [tell me](https://github.com/expenity/expenity/issues) and I'll fix it.
