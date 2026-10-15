---
title: "SheetPilot: your spreadsheet, but it talks back"
date: 2026-10-15
order: 70
summary: Most teams keep what matters in spreadsheets, and then only store it. SheetPilot reads the sheet and tells you what stands out. Nothing leaves your browser.
tags: webapp, data, privacy
project: sheetpilot
---

Every company I've worked with runs on spreadsheets. They are the true database, the true CRM and the true source of the truth that three different people are editing right now.

And they're mostly **storage**. The numbers go in. Someone builds a chart, once, in a hurry, and it breaks the next time a column moves.

## The gap

I kept watching the same ritual. Export some data, open it, squint, make a pivot table, get a pivot table wrong, make another. The question is always the same: *what stands out?* Spreadsheets don't answer questions, they hold them.

## What SheetPilot does

You drop in a CSV or an Excel file. SheetPilot works out what's in it, how it's calculated, and what stands out, and builds an interactive dashboard.

- **It reads messy sheets.** It finds the real header row, copes with merged headers, semicolons and tabs, several tabs, and the date that could be March 4th or April 3rd.
- **It finds the logic.** It shows your real Excel formulas in plain words, or infers sums and ratios from the numbers, and flags rows that break them.
- **It explains itself.** A "How I read your sheet" box lists every choice it made, and lets you correct any of them. A tool that guesses silently is a tool you can't trust.
- **It writes findings in plain language,** including the useful sentence "nothing stands out", which is also a finding.

There are fourteen looks, and I'm happy to admit I had to learn something here: companies don't want a dashboard with a busy background. So the professional templates come first, and the playful ones, including a Terminal one, sit in a separate group.

## The privacy part, which is the whole point

Everything runs in your browser. Your file never uploads. No account. Even the share links work without a server, because the link itself carries the data.

That also means I couldn't see your data if I wanted to. It's an unusually relaxing way to build a product.

## A tip

If you can, drop in an **Excel file rather than a CSV**. A CSV flattens formulas into values, and the formulas are the interesting part.

Try it on a sheet you're slightly embarrassed by. That's where it finds the best stuff.
