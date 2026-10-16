---
title: "Expenity: know where your money goes"
date: 2026-10-15
order: 80
summary: A mobile-first money app with passkeys, shared wallets, budgets, savings goals and recurring income. A new guided setup, reusable transaction names, compressed photos and fourteen themes make it your own.
tags: webapp, finance, privacy, greek
project: expenity
---

Expenity started with a practical question: what needs paying, and when? It has grown into a place for the rest of the picture too—everyday expenses, income, wallets and the things you are saving towards.

[Open Expenity](https://expenity.github.io/expenity/app/), or [take a look at the website](https://expenity.github.io/expenity/). It is free, open source, and works on phones, tablets and computers.

## Designed around the moment you add something

Recording an expense should leave room to think. The amount pad now starts closed. Tap the amount, enter it, and use **✓ Done** to put the pad away. Add a description, category and wallet, then save the whole entry when you are ready. Text fields have their own Done control too.

If you often use the same name, tick **Save this name for next time**. Next time, select it from Saved names. Expenses and income have separate lists; the name and category come back, while you decide the new amount, date and wallet. Saved names travel with your account settings.

## A clearer home for each feature

**Budgets & goals** contains spending limits and savings targets. A small dot draws attention to the section until you open it for the first time. **Recurring income** lives under **Activity → Income**—the place to set up a salary schedule and mark it received. **Ideas** stays on Home and expands there, using arithmetic on your own records to highlight opportunities.

Reports connect these pieces: spending categories, cash flow, trends, subscriptions, tables, filters and a 90-day forecast. Forecasts are estimates based on recorded and scheduled activity, rather than a promise about the future.

## An introduction that actually introduces the app

The first screen offers an account using a passkey, or a quiet option to try without one. After signing up, an animated install guide explains how to add Expenity to your home screen. Optional setup covers your name, currency, aims, goals, wallets and theme. EUR is the starting currency.

Floating balance cards, soft blur and transitions lead into a short tour of Home, Activity, Budgets & goals and Reports. On phones, a separate demonstration explains swipe actions. Nothing is paid or deleted just by swiping. Existing accounts that have completed setup return to their data when they sign in again.

English and Greek each have their own interface labels and guides. Built-in wallet names follow the language you choose. Names you write yourself remain as written.

## Small photos, useful context

Attach a reference photo to an expense, income, bill, wallet, budget or goal. Expenity re-encodes it before upload, removes original metadata, limits the longest side to 1,280 pixels and compresses it to 96 KB or less. A paperclip opens the image when you need it.

Photos require an account and internet. Shared-wallet permissions apply to them. **Account → Delete all photos** removes your uploads, including your contributions in shared wallets, while retaining financial records and other people's uploads. You confirm with a fresh passkey check. JSON backups hold photo references, so keep originals if you need an independent image archive.

## Make it look like yours

There are fourteen themes, including paper notes, minimal, Synthwave, amber neon and cyan neon, plus a custom editor for colours, typography and corners. The neon themes have subtle falling trails. Motion follows your device preference, with Full, Reduced and Off choices. The redesigned website has its own interactive colour preview and a pause-effects control.

## Your account, clearly explained

Passkeys replace passwords. Recovery codes and extra passkeys help you regain access. With an account, records sync through Cloudflare Workers and D1 over an encrypted connection; the service is not end-to-end encrypted. Without an account, financial records remain in that browser. No bank connection is required, and Expenity does not move money.

Financial records work offline. Photos need a connection. Push reminders can arrive while the app is closed at your chosen daily hour; on iPhone, install the Home Screen app first. Email reminders remain unavailable until a sending service is configured.

## Try it

[Open the app](https://expenity.github.io/expenity/app/) and add your first expense. The [full English guide](https://expenity.github.io/expenity/docs/) and [Greek guide](https://expenity.github.io/expenity/el/docs/) cover setup, saved names, wallets, budgets, income, reports, photos and recovery. The [source is on GitHub](https://github.com/expenity/expenity); if something is confusing, [report it here](https://github.com/expenity/expenity/issues).
