---
title: "Fixpass: point at the problem, skip the password"
date: 2026-10-15
order: 40
summary: Which button is broken? A plugin that lets you point at the problem, and lets support in safely.
tags: wordpress, support, security
project: fixpass
---

"The button doesn't work."

"Which button?"

"The blue one."

"We have eleven blue buttons."

I've had versions of this conversation, in writing, over days. Everyone is polite, everyone is trying, and the problem just sits there, waiting for someone to look at it.

## Where it came from

Fixpass started life tied to one specific plugin's world, as a small set of tools for the support team. The more I used it, the clearer it became that the idea didn't belong to any one product. Any site with a problem needs the same two things. So I took it out, made it standalone, and renamed it.

## The two things

**One: show, don't describe.** Spotlight lets the customer click the broken part of the page, or drag a box around it, and add a note. Support opens that page with the spot already highlighted. The address, the screen size, the browser and any errors on the page travel along. No screenshot-with-red-arrow required, though I respect the craft.

**Two: let them in without sharing a secret.** One click creates a login link for a temporary administrator account. No password changes hands. Access lasts from a day up to a week, ends by itself, and then the account is deleted. The customer can extend it, or end it early, from the same screen.

## Details that took longer than they should have

- A **"copy the details"** button. Login link, spots, site health, plugins and themes, formatted for an email. Boring on paper, and the one I'd miss most if it vanished.
- **Reusable or one-time links.** One-time is the more cautious option. Reusable is the practical one, because support rarely fixes things in a single login.
- **Troubleshooting mode** for support, which switches plugins off in *their* browser only. Your visitors never notice. Everything stays running.

## What I learned

Security and kindness aren't opposites. The safest design is also the nicest one for the customer: nothing to remember, nothing to rotate, nothing left behind. I keep relearning this, and I'll probably keep relearning it.

If you've ever sent a password in an email, Fixpass is for you, and no, I'm not judging. I'm only a little judging.
