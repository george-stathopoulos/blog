---
title: "Docs Gap Finder: the question your docs have never heard"
date: 2026-11-08
order: 100
summary: A browser extension that reads the Zendesk ticket in front of you, checks it against your help articles, and points at what is missing. No AI, and the ticket never leaves your tab.
tags: extension, support, privacy, documentation
project: docs-gap-finder
---

Every help center has the same quiet problem: nobody knows which question it has never answered.

The tickets know. They arrive one at a time, each one a tiny report saying *"I looked for this and didn't find it."* But they are read one at a time, answered one at a time, and then they scroll away.

I wanted a tool that stands next to the ticket and asks one question: **does the documentation cover this?**

## What it does

- 📚 **Index** your public documentation. Enter the homepage and the app reads the articles.
- 🔌 **Connect** the Chrome or Edge extension with a six-digit code.
- 🎫 **Scan** a Zendesk ticket. The popup shows three groups:
  - **Relevant documentation**: articles that overlap with the question
  - **Potential gaps**: needs with weak or no coverage
  - **Suggested improvements**: wording that could be added

The toolbar icon also turns green, yellow, red or gray, so you know before you open anything.

## The rules I set myself

- 🚫 **No AI.** Matching is plain word comparison: word stems, ranking, and a vocabulary you control. The same ticket always gives the same answer, and you can see *why*.
- 🔒 **The ticket stays in your browser.** It is read, matched and thrown away right there.
- 🙋 **Sending needs a click.** When you mark a gap as **Real gap** or **Not a gap**, the card shows exactly which filtered key words will be sent. Nothing goes until you press.
- 🤷 **Never a verdict.** Everything is a *potential* gap. A score shows shared words, not proof. Different wording for the same idea looks like a gap until you add it to the vocabulary.

I did not want a tool that announces "your docs are wrong". I wanted one that says "have a look here".

## What went wrong (a short list)

- 🪟 The first popup collapsed into a thin sliver in a real browser. It looked fine in the test setup. Fixed in 0.6.1.
- 📜 Long tickets with many messages came back empty. Fixed in 0.6.2.
- 🧱 The ticket page changed shape under me: the extraction was rewritten for the current agent workspace, and the tool now says plainly when part of a conversation is collapsed or not loaded.
- 🧪 Tests passing on made-up tickets proved less than I hoped. Real tickets are messier.

## What it does not do

- 👁️ It reads only what is loaded on screen.
- 🎫 It supports Zendesk first. Other helpdesks are not supported yet.
- 🧩 The extension is not in a store yet; you install it from the app.

If your team answers the same question for the tenth time and the article still isn't written, [this is for you](https://george-stathopoulos.github.io/docs-gap-finder/). The [guides](https://george-stathopoulos.github.io/docs-gap-finder/docs/) cover every step.
