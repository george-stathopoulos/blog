---
title: "Helpdesk Hero: please stop emailing me your password"
date: 2026-10-15
order: 30
summary: The first five emails of a support ticket are always the same questions. I tried to make them unnecessary.
tags: wordpress, support, security
project: helpdesk-hero
---

Here is the shape of a thousand support tickets.

1. "My site is broken."
2. "Which version of WordPress and PHP?"
3. "Which plugins are active?"
4. "Can you send me a login?"
5. A password, in an email, in plain text, sent with the confidence of someone who has never been phished.

By email five, nobody is having a good time. The customer feels interrogated, and the support person feels like a bank teller asking for a PIN.

## The gap

Support teams need the same facts every time, and customers can't be expected to know where to find them. Meanwhile the usual answer to "let me in" is to share a password, which is the digital equivalent of leaving your house key under a plant pot labelled KEY.

## What I wanted

A ticket that arrives **already answered**: versions, plugins, a health check that points at the likely cause. And a way in that doesn't involve a password at all: a one-time login that the customer controls, that ends on its own, and that leaves a record of what the support person did.

## What it became

Three plugins, because it turns out support has two sides:

- **Helpdesk Hero** is installed by the customer. They open a ticket from their dashboard, with diagnostics attached.
- **Helpdesk Hero Hub** is installed by the support team on their own site. It collects tickets, and gives support one-click access to a customer's site.
- **Pro** is the paid add-on for the team, with more control. Free for customers, free Hub for teams, Pro for the people who want more.

The thing I'm proudest of is that **the support team decides the rules.** A policy says what access levels customers can choose, how long it lasts, what details are required. The customer plugin only offers what the policy allows, and the Hub checks again on its side. Nobody has to trust a button.

## The design rule

The hard part isn't the code. It's deciding what the customer should never have to think about. If a customer has to understand "temporary administrator accounts", I've failed. If they click one button and support shows up, I've won.

The live demo has two sites talking to each other, so you can play both sides of a ticket. Be kind to the demo customer. They have enough problems.
